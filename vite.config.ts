import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // POST-only API endpoints - bypass GET requests (let React Router handle them)
      '^/(login|signup|user-posts|post-about-this|first-name|change-password|delete-post|post-liked|post-disliked|lawyers|contact-form|check-likes|comment-on-post|fetch-comment-posts|can-delete|delete-comment)$': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        bypass(req, res, options) {
          // Don't proxy GET requests - let React Router handle them
          // Return null to bypass proxy and let Vite serve the frontend
          if (req.method === 'GET') {
            return null;
          }
          // For POST requests, continue with proxy (return undefined)
          return undefined;
        },
      },
      // GET endpoints that should always be proxied
      '^/(highlighted|all-posts)$': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      // Handle root path - only proxy POST requests
      '^/$': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        bypass(req) {
          // Don't proxy GET requests to root - serve the frontend
          if (req.method === 'GET') {
            return '/index.html';
          }
        },
      },
    },
  },
})

