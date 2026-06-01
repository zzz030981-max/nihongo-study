import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  BookOpen,
  Bookmark,
  Check,
  ClipboardList,
  GraduationCap,
  Headphones,
  Languages,
  ListChecks,
  Search,
  Star,
  Trophy,
  Volume2,
} from 'lucide-react'
import {
  audioCatalog,
  dailyPlan,
  grammarCards,
  kanaRows,
  phraseScenarios,
  studyWords,
  type StudyWord,
} from './data/learningContent'
import {
  canPlayAudio,
  getAudioUrl,
  makeQuiz,
  type QuizMode,
  type QuizQuestion,
} from './lib/study'
import './index.css'

type StoredProgress = {
  masteredWords: string[]
  favoriteWords: string[]
  completedTasks: number[]
  mistakes: string[]
  bestScore: number
}

const STORAGE_KEY = 'nihongo-study-progress-v1'

const navItems = [
  { id: 'dictionary', label: '词库', icon: Search },
  { id: 'kana', label: '五十音', icon: Languages },
  { id: 'grammar', label: '语法', icon: BookOpen },
  { id: 'phrases', label: '会话', icon: Headphones },
  { id: 'review', label: '复习', icon: ListChecks },
  { id: 'quiz', label: '自测', icon: Trophy },
  { id: 'plan', label: '计划', icon: ClipboardList },
] as const

const initialProgress: StoredProgress = {
  masteredWords: [],
  favoriteWords: [],
  completedTasks: [],
  mistakes: [],
  bestScore: 0,
}

function readProgress(): StoredProgress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return {
      masteredWords: Array.isArray(saved.masteredWords) ? saved.masteredWords : [],
      favoriteWords: Array.isArray(saved.favoriteWords) ? saved.favoriteWords : [],
      completedTasks: Array.isArray(saved.completedTasks) ? saved.completedTasks : [],
      mistakes: Array.isArray(saved.mistakes) ? saved.mistakes : [],
      bestScore: Number.isFinite(saved.bestScore) ? saved.bestScore : 0,
    }
  } catch {
    return initialProgress
  }
}

function playAudio(audioId?: string) {
  if (!audioId || !canPlayAudio(audioId)) return
  const audio = new Audio(getAudioUrl(audioId))
  void audio.play()
}

function toggleListItem(items: string[], value: string) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value]
}

function ProgressRing({ value }: { value: number }) {
  return (
    <div className="progress-ring" style={{ '--value': `${value * 3.6}deg` } as React.CSSProperties}>
      <span>{value}%</span>
    </div>
  )
}

function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="section-panel reveal">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{navItems.find((item) => item.id === id)?.label ?? 'Study'}</p>
          <h2>{title}</h2>
        </div>
        <p>{desc}</p>
      </div>
      {children}
    </section>
  )
}

function AudioButton({ audioId, label }: { audioId?: string; label: string }) {
  if (!canPlayAudio(audioId)) return null
  return (
    <button className="icon-button" type="button" aria-label={`播放 ${label}`} onClick={() => playAudio(audioId)}>
      <Volume2 size={17} />
    </button>
  )
}

