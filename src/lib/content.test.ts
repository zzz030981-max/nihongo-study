import { describe, expect, it } from 'vitest'
import {
  audioCatalog,
  dailyPlan,
  grammarCards,
  kanaRows,
  phraseScenarios,
  studyWords,
} from '../data/learningContent'
import { getAudioPath, getPlayableStudyItems, makeQuiz } from './study'

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
    })

    expect(quiz).toHaveLength(12)
    expect(new Set(quiz.map((item) => item.source))).toEqual(
      new Set(['假名', '词汇', '语法']),
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
})
