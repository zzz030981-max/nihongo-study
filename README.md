# 日语学习

零基础到 N5 的日语学习网站。第一版专注学习功能，不接在线翻译。

## 功能

- 本地 N5 词库：搜索、分类、收藏、掌握状态、例句
- 五十音：平假名 / 片假名切换和点读
- N5 语法：核心句型、中文解释、例句点读
- 场景会话：便利店、问路、餐厅、自我介绍
- 复习队列：收藏、错题、未掌握词优先
- 自测系统：假名、词汇、语法、综合测试
- 学习计划：10 天入门任务，本地保存进度
- 固定音频：180 个 mp3 文件，与词条和例句清单一一对应

## 本地运行

```bash
npm install
npm run audio:manifest
npm run audio:verify
npm run dev
```

## 检查

```bash
npm test
npm run lint
npm run build
npm run audio:verify
```

## GitHub Pages

仓库使用 GitHub Actions 构建并发布到 GitHub Pages。Vite 的 `base` 已设置为 `/nihongo-study/`。

发布后地址通常是：

```text
https://<github-username>.github.io/nihongo-study/
```

## 发音说明

正式页面不使用浏览器系统朗读。所有发音按钮都播放 `public/audio` 下的固定 mp3 文件；没有音频清单项的内容不会显示发音按钮。
