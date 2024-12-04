import { withContentCollections } from '@content-collections/next';
import { env } from '@repo/env';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

if (process.env.NODE_ENV === 'production') {
  const redirects: NextConfig['redirects'] = async () => [
    {
      source: '/legal',
      destination: '/legal/privacy',
      statusCode: 301,
    },
  ];

  nextConfig.redirects = redirects;
}

nextConfig.images = {
  remotePatterns: [
    {
      hostname: env.NEXT_PUBLIC_BLOB_STORAGE_DOMAIN,
    },
  ],
};

export default withContentCollections(nextConfig);
