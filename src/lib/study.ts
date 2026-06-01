import type {
  AudioEntry,
  GrammarCard,
  KanaRow,
  PhraseScenario,
  StudyWord,
} from '../data/learningContent'
import { audioCatalog } from '../data/learningContent'

export type PlayableItem = {
  audioId: string
  label: string
  text: string
}

export type QuizMode = 'mixed' | 'kana' | 'word' | 'grammar'

export type QuizQuestion = {
  id: string
  q: string
  options: string[]
  answer: string
  source: '假名' | '词汇' | '语法'
  audioId?: string
}

export function getAudioPath(audioId: string) {
  return audioCatalog[audioId]?.path ?? ''
}

export function getAudioUrl(audioId: string) {
  const path = getAudioPath(audioId)
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path}`
}

export function canPlayAudio(audioId?: string, catalog: Record<string, AudioEntry> = audioCatalog) {
  return Boolean(audioId && catalog[audioId])
}

export function getPlayableStudyItems(content: {
  kanaRows: KanaRow[]
  words: StudyWord[]
  grammarCards: GrammarCard[]
  phraseScenarios: PhraseScenario[]
}): PlayableItem[] {
  const kanaItems = content.kanaRows.flatMap((row) =>
    row.hira.map((text, index): PlayableItem | null => {
      const audioId = row.audioIds[index]
      if (!audioId || text === '—') return null
      return { audioId, label: `${row.row} ${text}`, text }
    }).filter((item): item is PlayableItem => Boolean(item)),
  )

  const wordItems = content.words.flatMap((word): PlayableItem[] => [
    { audioId: word.audioId, label: word.jp, text: word.jp },
    { audioId: word.exampleAudioId, label: `${word.jp} 例句`, text: word.example },
  ])

  const grammarItems = content.grammarCards.map((card): PlayableItem => ({
    audioId: card.audioId,
    label: card.title,
    text: card.pattern,
  }))

  const phraseItems = content.phraseScenarios.flatMap((scenario) =>
    scenario.phrases.map((phrase): PlayableItem => ({
      audioId: phrase.audioId,
      label: `${scenario.scene} ${phrase.jp}`,
      text: phrase.jp,
    })),
  )

  return [...kanaItems, ...wordItems, ...grammarItems, ...phraseItems]
}

function takeOptions(correct: string, candidates: string[], count = 4) {
  const deduped = [correct, ...candidates.filter((item) => item !== correct)]
    .filter((item, index, array) => array.indexOf(item) === index)
    .slice(0, count)
  return rotate(deduped, correct.length % Math.max(1, deduped.length))
}

function rotate<T>(items: T[], by: number) {
  if (items.length === 0) return items
  const offset = by % items.length
  return [...items.slice(offset), ...items.slice(0, offset)]
}

export function makeQuiz(mode: QuizMode, content: {
  kanaRows: KanaRow[]
  words: StudyWord[]
  grammarCards: GrammarCard[]
}): QuizQuestion[] {
  const kanaPool = content.kanaRows.flatMap((row) =>
    row.hira.map((hira, index) => ({
      hira,
      romaji: row.roma[index],
      audioId: row.audioIds[index],
    })).filter((item) => item.hira !== '—' && item.romaji),
  )

  const kanaQuestions = kanaPool.slice(0, 16).map((item, index): QuizQuestion => ({
    id: `kana-${item.romaji}`,
    q: `「${item.hira}」的罗马音是？`,
    options: takeOptions(item.romaji, kanaPool.slice(index + 1).map((next) => next.romaji)),
    answer: item.romaji,
    source: '假名',
    audioId: item.audioId,
  }))

  const wordQuestions = content.words.slice(0, 24).map((word, index): QuizQuestion => ({
    id: `word-${word.id}`,
    q: `「${word.jp}」是什么意思？`,
    options: takeOptions(word.cn, content.words.slice(index + 1).map((next) => next.cn)),
    answer: word.cn,
    source: '词汇',
    audioId: word.audioId,
  }))

  const grammarQuestions = content.grammarCards.map((card, index): QuizQuestion => ({
    id: `grammar-${card.id}`,
    q: `「${card.title}」主要表达什么？`,
    options: takeOptions(card.meaning, content.grammarCards.slice(index + 1).map((next) => next.meaning)),
    answer: card.meaning,
    source: '语法',
    audioId: card.audioId,
  }))

  if (mode === 'kana') return kanaQuestions.slice(0, 10)
  if (mode === 'word') return wordQuestions.slice(0, 10)
  if (mode === 'grammar') return grammarQuestions.slice(0, 8)

  return [
    ...kanaQuestions.slice(0, 4),
    ...wordQuestions.slice(0, 4),
    ...grammarQuestions.slice(0, 4),
  ]
}
