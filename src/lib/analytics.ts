/**
 * Client-Side Machine Commercialisation & Enquiry Analytics
 * Safely dispatches events to dataLayer / window events without blocking or throwing.
 */

export interface MachineEnquiryStartedEvent {
  source: string;
  machine_count: number;
  models: string[];
  has_requirements: boolean;
}

export interface MachineEnquirySubmittedEvent {
  reference: string;
  source: string;
  machine_count: number;
  models: string[];
  company_provided: boolean;
  phone_provided: boolean;
}

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

export function trackMachineEnquiryStarted(data: MachineEnquiryStartedEvent): void {
  if (typeof window === 'undefined') return;

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'machine_enquiry_started',
        ...data,
      });
    }

    window.dispatchEvent(
      new CustomEvent('alkota:machine_enquiry_started', { detail: data })
    );
  } catch (err) {
    // Fail silently — never break user flow for telemetry
    console.debug('Telemetry error:', err);
  }
}

export function trackMachineEnquirySubmitted(data: MachineEnquirySubmittedEvent): void {
  if (typeof window === 'undefined') return;

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'machine_enquiry_submitted',
        ...data,
      });
    }

    window.dispatchEvent(
      new CustomEvent('alkota:machine_enquiry_submitted', { detail: data })
    );
  } catch (err) {
    // Fail silently
    console.debug('Telemetry error:', err);
  }
}
