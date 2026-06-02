import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


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
          .replace(/<link rel="stylesheet"[^>]*>\s*/g, '')
      },
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    cssInjectedByJsPlugin(),
    wechatWebViewCompat(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  build: {
    // 降低 CSS 语法版本，兼容微信 X5 内核
    cssTarget: 'chrome61',
    target: 'es2015',
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
