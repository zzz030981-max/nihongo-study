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

export type AbroadTrack = {
  id: string
  title: string
  goal: string
  scenarios: string[]
  missions: string[]
  passCheck: string
}

export type ExamRoadmapItem = {
  level: JLPTLevel
  label: string
  passTarget: string
  dailyTarget: string
  sections: Array<{
    name: '词汇' | '语法' | '阅读' | '听力'
    target: string
    practice: string
  }>
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
  ['shigoto', '仕事', 'しごと', 'shigoto', '工作', '工作', '仕事は午後六時に終わります。', '工作下午六点结束。', 'N4'],
  ['kaigi', '会議', 'かいぎ', 'kaigi', '会议', '工作', '明日の会議に出ます。', '参加明天的会议。', 'N4'],
  ['jikanwari', '時間割', 'じかんわり', 'jikanwari', '课程表', '学习', '時間割を確認します。', '确认课程表。', 'N4'],
  ['shukudai', '宿題', 'しゅくだい', 'shukudai', '作业', '学习', '宿題を忘れました。', '忘记作业了。', 'N4'],
  ['ryougae', '両替', 'りょうがえ', 'ryougae', '兑换货币', '旅行', '空港で両替します。', '在机场换钱。', 'N4'],
  ['nimotsu', '荷物', 'にもつ', 'nimotsu', '行李', '旅行', '荷物を預けます。', '寄存行李。', 'N4'],
  ['uketsuke', '受付', 'うけつけ', 'uketsuke', '前台 / 接待', '旅行', '受付で名前を言います。', '在前台说名字。', 'N4'],
  ['kippu', '切符', 'きっぷ', 'kippu', '票', '交通', '切符を二枚買います。', '买两张票。', 'N4'],
  ['norikae', '乗り換え', 'のりかえ', 'norikae', '换乘', '交通', '次の駅で乗り換えます。', '在下一站换乘。', 'N4'],
  ['yoyaku', '予約', 'よやく', 'yoyaku', '预约', '生活', 'レストランを予約しました。', '预约了餐厅。', 'N4'],
  ['henji', '返事', 'へんじ', 'henji', '回复', '生活', 'メールの返事を書きます。', '写邮件回复。', 'N4'],
  ['shoukai', '紹介', 'しょうかい', 'shoukai', '介绍', '人物', '友達を紹介します。', '介绍朋友。', 'N4'],
  ['soudan', '相談', 'そうだん', 'soudan', '商量 / 咨询', '生活', '先生に相談します。', '向老师咨询。', 'N4'],
  ['anzen', '安全', 'あんぜん', 'anzen', '安全', '生活', '安全に気をつけます。', '注意安全。', 'N4'],
  ['kiken', '危険', 'きけん', 'kiken', '危险', '生活', 'ここは危険です。', '这里很危险。', 'N4'],
  ['kanji', '漢字', 'かんじ', 'kanji', '汉字', '学习', '漢字を覚えます。', '记汉字。', 'N4'],
  ['imi', '意味', 'いみ', 'imi', '意思', '学习', 'この言葉の意味を調べます。', '查这个词的意思。', 'N4'],
  ['bunpou', '文法', 'ぶんぽう', 'bunpou', '语法', '学习', '文法を復習します。', '复习语法。', 'N4'],
  ['seikaku', '性格', 'せいかく', 'seikaku', '性格', '人物', '彼は明るい性格です。', '他的性格开朗。', 'N4'],
  ['tokubetsu', '特別', 'とくべつ', 'tokubetsu', '特别', '形容词', '今日は特別な日です。', '今天是特别的日子。', 'N4'],
  ['futsuu', '普通', 'ふつう', 'futsuu', '普通', '形容词', '普通の切符を買います。', '买普通票。', 'N4'],
  ['zannen', '残念', 'ざんねん', 'zannen', '遗憾', '感受', '試合に負けて残念です。', '比赛输了很遗憾。', 'N4'],
  ['keiken', '経験', 'けいけん', 'keiken', '经验', '抽象', '日本で働いた経験があります。', '有在日本工作的经验。', 'N3'],
  ['seikatsu', '生活', 'せいかつ', 'seikatsu', '生活', '生活', '日本の生活に慣れました。', '习惯了日本的生活。', 'N3'],
  ['kankei', '関係', 'かんけい', 'kankei', '关系', '抽象', '仕事と関係があります。', '和工作有关。', 'N3'],
  ['jouhou', '情報', 'じょうほう', 'jouhou', '信息', '社会', '新しい情報を集めます。', '收集新信息。', 'N3'],
  ['kakunin', '確認', 'かくにん', 'kakunin', '确认', '工作', '予定を確認してください。', '请确认日程。', 'N3'],
  ['henka', '変化', 'へんか', 'henka', '变化', '抽象', '町の変化に気づきました。', '注意到了城市的变化。', 'N3'],
  ['genin', '原因', 'げんいん', 'genin', '原因', '抽象', '原因を調べています。', '正在调查原因。', 'N3'],
  ['mokuteki', '目的', 'もくてき', 'mokuteki', '目的', '抽象', '旅行の目的は勉強です。', '旅行的目的是学习。', 'N3'],
  ['kekka', '結果', 'けっか', 'kekka', '结果', '抽象', '試験の結果を待っています。', '正在等考试结果。', 'N3'],
  ['riyuu', '理由', 'りゆう', 'riyuu', '理由', '抽象', '理由を説明してください。', '请说明理由。', 'N3'],
  ['houhou', '方法', 'ほうほう', 'houhou', '方法', '学习', 'いい方法を探しています。', '正在找好方法。', 'N3'],
  ['mondai', '問題', 'もんだい', 'mondai', '问题', '学习', '問題を一緒に考えます。', '一起思考问题。', 'N3'],
  ['kanousei', '可能性', 'かのうせい', 'kanousei', '可能性', '抽象', '成功の可能性があります。', '有成功的可能性。', 'N3'],
  ['hyougen', '表現', 'ひょうげん', 'hyougen', '表达', '学习', '自然な表現を覚えます。', '记自然的表达。', 'N3'],
  ['setsuyaku', '節約', 'せつやく', 'setsuyaku', '节约', '生活', '電気を節約します。', '节约用电。', 'N3'],
  ['shourai', '将来', 'しょうらい', 'shourai', '将来', '时间', '将来日本で働きたいです。', '将来想在日本工作。', 'N3'],
  ['bunmei', '文化', 'ぶんか', 'bunka', '文化', '社会', '日本の文化に興味があります。', '对日本文化感兴趣。', 'N3'],
  ['shakai', '社会', 'しゃかい', 'shakai', '社会', '社会', '社会の変化を学びます。', '学习社会变化。', 'N3'],
  ['seido', '制度', 'せいど', 'seido', '制度', '社会', '新しい制度が始まりました。', '新制度开始了。', 'N3'],
  ['chousa', '調査', 'ちょうさ', 'chousa', '调查', '工作', '市場を調査します。', '调查市场。', 'N3'],
  ['houkoku', '報告', 'ほうこく', 'houkoku', '报告', '工作', '結果を報告します。', '报告结果。', 'N3'],
  ['renkei', '連携', 'れんけい', 'renkei', '协作', '工作', 'チームで連携します。', '团队协作。', 'N3'],
  ['taiou', '対応', 'たいおう', 'taiou', '应对', '工作', 'すぐに対応します。', '马上应对。', 'N3'],
  ['eikyou', '影響', 'えいきょう', 'eikyou', '影响', '抽象', '天気の影響を受けます。', '受到天气影响。', 'N3'],
  ['kansou', '感想', 'かんそう', 'kansou', '感想', '感受', '映画の感想を書きます。', '写电影感想。', 'N3'],
  ['kandou', '感動', 'かんどう', 'kandou', '感动', '感受', '物語に感動しました。', '被故事感动了。', 'N3'],
  ['fuan', '不安', 'ふあん', 'fuan', '不安', '感受', '試験の前は不安です。', '考试前很不安。', 'N3'],
  ['nattoku', '納得', 'なっとく', 'nattoku', '理解并接受', '抽象', '説明を聞いて納得しました。', '听了说明后理解并接受了。', 'N3'],
  ['seichou', '成長', 'せいちょう', 'seichou', '成长', '抽象', '毎日少しずつ成長します。', '每天一点点成长。', 'N3'],
  ['doryoku', '努力', 'どりょく', 'doryoku', '努力', '抽象', '努力を続けます。', '继续努力。', 'N3'],
  ['kouka', '効果', 'こうか', 'kouka', '效果', '抽象', 'この方法は効果があります。', '这个方法有效果。', 'N2'],
  ['kaiketsu', '解決', 'かいけつ', 'kaiketsu', '解决', '工作', '問題を解決しました。', '解决了问题。', 'N2'],
  ['kankyou', '環境', 'かんきょう', 'kankyou', '环境', '社会', '働く環境を整えます。', '改善工作环境。', 'N2'],
  ['sekinin', '責任', 'せきにん', 'sekinin', '责任', '工作', '責任を持って行動します。', '负责任地行动。', 'N2'],
  ['sentaku', '選択', 'せんたく', 'sentaku', '选择', '抽象', '最適な方法を選択します。', '选择最佳方法。', 'N2'],
  ['jissai', '実際', 'じっさい', 'jissai', '实际', '抽象', '実際に使ってみます。', '实际用一下。', 'N2'],
  ['kachi', '価値', 'かち', 'kachi', '价值', '抽象', '時間の価値を考えます。', '思考时间的价值。', 'N2'],
  ['ishiki', '意識', 'いしき', 'ishiki', '意识', '抽象', '安全を意識してください。', '请注意安全。', 'N2'],
  ['ronri', '論理', 'ろんり', 'ronri', '逻辑', '学术', '論理的に説明します。', '有逻辑地说明。', 'N2'],
  ['kijun', '基準', 'きじゅん', 'kijun', '标准', '工作', '判断の基準を決めます。', '决定判断标准。', 'N2'],
  ['jyouken', '条件', 'じょうけん', 'jouken', '条件', '工作', '条件を確認します。', '确认条件。', 'N2'],
  ['taisaku', '対策', 'たいさく', 'taisaku', '对策', '工作', '早めに対策を立てます。', '尽早制定对策。', 'N2'],
  ['kaizen', '改善', 'かいぜん', 'kaizen', '改善', '工作', '作業の流れを改善します。', '改善作业流程。', 'N2'],
  ['iji', '維持', 'いじ', 'iji', '维持', '抽象', '健康を維持します。', '维持健康。', 'N2'],
  ['kakudai', '拡大', 'かくだい', 'kakudai', '扩大', '社会', '事業を拡大します。', '扩大事业。', 'N2'],
  ['genshou', '減少', 'げんしょう', 'genshou', '减少', '社会', '人口が減少しています。', '人口正在减少。', 'N2'],
  ['zoutei', '増加', 'ぞうか', 'zouka', '增加', '社会', '利用者が増加しました。', '使用者增加了。', 'N2'],
  ['shuchou', '主張', 'しゅちょう', 'shuchou', '主张', '抽象', '自分の意見を主張します。', '主张自己的意见。', 'N2'],
  ['hihan', '批判', 'ひはん', 'hihan', '批评', '抽象', '建設的に批判します。', '建设性地批评。', 'N2'],
  ['hyouka', '評価', 'ひょうか', 'hyouka', '评价', '工作', '成果を評価します。', '评价成果。', 'N2'],
  ['juyoudo', '重要度', 'じゅうようど', 'juuyoudo', '重要程度', '工作', '重要度を分けます。', '区分重要程度。', 'N2'],
  ['kouritsu', '効率', 'こうりつ', 'kouritsu', '效率', '工作', '効率を上げます。', '提高效率。', 'N2'],
  ['soshiki', '組織', 'そしき', 'soshiki', '组织', '工作', '組織の目標を共有します。', '共享组织目标。', 'N2'],
  ['shigen', '資源', 'しげん', 'shigen', '资源', '社会', '限られた資源を使います。', '使用有限资源。', 'N2'],
  ['koyou', '雇用', 'こよう', 'koyou', '雇用', '社会', '雇用の機会が増えます。', '就业机会增加。', 'N2'],
  ['keiyaku', '契約', 'けいやく', 'keiyaku', '合同', '工作', '契約の内容を確認します。', '确认合同内容。', 'N2'],
  ['kouho', '候補', 'こうほ', 'kouho', '候选', '工作', '候補を三つ選びました。', '选了三个候选。', 'N2'],
  ['yusen', '優先', 'ゆうせん', 'yuusen', '优先', '工作', '安全を優先します。', '优先考虑安全。', 'N2'],
  ['shousai', '詳細', 'しょうさい', 'shousai', '详细', '工作', '詳細をメールで送ります。', '用邮件发送详细内容。', 'N2'],
  ['gutaiteki', '具体的', 'ぐたいてき', 'gutaiteki', '具体的', '抽象', '具体的な例を出します。', '举出具体例子。', 'N2'],
  ['gainen', '概念', 'がいねん', 'gainen', '概念', '抽象', '新しい概念を理解します。', '理解新的概念。', 'N1'],
  ['kousatsu', '考察', 'こうさつ', 'kousatsu', '考察', '学术', '結果について考察します。', '对结果进行考察。', 'N1'],
  ['kouzou', '構造', 'こうぞう', 'kouzou', '结构', '学术', '文章の構造を分析します。', '分析文章结构。', 'N1'],
  ['shiten', '視点', 'してん', 'shiten', '观点 / 视角', '抽象', '別の視点から考えます。', '从另一个角度思考。', 'N1'],
  ['kadai', '課題', 'かだい', 'kadai', '课题', '学术', '今後の課題を整理します。', '整理今后的课题。', 'N1'],
  ['juyou', '需要', 'じゅよう', 'juyou', '需求', '社会', '需要が高まっています。', '需求正在提高。', 'N1'],
  ['sokushin', '促進', 'そくしん', 'sokushin', '促进', '社会', '交流を促進します。', '促进交流。', 'N1'],
  ['bunseki', '分析', 'ぶんせき', 'bunseki', '分析', '学术', 'データを分析します。', '分析数据。', 'N1'],
  ['gensoku', '原則', 'げんそく', 'gensoku', '原则', '抽象', '原則として変更できません。', '原则上不能更改。', 'N1'],
  ['zentei', '前提', 'ぜんてい', 'zentei', '前提', '学术', 'その前提で議論します。', '以那个前提讨论。', 'N1'],
  ['kitei', '規定', 'きてい', 'kitei', '规定', '社会', '規定に従って処理します。', '按照规定处理。', 'N1'],
  ['toushi', '投資', 'とうし', 'toushi', '投资', '社会', '教育への投資が必要です。', '需要对教育投资。', 'N1'],
  ['kakushin', '革新', 'かくしん', 'kakushin', '革新', '社会', '技術革新が進んでいます。', '技术革新正在推进。', 'N1'],
  ['sairyou', '裁量', 'さいりょう', 'sairyou', '裁量', '工作', '担当者の裁量に任せます。', '交给负责人裁量。', 'N1'],
  ['tougou', '統合', 'とうごう', 'tougou', '整合 / 统合', '工作', '複数の情報を統合します。', '整合多项信息。', 'N1'],
  ['bunpai', '分配', 'ぶんぱい', 'bunpai', '分配', '社会', '資源を公平に分配します。', '公平分配资源。', 'N1'],
  ['rikai', '利害', 'りがい', 'rigai', '利害', '社会', '利害が一致しません。', '利害不一致。', 'N1'],
  ['houshin', '方針', 'ほうしん', 'houshin', '方针', '工作', '今後の方針を示します。', '展示今后的方针。', 'N1'],
  ['haikei', '背景', 'はいけい', 'haikei', '背景', '学术', '問題の背景を説明します。', '说明问题背景。', 'N1'],
  ['ichizuke', '位置づけ', 'いちづけ', 'ichizuke', '定位', '学术', '研究の位置づけを明確にします。', '明确研究定位。', 'N1'],
  ['sousai', '相殺', 'そうさい', 'sousai', '抵消', '抽象', '利益と損失が相殺されます。', '收益和损失相互抵消。', 'N1'],
  ['kousoku', '拘束', 'こうそく', 'kousoku', '约束 / 限制', '抽象', '時間に拘束されます。', '受到时间限制。', 'N1'],
  ['kencho', '顕著', 'けんちょ', 'kencho', '显著', '学术', '顕著な違いが見られます。', '可以看到显著差异。', 'N1'],
  ['himoduku', '紐づく', 'ひもづく', 'himoduku', '关联', '工作', 'データが利用者に紐づいています。', '数据与用户关联。', 'N1'],
  ['kouken', '貢献', 'こうけん', 'kouken', '贡献', '社会', '地域社会に貢献します。', '为地区社会做贡献。', 'N1'],
  ['jizoku', '持続', 'じぞく', 'jizoku', '持续', '社会', '成長を持続させます。', '使成长持续。', 'N1'],
  ['sougo', '相互', 'そうご', 'sougo', '相互', '抽象', '相互理解を深めます。', '加深相互理解。', 'N1'],
  ['kentou', '検討', 'けんとう', 'kentou', '探讨 / 研究', '工作', '導入を検討しています。', '正在研究导入。', 'N1'],
  ['teigi', '定義', 'ていぎ', 'teigi', '定义', '学术', '用語を定義します。', '定义术语。', 'N1'],
  ['shisa', '示唆', 'しさ', 'shisa', '启示 / 暗示', '学术', '結果は重要な示唆を与えます。', '结果给出重要启示。', 'N1'],
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
  { id: 'ni-imasu', title: '场所 に います', level: 'N5', topic: '存在句', meaning: '表示人或动物在某处。', pattern: '友達は教室にいます。', exampleKana: 'ともだちはきょうしつにいます', translation: '朋友在教室。', tip: '无生命物通常用 あります。', audioId: 'grammar-ni-imasu' },
  { id: 'kara-made', title: 'から〜まで', level: 'N5', topic: '起点终点', meaning: '表示从某个起点到某个终点。', pattern: '九時から五時まで働きます。', exampleKana: 'くじからごじまではたらきます', translation: '从九点工作到五点。', tip: '时间、地点都可以使用。', audioId: 'grammar-kara-made' },
  { id: 'te-kudasai', title: 'てください', level: 'N4', topic: '请求', meaning: '用来礼貌地请求别人做某事。', pattern: 'ここに名前を書いてください。', exampleKana: 'ここになまえをかいてください', translation: '请在这里写名字。', tip: '前面接动词て形。', audioId: 'grammar-te-kudasai' },
  { id: 'ta-koto-ga-aru', title: 'たことがあります', level: 'N4', topic: '经验', meaning: '表示曾经有过某种经历。', pattern: '日本へ行ったことがあります。', exampleKana: 'にほんへいったことがあります', translation: '我去过日本。', tip: '强调经验，不强调具体时间。', audioId: 'grammar-ta-koto-ga-aru' },
  { id: 'nagara', title: 'ながら', level: 'N4', topic: '同时进行', meaning: '表示一边做 A，一边做 B。', pattern: '音楽を聞きながら勉強します。', exampleKana: 'おんがくをききながらべんきょうします', translation: '一边听音乐一边学习。', tip: '主动作通常放在句末。', audioId: 'grammar-nagara' },
  { id: 'sou-desu-hearsay', title: 'そうです', level: 'N4', topic: '传闻', meaning: '表示“听说……”。', pattern: '明日は雨だそうです。', exampleKana: 'あしたはあめだそうです', translation: '听说明天会下雨。', tip: '不要和样态的 そうです 混淆。', audioId: 'grammar-sou-desu-hearsay' },
  { id: 'nakereba-naranai', title: 'なければならない', level: 'N4', topic: '必须', meaning: '表示必须做某事。', pattern: '明日までに宿題を出さなければなりません。', exampleKana: 'あしたまでにしゅくだいをださなければなりません', translation: '必须在明天之前交作业。', tip: '口语中常简化为 なきゃ。', audioId: 'grammar-nakereba-naranai' },
  { id: 'te-mo-ii', title: 'てもいい', level: 'N4', topic: '许可', meaning: '表示可以做某事。', pattern: 'ここで写真を撮ってもいいです。', exampleKana: 'ここでしゃしんをとってもいいです', translation: '可以在这里拍照。', tip: '疑问句可用于征求许可。', audioId: 'grammar-te-mo-ii' },
  { id: 'te-wa-ikenai', title: 'てはいけない', level: 'N4', topic: '禁止', meaning: '表示不可以做某事。', pattern: 'ここでタバコを吸ってはいけません。', exampleKana: 'ここでタバコをすってはいけません', translation: '不可以在这里抽烟。', tip: '规则、提醒中常见。', audioId: 'grammar-te-wa-ikenai' },
  { id: 'tara', title: 'たら', level: 'N4', topic: '条件', meaning: '表示如果某事发生，就进行后项。', pattern: '駅に着いたら電話します。', exampleKana: 'えきについたらでんわします', translation: '到了车站就打电话。', tip: '也能表示动作先后。', audioId: 'grammar-tara' },
  { id: 'you-desu', title: 'ようです', level: 'N4', topic: '推测', meaning: '表示根据情况做出的推测。', pattern: '外は寒いようです。', exampleKana: 'そとはさむいようです', translation: '外面好像很冷。', tip: '比 でしょう 更有根据。', audioId: 'grammar-you-desu' },
  { id: 'node', title: 'ので', level: 'N4', topic: '原因', meaning: '表示较客观、柔和的原因。', pattern: '雨なので出かけません。', exampleKana: 'あめなのででかけません', translation: '因为下雨，所以不出门。', tip: '比 から 更柔和。', audioId: 'grammar-node' },
  { id: 'you-ni-naru', title: 'ようになる', level: 'N3', topic: '变化', meaning: '表示能力或习惯逐渐变成某种状态。', pattern: '日本語が少し話せるようになりました。', exampleKana: 'にほんごがすこしはなせるようになりました', translation: '变得能说一点日语了。', tip: '常和可能形一起使用。', audioId: 'grammar-you-ni-naru' },
  { id: 'wake-dewa-nai', title: 'わけではない', level: 'N3', topic: '部分否定', meaning: '表示并不是完全如此。', pattern: '日本語が嫌いなわけではありません。', exampleKana: 'にほんごがきらいなわけではありません', translation: '并不是讨厌日语。', tip: '语气比直接否定柔和。', audioId: 'grammar-wake-dewa-nai' },
  { id: 'tame-ni', title: 'ために', level: 'N3', topic: '目的', meaning: '表示为了某个目的而做某事。', pattern: '試験に合格するために勉強します。', exampleKana: 'しけんにごうかくするためにべんきょうします', translation: '为了通过考试而学习。', tip: '前后主语通常一致。', audioId: 'grammar-tame-ni' },
  { id: 'ba-hodo', title: 'ば〜ほど', level: 'N3', topic: '递进', meaning: '表示越……越……。', pattern: '勉強すればするほど面白くなります。', exampleKana: 'べんきょうすればするほどおもしろくなります', translation: '越学习越觉得有趣。', tip: '常用于程度逐渐加深。', audioId: 'grammar-ba-hodo' },
  { id: 'ni-yotte', title: 'によって', level: 'N3', topic: '依据差异', meaning: '表示根据对象不同而变化。', pattern: '国によって習慣が違います。', exampleKana: 'くにによってしゅうかんがちがいます', translation: '不同国家习惯不同。', tip: '也可以表示手段或原因。', audioId: 'grammar-ni-yotte' },
  { id: 'to-iu', title: 'という', level: 'N3', topic: '引用说明', meaning: '用来说明名称、内容或定义。', pattern: 'これは和食という料理です。', exampleKana: 'これはわしょくというりょうりです', translation: '这是叫做和食的料理。', tip: '连接名词时很常见。', audioId: 'grammar-to-iu' },
  { id: 'beki-da', title: 'べきだ', level: 'N3', topic: '应该', meaning: '表示从常识或责任出发应该做某事。', pattern: '約束は守るべきです。', exampleKana: 'やくそくはまもるべきです', translation: '应该遵守约定。', tip: '语气比 ほうがいい 更强。', audioId: 'grammar-beki-da' },
  { id: 'tokoro-da', title: 'ところです', level: 'N3', topic: '阶段', meaning: '表示动作正要、正在、刚刚发生。', pattern: '今から出かけるところです。', exampleKana: 'いまからでかけるところです', translation: '我正要出门。', tip: '接续不同表达不同阶段。', audioId: 'grammar-tokoro-da' },
  { id: 'koto-ni-suru', title: 'ことにする', level: 'N3', topic: '决定', meaning: '表示说话人决定做某事。', pattern: '毎朝走ることにしました。', exampleKana: 'まいあさはしることにしました', translation: '我决定每天早上跑步。', tip: 'ことになる 表示外部决定。', audioId: 'grammar-koto-ni-suru' },
  { id: 'sae', title: 'さえ', level: 'N3', topic: '极端例', meaning: '表示连某个极端对象都如此。', pattern: '名前さえ書けば大丈夫です。', exampleKana: 'なまえさえかけばだいじょうぶです', translation: '只要写名字就没问题。', tip: '也可表示最低条件。', audioId: 'grammar-sae' },
  { id: 'ni-kagiri', title: 'に限り', level: 'N2', topic: '限定', meaning: '表示只限于某对象或条件。', pattern: '本日に限り半額です。', exampleKana: 'ほんじつにかぎりはんがくです', translation: '仅限今天半价。', tip: '多见于公告、说明。', audioId: 'grammar-ni-kagiri' },
  { id: 'ue-de', title: '上で', level: 'N2', topic: '前提', meaning: '表示在做完某事之后再进行下一步。', pattern: '内容を確認した上で返事します。', exampleKana: 'ないようをかくにんしたうえでへんじします', translation: '确认内容后再回复。', tip: '强调顺序和慎重处理。', audioId: 'grammar-ue-de' },
  { id: 'zaru-wo-enai', title: 'ざるを得ない', level: 'N2', topic: '不得不', meaning: '表示虽然不愿意，但没有其他选择。', pattern: '予定を変更せざるを得ません。', exampleKana: 'よていをへんこうせざるをえません', translation: '不得不更改计划。', tip: 'する 变成 せざるを得ない。', audioId: 'grammar-zaru-wo-enai' },
  { id: 'kaneru', title: 'かねる', level: 'N2', topic: '婉拒', meaning: '表示很难做到或不能做。', pattern: 'その質問には答えかねます。', exampleKana: 'そのしつもんにはこたえかねます', translation: '这个问题难以回答。', tip: '商务场景常用，语气委婉。', audioId: 'grammar-kaneru' },
  { id: 'ni-oujite', title: 'に応じて', level: 'N2', topic: '对应', meaning: '表示根据情况、需求而改变。', pattern: '経験に応じて仕事を任せます。', exampleKana: 'けいけんにおうじてしごとをまかせます', translation: '根据经验安排工作。', tip: '常用于制度、业务说明。', audioId: 'grammar-ni-oujite' },
  { id: 'wo-moto-ni', title: 'をもとに', level: 'N2', topic: '依据', meaning: '表示以某资料或事实为基础。', pattern: '調査結果をもとに計画を作ります。', exampleKana: 'ちょうさけっかをもとにけいかくをつくります', translation: '基于调查结果制定计划。', tip: '书面和工作场景常见。', audioId: 'grammar-wo-moto-ni' },
  { id: 'ni-hoka-naranai', title: 'にほかならない', level: 'N2', topic: '强调断定', meaning: '表示正是、无非是某事。', pattern: '成功は努力の結果にほかなりません。', exampleKana: 'せいこうはどりょくのけっかにほかなりません', translation: '成功正是努力的结果。', tip: '用于较正式的强调。', audioId: 'grammar-ni-hoka-naranai' },
  { id: 'mono-no', title: 'ものの', level: 'N2', topic: '转折', meaning: '表示虽然前项成立，但后项并不如预期。', pattern: '準備したものの不安が残ります。', exampleKana: 'じゅんびしたもののふあんがのこります', translation: '虽然准备了，但仍有不安。', tip: '比 けれども 更书面。', audioId: 'grammar-mono-no' },
  { id: 'wake-ni-wa-ikanai', title: 'わけにはいかない', level: 'N2', topic: '不能那样做', meaning: '表示因责任、常识或情况不能做某事。', pattern: '大事な会議を休むわけにはいきません。', exampleKana: 'だいじなかいぎをやすむわけにはいきません', translation: '不能缺席重要会议。', tip: '不是能力上的不能。', audioId: 'grammar-wake-ni-wa-ikanai' },
  { id: 'dake-ni', title: 'だけに', level: 'N2', topic: '正因为', meaning: '表示正因为某理由，后项更自然或更强。', pattern: '期待していただけに残念です。', exampleKana: 'きたいしていただけにざんねんです', translation: '正因为期待过，所以很遗憾。', tip: '常带有情绪评价。', audioId: 'grammar-dake-ni' },
  { id: 'ni-tariru', title: 'に足る', level: 'N1', topic: '评价', meaning: '表示足以达到某种程度或值得。', pattern: '信頼に足る資料です。', exampleKana: 'しんらいにたるしりょうです', translation: '是值得信赖的资料。', tip: '常用于书面表达。', audioId: 'grammar-ni-tariru' },
  { id: 'wo-yogi-naku-sareru', title: 'を余儀なくされる', level: 'N1', topic: '被迫', meaning: '表示被迫接受某种结果。', pattern: '計画の変更を余儀なくされました。', exampleKana: 'けいかくのへんこうをよぎなくされました', translation: '被迫更改了计划。', tip: '主语通常是承受影响的一方。', audioId: 'grammar-wo-yogi-naku-sareru' },
  { id: 'ni-katakunai', title: 'に難くない', level: 'N1', topic: '推测', meaning: '表示不难想象或理解。', pattern: '彼の苦労は想像に難くありません。', exampleKana: 'かれのくろうはそうぞうにかたくありません', translation: '他的辛苦不难想象。', tip: '常与 想像、理解 搭配。', audioId: 'grammar-ni-katakunai' },
  { id: 'to-aite', title: 'と相まって', level: 'N1', topic: '相互作用', meaning: '表示两个因素结合后产生更强效果。', pattern: '努力と経験と相まって成果が出ました。', exampleKana: 'どりょくとけいけんとあいまってせいかがでました', translation: '努力和经验相结合，取得了成果。', tip: '偏正式书面表达。', audioId: 'grammar-to-aite' },
  { id: 'ni-itari', title: 'に至り', level: 'N1', topic: '发展到', meaning: '表示事情发展到某个阶段。', pattern: '議論は結論に至りました。', exampleKana: 'ぎろんはけつろんにいたりました', translation: '讨论得出了结论。', tip: '书面语，常用于过程说明。', audioId: 'grammar-ni-itari' },
  { id: 'wo-kinji-enai', title: 'を禁じ得ない', level: 'N1', topic: '忍不住', meaning: '表示无法抑制某种感情。', pattern: '彼の努力に感動を禁じ得ません。', exampleKana: 'かれのどりょくにかんどうをきんじえません', translation: '对他的努力不禁感动。', tip: '多接 感動、驚き、怒り。', audioId: 'grammar-wo-kinji-enai' },
  { id: 'bekarazaru', title: 'べからざる', level: 'N1', topic: '不应有', meaning: '表示不应该、不允许的状态。', pattern: '学生にあるべからざる行為です。', exampleKana: 'がくせいにあるべからざるこういです', translation: '这是学生不应有的行为。', tip: '固定书面表达。', audioId: 'grammar-bekarazaru' },
  { id: 'ni-shinobinai', title: 'に忍びない', level: 'N1', topic: '不忍心', meaning: '表示心理上不忍心做某事。', pattern: '彼を責めるに忍びません。', exampleKana: 'かれをせめるにしのびません', translation: '不忍心责备他。', tip: '常用于同情场景。', audioId: 'grammar-ni-shinobinai' },
  { id: 'to-iwan-bakari', title: 'と言わんばかり', level: 'N1', topic: '仿佛在说', meaning: '表示虽然没说出口，但态度像是在表达某意思。', pattern: '彼は当然だと言わんばかりの顔をしました。', exampleKana: 'かれはとうぜんだといわんばかりのかおをしました', translation: '他露出一副好像在说理所当然的表情。', tip: '常修饰表情、态度。', audioId: 'grammar-to-iwan-bakari' },
  { id: 'nashi-ni-wa', title: 'なしには', level: 'N1', topic: '没有就不能', meaning: '表示如果没有某条件就无法成立。', pattern: '努力なしには成功できません。', exampleKana: 'どりょくなしにはせいこうできません', translation: '没有努力就无法成功。', tip: '常用于强调必要条件。', audioId: 'grammar-nashi-ni-wa' },
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
  { id: 'hotel-checkin', scene: '酒店入住', level: 'N4', phrases: [
    { id: 'hotel-reservation', jp: '予約した王です。', kana: 'よやくしたおうです', cn: '我是预约过的王。', audioId: 'phrase-hotel-reservation' },
    { id: 'hotel-passport', jp: 'パスポートを見せてください。', kana: 'パスポートをみせてください', cn: '请出示护照。', audioId: 'phrase-hotel-passport' },
    { id: 'hotel-breakfast', jp: '朝ご飯は何時からですか。', kana: 'あさごはんはなんじからですか', cn: '早餐从几点开始？', audioId: 'phrase-hotel-breakfast' },
    { id: 'hotel-wifi', jp: 'ワイファイのパスワードを教えてください。', kana: 'ワイファイのパスワードをおしえてください', cn: '请告诉我无线网密码。', audioId: 'phrase-hotel-wifi' },
    { id: 'hotel-key', jp: '部屋の鍵をなくしました。', kana: 'へやのかぎをなくしました', cn: '我弄丢了房间钥匙。', audioId: 'phrase-hotel-key' },
    { id: 'hotel-checkout', jp: 'チェックアウトをお願いします。', kana: 'チェックアウトをおねがいします', cn: '我要办理退房。', audioId: 'phrase-hotel-checkout' },
  ] },
  { id: 'shopping-return', scene: '购物退换', level: 'N4', phrases: [
    { id: 'shopping-size', jp: 'もう少し大きいサイズはありますか。', kana: 'もうすこしおおきいサイズはありますか', cn: '有再大一点的尺寸吗？', audioId: 'phrase-shopping-size' },
    { id: 'shopping-try', jp: '試着してもいいですか。', kana: 'しちゃくしてもいいですか', cn: '可以试穿吗？', audioId: 'phrase-shopping-try' },
    { id: 'shopping-card', jp: 'カードで払えますか。', kana: 'カードではらえますか', cn: '可以刷卡付款吗？', audioId: 'phrase-shopping-card' },
    { id: 'shopping-receipt', jp: 'レシートをください。', kana: 'レシートをください', cn: '请给我小票。', audioId: 'phrase-shopping-receipt' },
    { id: 'shopping-exchange', jp: '交換できますか。', kana: 'こうかんできますか', cn: '可以更换吗？', audioId: 'phrase-shopping-exchange' },
    { id: 'shopping-expensive', jp: '少し高いので考えます。', kana: 'すこしたかいのでかんがえます', cn: '有点贵，我考虑一下。', audioId: 'phrase-shopping-expensive' },
  ] },
  { id: 'school-life', scene: '学校生活', level: 'N4', phrases: [
    { id: 'school-homework', jp: '宿題を出すのを忘れました。', kana: 'しゅくだいをだすのをわすれました', cn: '我忘记交作业了。', audioId: 'phrase-school-homework' },
    { id: 'school-question', jp: '質問してもいいですか。', kana: 'しつもんしてもいいですか', cn: '可以提问吗？', audioId: 'phrase-school-question' },
    { id: 'school-meaning', jp: 'この漢字の意味は何ですか。', kana: 'このかんじのいみはなんですか', cn: '这个汉字是什么意思？', audioId: 'phrase-school-meaning' },
    { id: 'school-repeat', jp: 'もう一度説明してください。', kana: 'もういちどせつめいしてください', cn: '请再说明一次。', audioId: 'phrase-school-repeat' },
    { id: 'school-group', jp: 'グループで練習しましょう。', kana: 'グループでれんしゅうしましょう', cn: '小组练习吧。', audioId: 'phrase-school-group' },
    { id: 'school-test', jp: '来週テストがあります。', kana: 'らいしゅうテストがあります', cn: '下周有考试。', audioId: 'phrase-school-test' },
  ] },
  { id: 'workplace', scene: '职场沟通', level: 'N3', phrases: [
    { id: 'workplace-confirm', jp: '資料を確認していただけますか。', kana: 'しりょうをかくにんしていただけますか', cn: '能请您确认资料吗？', audioId: 'phrase-workplace-confirm' },
    { id: 'workplace-deadline', jp: '締め切りはいつでしょうか。', kana: 'しめきりはいつでしょうか', cn: '截止日期是什么时候呢？', audioId: 'phrase-workplace-deadline' },
    { id: 'workplace-share', jp: '後ほど共有いたします。', kana: 'のちほどきょうゆういたします', cn: '稍后我会共享。', audioId: 'phrase-workplace-share' },
    { id: 'workplace-opinion', jp: 'ご意見を伺ってもよろしいですか。', kana: 'ごいけんをうかがってもよろしいですか', cn: '可以听听您的意见吗？', audioId: 'phrase-workplace-opinion' },
  ] },
  { id: 'apartment', scene: '租房沟通', level: 'N3', phrases: [
    { id: 'apartment-viewing', jp: '部屋を見学したいです。', kana: 'へやをけんがくしたいです', cn: '我想看房。', audioId: 'phrase-apartment-viewing' },
    { id: 'apartment-rent', jp: '家賃はいくらですか。', kana: 'やちんはいくらですか', cn: '房租是多少？', audioId: 'phrase-apartment-rent' },
    { id: 'apartment-station', jp: '駅から歩いて何分ですか。', kana: 'えきからあるいてなんぷんですか', cn: '从车站走路几分钟？', audioId: 'phrase-apartment-station' },
    { id: 'apartment-contract', jp: '契約に必要な書類は何ですか。', kana: 'けいやくにひつようなしょるいはなんですか', cn: '签约需要什么资料？', audioId: 'phrase-apartment-contract' },
    { id: 'apartment-move', jp: '来月から住むことはできますか。', kana: 'らいげつからすむことはできますか', cn: '下个月开始能入住吗？', audioId: 'phrase-apartment-move' },
    { id: 'apartment-think', jp: '少し考えてから返事します。', kana: 'すこしかんがえてからへんじします', cn: '我考虑一下再回复。', audioId: 'phrase-apartment-think' },
  ] },
  { id: 'interview', scene: '面试应答', level: 'N3', phrases: [
    { id: 'interview-strength', jp: '私の強みは最後まで続けることです。', kana: 'わたしのつよみはさいごまでつづけることです', cn: '我的优点是能坚持到最后。', audioId: 'phrase-interview-strength' },
    { id: 'interview-experience', jp: '接客の経験があります。', kana: 'せっきゃくのけいけんがあります', cn: '我有接待客人的经验。', audioId: 'phrase-interview-experience' },
    { id: 'interview-reason', jp: '応募した理由を説明します。', kana: 'おうぼしたりゆうをせつめいします', cn: '我说明应聘理由。', audioId: 'phrase-interview-reason' },
    { id: 'interview-team', jp: 'チームで働くことが好きです。', kana: 'チームではたらくことがすきです', cn: '我喜欢团队工作。', audioId: 'phrase-interview-team' },
    { id: 'interview-learn', jp: '新しいことを学ぶ意欲があります。', kana: 'あたらしいことをまなぶいよくがあります', cn: '我有学习新事物的意愿。', audioId: 'phrase-interview-learn' },
    { id: 'interview-question', jp: '質問してもよろしいでしょうか。', kana: 'しつもんしてもよろしいでしょうか', cn: '可以提问吗？', audioId: 'phrase-interview-question' },
  ] },
  { id: 'trouble', scene: '问题处理', level: 'N3', phrases: [
    { id: 'trouble-lost', jp: '財布をなくしてしまいました。', kana: 'さいふをなくしてしまいました', cn: '我把钱包弄丢了。', audioId: 'phrase-trouble-lost' },
    { id: 'trouble-police', jp: '近くの交番はどこですか。', kana: 'ちかくのこうばんはどこですか', cn: '附近的派出所在哪里？', audioId: 'phrase-trouble-police' },
    { id: 'trouble-delay', jp: '電車が遅れているようです。', kana: 'でんしゃがおくれているようです', cn: '电车好像晚点了。', audioId: 'phrase-trouble-delay' },
    { id: 'trouble-contact', jp: 'すぐに連絡します。', kana: 'すぐにれんらくします', cn: '我马上联系。', audioId: 'phrase-trouble-contact' },
    { id: 'trouble-confirm', jp: '状況を確認してください。', kana: 'じょうきょうをかくにんしてください', cn: '请确认情况。', audioId: 'phrase-trouble-confirm' },
    { id: 'trouble-help', jp: '手伝っていただけませんか。', kana: 'てつだっていただけませんか', cn: '能帮我一下吗？', audioId: 'phrase-trouble-help' },
  ] },
  { id: 'meeting', scene: '会议讨论', level: 'N2', phrases: [
    { id: 'meeting-agenda', jp: '本日の議題を確認します。', kana: 'ほんじつのぎだいをかくにんします', cn: '确认今天的议题。', audioId: 'phrase-meeting-agenda' },
    { id: 'meeting-proposal', jp: '別の案を提案してもよろしいでしょうか。', kana: 'べつのあんをていあんしてもよろしいでしょうか', cn: '可以提出另一个方案吗？', audioId: 'phrase-meeting-proposal' },
    { id: 'meeting-risk', jp: 'その点にはリスクがあります。', kana: 'そのてんにはリスクがあります', cn: '这一点有风险。', audioId: 'phrase-meeting-risk' },
    { id: 'meeting-conclusion', jp: '結論を整理しましょう。', kana: 'けつろんをせいりしましょう', cn: '整理一下结论吧。', audioId: 'phrase-meeting-conclusion' },
  ] },
  { id: 'project-report', scene: '项目汇报', level: 'N2', phrases: [
    { id: 'project-progress', jp: '進捗状況をご報告します。', kana: 'しんちょくじょうきょうをごほうこくします', cn: '我汇报进展情况。', audioId: 'phrase-project-progress' },
    { id: 'project-issue', jp: '現在の課題は二つあります。', kana: 'げんざいのかだいはふたつあります', cn: '当前有两个课题。', audioId: 'phrase-project-issue' },
    { id: 'project-solution', jp: '対策として次の案を考えています。', kana: 'たいさくとしてつぎのあんをかんがえています', cn: '作为对策，我在考虑以下方案。', audioId: 'phrase-project-solution' },
    { id: 'project-priority', jp: '安全性を優先すべきだと思います。', kana: 'あんぜんせいをゆうせんすべきだとおもいます', cn: '我认为应该优先安全性。', audioId: 'phrase-project-priority' },
    { id: 'project-deadline', jp: '締め切りまでに完了する見込みです。', kana: 'しめきりまでにかんりょうするみこみです', cn: '预计能在截止前完成。', audioId: 'phrase-project-deadline' },
    { id: 'project-support', jp: 'ご協力いただけると助かります。', kana: 'ごきょうりょくいただけるとたすかります', cn: '如果能协助我会很有帮助。', audioId: 'phrase-project-support' },
  ] },
  { id: 'customer-support', scene: '客户支持', level: 'N2', phrases: [
    { id: 'support-apology', jp: 'ご不便をおかけして申し訳ありません。', kana: 'ごふべんをおかけしてもうしわけありません', cn: '给您带来不便，非常抱歉。', audioId: 'phrase-support-apology' },
    { id: 'support-detail', jp: '詳細を確認いたします。', kana: 'しょうさいをかくにんいたします', cn: '我确认详细情况。', audioId: 'phrase-support-detail' },
    { id: 'support-cause', jp: '原因が分かり次第ご連絡します。', kana: 'げんいんがわかりしだいごれんらくします', cn: '原因一明确就联系您。', audioId: 'phrase-support-cause' },
    { id: 'support-option', jp: '代替案をご提案します。', kana: 'だいたいあんをごていあんします', cn: '我提出替代方案。', audioId: 'phrase-support-option' },
    { id: 'support-refund', jp: '返金の手続きを進めます。', kana: 'へんきんのてつづきをすすめます', cn: '推进退款手续。', audioId: 'phrase-support-refund' },
    { id: 'support-thanks', jp: 'ご理解いただきありがとうございます。', kana: 'ごりかいいただきありがとうございます', cn: '感谢您的理解。', audioId: 'phrase-support-thanks' },
  ] },
  { id: 'negotiation', scene: '商务协商', level: 'N2', phrases: [
    { id: 'negotiation-condition', jp: '条件について相談させてください。', kana: 'じょうけんについてそうだんさせてください', cn: '请允许我就条件进行商量。', audioId: 'phrase-negotiation-condition' },
    { id: 'negotiation-budget', jp: '予算の範囲内で検討します。', kana: 'よさんのはんいないでけんとうします', cn: '在预算范围内研究。', audioId: 'phrase-negotiation-budget' },
    { id: 'negotiation-schedule', jp: '日程を調整できないでしょうか。', kana: 'にっていをちょうせいできないでしょうか', cn: '能否调整日程？', audioId: 'phrase-negotiation-schedule' },
    { id: 'negotiation-benefit', jp: '双方にメリットがあります。', kana: 'そうほうにメリットがあります', cn: '对双方都有好处。', audioId: 'phrase-negotiation-benefit' },
    { id: 'negotiation-risk', jp: 'リスクを事前に共有しましょう。', kana: 'リスクをじぜんにきょうゆうしましょう', cn: '提前共享风险吧。', audioId: 'phrase-negotiation-risk' },
    { id: 'negotiation-agree', jp: 'その方針で進めましょう。', kana: 'そのほうしんですすめましょう', cn: '按这个方针推进吧。', audioId: 'phrase-negotiation-agree' },
  ] },
  { id: 'seminar', scene: '学术发表', level: 'N1', phrases: [
    { id: 'seminar-theme', jp: '本発表では需要の変化を分析します。', kana: 'ほんはっぴょうではじゅようのへんかをぶんせきします', cn: '本次发表将分析需求变化。', audioId: 'phrase-seminar-theme' },
    { id: 'seminar-perspective', jp: '別の視点から考察する必要があります。', kana: 'べつのしてんからこうさつするひつようがあります', cn: '需要从另一个视角考察。', audioId: 'phrase-seminar-perspective' },
    { id: 'seminar-data', jp: 'このデータは信頼に足るものです。', kana: 'このデータはしんらいにたるものです', cn: '这个数据值得信赖。', audioId: 'phrase-seminar-data' },
    { id: 'seminar-future', jp: '今後の課題について述べます。', kana: 'こんごのかだいについてのべます', cn: '接下来说明今后的课题。', audioId: 'phrase-seminar-future' },
  ] },
  { id: 'policy-debate', scene: '政策讨论', level: 'N1', phrases: [
    { id: 'policy-background', jp: 'まず制度変更の背景を整理します。', kana: 'まずせいどへんこうのはいけいをせいりします', cn: '首先整理制度变更的背景。', audioId: 'phrase-policy-background' },
    { id: 'policy-stakeholder', jp: '利害関係者の視点も考慮すべきです。', kana: 'りがいかんけいしゃのしてんもこうりょすべきです', cn: '也应该考虑利益相关者的视角。', audioId: 'phrase-policy-stakeholder' },
    { id: 'policy-impact', jp: '長期的な影響は無視できません。', kana: 'ちょうきてきなえいきょうはむしできません', cn: '不能忽视长期影响。', audioId: 'phrase-policy-impact' },
    { id: 'policy-principle', jp: '公平性を原則として判断します。', kana: 'こうへいせいをげんそくとしてはんだんします', cn: '以公平性为原则判断。', audioId: 'phrase-policy-principle' },
    { id: 'policy-data', jp: '客観的なデータに基づく必要があります。', kana: 'きゃっかんてきなデータにもとづくひつようがあります', cn: '需要基于客观数据。', audioId: 'phrase-policy-data' },
    { id: 'policy-conclusion', jp: '結論を急ぐべきではありません。', kana: 'けつろんをいそぐべきではありません', cn: '不应急于下结论。', audioId: 'phrase-policy-conclusion' },
  ] },
  { id: 'research-review', scene: '论文讨论', level: 'N1', phrases: [
    { id: 'research-definition', jp: 'この概念の定義を明確にしてください。', kana: 'このがいねんのていぎをめいかくにしてください', cn: '请明确这个概念的定义。', audioId: 'phrase-research-definition' },
    { id: 'research-method', jp: '分析方法には改善の余地があります。', kana: 'ぶんせきほうほうにはかいぜんのよちがあります', cn: '分析方法还有改善空间。', audioId: 'phrase-research-method' },
    { id: 'research-evidence', jp: '根拠となる資料を追加しましょう。', kana: 'こんきょとなるしりょうをついかしましょう', cn: '补充作为依据的资料吧。', audioId: 'phrase-research-evidence' },
    { id: 'research-position', jp: '先行研究との位置づけが重要です。', kana: 'せんこうけんきゅうとのいちづけがじゅうようです', cn: '与先行研究的定位很重要。', audioId: 'phrase-research-position' },
    { id: 'research-insight', jp: '結果は新たな示唆を含んでいます。', kana: 'けっかはあらたなしさをふくんでいます', cn: '结果包含新的启示。', audioId: 'phrase-research-insight' },
    { id: 'research-revise', jp: '構成を見直したほうがよいでしょう。', kana: 'こうせいをみなおしたほうがよいでしょう', cn: '最好重新检查结构。', audioId: 'phrase-research-revise' },
  ] },
  { id: 'executive-briefing', scene: '高阶汇报', level: 'N1', phrases: [
    { id: 'briefing-summary', jp: '要点を三つに絞ってご説明します。', kana: 'ようてんをみっつにしぼってごせつめいします', cn: '我把要点缩减为三点说明。', audioId: 'phrase-briefing-summary' },
    { id: 'briefing-demand', jp: '市場の需要は拡大傾向にあります。', kana: 'しじょうのじゅようはかくだいけいこうにあります', cn: '市场需求呈扩大趋势。', audioId: 'phrase-briefing-demand' },
    { id: 'briefing-risk', jp: '短期的な利益だけでは判断できません。', kana: 'たんきてきなりえきだけでははんだんできません', cn: '不能只根据短期收益判断。', audioId: 'phrase-briefing-risk' },
    { id: 'briefing-resource', jp: '限られた資源をどう分配するかが課題です。', kana: 'かぎられたしげんをどうぶんぱいするかがかだいです', cn: '如何分配有限资源是课题。', audioId: 'phrase-briefing-resource' },
    { id: 'briefing-strategy', jp: '既存事業との相乗効果が期待できます。', kana: 'きそんじぎょうとのそうじょうこうかがきたいできます', cn: '可以期待与现有业务的协同效果。', audioId: 'phrase-briefing-strategy' },
    { id: 'briefing-next', jp: '次の段階では具体策を検討します。', kana: 'つぎのだんかいではぐたいさくをけんとうします', cn: '下一阶段研究具体方案。', audioId: 'phrase-briefing-next' },
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

export const abroadTracks: AbroadTrack[] = [
  {
    id: 'entry',
    title: '入境与海关',
    goal: '能在机场、入境审查、海关申报时说明来日目的、停留时间和携带物品。',
    scenarios: ['机场问答', '护照与签证', '海关申报', '行李异常'],
    missions: ['背熟姓名、国籍、来日目的、停留地址的固定答法。', '练习听懂“何日間”“目的”“申告するもの”等关键词。', '能用短句说明行李丢失、航班延误、需要帮助。'],
    passCheck: '不用翻译软件也能完成一次入境问答模拟，并能复述对方要求。',
  },
  {
    id: 'transport',
    title: '交通与换乘',
    goal: '能独立问路、买票、换乘、确认晚点和到站信息。',
    scenarios: ['电车', '巴士', '出租车', '路线晚点'],
    missions: ['掌握车站、方向、换乘、票价、时间相关词汇。', '完成“从 A 到 B 怎么走”的问答练习。', '能说明目的地并确认是否需要换车或补票。'],
    passCheck: '能读懂基础站内提示，并用日语问清目的地路线。',
  },
  {
    id: 'hotel',
    title: '酒店与住宿',
    goal: '能完成入住、退房、早餐、Wi-Fi、房间问题等常见沟通。',
    scenarios: ['预约确认', '入住退房', '设备问题', '早餐与寄存'],
    missions: ['练习报姓名、出示护照、确认住宿天数。', '背熟“钥匙丢了”“空调坏了”“想寄存行李”等表达。', '能听懂前台关于时间、费用、规则的说明。'],
    passCheck: '能独立完成酒店入住和一次房间问题反馈。',
  },
  {
    id: 'food-shopping',
    title: '餐饮与购物',
    goal: '能点餐、说明忌口过敏、付款、退换货并处理简单服务沟通。',
    scenarios: ['餐厅点餐', '便利店', '药妆店', '退换货'],
    missions: ['掌握菜单、数量、口味、付款方式、收据相关表达。', '练习“不要某食材”“可以刷卡吗”“能退换吗”。', '能听懂店员关于袋子、加热、积分卡、税费的询问。'],
    passCheck: '能在餐厅和商店完成一次完整消费流程。',
  },
  {
    id: 'medical',
    title: '医疗与用药',
    goal: '能挂号、说明症状、听懂服药方式和复诊安排。',
    scenarios: ['医院挂号', '药局取药', '身体症状', '保险证'],
    missions: ['背熟发烧、咳嗽、疼痛、过敏等症状表达。', '练习说明症状开始时间、严重程度、是否有既往病史。', '能听懂“一天几次”“饭后”“请复诊”等用药说明。'],
    passCheck: '能完成一次挂号和取药模拟，准确复述服药要求。',
  },
  {
    id: 'housing',
    title: '租房与生活手续',
    goal: '能看房、询问租金、理解合同要点并处理入住后的基础问题。',
    scenarios: ['看房预约', '租金费用', '合同资料', '搬家入住'],
    missions: ['掌握家租、押金、礼金、管理费、保证人等高频词。', '练习询问面积、交通、入住日期、必要资料。', '能说明水电网络、钥匙、设备故障等生活问题。'],
    passCheck: '能完成一次看房沟通，并列出签约需要准备的资料。',
  },
  {
    id: 'emergency',
    title: '求助与紧急情况',
    goal: '能在遗失、受伤、迷路、报警等场景快速说清情况并求助。',
    scenarios: ['遗失钱包', '联系交番', '身体不适', '紧急求助'],
    missions: ['背熟“请帮我”“我迷路了”“钱包丢了”“需要警察/救护车”。', '练习说清地点、时间、物品特征、联系电话。', '能听懂对方要求你等待、填写、联系或移动到某处。'],
    passCheck: '能在压力场景下用短句说明问题、地点和需要的帮助。',
  },
  {
    id: 'work-study',
    title: '工作与学习沟通',
    goal: '能在学校、面试、兼职、职场里完成基础到高阶沟通。',
    scenarios: ['课堂提问', '面试应答', '工作确认', '会议汇报'],
    missions: ['从 N5 自我介绍推进到 N3 面试、N2 汇报、N1 讨论。', '练习确认任务、截止时间、资料、意见和反馈。', '能用敬语表达请求、道歉、确认、提案和总结。'],
    passCheck: '能完成一次自我介绍、一次面试问答和一次工作确认模拟。',
  },
]

export const examRoadmap: ExamRoadmapItem[] = [
  {
    level: 'N5',
    label: '零基础入门',
    passTarget: '认识基础假名、常用词和短句，能理解慢速日常问答。',
    dailyTarget: '每天 20-30 分钟：五十音点读、15 个词、2 个句型、1 组慢速听力。',
    sections: [
      { name: '词汇', target: '掌握问候、数字、时间、地点、交通、餐饮等基础词。', practice: '词库搜索、词汇训练、闪卡翻面记忆。' },
      { name: '语法', target: '掌握 です、ます、疑问句、指示词、基础助词。', practice: '每个句型造 5 个句子并朗读例句。' },
      { name: '阅读', target: '能读懂假名、基础汉字和短句提示。', practice: '把词条例句拆成词汇、助词、谓语三部分。' },
      { name: '听力', target: '能听懂慢速寒暄、课堂和生活短问答。', practice: '只点击发音键播放，跟读后再复述中文意思。' },
    ],
  },
  {
    level: 'N4',
    label: '生活独立',
    passTarget: '理解基础日常会话和较长一点的说明，能处理旅行生活问题。',
    dailyTarget: '每天 30-40 分钟：20 个词、2 个语法、2 段场景会话、一次小测。',
    sections: [
      { name: '词汇', target: '扩展购物、医院、酒店、学校、约定、手续相关词。', practice: '按分类训练后把不熟词手动加入复习。' },
      { name: '语法', target: '掌握 て形、ない形、可能、授受、请求和说明表达。', practice: '把会话句改成肯定、否定、请求三种形式。' },
      { name: '阅读', target: '能读懂日常通知、菜单、简单邮件和说明。', practice: '用词库例句做短文扫读，标出时间、地点、动作。' },
      { name: '听力', target: '能听懂慢速日常会话并抓住必要信息。', practice: '听场景会话后回答“谁、在哪里、要做什么”。' },
    ],
  },
  {
    level: 'N3',
    label: '日常过渡',
    passTarget: '在日常与工作入门场景中理解自然表达，能说明理由和情况。',
    dailyTarget: '每天 40-50 分钟：词汇分类、语法替换、会话复述、综合挑战。',
    sections: [
      { name: '词汇', target: '掌握生活、工作、抽象理由、变化、结果等过渡词。', practice: '用闪卡把日文、假名、中文、例句四项连起来。' },
      { name: '语法', target: '掌握条件、推量、转折、目的、原因等表达。', practice: '每个语法写出一个生活句和一个工作句。' },
      { name: '阅读', target: '能读懂日常主题短文、通知和带观点的说明。', practice: '读例句后总结主旨，再改写成自己的句子。' },
      { name: '听力', target: '能听懂接近自然速度的日常连贯会话。', practice: '会话听两遍：第一遍抓场景，第二遍抓细节。' },
    ],
  },
  {
    level: 'N2',
    label: '工作学习',
    passTarget: '理解较复杂说明、意见表达和工作学习文章，能进行正式沟通。',
    dailyTarget: '每天 50-60 分钟：高级词汇、正式语法、汇报会话、错题复盘。',
    sections: [
      { name: '词汇', target: '掌握责任、条件、改善、评价、组织、资源等正式词。', practice: '把词汇放入项目汇报、客户支持、商务协商场景。' },
      { name: '语法', target: '掌握限定、依据、婉拒、不得不、正式转折等句型。', practice: '把语法卡例句改写成邮件或会议表达。' },
      { name: '阅读', target: '能读懂工作说明、评论、较复杂通知和观点文章。', practice: '训练先看主题句，再找理由、对策和结论。' },
      { name: '听力', target: '能听懂工作学习场景中的说明、提案和协商。', practice: '听完后说出结论、风险、下一步行动。' },
    ],
  },
  {
    level: 'N1',
    label: '高阶应用',
    passTarget: '理解复杂文章、新闻、评论和接近自然速度的长对话。',
    dailyTarget: '每天 60 分钟以上：抽象词汇、书面语法、长段理解、主题总结。',
    sections: [
      { name: '词汇', target: '掌握概念、分析、原则、制度、利益、研究等抽象词。', practice: '用每个词写一个观点句，并加入论据或例子。' },
      { name: '语法', target: '掌握书面、评论、学术讨论中常见的高阶句型。', practice: '把语法例句扩展成一段 3 句观点说明。' },
      { name: '阅读', target: '能理解评论、论文讨论、抽象议题和文章结构。', practice: '训练找主张、根据、反论、结论四个位置。' },
      { name: '听力', target: '能听懂自然速度新闻、讨论、汇报和长对话重点。', practice: '听完后用中文先概括，再用日语复述关键词。' },
    ],
  },
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
