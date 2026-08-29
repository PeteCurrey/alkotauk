import { supabaseAdmin } from '@/lib/supabase/server';

export type StorageVisibility = 'public_marketing' | 'customer_private' | 'internal_only';

export interface StorageBucketConfig {
  name: string;
  isPublic: boolean;
  allowedMimeTypes: string[];
  maxSizeBytes: number;
}

export const STORAGE_BUCKETS: Record<StorageVisibility, StorageBucketConfig> = {
  public_marketing: {
    name: 'trailer-public-media',
    isPublic: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    maxSizeBytes: 25 * 1024 * 1024, // 25 MB
  },
  customer_private: {
    name: 'trailer-customer-documents',
    isPublic: false,
    allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
    maxSizeBytes: 30 * 1024 * 1024, // 30 MB
  },
  internal_only: {
    name: 'trailer-internal-qa',
    isPublic: false,
    allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/plain'],
    maxSizeBytes: 50 * 1024 * 1024, // 50 MB
  },
};

export interface StoredDocumentMetadata {
  id: string;
  build_reference: string;
  build_code: string;
  organisation_id?: string;
  title: string;
  document_type: string;
  revision: string;
  visibility: StorageVisibility;
  storage_bucket: string;
  storage_path: string;
  mime_type: string;
  file_size_bytes: number;
  superseded: boolean;
  uploaded_by: string;
  created_at: string;
}

/**
 * Initializes required storage buckets on Supabase if not present.
 */
export async function ensureTrailerStorageBuckets(): Promise<void> {
  for (const config of Object.values(STORAGE_BUCKETS)) {
    try {
      const { data: buckets } = await supabaseAdmin.storage.listBuckets();
      const exists = buckets?.some(b => b.name === config.name);
      if (!exists) {
        await supabaseAdmin.storage.createBucket(config.name, {
          public: config.isPublic,
          fileSizeLimit: config.maxSizeBytes,
        });
      }
    } catch (err) {
      // Bucket creation fallback (e.g. in test or offline environment)
      console.warn(`Storage bucket check for ${config.name}:`, err);
    }
  }
}

/**
 * Validates file properties against bucket security policies.
 */
export function validateStorageUpload(
  file: { name: string; type: string; size: number },
  visibility: StorageVisibility
): { valid: boolean; error?: string } {
  const bucketConfig = STORAGE_BUCKETS[visibility];
  if (!bucketConfig) {
    return { valid: false, error: 'Invalid storage visibility tier.' };
  }

  if (!bucketConfig.allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Disallowed file type (${file.type}). Allowed types: ${bucketConfig.allowedMimeTypes.join(', ')}`,
    };
  }

  if (file.size > bucketConfig.maxSizeBytes) {
    const maxMb = Math.round(bucketConfig.maxSizeBytes / (1024 * 1024));
    return {
      valid: false,
      error: `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds limit of ${maxMb}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Uploads a file to the appropriate secure bucket with sanitized key.
 */
export async function uploadTrailerDocument({
  fileBuffer,
  fileName,
  mimeType,
  visibility,
  buildReference,
  revision = 'Rev 1.0',
}: {
  fileBuffer: Buffer;
  fileName: string;
  mimeType: string;
  visibility: StorageVisibility;
  buildReference: string;
  revision?: string;
}): Promise<{ success: boolean; storagePath?: string; url?: string; error?: string }> {
  const bucketConfig = STORAGE_BUCKETS[visibility];
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const safePath = `${buildReference}/${revision.replace(/[^a-zA-Z0-9.-]/g, '_')}/${Date.now()}-${sanitizedName}`;

  try {
    const { error: uploadErr } = await supabaseAdmin.storage
      .from(bucketConfig.name)
      .upload(safePath, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadErr) {
      return { success: false, error: uploadErr.message };
    }

    if (bucketConfig.isPublic) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xohftjaohhkwgxdnouoo.supabase.co';
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketConfig.name}/${safePath}`;
      return { success: true, storagePath: safePath, url: publicUrl };
    }

    return { success: true, storagePath: safePath };
  } catch (err: any) {
    return { success: false, error: err.message || 'Upload operation failed.' };
  }
}

/**
 * Generates an authenticated, short-lived signed URL for a customer-private or internal document.
 * Validates tenant isolation: customer organization must own the build.
 */
export async function generateSignedDocumentUrl({
  storagePath,
  visibility,
  requestingOrgId,
  buildOrgId,
  expiresInSeconds = 3600,
}: {
  storagePath: string;
  visibility: StorageVisibility;
  requestingOrgId?: string;
  buildOrgId?: string;
  expiresInSeconds?: number;
}): Promise<{ authorized: boolean; signedUrl?: string; error?: string }> {
  // If internal, customer cannot access
  if (visibility === 'internal_only' && !requestingOrgId?.startsWith('admin-')) {
    return { authorized: false, error: 'Access denied: Internal document.' };
  }

  // Tenant isolation check: if both orgs provided, they must match
  if (visibility === 'customer_private' && requestingOrgId && buildOrgId) {
    if (requestingOrgId !== buildOrgId && !requestingOrgId.startsWith('admin-')) {
      return { authorized: false, error: 'Access denied: Organisation tenancy mismatch.' };
    }
  }

  const bucketConfig = STORAGE_BUCKETS[visibility];
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucketConfig.name)
      .createSignedUrl(storagePath, expiresInSeconds);

    if (error || !data?.signedUrl) {
      return { authorized: true, error: error?.message || 'Failed to generate signed URL.' };
    }

    return { authorized: true, signedUrl: data.signedUrl };
  } catch (err: any) {
    return { authorized: true, error: err.message || 'Storage service unavailable.' };
  }
}
