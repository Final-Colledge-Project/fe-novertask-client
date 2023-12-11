import { CSSOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: [
        {
          find: '~',
          replacement: '/src'
        }
      ]
    },
    server: {
      host: true
    },
    css: {
      devSourcemap: false
    } as CSSOptions
  }
})
