import { describe, expect, it } from 'vitest'
import {
  audioCatalog,
  dailyPlan,
  grammarCards,
  kanaRows,
  learningLevels,
  phraseScenarios,
  studyWords,
} from '../data/learningContent'
import { getAudioPath, getPlayableStudyItems, getReviewWords, makeQuiz } from './study'

describe('learning content', () => {
  it('keeps every playable study item connected to one fixed audio file', () => {
    const playableItems = getPlayableStudyItems({
      kanaRows,
      words: studyWords,
      grammarCards,
      phraseScenarios,
    })

    expect(playableItems.length).toBeGreaterThan(80)

    for (const item of playableItems) {
      const audio = audioCatalog[item.audioId]
      expect(audio, item.label).toBeDefined()
      expect(audio.text).toBe(item.text)
      expect(getAudioPath(item.audioId)).toBe(audio.path)
      expect(audio.path).toMatch(/^audio\/.+\.mp3$/)
    }
  })

  it('creates quiz questions from kana, vocabulary, and grammar without duplicate options', () => {
    const quiz = makeQuiz('mixed', {
      kanaRows,
      words: studyWords,
      grammarCards,
      phraseScenarios,
      level: 'N3',
    })

    expect(quiz).toHaveLength(12)
    expect(new Set(quiz.map((item) => item.source))).toEqual(
      new Set(['假名', '词汇', '语法', '会话']),
    )

    for (const question of quiz) {
      expect(question.options).toContain(question.answer)
      expect(new Set(question.options).size).toBe(question.options.length)
    }
  })

  it('ships a focused beginner plan with ten daily tasks', () => {
    expect(dailyPlan).toHaveLength(10)
    expect(dailyPlan.every((item) => item.minutes >= 15)).toBe(true)
  })

  it('ships vocabulary, grammar, and phrases for every JLPT level', () => {
    expect(learningLevels).toEqual(['N5', 'N4', 'N3', 'N2', 'N1'])

    for (const level of learningLevels) {
      expect(studyWords.filter((word) => word.level === level).length, `${level} words`).toBeGreaterThanOrEqual(8)
      expect(grammarCards.filter((card) => card.level === level).length, `${level} grammar`).toBeGreaterThanOrEqual(4)
      expect(phraseScenarios.some((scenario) => scenario.level === level), `${level} phrases`).toBe(true)
    }
  })

  it('builds review only from explicit user actions', () => {
    const reviewWords = getReviewWords(studyWords, {
      favoriteWords: [studyWords[0].id],
      reviewQueue: [studyWords[1].id],
      mistakes: [studyWords[2].id],
    })

    expect(reviewWords.map((word) => word.id)).toEqual([
      studyWords[0].id,
      studyWords[1].id,
      studyWords[2].id,
    ])
  })
})
