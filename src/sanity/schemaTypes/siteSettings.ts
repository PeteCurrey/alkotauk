import { defineField, defineType } from 'sanity';
import { Cog } from 'lucide-react';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Platform Controls',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Alkota UK',
    }),
    {
      name: 'maintenanceGroup',
      title: 'Maintenance & Availability',
      type: 'object',
      fields: [
        defineField({
          name: 'isMaintenanceMode',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          description: 'Blocks all site access and shows the cinematic splash message.',
          initialValue: false,
        }),
        defineField({
          name: 'maintenanceTitle',
          title: 'Maintenance Message Title',
          type: 'string',
          initialValue: 'System Maintenance',
        }),
        defineField({
          name: 'maintenanceMessage',
          title: 'Maintenance Message Body',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'maintenanceVideoUrl',
          title: 'Background Video ID (YouTube)',
          type: 'string',
          description: 'The YouTube ID to loop behind the maintenance wall.',
          initialValue: 'vFnvcx3vRUY',
        }),
      ],
    },
    {
      name: 'bannerGroup',
      title: 'Global Banner & Alerts',
      type: 'object',
      fields: [
        defineField({
          name: 'showGlobalBanner',
          title: 'Show Site-Wide Banner',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'bannerText',
          title: 'Banner Content',
          type: 'string',
        }),
        defineField({
          name: 'bannerLink',
          title: 'Banner Link URL',
          type: 'string',
        }),
        defineField({
          name: 'bannerType',
          title: 'Banner Visual Style',
          type: 'string',
          options: {
            list: [
              { title: 'Information (Black)', value: 'info' },
              { title: 'Special Notice (Orange)', value: 'special' },
              { title: 'Alert (Red)', value: 'alert' },
            ],
          },
          initialValue: 'info',
        }),
      ],
    },
    {
      name: 'visualExperience',
      title: 'Visual Experience',
      type: 'object',
      fields: [
        defineField({
          name: 'enableSplashScreen',
          title: 'Show Cinematic Splash Screen',
          type: 'boolean',
          description: 'Displays a premium fade-in intro when a user visits the platform.',
          initialValue: true,
        }),
        defineField({
          name: 'splashTitle',
          title: 'Splash Screen Text',
          type: 'string',
          initialValue: 'Alkota UK',
        }),
      ],
    },
    {
      name: 'stripeGroup',
      title: 'Stripe Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'stripePublicKey',
          title: 'Stripe Public Key',
          type: 'string',
          description: 'Used for frontend checkout initialization.',
        }),
        defineField({
          name: 'stripeSecretKey',
          title: 'Stripe Secret Key',
          type: 'string',
          description: 'Keep this secure. Used for server-side session creation.',
        }),
        defineField({
          name: 'stripeWebhookSecret',
          title: 'Stripe Webhook Secret',
          type: 'string',
        }),
      ],
    },
    {
      name: 'snipcartGroup',
      title: 'Snipcart Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'snipcartApiKey',
          title: 'Snipcart Public API Key',
          type: 'string',
        }),
      ],
    },
    {
      name: 'hubspotGroup',
      title: 'HubSpot Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'hubspotPortalId',
          title: 'HubSpot Portal ID',
          type: 'string',
        }),
        defineField({
          name: 'hubspotQuoteFormId',
          title: 'Quote Request Form ID',
          type: 'string',
        }),
        defineField({
          name: 'hubspotContactFormId',
          title: 'Contact Form ID',
          type: 'string',
        }),
      ],
    },
    {
      name: 'seoGroup',
      title: 'Global SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultDescription',
          title: 'Default Meta Description',
          type: 'text',
        }),
        defineField({
          name: 'ogImage',
          title: 'Default Share Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    },
  ],
});
