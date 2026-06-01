import type {
  AudioEntry,
  GrammarCard,
  JLPTLevel,
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

export type QuizMode = 'mixed' | 'kana' | 'word' | 'grammar' | 'phrase'

export type QuizQuestion = {
  id: string
  q: string
  options: string[]
  answer: string
  source: '假名' | '词汇' | '语法' | '会话'
  audioId?: string
  reviewWordId?: string
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

export function getReviewWords(words: StudyWord[], progress: {
  favoriteWords: string[]
  reviewQueue: string[]
  mistakes: string[]
}) {
  const explicitIds = [...progress.favoriteWords, ...progress.reviewQueue, ...progress.mistakes]
    .filter((id, index, array) => array.indexOf(id) === index)
  return explicitIds
    .map((id) => words.find((word) => word.id === id))
    .filter((word): word is StudyWord => Boolean(word))
}

export function makeQuiz(mode: QuizMode, content: {
  kanaRows: KanaRow[]
  words: StudyWord[]
  grammarCards: GrammarCard[]
  phraseScenarios?: PhraseScenario[]
  level?: JLPTLevel
}): QuizQuestion[] {
  const words = content.level ? content.words.filter((word) => word.level === content.level) : content.words
  const grammarCards = content.level ? content.grammarCards.filter((card) => card.level === content.level) : content.grammarCards
  const phraseScenarios = content.level
    ? (content.phraseScenarios ?? []).filter((scenario) => scenario.level === content.level)
    : (content.phraseScenarios ?? [])

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

  const wordQuestions = words.slice(0, 24).map((word, index): QuizQuestion => ({
    id: `word-${word.id}`,
    q: `「${word.jp}」是什么意思？`,
    options: takeOptions(word.cn, words.slice(index + 1).map((next) => next.cn)),
    answer: word.cn,
    source: '词汇',
    audioId: word.audioId,
    reviewWordId: word.id,
  }))

  const grammarQuestions = grammarCards.map((card, index): QuizQuestion => ({
    id: `grammar-${card.id}`,
    q: `「${card.title}」主要表达什么？`,
    options: takeOptions(card.meaning, grammarCards.slice(index + 1).map((next) => next.meaning)),
    answer: card.meaning,
    source: '语法',
    audioId: card.audioId,
  }))

  const phrasePool = phraseScenarios.flatMap((scenario) => scenario.phrases)
  const phraseQuestions = phrasePool.map((phrase, index): QuizQuestion => ({
    id: `phrase-${phrase.id}`,
    q: `听到或看到「${phrase.jp}」时，最接近的意思是？`,
    options: takeOptions(phrase.cn, phrasePool.slice(index + 1).map((next) => next.cn)),
    answer: phrase.cn,
    source: '会话',
    audioId: phrase.audioId,
  }))

  if (mode === 'kana') return kanaQuestions.slice(0, 10)
  if (mode === 'word') return wordQuestions.slice(0, 10)
  if (mode === 'grammar') return grammarQuestions.slice(0, 8)
  if (mode === 'phrase') return phraseQuestions.slice(0, 8)

  return [
    ...kanaQuestions.slice(0, 3),
    ...wordQuestions.slice(0, 3),
    ...grammarQuestions.slice(0, 3),
    ...phraseQuestions.slice(0, 3),
  ]
}
