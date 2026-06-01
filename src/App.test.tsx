import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
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

    expect(screen.getByText('駅')).toBeInTheDocument()
    expect(screen.getByText('えき')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '播放 駅' }))
    expect(play).toHaveBeenCalledTimes(1)
  })

  it('can start a mixed quiz and record the first answer', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '开始综合自测' }))
    const answerButtons = screen.getAllByTestId('quiz-option')
    expect(answerButtons.length).toBeGreaterThan(1)

    fireEvent.click(answerButtons[0])
    expect(screen.getByText(/当前得分/)).toBeInTheDocument()
  })
})
