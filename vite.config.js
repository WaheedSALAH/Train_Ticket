// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// اكتب هنا الbase = اسم الريبو بتاعك في GitHub
export default defineConfig({
  plugins: [react()],
  base: '/Train_Ticket/'  // مهم جدًا!
})
