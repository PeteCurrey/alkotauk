# Alkota UK - Sanity & Integration Setup Guide

Follow these steps to connect your HubSpot, Stripe, and Snipcart accounts to the Alkota UK platform.

## 1. Sanity Studio Configuration

All integration keys are managed through the **Site Settings** document in Sanity Studio.

### HubSpot Integration
1.  Go to your HubSpot portal.
2.  Navigate to **Settings > Integrations > Connected Apps**.
3.  Find your **Portal ID** (HubID).
4.  For specific forms, find the **Form ID** in the form editor URL.
5.  In Sanity Studio, open **Site Settings** and enter these in the `HubSpot Configuration` group.

### Stripe Integration
1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2.  Go to **Developers > API Keys**.
3.  Copy your **Secret Key** (starts with `sk_`).
4.  In Sanity Studio, open **Site Settings** and enter this in the `Stripe Configuration` group.
5.  **Note**: Ensure you use the "Live" key for production and "Test" key for development.

### Snipcart Integration
1.  Log in to your [Snipcart Dashboard](https://app.snipcart.com/).
2.  Go to **Settings > API Keys**.
3.  Copy your **Public API Key**.
4.  In Sanity Studio, open **Site Settings** and enter this in the `Snipcart Configuration` group.

---

## 2. Environment Variables

For the application to communicate with Sanity, ensure the following are set in your deployment environment (e.g., Vercel) or `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SITE_URL="https://alkota.co.uk"
```

---

## 3. Product & Machine Setup

### Machine Deposits
To enable Stripe deposits for a specific machine:
1.  Edit the **Machine** document in Sanity.
2.  Set a **Price** and a **Deposit Amount**.
3.  Ensure the **Slug** is unique.
4.  The "Reserve Now" button will automatically appear if a deposit amount > 0 is set.

### Shop Parts
1.  Add new **Part** documents in Sanity.
2.  The Snipcart "Add to Cart" button will use the Part's ID, Name, and Price automatically.

---

## 4. Verification

Once keys are entered:
-   **HubSpot**: The form should render at the bottom of Machine Detail pages.
-   **Stripe**: Clicking "Reserve Now" should redirect you to a Stripe Checkout page.
-   **Snipcart**: Clicking "Add to Cart" should open the Snipcart side-drawer.
