import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    vi.unstubAllGlobals()
  })

  it('searches local vocabulary and exposes fixed audio buttons', () => {
    const play = vi.fn()
    vi.stubGlobal('Audio', vi.fn(function AudioMock() {
      return { play }
    }))

    render(<App />)

    expect(screen.getByRole('heading', { name: '日语学习' })).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('搜索日文、假名、罗马音或中文'), {
      target: { value: '车站' },
    })

    expect(screen.getAllByText('駅').length).toBeGreaterThan(0)
    expect(screen.getAllByText('えき').length).toBeGreaterThan(0)

    fireEvent.click(screen.getAllByRole('button', { name: '播放 駅' })[0])
    expect(play).toHaveBeenCalledTimes(1)
  })

  it('can start a mixed quiz and record the first answer', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '开始综合自测' }))
    const answerButtons = screen.getAllByTestId('quiz-option')
    expect(answerButtons.length).toBeGreaterThan(1)

    fireEvent.click(answerButtons[0])
    expect(screen.getByText(/得分/)).toBeInTheDocument()
  })

  it('toggles dark mode and keeps it in local storage', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '切换到黑夜模式' }))

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('nihongo-study-theme')).toBe('dark')
  })

  it('shows an empty manual review queue before the user adds items', () => {
    render(<App />)

    expect(screen.getByText('复习队列是空的')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /复习 駅/ })).not.toBeInTheDocument()
  })

  it('keeps flashcards silent until the audio button is clicked', () => {
    const play = vi.fn()
    vi.stubGlobal('Audio', vi.fn(function AudioMock() {
      return { play }
    }))

    render(<App />)

    fireEvent.click(screen.getAllByRole('link', { name: /闪卡/ })[0])
    expect(play).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: /播放 闪卡/ }))
    expect(play).toHaveBeenCalledTimes(1)
  })
})
