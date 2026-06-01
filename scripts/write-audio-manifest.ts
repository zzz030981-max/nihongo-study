import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { audioCatalog } from '../src/data/learningContent'

const manifestPath = resolve('public/audio/manifest.json')

const entries = Object.entries(audioCatalog)
  .map(([id, item]) => ({
    id,
    text: item.text,
    kana: item.kana ?? '',
    path: item.path,
  }))
  .sort((a, b) => a.path.localeCompare(b.path))

await mkdir(dirname(manifestPath), { recursive: true })
await writeFile(manifestPath, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
console.log(`Wrote ${entries.length} audio manifest entries to ${manifestPath}`)
