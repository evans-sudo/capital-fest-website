import { defineCloudflareConfig } from '@opennextjs/cloudflare';

const config = defineCloudflareConfig();

// Run Next.js directly so the adapter does not call `npm run build` recursively.
config.buildCommand = 'npm run build:next';

export default config;
