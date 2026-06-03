import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


import { cloudflare } from "@cloudflare/vite-plugin";


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

/** 微信小程序 web-view 对 crossorigin  stylesheet 支持差，需移除 */
function wechatWebViewCompat() {
  return {
    name: 'wechat-webview-compat',
    transformIndexHtml: {
      order: 'post' as const,
      handler(html: string) {
        return html
          .replace(/\s+crossorigin/g, '')
          .replace(/<link rel="stylesheet"[^>]*>\s*/g, '');
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  // 腾讯云部署在 /cook-frontend/ 子目录；本地开发用 /
  base: env.VITE_APP_BASE || '/',
  plugins: [
    figmaAssetResolver(),
    cssInjectedByJsPlugin(),
    wechatWebViewCompat(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // 微信 web-view（X5 内核）对 type="module" 支持差，生成 nomodule 兼容包
    legacy({
      targets: ['chrome >= 61', 'ios >= 11', 'android >= 5'],
      modernPolyfills: true,
    }),
    cloudflare()
  ],
  build: {
    cssTarget: 'chrome61',
    target: 'es2015',
    modulePreload: false,
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  };
})