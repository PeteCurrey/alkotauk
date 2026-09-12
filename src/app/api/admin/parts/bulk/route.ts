import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { ids, action, payload } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No parts selected for bulk action' }, { status: 400 });
    }

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    let updateFields: Record<string, any> = { updated_at: now };

    switch (action) {
      case 'set_category': {
        if (!payload?.category) {
          return NextResponse.json({ error: 'Category is required' }, { status: 400 });
        }
        updateFields.category = payload.category;
        if (payload.subcategory !== undefined) {
          updateFields.subcategory = payload.subcategory || null;
        }
        break;
      }

      case 'set_brand': {
        if (!payload?.brand) {
          return NextResponse.json({ error: 'Brand is required' }, { status: 400 });
        }
        updateFields.brand = payload.brand;
        if (payload.manufacturer) {
          updateFields.manufacturer = payload.manufacturer;
        }
        break;
      }

      case 'set_stock_status': {
        if (payload?.in_stock !== undefined) updateFields.in_stock = Boolean(payload.in_stock);
        if (payload?.availability_status) updateFields.availability_status = payload.availability_status;
        if (payload?.stock_type) updateFields.stock_type = payload.stock_type;
        break;
      }

      case 'set_review_status': {
        if (payload?.needs_review !== undefined) {
          updateFields.needs_review = Boolean(payload.needs_review);
          if (!payload.needs_review) {
            updateFields.review_notes = payload.review_notes || 'Reviewed and approved in bulk admin action';
          }
        }
        break;
      }

      case 'set_active_status': {
        if (payload?.active !== undefined) {
          updateFields.active = Boolean(payload.active);
        }
        break;
      }

      case 'bulk_archive': {
        updateFields.active = false;
        updateFields.discontinued = true;
        updateFields.availability_status = 'obsolete';
        break;
      }

      case 'price_adjustment': {
        const { markup_type, value, vat_rate } = payload || {};
        const numericVal = parseFloat(value);
        if (isNaN(numericVal)) {
          return NextResponse.json({ error: 'Invalid adjustment value' }, { status: 400 });
        }

        const { data: targetParts, error: fetchErr } = await supabaseAdmin
          .from('parts')
          .select('id, cost_price, price')
          .in('id', ids);

        if (fetchErr) {
          return NextResponse.json({ error: fetchErr.message }, { status: 500 });
        }

        let updatedCount = 0;
        await Promise.all(
          (targetParts || []).map(async (part) => {
            let newPrice = part.price;

            if (markup_type === 'margin_on_cost' && part.cost_price != null && Number(part.cost_price) > 0) {
              const marginFraction = numericVal / 100;
              if (marginFraction < 1) {
                newPrice = Math.round((Number(part.cost_price) / (1 - marginFraction)) * 100) / 100;
              }
            } else if (markup_type === 'percent_on_retail' && part.price != null && Number(part.price) > 0) {
              newPrice = Math.round(Number(part.price) * (1 + numericVal / 100) * 100) / 100;
            } else if (markup_type === 'fixed_price') {
              newPrice = numericVal;
            }

            const patch: Record<string, any> = {
              price: newPrice,
              updated_at: now,
            };
            if (vat_rate !== undefined) patch.vat_rate = vat_rate;

            const { error: updateErr } = await supabaseAdmin
              .from('parts')
              .update(patch)
              .eq('id', part.id);

            if (!updateErr) updatedCount++;
          })
        );

        return NextResponse.json({
          success: true,
          action,
          updated: updatedCount,
          total: ids.length,
        });
      }

      default:
        return NextResponse.json({ error: `Unsupported bulk action: ${action}` }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('parts')
      .update(updateFields)
      .in('id', ids)
      .select('id');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      action,
      updated: data?.length || 0,
      total: ids.length,
    });
  } catch (err: any) {
    console.error('Bulk parts action failed:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
