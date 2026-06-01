import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

type ManifestEntry = {
  id: string
  text: string
  path: string
}

const manifestPath = resolve('public/audio/manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as ManifestEntry[]
const seen = new Set<string>()
const missing: string[] = []

for (const entry of manifest) {
  if (!entry.id || !entry.text || !entry.path) {
    missing.push(`invalid manifest entry: ${JSON.stringify(entry)}`)
    continue
  }
  if (seen.has(entry.path)) {
    missing.push(`duplicate audio path: ${entry.path}`)
    continue
  }
  seen.add(entry.path)
  try {
    await access(resolve('public', entry.path))
  } catch {
    missing.push(entry.path)
  }
}

if (missing.length > 0) {
  console.error(`Audio verification failed. Missing or invalid items: ${missing.length}`)
  console.error(missing.slice(0, 30).join('\n'))
  process.exit(1)
}

console.log(`Verified ${manifest.length} fixed audio files.`)
