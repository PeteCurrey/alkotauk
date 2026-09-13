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

export interface EnquiryViewEvent {
  source: string;
  context?: string;
  machine_count: number;
  models?: string[];
}

export interface EnquiryStepCompleteEvent {
  step: string;
  source: string;
}

export interface EnquiryValidationErrorEvent {
  field?: string;
  source: string;
  message?: string;
}

export interface EnquirySubmitEvent {
  source: string;
  machine_count: number;
  has_requirements: boolean;
}

export interface EnquirySuccessEvent {
  reference: string;
  source: string;
  machine_count: number;
  models?: string[];
}

export interface EnquiryFailureEvent {
  source: string;
  code?: string;
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

export function trackEnquiryView(data: EnquiryViewEvent): void {
  if (typeof window === 'undefined') return;
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'enquiry_view', ...data });
    }
    window.dispatchEvent(new CustomEvent('alkota:enquiry_view', { detail: data }));
  } catch (err) {
    console.debug('Telemetry error:', err);
  }
}

export function trackEnquiryStepComplete(data: EnquiryStepCompleteEvent): void {
  if (typeof window === 'undefined') return;
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'enquiry_step_complete', ...data });
    }
    window.dispatchEvent(new CustomEvent('alkota:enquiry_step_complete', { detail: data }));
  } catch (err) {
    console.debug('Telemetry error:', err);
  }
}

export function trackEnquiryValidationError(data: EnquiryValidationErrorEvent): void {
  if (typeof window === 'undefined') return;
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'enquiry_validation_error', ...data });
    }
    window.dispatchEvent(new CustomEvent('alkota:enquiry_validation_error', { detail: data }));
  } catch (err) {
    console.debug('Telemetry error:', err);
  }
}

export function trackEnquirySubmit(data: EnquirySubmitEvent): void {
  if (typeof window === 'undefined') return;
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'enquiry_submit', ...data });
    }
    window.dispatchEvent(new CustomEvent('alkota:enquiry_submit', { detail: data }));
  } catch (err) {
    console.debug('Telemetry error:', err);
  }
}

export function trackEnquirySuccess(data: EnquirySuccessEvent): void {
  if (typeof window === 'undefined') return;
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'enquiry_success', ...data });
    }
    window.dispatchEvent(new CustomEvent('alkota:enquiry_success', { detail: data }));
  } catch (err) {
    console.debug('Telemetry error:', err);
  }
}

export function trackEnquiryFailure(data: EnquiryFailureEvent): void {
  if (typeof window === 'undefined') return;
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'enquiry_failure', ...data });
    }
    window.dispatchEvent(new CustomEvent('alkota:enquiry_failure', { detail: data }));
  } catch (err) {
    console.debug('Telemetry error:', err);
  }
}
