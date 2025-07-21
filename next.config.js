/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration for educational content
  // output: 'export', // Disabled due to API routes - would need client-side data processing
  
  // Disable server-side features for static export
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Generate unique build ID
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  
  // Note: API routes are not supported with static export
  // The application should use static data imports instead
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization configuration
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    loader: 'default',
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Webpack configuration for better bundling
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle for educational content
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          grammar: {
            test: /[\\/]data[\\/]grammar-rules[\\/]/,
            name: 'grammar-data',
            priority: 10,
            chunks: 'all',
          },
          questions: {
            test: /[\\/]data[\\/]questions[\\/]/,
            name: 'questions-data',
            priority: 10,
            chunks: 'all',
          },
        },
      },
    };
    
    return config;
  },
  
  // Note: headers, redirects, and rewrites are not supported with static export
  // These would be handled by the hosting platform or CDN
};

module.exports = nextConfig;
