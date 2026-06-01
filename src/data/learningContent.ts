export type AudioEntry = {
  text: string
  kana?: string
  path: string
}

export const learningLevels = ['N5', 'N4', 'N3', 'N2', 'N1'] as const
export type JLPTLevel = typeof learningLevels[number]

export type KanaRow = {
  row: string
  hira: string[]
  kata: string[]
  roma: string[]
  audioIds: string[]
}

export type StudyWord = {
  id: string
  jp: string
  kana: string
  romaji: string
  cn: string
  category: string
  level: JLPTLevel
  tags?: string[]
  example: string
  exampleCn: string
  audioId: string
  exampleAudioId: string
}

export type GrammarCard = {
  id: string
  title: string
  level: JLPTLevel
  topic: string
  meaning: string
  pattern: string
  exampleKana: string
  translation: string
  tip: string
  audioId: string
}

export type PhraseScenario = {
  id: string
  scene: string
  level: JLPTLevel
  phrases: Array<{
    id: string
    jp: string
    kana: string
    cn: string
    audioId: string
  }>
}

export type DailyTask = {
  day: string
  focus: string
  task: string
  minutes: number
}

const kanaAudio = (roma: string) => (roma ? `kana-${roma.replace('/', '-')}` : '')

export const kanaRows: KanaRow[] = [
  { row: 'あ行', hira: ['あ', 'い', 'う', 'え', 'お'], kata: ['ア', 'イ', 'ウ', 'エ', 'オ'], roma: ['a', 'i', 'u', 'e', 'o'], audioIds: ['a', 'i', 'u', 'e', 'o'].map(kanaAudio) },
  { row: 'か行', hira: ['か', 'き', 'く', 'け', 'こ'], kata: ['カ', 'キ', 'ク', 'ケ', 'コ'], roma: ['ka', 'ki', 'ku', 'ke', 'ko'], audioIds: ['ka', 'ki', 'ku', 'ke', 'ko'].map(kanaAudio) },
  { row: 'さ行', hira: ['さ', 'し', 'す', 'せ', 'そ'], kata: ['サ', 'シ', 'ス', 'セ', 'ソ'], roma: ['sa', 'shi', 'su', 'se', 'so'], audioIds: ['sa', 'shi', 'su', 'se', 'so'].map(kanaAudio) },
  { row: 'た行', hira: ['た', 'ち', 'つ', 'て', 'と'], kata: ['タ', 'チ', 'ツ', 'テ', 'ト'], roma: ['ta', 'chi', 'tsu', 'te', 'to'], audioIds: ['ta', 'chi', 'tsu', 'te', 'to'].map(kanaAudio) },
  { row: 'な行', hira: ['な', 'に', 'ぬ', 'ね', 'の'], kata: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'], roma: ['na', 'ni', 'nu', 'ne', 'no'], audioIds: ['na', 'ni', 'nu', 'ne', 'no'].map(kanaAudio) },
  { row: 'は行', hira: ['は', 'ひ', 'ふ', 'へ', 'ほ'], kata: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'], roma: ['ha', 'hi', 'fu', 'he', 'ho'], audioIds: ['ha', 'hi', 'fu', 'he', 'ho'].map(kanaAudio) },
  { row: 'ま行', hira: ['ま', 'み', 'む', 'め', 'も'], kata: ['マ', 'ミ', 'ム', 'メ', 'モ'], roma: ['ma', 'mi', 'mu', 'me', 'mo'], audioIds: ['ma', 'mi', 'mu', 'me', 'mo'].map(kanaAudio) },
  { row: 'や行', hira: ['や', '—', 'ゆ', '—', 'よ'], kata: ['ヤ', '—', 'ユ', '—', 'ヨ'], roma: ['ya', '', 'yu', '', 'yo'], audioIds: ['ya', '', 'yu', '', 'yo'].map(kanaAudio) },
  { row: 'ら行', hira: ['ら', 'り', 'る', 'れ', 'ろ'], kata: ['ラ', 'リ', 'ル', 'レ', 'ロ'], roma: ['ra', 'ri', 'ru', 're', 'ro'], audioIds: ['ra', 'ri', 'ru', 're', 'ro'].map(kanaAudio) },
  { row: 'わ行', hira: ['わ', '—', '—', '—', 'を'], kata: ['ワ', '—', '—', '—', 'ヲ'], roma: ['wa', '', '', '', 'wo'], audioIds: ['wa', '', '', '', 'wo'].map(kanaAudio) },
  { row: '拨音', hira: ['ん'], kata: ['ン'], roma: ['n'], audioIds: ['n'].map(kanaAudio) },
]

const wordTuples = [
  ['konnichiwa', 'こんにちは', 'こんにちは', 'konnichiwa', '你好 / 下午好', '寒暄', 'こんにちは、田中さん。', '你好，田中先生。'],
  ['ohayou', 'おはよう', 'おはよう', 'ohayou', '早上好', '寒暄', 'おはようございます。', '早上好。'],
  ['konbanwa', 'こんばんは', 'こんばんは', 'konbanwa', '晚上好', '寒暄', 'こんばんは、元気ですか。', '晚上好，你好吗？'],
  ['arigatou', 'ありがとう', 'ありがとう', 'arigatou', '谢谢', '寒暄', 'ありがとうございます。', '非常感谢。'],
  ['sumimasen', 'すみません', 'すみません', 'sumimasen', '不好意思 / 对不起', '寒暄', 'すみません、駅はどこですか。', '不好意思，车站在哪里？'],
  ['onegaishimasu', 'お願いします', 'おねがいします', 'onegaishimasu', '拜托 / 请', '寒暄', '水をお願いします。', '请给我水。'],
  ['hai', 'はい', 'はい', 'hai', '是 / 好', '基础', 'はい、そうです。', '是的，是这样。'],
  ['iie', 'いいえ', 'いいえ', 'iie', '不是 / 不', '基础', 'いいえ、違います。', '不，不是。'],
  ['watashi', '私', 'わたし', 'watashi', '我', '人物', '私は学生です。', '我是学生。'],
  ['anata', 'あなた', 'あなた', 'anata', '你', '人物', 'あなたは先生ですか。', '你是老师吗？'],
  ['sensei', '先生', 'せんせい', 'sensei', '老师 / 医生', '人物', '先生に聞きます。', '问老师。'],
  ['gakusei', '学生', 'がくせい', 'gakusei', '学生', '人物', '学生です。', '我是学生。'],
  ['tomodachi', '友達', 'ともだち', 'tomodachi', '朋友', '人物', '友達に会います。', '见朋友。'],
  ['kazoku', '家族', 'かぞく', 'kazoku', '家人', '人物', '家族は中国にいます。', '家人在中国。'],
  ['nihongo', '日本語', 'にほんご', 'nihongo', '日语', '学习', '日本語を勉強します。', '学习日语。'],
  ['benkyou', '勉強', 'べんきょう', 'benkyou', '学习', '学习', '毎日勉強します。', '每天学习。'],
  ['hatsuon', '発音', 'はつおん', 'hatsuon', '发音', '学习', '発音を練習します。', '练习发音。'],
  ['renshuu', '練習', 'れんしゅう', 'renshuu', '练习', '学习', '会話を練習します。', '练习会话。'],
  ['jisho', '辞書', 'じしょ', 'jisho', '词典', '学习', '辞書で調べます。', '用词典查。'],
  ['hon', '本', 'ほん', 'hon', '书', '学习', '本を読みます。', '读书。'],
  ['eki', '駅', 'えき', 'eki', '车站', '旅行', '駅はどこですか。', '车站在哪里？'],
  ['kuukou', '空港', 'くうこう', 'kuukou', '机场', '旅行', '空港へ行きます。', '去机场。'],
  ['hoteru', 'ホテル', 'ホテル', 'hoteru', '酒店', '旅行', 'ホテルを予約します。', '预约酒店。'],
  ['konbini', 'コンビニ', 'コンビニ', 'konbini', '便利店', '旅行', 'コンビニで買います。', '在便利店买。'],
  ['toire', 'トイレ', 'トイレ', 'toire', '厕所', '旅行', 'トイレはどこですか。', '厕所在哪里？'],
  ['chizu', '地図', 'ちず', 'chizu', '地图', '旅行', '地図を見ます。', '看地图。'],
  ['densha', '電車', 'でんしゃ', 'densha', '电车', '交通', '電車に乗ります。', '坐电车。'],
  ['basu', 'バス', 'バス', 'basu', '公交车', '交通', 'バスで行きます。', '坐公交去。'],
  ['takushii', 'タクシー', 'タクシー', 'takushii', '出租车', '交通', 'タクシーを呼びます。', '叫出租车。'],
  ['migi', '右', 'みぎ', 'migi', '右', '方位', '右に曲がってください。', '请右转。'],
  ['hidari', '左', 'ひだり', 'hidari', '左', '方位', '左に曲がってください。', '请左转。'],
  ['mae', '前', 'まえ', 'mae', '前', '方位', '駅の前です。', '在车站前面。'],
  ['ushiro', '後ろ', 'うしろ', 'ushiro', '后面', '方位', '店の後ろです。', '在店后面。'],
  ['mizu', '水', 'みず', 'mizu', '水', '饮食', '水をください。', '请给我水。'],
  ['ocha', 'お茶', 'おちゃ', 'ocha', '茶', '饮食', 'お茶を飲みます。', '喝茶。'],
  ['koohii', 'コーヒー', 'コーヒー', 'koohii', '咖啡', '饮食', 'コーヒーをください。', '请给我咖啡。'],
  ['gohan', 'ご飯', 'ごはん', 'gohan', '米饭 / 饭', '饮食', 'ご飯を食べます。', '吃饭。'],
  ['pan', 'パン', 'パン', 'pan', '面包', '饮食', 'パンを食べます。', '吃面包。'],
  ['raamen', 'ラーメン', 'ラーメン', 'raamen', '拉面', '饮食', 'ラーメンが好きです。', '喜欢拉面。'],
  ['sushi', '寿司', 'すし', 'sushi', '寿司', '饮食', '寿司を食べたいです。', '想吃寿司。'],
  ['menyuu', 'メニュー', 'メニュー', 'menyuu', '菜单', '饮食', 'メニューをお願いします。', '请给我菜单。'],
  ['yasui', '安い', 'やすい', 'yasui', '便宜', '形容词', 'これは安いです。', '这个很便宜。'],
  ['takai', '高い', 'たかい', 'takai', '贵 / 高', '形容词', 'あれは高いです。', '那个很贵。'],
  ['ookii', '大きい', 'おおきい', 'ookii', '大的', '形容词', '大きい店です。', '是大商店。'],
  ['chiisai', '小さい', 'ちいさい', 'chiisai', '小的', '形容词', '小さい本です。', '是小书。'],
  ['atarashii', '新しい', 'あたらしい', 'atarashii', '新的', '形容词', '新しいノートです。', '是新笔记本。'],
  ['oishii', 'おいしい', 'おいしい', 'oishii', '好吃', '形容词', 'これはおいしいです。', '这个很好吃。'],
  ['muzukashii', '難しい', 'むずかしい', 'muzukashii', '难', '形容词', '日本語は難しいです。', '日语很难。'],
  ['kantan', '簡単', 'かんたん', 'kantan', '简单', '形容词', 'これは簡単です。', '这个很简单。'],
  ['kyou', '今日', 'きょう', 'kyou', '今天', '时间', '今日は休みです。', '今天休息。'],
  ['ashita', '明日', 'あした', 'ashita', '明天', '时间', 'また明日。', '明天见。'],
  ['kinou', '昨日', 'きのう', 'kinou', '昨天', '时间', '昨日勉強しました。', '昨天学习了。'],
  ['ima', '今', 'いま', 'ima', '现在', '时间', '今、何時ですか。', '现在几点？'],
]

const advancedWordTuples: Array<[string, string, string, string, string, string, string, string, JLPTLevel]> = [
  ['kaimono', '買い物', 'かいもの', 'kaimono', '购物', '生活', '週末に買い物に行きます。', '周末去购物。', 'N4'],
  ['kaisha', '会社', 'かいしゃ', 'kaisha', '公司', '工作', '会社まで電車で行きます。', '坐电车去公司。', 'N4'],
  ['byouin', '病院', 'びょういん', 'byouin', '医院', '生活', '病院で薬をもらいました。', '在医院拿了药。', 'N4'],
  ['yakusoku', '約束', 'やくそく', 'yakusoku', '约定', '生活', '友達と約束があります。', '和朋友有约。', 'N4'],
  ['setsumei', '説明', 'せつめい', 'setsumei', '说明', '学习', 'もう一度説明してください。', '请再说明一次。', 'N4'],
  ['renraku', '連絡', 'れんらく', 'renraku', '联系', '工作', 'あとで連絡します。', '稍后联系。', 'N4'],
  ['junbi', '準備', 'じゅんび', 'junbi', '准备', '生活', '旅行の準備をします。', '做旅行准备。', 'N4'],
  ['kibun', '気分', 'きぶん', 'kibun', '心情 / 身体状态', '感受', '今日は気分がいいです。', '今天感觉很好。', 'N4'],
  ['keiken', '経験', 'けいけん', 'keiken', '经验', '抽象', '日本で働いた経験があります。', '有在日本工作的经验。', 'N3'],
  ['seikatsu', '生活', 'せいかつ', 'seikatsu', '生活', '生活', '日本の生活に慣れました。', '习惯了日本的生活。', 'N3'],
  ['kankei', '関係', 'かんけい', 'kankei', '关系', '抽象', '仕事と関係があります。', '和工作有关。', 'N3'],
  ['jouhou', '情報', 'じょうほう', 'jouhou', '信息', '社会', '新しい情報を集めます。', '收集新信息。', 'N3'],
  ['kakunin', '確認', 'かくにん', 'kakunin', '确认', '工作', '予定を確認してください。', '请确认日程。', 'N3'],
  ['henka', '変化', 'へんか', 'henka', '变化', '抽象', '町の変化に気づきました。', '注意到了城市的变化。', 'N3'],
  ['genin', '原因', 'げんいん', 'genin', '原因', '抽象', '原因を調べています。', '正在调查原因。', 'N3'],
  ['mokuteki', '目的', 'もくてき', 'mokuteki', '目的', '抽象', '旅行の目的は勉強です。', '旅行的目的是学习。', 'N3'],
  ['kouka', '効果', 'こうか', 'kouka', '效果', '抽象', 'この方法は効果があります。', '这个方法有效果。', 'N2'],
  ['kaiketsu', '解決', 'かいけつ', 'kaiketsu', '解决', '工作', '問題を解決しました。', '解决了问题。', 'N2'],
  ['kankyou', '環境', 'かんきょう', 'kankyou', '环境', '社会', '働く環境を整えます。', '改善工作环境。', 'N2'],
  ['sekinin', '責任', 'せきにん', 'sekinin', '责任', '工作', '責任を持って行動します。', '负责任地行动。', 'N2'],
  ['sentaku', '選択', 'せんたく', 'sentaku', '选择', '抽象', '最適な方法を選択します。', '选择最佳方法。', 'N2'],
  ['jissai', '実際', 'じっさい', 'jissai', '实际', '抽象', '実際に使ってみます。', '实际用一下。', 'N2'],
  ['kachi', '価値', 'かち', 'kachi', '价值', '抽象', '時間の価値を考えます。', '思考时间的价值。', 'N2'],
  ['ishiki', '意識', 'いしき', 'ishiki', '意识', '抽象', '安全を意識してください。', '请注意安全。', 'N2'],
  ['gainen', '概念', 'がいねん', 'gainen', '概念', '抽象', '新しい概念を理解します。', '理解新的概念。', 'N1'],
  ['kousatsu', '考察', 'こうさつ', 'kousatsu', '考察', '学术', '結果について考察します。', '对结果进行考察。', 'N1'],
  ['kouzou', '構造', 'こうぞう', 'kouzou', '结构', '学术', '文章の構造を分析します。', '分析文章结构。', 'N1'],
  ['shiten', '視点', 'してん', 'shiten', '观点 / 视角', '抽象', '別の視点から考えます。', '从另一个角度思考。', 'N1'],
  ['kadai', '課題', 'かだい', 'kadai', '课题', '学术', '今後の課題を整理します。', '整理今后的课题。', 'N1'],
  ['juyou', '需要', 'じゅよう', 'juyou', '需求', '社会', '需要が高まっています。', '需求正在提高。', 'N1'],
  ['sokushin', '促進', 'そくしん', 'sokushin', '促进', '社会', '交流を促進します。', '促进交流。', 'N1'],
  ['bunseki', '分析', 'ぶんせき', 'bunseki', '分析', '学术', 'データを分析します。', '分析数据。', 'N1'],
]

export const studyWords: StudyWord[] = [...wordTuples, ...advancedWordTuples].map(([id, jp, kana, romaji, cn, category, example, exampleCn, level = 'N5']) => ({
  id,
  jp,
  kana,
  romaji,
  cn,
  category,
  level: level as JLPTLevel,
  example,
  exampleCn,
  audioId: `word-${id}`,
  exampleAudioId: `example-${id}`,
}))

export const grammarCards: GrammarCard[] = [
  { id: 'a-wa-b-desu', title: 'A は B です', level: 'N5', topic: '判断句', meaning: '表示“A 是 B”。は 读作 wa，是主题提示助词。', pattern: '私は学生です。', exampleKana: 'わたしはがくせいです', translation: '我是学生。', tip: '日语经常先说主题，再说明身份或状态。', audioId: 'grammar-a-wa-b-desu' },
  { id: 'janai', title: 'A じゃありません', level: 'N5', topic: '否定句', meaning: '表示“不是 A”。礼貌口语中常用 じゃありません。', pattern: '私は先生じゃありません。', exampleKana: 'わたしはせんせいじゃありません', translation: '我不是老师。', tip: '更正式可说 ではありません。', audioId: 'grammar-janai' },
  { id: 'desu-ka', title: 'A ですか', level: 'N5', topic: '疑问句', meaning: '句尾加 か 构成疑问句。', pattern: 'これは水ですか。', exampleKana: 'これはみずですか', translation: '这是水吗？', tip: '回答可用 はい / いいえ。', audioId: 'grammar-desu-ka' },
  { id: 'kore-sore-are', title: 'これ・それ・あれ', level: 'N5', topic: '指示词', meaning: 'これ：这个；それ：那个；あれ：远处那个。', pattern: 'これは何ですか。', exampleKana: 'これはなんですか', translation: '这是什么？', tip: '修饰名词时用 この・その・あの。', audioId: 'grammar-kore-sore-are' },
  { id: 'masu', title: '动词 ます形', level: 'N5', topic: '礼貌表达', meaning: '动词礼貌形，适合大多数初学者日常对话。', pattern: '毎日日本語を勉強します。', exampleKana: 'まいにちにほんごをべんきょうします', translation: '我每天学习日语。', tip: 'ます 的过去式是 ました，否定是 ません。', audioId: 'grammar-masu' },
  { id: 'wo', title: '名词 を 动词', level: 'N5', topic: '宾语助词', meaning: 'を 标记动作对象，读作 o。', pattern: 'パンを食べます。', exampleKana: 'パンをたべます', translation: '吃面包。', tip: '看电影、喝水、买东西都可用 を。', audioId: 'grammar-wo' },
  { id: 'de', title: '场所 で 动词', level: 'N5', topic: '动作地点', meaning: 'で 表示动作发生的地点。', pattern: '駅で友達に会います。', exampleKana: 'えきでともだちにあいます', translation: '在车站见朋友。', tip: '存在地点常用 に，动作地点常用 で。', audioId: 'grammar-de' },
  { id: 'ga-suki', title: 'A が 好きです', level: 'N5', topic: '喜好表达', meaning: '表示喜欢某物或某事。', pattern: '日本語が好きです。', exampleKana: 'にほんごがすきです', translation: '我喜欢日语。', tip: '喜欢的对象用 が。', audioId: 'grammar-ga-suki' },
  { id: 'te-kudasai', title: 'てください', level: 'N4', topic: '请求', meaning: '用来礼貌地请求别人做某事。', pattern: 'ここに名前を書いてください。', exampleKana: 'ここになまえをかいてください', translation: '请在这里写名字。', tip: '前面接动词て形。', audioId: 'grammar-te-kudasai' },
  { id: 'ta-koto-ga-aru', title: 'たことがあります', level: 'N4', topic: '经验', meaning: '表示曾经有过某种经历。', pattern: '日本へ行ったことがあります。', exampleKana: 'にほんへいったことがあります', translation: '我去过日本。', tip: '强调经验，不强调具体时间。', audioId: 'grammar-ta-koto-ga-aru' },
  { id: 'nagara', title: 'ながら', level: 'N4', topic: '同时进行', meaning: '表示一边做 A，一边做 B。', pattern: '音楽を聞きながら勉強します。', exampleKana: 'おんがくをききながらべんきょうします', translation: '一边听音乐一边学习。', tip: '主动作通常放在句末。', audioId: 'grammar-nagara' },
  { id: 'sou-desu-hearsay', title: 'そうです', level: 'N4', topic: '传闻', meaning: '表示“听说……”。', pattern: '明日は雨だそうです。', exampleKana: 'あしたはあめだそうです', translation: '听说明天会下雨。', tip: '不要和样态的 そうです 混淆。', audioId: 'grammar-sou-desu-hearsay' },
  { id: 'you-ni-naru', title: 'ようになる', level: 'N3', topic: '变化', meaning: '表示能力或习惯逐渐变成某种状态。', pattern: '日本語が少し話せるようになりました。', exampleKana: 'にほんごがすこしはなせるようになりました', translation: '变得能说一点日语了。', tip: '常和可能形一起使用。', audioId: 'grammar-you-ni-naru' },
  { id: 'wake-dewa-nai', title: 'わけではない', level: 'N3', topic: '部分否定', meaning: '表示并不是完全如此。', pattern: '日本語が嫌いなわけではありません。', exampleKana: 'にほんごがきらいなわけではありません', translation: '并不是讨厌日语。', tip: '语气比直接否定柔和。', audioId: 'grammar-wake-dewa-nai' },
  { id: 'tame-ni', title: 'ために', level: 'N3', topic: '目的', meaning: '表示为了某个目的而做某事。', pattern: '試験に合格するために勉強します。', exampleKana: 'しけんにごうかくするためにべんきょうします', translation: '为了通过考试而学习。', tip: '前后主语通常一致。', audioId: 'grammar-tame-ni' },
  { id: 'ba-hodo', title: 'ば〜ほど', level: 'N3', topic: '递进', meaning: '表示越……越……。', pattern: '勉強すればするほど面白くなります。', exampleKana: 'べんきょうすればするほどおもしろくなります', translation: '越学习越觉得有趣。', tip: '常用于程度逐渐加深。', audioId: 'grammar-ba-hodo' },
  { id: 'ni-kagiri', title: 'に限り', level: 'N2', topic: '限定', meaning: '表示只限于某对象或条件。', pattern: '本日に限り半額です。', exampleKana: 'ほんじつにかぎりはんがくです', translation: '仅限今天半价。', tip: '多见于公告、说明。', audioId: 'grammar-ni-kagiri' },
  { id: 'ue-de', title: '上で', level: 'N2', topic: '前提', meaning: '表示在做完某事之后再进行下一步。', pattern: '内容を確認した上で返事します。', exampleKana: 'ないようをかくにんしたうえでへんじします', translation: '确认内容后再回复。', tip: '强调顺序和慎重处理。', audioId: 'grammar-ue-de' },
  { id: 'zaru-wo-enai', title: 'ざるを得ない', level: 'N2', topic: '不得不', meaning: '表示虽然不愿意，但没有其他选择。', pattern: '予定を変更せざるを得ません。', exampleKana: 'よていをへんこうせざるをえません', translation: '不得不更改计划。', tip: 'する 变成 せざるを得ない。', audioId: 'grammar-zaru-wo-enai' },
  { id: 'kaneru', title: 'かねる', level: 'N2', topic: '婉拒', meaning: '表示很难做到或不能做。', pattern: 'その質問には答えかねます。', exampleKana: 'そのしつもんにはこたえかねます', translation: '这个问题难以回答。', tip: '商务场景常用，语气委婉。', audioId: 'grammar-kaneru' },
  { id: 'ni-tariru', title: 'に足る', level: 'N1', topic: '评价', meaning: '表示足以达到某种程度或值得。', pattern: '信頼に足る資料です。', exampleKana: 'しんらいにたるしりょうです', translation: '是值得信赖的资料。', tip: '常用于书面表达。', audioId: 'grammar-ni-tariru' },
  { id: 'wo-yogi-naku-sareru', title: 'を余儀なくされる', level: 'N1', topic: '被迫', meaning: '表示被迫接受某种结果。', pattern: '計画の変更を余儀なくされました。', exampleKana: 'けいかくのへんこうをよぎなくされました', translation: '被迫更改了计划。', tip: '主语通常是承受影响的一方。', audioId: 'grammar-wo-yogi-naku-sareru' },
  { id: 'ni-katakunai', title: 'に難くない', level: 'N1', topic: '推测', meaning: '表示不难想象或理解。', pattern: '彼の苦労は想像に難くありません。', exampleKana: 'かれのくろうはそうぞうにかたくありません', translation: '他的辛苦不难想象。', tip: '常与 想像、理解 搭配。', audioId: 'grammar-ni-katakunai' },
  { id: 'to-aite', title: 'と相まって', level: 'N1', topic: '相互作用', meaning: '表示两个因素结合后产生更强效果。', pattern: '努力と経験と相まって成果が出ました。', exampleKana: 'どりょくとけいけんとあいまってせいかがでました', translation: '努力和经验相结合，取得了成果。', tip: '偏正式书面表达。', audioId: 'grammar-to-aite' },
]

export const phraseScenarios: PhraseScenario[] = [
  { id: 'convenience', scene: '便利店', level: 'N5', phrases: [
    { id: 'convenience-kore', jp: 'これをください。', kana: 'これをください', cn: '请给我这个。', audioId: 'phrase-convenience-kore' },
    { id: 'convenience-bag', jp: '袋はいりますか。', kana: 'ふくろはいりますか', cn: '需要袋子吗？', audioId: 'phrase-convenience-bag' },
    { id: 'convenience-no', jp: 'いりません。', kana: 'いりません', cn: '不需要。', audioId: 'phrase-convenience-no' },
    { id: 'convenience-warm', jp: '温めますか。', kana: 'あたためますか', cn: '需要加热吗？', audioId: 'phrase-convenience-warm' },
    { id: 'convenience-checkout', jp: 'お会計お願いします。', kana: 'おかいけいおねがいします', cn: '请结账。', audioId: 'phrase-convenience-checkout' },
  ] },
  { id: 'directions', scene: '问路', level: 'N5', phrases: [
    { id: 'directions-station', jp: '駅はどこですか。', kana: 'えきはどこですか', cn: '车站在哪里？', audioId: 'phrase-directions-station' },
    { id: 'directions-straight', jp: 'まっすぐ行ってください。', kana: 'まっすぐいってください', cn: '请直走。', audioId: 'phrase-directions-straight' },
    { id: 'directions-right', jp: '右に曲がってください。', kana: 'みぎにまがってください', cn: '请右转。', audioId: 'phrase-directions-right' },
    { id: 'directions-near', jp: 'ここから近いですか。', kana: 'ここからちかいですか', cn: '从这里近吗？', audioId: 'phrase-directions-near' },
    { id: 'directions-repeat', jp: 'もう一度お願いします。', kana: 'もういちどおねがいします', cn: '请再说一遍。', audioId: 'phrase-directions-repeat' },
  ] },
  { id: 'restaurant', scene: '餐厅', level: 'N5', phrases: [
    { id: 'restaurant-menu', jp: 'メニューをお願いします。', kana: 'メニューをおねがいします', cn: '请给我菜单。', audioId: 'phrase-restaurant-menu' },
    { id: 'restaurant-recommend', jp: 'おすすめは何ですか。', kana: 'おすすめはなんですか', cn: '推荐菜是什么？', audioId: 'phrase-restaurant-recommend' },
    { id: 'restaurant-water', jp: '水をください。', kana: 'みずをください', cn: '请给我水。', audioId: 'phrase-restaurant-water' },
    { id: 'restaurant-spicy', jp: 'これは辛いですか。', kana: 'これはからいですか', cn: '这个辣吗？', audioId: 'phrase-restaurant-spicy' },
    { id: 'restaurant-checkout', jp: 'お会計お願いします。', kana: 'おかいけいおねがいします', cn: '请结账。', audioId: 'phrase-restaurant-checkout' },
  ] },
  { id: 'intro', scene: '自我介绍', level: 'N5', phrases: [
    { id: 'intro-first', jp: 'はじめまして。', kana: 'はじめまして', cn: '初次见面。', audioId: 'phrase-intro-first' },
    { id: 'intro-name', jp: '私は張です。', kana: 'わたしはちょうです', cn: '我是张。', audioId: 'phrase-intro-name' },
    { id: 'intro-china', jp: '中国から来ました。', kana: 'ちゅうごくからきました', cn: '我来自中国。', audioId: 'phrase-intro-china' },
    { id: 'intro-study', jp: '日本語を勉強しています。', kana: 'にほんごをべんきょうしています', cn: '我正在学习日语。', audioId: 'phrase-intro-study' },
    { id: 'intro-yoroshiku', jp: 'よろしくお願いします。', kana: 'よろしくおねがいします', cn: '请多关照。', audioId: 'phrase-intro-yoroshiku' },
  ] },
  { id: 'clinic', scene: '医院挂号', level: 'N4', phrases: [
    { id: 'clinic-fever', jp: '熱があります。', kana: 'ねつがあります', cn: '我发烧了。', audioId: 'phrase-clinic-fever' },
    { id: 'clinic-first', jp: '初めて来ました。', kana: 'はじめてきました', cn: '我是第一次来。', audioId: 'phrase-clinic-first' },
    { id: 'clinic-insurance', jp: '保険証を持っています。', kana: 'ほけんしょうをもっています', cn: '我带了保险证。', audioId: 'phrase-clinic-insurance' },
    { id: 'clinic-medicine', jp: '薬は一日何回飲みますか。', kana: 'くすりはいちにちなんかいのみますか', cn: '药一天吃几次？', audioId: 'phrase-clinic-medicine' },
  ] },
  { id: 'workplace', scene: '职场沟通', level: 'N3', phrases: [
    { id: 'workplace-confirm', jp: '資料を確認していただけますか。', kana: 'しりょうをかくにんしていただけますか', cn: '能请您确认资料吗？', audioId: 'phrase-workplace-confirm' },
    { id: 'workplace-deadline', jp: '締め切りはいつでしょうか。', kana: 'しめきりはいつでしょうか', cn: '截止日期是什么时候呢？', audioId: 'phrase-workplace-deadline' },
    { id: 'workplace-share', jp: '後ほど共有いたします。', kana: 'のちほどきょうゆういたします', cn: '稍后我会共享。', audioId: 'phrase-workplace-share' },
    { id: 'workplace-opinion', jp: 'ご意見を伺ってもよろしいですか。', kana: 'ごいけんをうかがってもよろしいですか', cn: '可以听听您的意见吗？', audioId: 'phrase-workplace-opinion' },
  ] },
  { id: 'meeting', scene: '会议讨论', level: 'N2', phrases: [
    { id: 'meeting-agenda', jp: '本日の議題を確認します。', kana: 'ほんじつのぎだいをかくにんします', cn: '确认今天的议题。', audioId: 'phrase-meeting-agenda' },
    { id: 'meeting-proposal', jp: '別の案を提案してもよろしいでしょうか。', kana: 'べつのあんをていあんしてもよろしいでしょうか', cn: '可以提出另一个方案吗？', audioId: 'phrase-meeting-proposal' },
    { id: 'meeting-risk', jp: 'その点にはリスクがあります。', kana: 'そのてんにはリスクがあります', cn: '这一点有风险。', audioId: 'phrase-meeting-risk' },
    { id: 'meeting-conclusion', jp: '結論を整理しましょう。', kana: 'けつろんをせいりしましょう', cn: '整理一下结论吧。', audioId: 'phrase-meeting-conclusion' },
  ] },
  { id: 'seminar', scene: '学术发表', level: 'N1', phrases: [
    { id: 'seminar-theme', jp: '本発表では需要の変化を分析します。', kana: 'ほんはっぴょうではじゅようのへんかをぶんせきします', cn: '本次发表将分析需求变化。', audioId: 'phrase-seminar-theme' },
    { id: 'seminar-perspective', jp: '別の視点から考察する必要があります。', kana: 'べつのしてんからこうさつするひつようがあります', cn: '需要从另一个视角考察。', audioId: 'phrase-seminar-perspective' },
    { id: 'seminar-data', jp: 'このデータは信頼に足るものです。', kana: 'このデータはしんらいにたるものです', cn: '这个数据值得信赖。', audioId: 'phrase-seminar-data' },
    { id: 'seminar-future', jp: '今後の課題について述べます。', kana: 'こんごのかだいについてのべます', cn: '接下来说明今后的课题。', audioId: 'phrase-seminar-future' },
  ] },
]

export const dailyPlan: DailyTask[] = [
  { day: '第 1 天', focus: '平假名 あ～さ行', task: '认读 15 个假名，逐个听音并跟读。', minutes: 20 },
  { day: '第 2 天', focus: '平假名 た～は行', task: '补齐基础音，完成一次假名小测。', minutes: 20 },
  { day: '第 3 天', focus: '平假名 ま～ん', task: '完成平假名全表跟读和默写。', minutes: 25 },
  { day: '第 4 天', focus: '片假名基础', task: '识别常见外来词：ホテル、カード、メニュー。', minutes: 25 },
  { day: '第 5 天', focus: '寒暄与自我介绍', task: '背 15 个词，开口读 10 轮。', minutes: 25 },
  { day: '第 6 天', focus: 'です / じゃありません', task: '造 8 个肯定句和 8 个否定句。', minutes: 30 },
  { day: '第 7 天', focus: 'これ・それ・あれ', task: '用身边物品做指示词练习。', minutes: 25 },
  { day: '第 8 天', focus: '旅行词汇', task: '复习车站、酒店、厕所、地图、交通词。', minutes: 25 },
  { day: '第 9 天', focus: '饮食会话', task: '餐厅场景 5 句全部跟读。', minutes: 30 },
  { day: '第 10 天', focus: '综合自测', task: '完成一次混合测验，错题回看。', minutes: 20 },
]

function audioPath(audioId: string) {
  if (audioId.startsWith('kana-')) return `audio/kana/${audioId.slice(5)}.mp3`
  if (audioId.startsWith('word-')) return `audio/words/${audioId.slice(5)}.mp3`
  if (audioId.startsWith('example-')) return `audio/examples/${audioId.slice(8)}.mp3`
  if (audioId.startsWith('grammar-')) return `audio/grammar/${audioId.slice(8)}.mp3`
  if (audioId.startsWith('phrase-')) return `audio/phrases/${audioId.slice(7)}.mp3`
  return `audio/${audioId}.mp3`
}

const catalogEntries: Array<[string, AudioEntry]> = [
  ...kanaRows.flatMap((row) =>
    row.hira.map((text, index): [string, AudioEntry] | null => {
      const audioId = row.audioIds[index]
      return audioId ? [audioId, { text, path: audioPath(audioId) }] : null
    }).filter((item): item is [string, AudioEntry] => Boolean(item)),
  ),
  ...studyWords.flatMap((word): Array<[string, AudioEntry]> => [
    [word.audioId, { text: word.jp, kana: word.kana, path: audioPath(word.audioId) }],
    [word.exampleAudioId, { text: word.example, path: audioPath(word.exampleAudioId) }],
  ]),
  ...grammarCards.map((card): [string, AudioEntry] => [
    card.audioId,
    { text: card.pattern, kana: card.exampleKana, path: audioPath(card.audioId) },
  ]),
  ...phraseScenarios.flatMap((scenario) =>
    scenario.phrases.map((phrase): [string, AudioEntry] => [
      phrase.audioId,
      { text: phrase.jp, kana: phrase.kana, path: audioPath(phrase.audioId) },
    ]),
  ),
]

export const audioCatalog: Record<string, AudioEntry> = Object.fromEntries(catalogEntries)
