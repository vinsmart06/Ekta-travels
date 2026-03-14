const http = require('http')
const fs   = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3000
const DIST = path.join(__dirname, '..', 'dist')
const ENQUIRIES = path.join(__dirname, 'enquiries.json')

const MIME = {
  '.html':'text/html','.js':'application/javascript','.css':'text/css',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.svg':'image/svg+xml','.ico':'image/x-icon','.json':'application/json',
  '.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'
}

function parseBody(req) {
  return new Promise(resolve => {
    let b = ''
    req.on('data', c => b += c)
    req.on('end', () => { try { resolve(JSON.parse(b)) } catch { resolve({}) } })
  })
}
function json(res, status, data) {
  res.writeHead(status, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'})
  res.end(JSON.stringify(data))
}

async function handler(req, res) {
  const url  = new URL(req.url, `http://localhost:${PORT}`)
  const pathname = url.pathname

  if (req.method === 'OPTIONS') { json(res, 200, {}); return }

  if (pathname === '/api/enquiry' && req.method === 'POST') {
    const body = await parseBody(req)
    if (!body.name || !body.email || !body.message) {
      json(res, 400, { success: false, error: 'Name, email and message are required' }); return
    }
    const list = (() => { try { return JSON.parse(fs.readFileSync(ENQUIRIES,'utf8')) } catch { return [] } })()
    list.push({ id: list.length + 1, ...body, createdAt: new Date().toISOString() })
    fs.writeFileSync(ENQUIRIES, JSON.stringify(list, null, 2))
    console.log(`📬 Enquiry #${list.length} from ${body.name} (${body.email})`)
    json(res, 201, { success: true, message: 'Enquiry received! We will contact you within 24 hours.' }); return
  }

  if (pathname === '/api/enquiries' && req.method === 'GET') {
    const list = (() => { try { return JSON.parse(fs.readFileSync(ENQUIRIES,'utf8')) } catch { return [] } })()
    json(res, 200, { success: true, data: list }); return
  }

  // Static files
  let file = path.join(DIST, pathname === '/' ? 'index.html' : pathname)
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(DIST, 'index.html')  // SPA fallback
  }
  try {
    const content = fs.readFileSync(file)
    const ext  = path.extname(file)
    const mime = MIME[ext] || 'text/html'
    res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': ext === '.html' ? 'no-cache' : 'max-age=86400' })
    res.end(content)
  } catch {
    res.writeHead(404); res.end('Not found')
  }
}

http.createServer(handler).listen(PORT, () => {
  console.log(`\n  🚀 EKTA Travels  →  http://localhost:${PORT}\n`)
})
