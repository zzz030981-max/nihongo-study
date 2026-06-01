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
  Layers,
  ListChecks,
  Moon,
  Plus,
  Search,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Volume2,
} from 'lucide-react'
import {
  audioCatalog,
  dailyPlan,
  grammarCards,
  kanaRows,
  learningLevels,
  phraseScenarios,
  studyWords,
  type JLPTLevel,
  type StudyWord,
} from './data/learningContent'
import {
  canPlayAudio,
  getAudioUrl,
  getReviewWords,
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
  reviewQueue: string[]
  bestScore: number
  activeLevel: JLPTLevel
  flashcardSeen: string[]
}

const STORAGE_KEY = 'nihongo-study-progress-v2'
const LEGACY_STORAGE_KEY = 'nihongo-study-progress-v1'
const THEME_KEY = 'nihongo-study-theme'

const navItems = [
  { id: 'dictionary', label: '词库', icon: Search },
  { id: 'vocabulary', label: '词汇', icon: Layers },
  { id: 'kana', label: '五十音', icon: Languages },
  { id: 'grammar', label: '语法', icon: BookOpen },
  { id: 'phrases', label: '会话', icon: Headphones },
  { id: 'flashcards', label: '闪卡', icon: Sparkles },
  { id: 'review', label: '复习', icon: ListChecks },
  { id: 'quiz', label: '自测', icon: Trophy },
  { id: 'plan', label: '计划', icon: ClipboardList },
] as const

const initialProgress: StoredProgress = {
  masteredWords: [],
  favoriteWords: [],
  completedTasks: [],
  mistakes: [],
  reviewQueue: [],
  bestScore: 0,
  activeLevel: 'N5',
  flashcardSeen: [],
}

function readProgress(): StoredProgress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || '{}')
    return {
      masteredWords: Array.isArray(saved.masteredWords) ? saved.masteredWords : [],
      favoriteWords: Array.isArray(saved.favoriteWords) ? saved.favoriteWords : [],
      completedTasks: Array.isArray(saved.completedTasks) ? saved.completedTasks : [],
      mistakes: Array.isArray(saved.mistakes) ? saved.mistakes : [],
      reviewQueue: Array.isArray(saved.reviewQueue) ? saved.reviewQueue : [],
      bestScore: Number.isFinite(saved.bestScore) ? saved.bestScore : 0,
      activeLevel: learningLevels.includes(saved.activeLevel) ? saved.activeLevel : 'N5',
      flashcardSeen: Array.isArray(saved.flashcardSeen) ? saved.flashcardSeen : [],
    }
  } catch {
    return initialProgress
  }
}

function readTheme() {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
}

function playAudio(audioId?: string) {
  if (!audioId || !canPlayAudio(audioId)) return
  const audio = new Audio(getAudioUrl(audioId))
  void audio.play()
}

function toggleListItem(items: string[], value: string) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value]
}