function Dictionary({
  masteredWords,
  favoriteWords,
  onToggleMaster,
  onToggleFavorite,
}: {
  masteredWords: string[]
  favoriteWords: string[]
  onToggleMaster: (id: string) => void
  onToggleFavorite: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const categories = useMemo(() => ['全部', ...Array.from(new Set(studyWords.map((word) => word.category)))], [])
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return studyWords.filter((word) => {
      const inCategory = category === '全部' || word.category === category
      const searchable = `${word.jp} ${word.kana} ${word.romaji} ${word.cn}`.toLowerCase()
      return inCategory && (!keyword || searchable.includes(keyword))
    })
  }, [category, query])

  return (
    <Section id="dictionary" title="本地 N5 词库" desc="搜索日文、假名、罗马音或中文；每个词和例句都连接固定音频。">
      <div className="tool-row">
        <div className="search-box">
          <Search size={18} />
          <input
            placeholder="搜索日文、假名、罗马音或中文"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="segments">
          {categories.slice(0, 8).map((item) => (
            <button className={item === category ? 'active' : ''} key={item} type="button" onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="word-list">
        {filtered.slice(0, 36).map((word) => (
          <WordRow
            favorite={favoriteWords.includes(word.id)}
            key={word.id}
            mastered={masteredWords.includes(word.id)}
            onToggleFavorite={onToggleFavorite}
            onToggleMaster={onToggleMaster}
            word={word}
          />
        ))}
      </div>
    </Section>
  )
}

function WordRow({
  word,
  mastered,
  favorite,
  onToggleMaster,
  onToggleFavorite,
}: {
  word: StudyWord
  mastered: boolean
  favorite: boolean
  onToggleMaster: (id: string) => void
  onToggleFavorite: (id: string) => void
}) {
  return (
    <article className={`word-row ${mastered ? 'is-mastered' : ''}`}>
      <div className="word-main">
        <div>
          <div className="word-title">
            <strong>{word.jp}</strong>
            <span>{word.kana}</span>
            <AudioButton audioId={word.audioId} label={word.jp} />
          </div>
          <p>{word.romaji} · {word.cn}</p>
        </div>
        <span className="category-chip">{word.category}</span>
      </div>
      <div className="example-line">
        <span>{word.example}</span>
        <span>{word.exampleCn}</span>
        <AudioButton audioId={word.exampleAudioId} label={`${word.jp} 例句`} />
      </div>
      <div className="row-actions">
        <button className={favorite ? 'text-action active' : 'text-action'} type="button" onClick={() => onToggleFavorite(word.id)}>
          <Bookmark size={15} /> 收藏
        </button>
        <button className={mastered ? 'text-action active' : 'text-action'} type="button" onClick={() => onToggleMaster(word.id)}>
          <Check size={15} /> 已掌握
        </button>
      </div>
    </article>
  )
}

function KanaTable() {
  const [mode, setMode] = useState<'hira' | 'kata'>('hira')
  return (
    <Section id="kana" title="五十音点读" desc="平假名和片假名可切换，所有基础音都播放固定音频。">
      <div className="mode-tabs">
        <button className={mode === 'hira' ? 'active' : ''} type="button" onClick={() => setMode('hira')}>平假名</button>
        <button className={mode === 'kata' ? 'active' : ''} type="button" onClick={() => setMode('kata')}>片假名</button>
      </div>
      <div className="kana-grid">
        {kanaRows.flatMap((row) =>
          row.roma.map((roma, index) => {
            const text = mode === 'hira' ? row.hira[index] : row.kata[index]
            if (!roma || text === '—') return null
            return (
              <button className="kana-cell" key={`${row.row}-${roma}`} type="button" onClick={() => playAudio(row.audioIds[index])}>
                <strong>{text}</strong>
                <span>{roma}</span>
              </button>
            )
          }),
        )}
      </div>
    </Section>
  )
}

function Grammar() {
  return (
    <Section id="grammar" title="N5 核心语法" desc="每张卡只保留一个句型、一个例句、一个使用提醒，适合零基础反复看。">
      <div className="grammar-grid">
        {grammarCards.map((card) => (
          <article className="grammar-card" key={card.id}>
            <div className="card-top">
              <span>{card.level}</span>
              <AudioButton audioId={card.audioId} label={card.title} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.meaning}</p>
            <button className="example-card" type="button" onClick={() => playAudio(card.audioId)}>
              <strong>{card.pattern}</strong>
              <span>{card.translation}</span>
            </button>
            <small>{card.tip}</small>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Phrases() {
  const [activeScene, setActiveScene] = useState(phraseScenarios[0].id)
  const current = phraseScenarios.find((scenario) => scenario.id === activeScene) ?? phraseScenarios[0]
  return (
    <Section id="phrases" title="场景会话跟读" desc="用真实会话短句练开口，手机微信里也能一键播放。">
      <div className="phrase-layout">
        <div className="scene-tabs">
          {phraseScenarios.map((scenario) => (
            <button className={scenario.id === activeScene ? 'active' : ''} key={scenario.id} type="button" onClick={() => setActiveScene(scenario.id)}>
              {scenario.scene}
            </button>
          ))}
        </div>
        <div className="phrase-list">
          {current.phrases.map((phrase) => (
            <button className="phrase-card" key={phrase.id} type="button" onClick={() => playAudio(phrase.audioId)}>
              <span>
                <strong>{phrase.jp}</strong>
                <small>{phrase.kana}</small>
                <em>{phrase.cn}</em>
              </span>
              <Volume2 size={18} />
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Review({ masteredWords, favoriteWords, mistakes }: { masteredWords: string[]; favoriteWords: string[]; mistakes: string[] }) {
  const reviewWords = studyWords
    .filter((word) => favoriteWords.includes(word.id) || mistakes.includes(word.id) || !masteredWords.includes(word.id))
    .slice(0, 12)

  return (
    <Section id="review" title="今日复习队列" desc="优先显示收藏、错题和未掌握词，打开后就能开始复习。">
      <div className="review-grid">
        {reviewWords.map((word) => (
          <button className="review-item" key={word.id} type="button" onClick={() => playAudio(word.audioId)}>
            <span>{word.jp}</span>
            <small>{word.cn}</small>
          </button>
        ))}
      </div>
    </Section>
  )
}

function Quiz({
  bestScore,
  onFinish,
  onMistake,
}: {
  bestScore: number
  onFinish: (score: number) => void
  onMistake: (id: string) => void
}) {
  const [mode, setMode] = useState<QuizMode>('mixed')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const current = questions[index]

  function start(nextMode: QuizMode = mode) {
    setMode(nextMode)
    setQuestions(makeQuiz(nextMode, { kanaRows, words: studyWords, grammarCards }))
    setIndex(0)
    setSelected(null)
    setScore(0)
  }

  function choose(option: string) {
    if (!current || selected) return
    setSelected(option)
    const correct = option === current.answer
    const nextScore = correct ? score + 1 : score
    if (!correct && current.id.startsWith('word-')) onMistake(current.id.replace('word-', ''))
    if (correct) setScore(nextScore)
    window.setTimeout(() => {
      if (index + 1 >= questions.length) {
        onFinish(nextScore)
        setQuestions([])
        setSelected(null)
      } else {
        setIndex((value) => value + 1)
        setSelected(null)
      }
    }, 450)
  }

  return (
    <Section id="quiz" title="自测系统" desc="综合、假名、词汇、语法都能单独练，错题会进入复习队列。">
      <div className="quiz-shell">
        <div className="quiz-panel">
          {!current ? (
            <div className="quiz-empty">
              <Trophy size={42} />
              <h3>准备开始今天的自测</h3>
              <p>历史最高分：{bestScore}</p>
              <button className="primary-button" type="button" onClick={() => start('mixed')}>开始综合自测</button>
            </div>
          ) : (
            <>
              <div className="quiz-meta">
                <span>第 {index + 1} / {questions.length} 题 · {current.source}</span>
                <span>当前得分：{score}</span>
              </div>
              <div className="quiz-question">
                <h3>{current.q}</h3>
                <AudioButton audioId={current.audioId} label="题目" />
              </div>
              <div className="quiz-options">
                {current.options.map((option) => (
                  <button
                    className={[
                      selected ? 'answered' : '',
                      selected && option === current.answer ? 'correct' : '',
                      selected === option && option !== current.answer ? 'wrong' : '',
                    ].join(' ')}
                    data-testid="quiz-option"
                    key={option}
                    type="button"
                    onClick={() => choose(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="quiz-modes">
          {(['mixed', 'kana', 'word', 'grammar'] as QuizMode[]).map((item) => (
            <button className={item === mode ? 'active' : ''} key={item} type="button" onClick={() => start(item)}>
              {item === 'mixed' ? '综合' : item === 'kana' ? '假名' : item === 'word' ? '词汇' : '语法'}
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Plan({
  completedTasks,
  onToggleTask,
}: {
  completedTasks: number[]
  onToggleTask: (index: number) => void
}) {
  return (
    <Section id="plan" title="10 天入门计划" desc="每天一个小任务，强调开口、复习和自测，不追求一次塞太多。">
      <div className="task-list">
        {dailyPlan.map((item, index) => (
          <button className={completedTasks.includes(index) ? 'task-row done' : 'task-row'} key={item.day} type="button" onClick={() => onToggleTask(index)}>
            <span>{item.day}</span>
            <strong>{item.focus}</strong>
            <em>{item.task}</em>
            <small>{item.minutes} 分钟</small>
          </button>
        ))}
      </div>
    </Section>
  )
}

export default function App() {
  const [progress, setProgress] = useState<StoredProgress>(() => readProgress())
  const appRef = useRef<HTMLDivElement>(null)

  const totalProgress = useMemo(() => {
    const wordPart = (progress.masteredWords.length / studyWords.length) * 55
    const planPart = (progress.completedTasks.length / dailyPlan.length) * 45
    return Math.min(100, Math.round(wordPart + planPart))
  }, [progress.completedTasks.length, progress.masteredWords.length])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    if (!appRef.current) return
    const context = gsap.context(() => {
      if (import.meta.env.MODE === 'test') return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return
      gsap.from('.app-nav, .hero-panel', { autoAlpha: 0, y: 18, duration: 0.55, stagger: 0.08, ease: 'power2.out' })
      gsap.from('.reveal', { autoAlpha: 0, y: 24, duration: 0.55, stagger: 0.07, ease: 'power2.out', delay: 0.15 })
    }, appRef)
    return () => context.revert()
  }, [])

  const stats = [
    { label: '词库', value: studyWords.length, icon: BookOpen },
    { label: '固定音频', value: Object.keys(audioCatalog).length, icon: Volume2 },
    { label: '已掌握', value: progress.masteredWords.length, icon: Star },
  ]

  return (
    <div className="app-shell" ref={appRef}>
      <aside className="app-nav">
        <a className="brand" href="#top" aria-label="日语学习首页">
          <span><GraduationCap size={22} /></span>
          <strong>日语学习</strong>
        </a>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a href={`#${item.id}`} key={item.id}>
                <Icon size={18} />
                {item.label}
              </a>
            )
          })}
        </nav>
      </aside>

      <main id="top" className="main-content">
        <section className="hero-panel">
          <div>
            <p className="eyeline">零基础到 N5 · 固定音频学习站</p>
            <h1>日语学习</h1>
            <p className="hero-copy">
              像工具一样查词，像卡片一样复习，像考试一样自测。所有可朗读内容都绑定固定音频文件，不依赖系统随机发音。
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#dictionary">打开词库</a>
              <a className="secondary-button" href="#kana">练五十音</a>
            </div>
          </div>
          <div className="hero-progress">
            <ProgressRing value={totalProgress} />
            <p>今日总进度</p>
            <div className="stat-strip">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <span key={stat.label}>
                    <Icon size={15} />
                    <strong>{stat.value}</strong>
                    {stat.label}
                  </span>
                )
              })}
            </div>
          </div>
        </section>

        <Dictionary
          favoriteWords={progress.favoriteWords}
          masteredWords={progress.masteredWords}
          onToggleFavorite={(id) => setProgress((value) => ({ ...value, favoriteWords: toggleListItem(value.favoriteWords, id) }))}
          onToggleMaster={(id) => setProgress((value) => ({ ...value, masteredWords: toggleListItem(value.masteredWords, id) }))}
        />
        <KanaTable />
        <Grammar />
        <Phrases />
        <Review favoriteWords={progress.favoriteWords} masteredWords={progress.masteredWords} mistakes={progress.mistakes} />
        <Quiz
          bestScore={progress.bestScore}
          onFinish={(score) => setProgress((value) => ({ ...value, bestScore: Math.max(value.bestScore, score) }))}
          onMistake={(id) => setProgress((value) => ({ ...value, mistakes: value.mistakes.includes(id) ? value.mistakes : [...value.mistakes, id] }))}
        />
        <Plan
          completedTasks={progress.completedTasks}
          onToggleTask={(index) => setProgress((value) => ({
            ...value,
            completedTasks: value.completedTasks.includes(index)
              ? value.completedTasks.filter((item) => item !== index)
              : [...value.completedTasks, index],
          }))}
        />
      </main>

      <nav className="mobile-nav" aria-label="手机导航">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <a href={`#${item.id}`} key={item.id}>
              <Icon size={17} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
