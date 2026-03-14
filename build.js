#!/usr/bin/env node
/**
 * EKTA Travels — Build Script
 * Uses esbuild + tsx (both available globally with Node.js)
 * Run: node build.js
 */
const { execSync } = require('child_process')
const fs   = require('fs')
const path = require('path')

//const ESBUILD    = '/home/claude/.npm-global/lib/node_modules/tsx/node_modules/esbuild/bin/esbuild'
//const ESBUILD = 'npx esbuild'
const ESBUILD = "./node_modules/esbuild/bin/esbuild"
//const NODE_MODS  = '/home/claude/.npm-global/lib/node_modules'
const ROOT       = __dirname

// Ensure dist exists
if (!fs.existsSync('dist')) fs.mkdirSync('dist')

// Copy index.html
fs.copyFileSync('public/index.html', 'dist/index.html')
console.log('✓ dist/index.html')

// Copy CSS
fs.copyFileSync('src/styles.css', 'dist/styles.css')
console.log('✓ dist/styles.css')

// Works on Windows AND Linux/Mac/Render
//const ESBUILD = process.platform === 'win32'
//  ? path.join(__dirname, 'node_modules', '.bin', 'esbuild.cmd')
 // : path.join(__dirname, 'node_modules', '.bin', 'esbuild')

// Build JS bundle
const cmd = [
   ESBUILD,
  'src/main.tsx',
  '--bundle',
  '--outfile=dist/bundle.js',
  '--loader:.tsx=tsx',
  '--loader:.ts=ts',
  '--loader:.jsx=jsx',
  '--loader:.js=js',
  '--loader:.css=empty',
  '--platform=browser',
  '--target=es2020',
  '--format=iife',
  '--define:process.env.NODE_ENV=\\"production\\"',
  '--minify'
 // `--node-paths=${NODE_MODS}`,
].join(' ')

console.log('\n⚙️  Bundling React app...')
try {
  //execSync(cmd, { stdio: 'inherit', cwd: ROOT, env: { ...process.env, NODE_PATH: NODE_MODS } })
  execSync(cmd, { stdio: 'inherit', cwd: ROOT })
  const kb = Math.round(fs.statSync('dist/bundle.js').size / 1024)
  console.log(`✓ dist/bundle.js (${kb} KB)`)
  console.log('\n✅ Build complete!')
  console.log('   Start server: node server/index.js')
  console.log('   Open browser: http://localhost:3000\n')
} catch (err) {
  console.error('\n❌ Build failed:', err.message)
  process.exit(1)
}