function uniqueAppend(items: string[], value: string) {
  return items.includes(value) ? items : [...items, value]
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
    <section id={id} className="section-panel reveal" data-section>
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

function AudioButton({ audioId, label, className = 'icon-button' }: { audioId?: string; label: string; className?: string }) {
  if (!canPlayAudio(audioId)) return null
  return (
    <button className={className} type="button" aria-label={`播放 ${label}`} onClick={() => playAudio(audioId)}>
      <Volume2 size={17} />
    </button>
  )
}

function LevelTabs({ value, onChange }: { value: JLPTLevel; onChange: (level: JLPTLevel) => void }) {
  return (
    <div className="level-tabs" aria-label="等级筛选">
      {learningLevels.map((level) => (
        <button className={level === value ? 'active' : ''} key={level} type="button" onClick={() => onChange(level)}>
          {level}
        </button>
      ))}
    </div>
  )
}

function WordRow({
  word,
  mastered,
  favorite,
  inReview,
  onToggleMaster,
  onToggleFavorite,
  onAddReview,
}: {
  word: StudyWord
  mastered: boolean
  favorite: boolean
  inReview: boolean
  onToggleMaster: (id: string) => void
  onToggleFavorite: (id: string) => void
  onAddReview: (id: string) => void
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
        <span className="category-chip">{word.level} · {word.category}</span>
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
        <button className={inReview ? 'text-action active' : 'text-action'} type="button" onClick={() => onAddReview(word.id)}>
          <Plus size={15} /> {inReview ? '已在复习' : '加入复习'}
        </button>
      </div>
    </article>
  )
}

function Dictionary({
  level,
  masteredWords,
  favoriteWords,
  reviewQueue,
  onLevelChange,
  onToggleMaster,
  onToggleFavorite,
  onAddReview,
}: {
  level: JLPTLevel
  masteredWords: string[]
  favoriteWords: string[]
  reviewQueue: string[]
  onLevelChange: (level: JLPTLevel) => void
  onToggleMaster: (id: string) => void
  onToggleFavorite: (id: string) => void
  onAddReview: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const categories = useMemo(() => ['全部', ...Array.from(new Set(studyWords.filter((word) => word.level === level).map((word) => word.category)))], [level])
  const activeCategory = categories.includes(category) ? category : '全部'
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return studyWords.filter((word) => {
      const inCategory = activeCategory === '全部' || word.category === activeCategory
      const searchable = `${word.jp} ${word.kana} ${word.romaji} ${word.cn} ${word.level}`.toLowerCase()
      return word.level === level && inCategory && (!keyword || searchable.includes(keyword))
    })
  }, [activeCategory, level, query])

  return (
    <Section id="dictionary" title={`${level} 本地词库`} desc="像翻译软件一样搜索日文、假名、罗马音或中文；发音全部来自固定音频文件。">
      <div className="tool-stack">
        <LevelTabs value={level} onChange={onLevelChange} />
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
            {categories.slice(0, 9).map((item) => (
              <button className={item === activeCategory ? 'active' : ''} key={item} type="button" onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="word-list">
        {filtered.slice(0, 40).map((word) => (
          <WordRow
            favorite={favoriteWords.includes(word.id)}
            inReview={reviewQueue.includes(word.id)}
            key={word.id}
            mastered={masteredWords.includes(word.id)}
            onAddReview={onAddReview}
            onToggleFavorite={onToggleFavorite}
            onToggleMaster={onToggleMaster}
            word={word}
          />
        ))}
      </div>
    </Section>
  )
}

function VocabularyTrainer({
  level,
  masteredWords,
  favoriteWords,
  reviewQueue,
  onLevelChange,
  onToggleMaster,
  onToggleFavorite,
  onAddReview,
}: {
  level: JLPTLevel
  masteredWords: string[]
  favoriteWords: string[]
  reviewQueue: string[]
  onLevelChange: (level: JLPTLevel) => void
  onToggleMaster: (id: string) => void
  onToggleFavorite: (id: string) => void
  onAddReview: (id: string) => void
}) {
  const words = studyWords.filter((word) => word.level === level)
  const categories = Array.from(new Set(words.map((word) => word.category)))

  return (
    <Section id="vocabulary" title={`${level} 词汇训练`} desc="这是独立的词汇训练界面，适合按等级和分类集中记忆，不会自动发音。">
      <LevelTabs value={level} onChange={onLevelChange} />
      <div className="vocab-columns">
        {categories.map((category) => (
          <div className="vocab-group" key={category}>
            <h3>{category}</h3>
            {words.filter((word) => word.category === category).slice(0, 5).map((word) => (
              <WordRow
                favorite={favoriteWords.includes(word.id)}
                inReview={reviewQueue.includes(word.id)}
                key={word.id}
                mastered={masteredWords.includes(word.id)}
                onAddReview={onAddReview}
                onToggleFavorite={onToggleFavorite}
                onToggleMaster={onToggleMaster}
                word={word}
              />
            ))}
          </div>
        ))}
      </div>
    </Section>
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

function Grammar({ level, onLevelChange }: { level: JLPTLevel; onLevelChange: (level: JLPTLevel) => void }) {
  const cards = grammarCards.filter((card) => card.level === level)
  return (
    <Section id="grammar" title={`${level} 核心语法`} desc="每张卡保留句型、解释、例句、假名读音和使用提醒。">
      <LevelTabs value={level} onChange={onLevelChange} />
      <div className="grammar-grid">
        {cards.map((card) => (
          <article className="grammar-card" key={card.id}>
            <div className="card-top">
              <span>{card.level} · {card.topic}</span>
              <AudioButton audioId={card.audioId} label={card.title} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.meaning}</p>
            <button className="example-card" type="button" onClick={() => playAudio(card.audioId)}>
              <strong>{card.pattern}</strong>
              <small>{card.exampleKana}</small>
              <span>{card.translation}</span>
            </button>
            <small>{card.tip}</small>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Phrases({ level, onLevelChange }: { level: JLPTLevel; onLevelChange: (level: JLPTLevel) => void }) {
  const scenarios = phraseScenarios.filter((scenario) => scenario.level === level)
  const [activeScene, setActiveScene] = useState(scenarios[0]?.id ?? '')
  const current = scenarios.find((scenario) => scenario.id === activeScene) ?? scenarios[0]

  return (
    <Section id="phrases" title={`${level} 场景会话`} desc="从入门寒暄到会议、发表，按等级逐步练真实表达；点击发音键才播放。">
      <LevelTabs value={level} onChange={onLevelChange} />
      <div className="phrase-layout">
        <div className="scene-tabs">
          {scenarios.map((scenario) => (
            <button className={scenario.id === current?.id ? 'active' : ''} key={scenario.id} type="button" onClick={() => setActiveScene(scenario.id)}>
              {scenario.scene}
            </button>
          ))}
        </div>
        <div className="phrase-list">
          {current?.phrases.map((phrase) => (
            <div className="phrase-card" key={phrase.id}>
              <span>
                <strong>{phrase.jp}</strong>
                <small>{phrase.kana}</small>
                <em>{phrase.cn}</em>
              </span>
              <AudioButton audioId={phrase.audioId} label={phrase.jp} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Flashcards({
  level,
  seen,
  onLevelChange,
  onSeen,
  onAddReview,
}: {
  level: JLPTLevel
  seen: string[]
  onLevelChange: (level: JLPTLevel) => void
  onSeen: (id: string) => void
  onAddReview: (id: string) => void
}) {
  const cards = studyWords.filter((word) => word.level === level)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = cards[index % cards.length]

  function next() {
    onSeen(card.id)
    setFlipped(false)
    setIndex((value) => (value + 1) % cards.length)
  }

  return (
    <Section id="flashcards" title={`${level} 闪卡练习`} desc="点击卡片翻面记忆词义；不会自动播放，只有点发音键才朗读。">
      <LevelTabs value={level} onChange={onLevelChange} />
      <div className="flashcard-shell">
        <button className={`flashcard ${flipped ? 'flipped' : ''}`} type="button" onClick={() => setFlipped((value) => !value)}>
          <span>{level} · {card.category}</span>
          <strong>{card.jp}</strong>
          {flipped ? (
            <>
              <small>{card.kana} · {card.romaji}</small>
              <em>{card.cn}</em>
              <p>{card.example}</p>
              <p>{card.exampleCn}</p>
            </>
          ) : (
            <em>点击翻面</em>
          )}
        </button>
        <div className="flashcard-actions">
          <AudioButton audioId={card.audioId} label={`闪卡 ${card.jp}`} />
          <button className="secondary-button" type="button" onClick={() => onAddReview(card.id)}>加入复习</button>
          <button className="primary-button" type="button" onClick={next}>下一张</button>
        </div>
        <p className="helper-text">已看过 {seen.length} 张；当前 {index + 1} / {cards.length}</p>
      </div>
    </Section>
  )
}

function Review({ favoriteWords, reviewQueue, mistakes }: { favoriteWords: string[]; reviewQueue: string[]; mistakes: string[] }) {
  const reviewWords = getReviewWords(studyWords, { favoriteWords, reviewQueue, mistakes })

  return (
    <Section id="review" title="手动复习队列" desc="这里只显示你收藏、手动加入、或在自测里主动加入错题复习的内容。">
      {reviewWords.length === 0 ? (
        <div className="empty-state">
          <ListChecks size={34} />
          <h3>复习队列是空的</h3>
          <p>在词汇、闪卡或自测错题里点击“加入复习”，这里才会出现内容。</p>
        </div>
      ) : (
        <div className="review-grid">
          {reviewWords.map((word) => (
            <button className="review-item" key={word.id} type="button" aria-label={`复习 ${word.jp}`} onClick={() => playAudio(word.audioId)}>
              <span>{word.jp}</span>
              <small>{word.kana} · {word.cn}</small>
            </button>
          ))}
        </div>
      )}
    </Section>
  )
}

function Quiz({
  level,
  bestScore,
  onLevelChange,
  onFinish,
  onAddMistake,
}: {
  level: JLPTLevel
  bestScore: number
  onLevelChange: (level: JLPTLevel) => void
  onFinish: (score: number) => void
  onAddMistake: (id: string) => void
}) {
  const [mode, setMode] = useState<QuizMode>('mixed')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [finishedScore, setFinishedScore] = useState<number | null>(null)
  const current = questions[index]
  const correct = selected === current?.answer

  function start(nextMode: QuizMode = mode) {
    setMode(nextMode)
    setQuestions(makeQuiz(nextMode, { kanaRows, words: studyWords, grammarCards, phraseScenarios, level }))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setStreak(0)
    setFinishedScore(null)
  }

  function choose(option: string) {
    if (!current || selected) return
    setSelected(option)
    const isCorrect = option === current.answer
    setScore((value) => isCorrect ? value + 1 : value)
    setStreak((value) => isCorrect ? value + 1 : 0)
  }

  function next() {
    if (!current) return
    const nextScore = score
    if (index + 1 >= questions.length) {
      setQuestions([])
      setSelected(null)
      setFinishedScore(nextScore)
      onFinish(nextScore)
    } else {
      setIndex((value) => value + 1)
      setSelected(null)
    }
  }

  return (
    <Section id="quiz" title={`${level} 趣味自测`} desc="选择等级和题型，连击、即时反馈和完成总结会让练习更有节奏。">
      <LevelTabs value={level} onChange={onLevelChange} />
      <div className="quiz-shell">
        <div className="quiz-panel">
          {!current ? (
            <div className="quiz-empty">
              <Trophy size={42} />
              <h3>{finishedScore === null ? '准备开始今天的自测' : `本轮得分 ${finishedScore}`}</h3>
              <p>历史最高分：{bestScore}</p>
              <button className="primary-button" type="button" onClick={() => start('mixed')}>开始综合自测</button>
            </div>
          ) : (
            <>
              <div className="quiz-meta">
                <span>第 {index + 1} / {questions.length} 题 · {current.source}</span>
                <span>得分 {score} · 连击 {streak}</span>
              </div>
              <div className="quiz-progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
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
              {selected && (
                <div className="quiz-feedback">
                  <strong>{correct ? '答对了' : `正确答案：${current.answer}`}</strong>
                  <div>
                    {!correct && current.reviewWordId ? (
                      <button className="secondary-button" type="button" onClick={() => onAddMistake(current.reviewWordId!)}>
                        加入错题复习
                      </button>
                    ) : null}
                    <button className="primary-button" type="button" onClick={next}>下一题</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="quiz-modes">
          {(['mixed', 'kana', 'word', 'grammar', 'phrase'] as QuizMode[]).map((item) => (
            <button className={item === mode ? 'active' : ''} key={item} type="button" onClick={() => start(item)}>
              {item === 'mixed' ? '综合挑战' : item === 'kana' ? '假名' : item === 'word' ? '词汇' : item === 'grammar' ? '语法' : '会话'}
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Plan({ completedTasks, onToggleTask }: { completedTasks: number[]; onToggleTask: (index: number) => void }) {
  return (
    <Section id="plan" title="10 天入门计划" desc="每日任务继续保留，用于零基础启动；后续可配合 N4-N1 内容长期复习。">
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => readTheme())
  const [activeSection, setActiveSection] = useState('dictionary')
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
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

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

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter((item): item is HTMLElement => Boolean(item))
    if (!('IntersectionObserver' in window) || sections.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target.id) setActiveSection(visible.target.id)
    }, { rootMargin: '-32% 0px -55% 0px', threshold: [0.12, 0.25, 0.5] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function setLevel(level: JLPTLevel) {
    setProgress((value) => ({ ...value, activeLevel: level }))
  }

  function addReview(id: string) {
    setProgress((value) => ({ ...value, reviewQueue: uniqueAppend(value.reviewQueue, id) }))
  }

  const stats = [
    { label: '词汇', value: studyWords.length, icon: BookOpen },
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
        <button
          className="theme-toggle"
          type="button"
          aria-label={theme === 'light' ? '切换到黑夜模式' : '切换到白天模式'}
          onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          {theme === 'light' ? '黑夜' : '白天'}
        </button>
        <nav>
          <span className="nav-indicator" style={{ transform: `translateY(${Math.max(0, navItems.findIndex((item) => item.id === activeSection)) * 47}px)` }} />
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a className={activeSection === item.id ? 'active' : ''} href={`#${item.id}`} key={item.id} onClick={() => setActiveSection(item.id)}>
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
            <p className="eyeline">零基础到 N1 · 固定音频学习站</p>
            <h1>日语学习</h1>
            <p className="hero-copy">
              从五十音、词汇、语法、会话到闪卡和自测，按 N5 到 N1 分级学习。所有朗读按钮都绑定固定音频，只有你点击时才播放。
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#vocabulary">开始词汇训练</a>
              <a className="secondary-button" href="#flashcards">打开闪卡</a>
            </div>
          </div>
          <div className="hero-progress">
            <ProgressRing value={totalProgress} />
            <p>当前总进度</p>
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
          level={progress.activeLevel}
          masteredWords={progress.masteredWords}
          reviewQueue={progress.reviewQueue}
          onAddReview={addReview}
          onLevelChange={setLevel}
          onToggleFavorite={(id) => setProgress((value) => ({ ...value, favoriteWords: toggleListItem(value.favoriteWords, id) }))}
          onToggleMaster={(id) => setProgress((value) => ({ ...value, masteredWords: toggleListItem(value.masteredWords, id) }))}
        />
        <VocabularyTrainer
          favoriteWords={progress.favoriteWords}
          level={progress.activeLevel}
          masteredWords={progress.masteredWords}
          reviewQueue={progress.reviewQueue}
          onAddReview={addReview}
          onLevelChange={setLevel}
          onToggleFavorite={(id) => setProgress((value) => ({ ...value, favoriteWords: toggleListItem(value.favoriteWords, id) }))}
          onToggleMaster={(id) => setProgress((value) => ({ ...value, masteredWords: toggleListItem(value.masteredWords, id) }))}
        />
        <KanaTable />
        <Grammar level={progress.activeLevel} onLevelChange={setLevel} />
        <Phrases level={progress.activeLevel} onLevelChange={setLevel} />
        <Flashcards
          level={progress.activeLevel}
          seen={progress.flashcardSeen}
          onAddReview={addReview}
          onLevelChange={setLevel}
          onSeen={(id) => setProgress((value) => ({ ...value, flashcardSeen: uniqueAppend(value.flashcardSeen, id) }))}
        />
        <Review favoriteWords={progress.favoriteWords} mistakes={progress.mistakes} reviewQueue={progress.reviewQueue} />
        <Quiz
          bestScore={progress.bestScore}
          level={progress.activeLevel}
          onAddMistake={(id) => setProgress((value) => ({
            ...value,
            mistakes: uniqueAppend(value.mistakes, id),
            reviewQueue: uniqueAppend(value.reviewQueue, id),
          }))}
          onFinish={(score) => setProgress((value) => ({ ...value, bestScore: Math.max(value.bestScore, score) }))}
          onLevelChange={setLevel}
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
            <a className={activeSection === item.id ? 'active' : ''} href={`#${item.id}`} key={item.id} onClick={() => setActiveSection(item.id)}>
              <Icon size={17} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
