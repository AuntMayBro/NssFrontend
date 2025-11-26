import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'dohsuupt',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: true,
});
