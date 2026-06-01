import asyncio
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "public" / "audio" / "manifest.json"
VOICE = "ja-JP-NanamiNeural"


async def synthesize(entry, semaphore):
    output = ROOT / "public" / entry["path"]
    output.parent.mkdir(parents=True, exist_ok=True)
    if output.exists() and output.stat().st_size > 1024:
        return "skip", entry["path"]
    async with semaphore:
        communicate = edge_tts.Communicate(entry["text"], VOICE, rate="-8%")
        await communicate.save(str(output))
        return "write", entry["path"]


async def main():
    entries = json.loads(MANIFEST.read_text(encoding="utf-8"))
    semaphore = asyncio.Semaphore(6)
    results = await asyncio.gather(*(synthesize(entry, semaphore) for entry in entries))
    written = sum(1 for status, _ in results if status == "write")
    skipped = sum(1 for status, _ in results if status == "skip")
    print(f"Audio generated with {VOICE}: {written} written, {skipped} skipped.")


if __name__ == "__main__":
    asyncio.run(main())
