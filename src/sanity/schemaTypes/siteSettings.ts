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
        defineField({
          name: 'maintenancePhone',
          title: 'Emergency Contact Number',
          type: 'string',
          description: 'The telephone number displayed at the bottom of the maintenance screen.',
          initialValue: '+447912506738',
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
    {
      name: 'aiChatGroup',
      title: 'AI Advisor Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'claudeApiKey',
          title: 'Claude API Key',
          type: 'string',
          description: 'Your Anthropic API key. This is stored securely and never exposed to the frontend.',
        }),
        defineField({
          name: 'systemInstructions',
          title: 'System Instructions',
          type: 'text',
          rows: 10,
          description: 'The core personality and knowledge base for the AI Advisor.',
          initialValue: `You are the Alkota UK Technical Advisor — an expert in industrial pressure washing and high-pressure cleaning systems.`,
        }),
        defineField({
          name: 'teamMembers',
          title: 'Team Personas',
          type: 'array',
          description: 'A list of real people whose names and avatars will be randomly associated with the bot for a personable experience.',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Name', type: 'string' },
                { name: 'role', title: 'Role', type: 'string', initialValue: 'Technical Advisor' },
                { name: 'avatar', title: 'Avatar Image', type: 'image', options: { hotspot: true } },
              ],
            },
          ],
        }),
      ],
    },
  ],
});
