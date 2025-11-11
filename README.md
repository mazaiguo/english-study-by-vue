# 语言学习乐园 🎨

> 纯手势操作的双语学习应用，专为3-12岁儿童设计

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.4+-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite)](https://vitejs.dev/)
[![Version](https://img.shields.io/badge/version-2.4.4-blue.svg)](https://github.com/mazaiguo/english-study-by-vue)

## 📖 目录

- [项目介绍](#项目介绍)
- [核心特性](#核心特性)
- [快速开始](#快速开始)
- [使用指南](#使用指南)
- [项目结构](#项目结构)
- [技术架构](#技术架构)
- [开发指南](#开发指南)
- [部署说明](#部署说明)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 🎯 项目介绍

**语言学习乐园**是一款基于 Vue 3 的现代化儿童语言学习应用，专注于提供直观、有趣的学习体验。通过纯手势操作和丰富的视听内容，让3-12岁儿童能够自主、快乐地学习英语和普通话。

### ✨ 核心特性

#### 🖐️ 纯手势操作
- **左右滑动** - 切换上一个/下一个
- **点击卡片** - 自动朗读内容
- **下滑** - 返回主菜单
- 支持触摸屏和鼠标操作

#### 🎨 5套精美主题
1. **彩虹糖果** - 明亮活泼，适合3-8岁 ⭐
2. **森林探险** - 自然温暖
3. **太空冒险** - 科技梦幻
4. **海洋世界** - 清新海洋
5. **动物乐园** - 温暖可爱

#### 🌍 双语学习体系

**英语学习**
- ✅ 单词学习（20个基础单词）
- ✅ 句子学习（15个日常句子）
- ✅ 元音练习（12个元音）
- ✅ 辅音练习（24个辅音）
- ✅ 双元音练习（8个双元音）

**普通话学习**
- ✅ 单词学习（20个常用词语）
- ✅ 句子学习（15个日常句子）
- ✅ 声母练习（21个声母）
- ✅ 韵母练习（24个韵母）
- ✅ 声调练习（20个声调）

#### 🔊 智能语音系统
- 浏览器内置 TTS 语音合成
- 支持英语（美式/英式）和普通话
- 可调节语速（0.5x - 2.0x）
- 自动朗读功能

#### 🖼️ 多媒体内容
- 图片辅助学习
- 视频内容支持
- 智能占位符显示
- 本地优先 + 远程回退

#### 📚 课程管理
- 按课程分类学习
- 支持选择特定课程
- 显示学习进度
- 灵活的课程切换

## 🚀 快速开始

### 前置要求

- **Node.js** 16+ 
- **npm** 或 yarn
- 现代浏览器（Chrome、Firefox、Edge、Safari）

### 安装步骤

#### 1️⃣ 克隆项目

```bash
git clone https://github.com/mazaiguo/english-study-by-vue.git
cd english-study-by-vue
```

#### 2️⃣ 安装依赖

```bash
npm install
```

#### 3️⃣ 启动开发服务器

```bash
npm run dev
```

浏览器将自动打开 `http://localhost:3000`

#### 4️⃣ 构建生产版本

```bash
npm run build
```

构建结果在 `dist/` 目录

#### 5️⃣ 预览生产版本

```bash
npm run preview
```

### 📦 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（端口3000） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |
| `npm run sync-all` | 同步所有资源（数据+媒体） |
| `npm run sync-data` | 仅同步JSON数据 |
| `npm run sync-images` | 仅同步图片 |
| `npm run sync-videos` | 仅同步视频 |
| `npm run sync-media` | 同步图片和视频 |

## 📱 使用指南

### 手势操作说明

```
👆 点击卡片     → 朗读当前内容（触发TTS语音）
👉 右滑（>100px）→ 下一个单词/句子
👈 左滑（>100px）→ 上一个单词/句子
👇 下滑（>100px）→ 返回主菜单
```

### 手势判定参数

- **点击**：移动距离 < 10px 且 时间 < 0.3秒
- **滑动**：移动距离 ≥ 100px
- 支持触摸屏和鼠标操作

### 主题切换

在主菜单右上角的下拉框选择主题，设置会自动保存到浏览器本地存储。

### 语音设置

点击设置按钮（⚙️）可以调整：
- **语速**：0.5x（慢） ~ 2.0x（快）
- **英语发音**：美式 🇺🇸 / 英式 🇬🇧
- **测试发音**：试听当前设置

### 课程选择

在学习页面的设置面板中：
1. 选择"全部"查看所有内容
2. 选择特定课程（如"第1课"）仅学习该课程内容
3. 课程选择会实时过滤显示的内容

## 📁 项目结构

```
english-study-by-vue/
├── public/                    # 静态资源
│   ├── data/                  # JSON数据文件
│   ├── images/                # 图片资源
│   └── videos/                # 视频资源
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── global.css     # 全局样式
│   │       └── card-common.css # 卡片公共样式
│   ├── components/            # 可复用组件
│   │   ├── LearningCard.vue   # 学习卡片容器（手势处理）
│   │   ├── MandarinWordCard.vue      # 普通话单词卡片
│   │   ├── MandarinSentenceCard.vue  # 普通话句子卡片
│   │   ├── EnglishWordCard.vue       # 英语单词卡片
│   │   ├── EnglishSentenceCard.vue   # 英语句子卡片
│   │   ├── PinyinCard.vue            # 拼音卡片
│   │   ├── PhoneticCard.vue          # 音标卡片
│   │   └── SettingsPanel.vue         # 设置面板
│   ├── composables/           # 可复用逻辑
│   │   ├── useGesture.js      # 手势操作逻辑
│   │   └── useTTS.js          # 语音合成逻辑
│   ├── data/                  # 本地备用数据
│   │   ├── mandarin_words.json
│   │   ├── mandarin_sentences.json
│   │   ├── english_words.json
│   │   ├── english_sentences.json
│   │   ├── pinyin_*.json
│   │   └── phonetic_*.json
│   ├── router/
│   │   └── index.js           # 路由配置（10个学习场景）
│   ├── stores/                # 状态管理（Pinia）
│   │   ├── theme.js           # 主题状态
│   │   └── settings.js        # 设置状态
│   ├── utils/                 # 工具函数
│   │   ├── dataLoader.js      # 数据加载（本地优先）
│   │   ├── imageLoader.js     # 媒体加载（本地优先+回退）
│   │   └── debug.js           # 调试工具
│   ├── views/                 # 页面组件
│   │   ├── MainMenu.vue       # 主菜单
│   │   ├── english/           # 英语学习
│   │   │   ├── WordsScene.vue
│   │   │   └── SentencesScene.vue
│   │   ├── mandarin/          # 普通话学习
│   │   │   ├── WordsScene.vue
│   │   │   └── SentencesScene.vue
│   │   ├── pinyin/            # 拼音练习
│   │   │   ├── InitialsScene.vue
│   │   │   ├── FinalsScene.vue
│   │   │   └── TonesScene.vue
│   │   └── phonetic/          # 音标练习
│   │       ├── VowelsScene.vue
│   │       ├── ConsonantsScene.vue
│   │       └── DiphthongsScene.vue
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── scripts/                   # 构建脚本
│   ├── sync-data.js           # 数据同步脚本
│   └── sync-media.js          # 媒体同步脚本
├── index.html
├── vite.config.js             # Vite配置
├── package.json
├── LICENSE
└── README.md
```

## 🛠️ 技术架构

### 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vue 3** | 3.4+ | 渐进式前端框架 |
| **Vue Router** | 4.2+ | 单页面路由管理 |
| **Pinia** | 2.1+ | 状态管理 |
| **Vite** | 5.0+ | 现代化构建工具 |
| **Web Speech API** | - | 浏览器TTS语音合成 |

### 关键特性实现

#### 1. 手势系统（`useGesture.js`）

```javascript
// 触摸/鼠标事件统一处理
// 滑动方向识别（水平/垂直）
// 点击与滑动区分
// 防抖处理
```

#### 2. 语音系统（`useTTS.js`）

```javascript
// Web Speech API 封装
// 多语言支持（英语/普通话）
// 语速/音调控制
// 浏览器兼容性处理
```

#### 3. 资源加载（`imageLoader.js` + `dataLoader.js`）

```javascript
// 本地优先策略
// 自动回退机制（本地→远程→缓存/占位符）
// 错误处理和日志
// 性能优化（懒加载、预加载）
```

#### 4. 主题系统（`theme.js`）

```javascript
// 5套预设主题
// 动态切换
// 持久化存储
// CSS变量驱动
```

#### 5. 设置系统（`settings.js`）

```javascript
// 语速控制
// 英语口音选择（美式/英式）
// 课程选择
// 持久化存储
```

### 响应式设计

项目采用移动优先的响应式设计策略：

```css
/* 断点设置 */
- 桌面端：> 768px
- 平板：≤ 768px
- 手机：≤ 480px
- iPhone 14 Pro Max：415-440px
- iPhone 14/Pro：385-400px
- iPhone SE：≤ 375px
```

自动适配：
- ✅ 移动设备（手机）
- ✅ 平板设备
- ✅ 桌面浏览器
- ✅ 触摸屏设备

## 👨‍💻 开发指南

### 添加新的学习模块

#### 1️⃣ 创建数据文件

在 `src/data/` 创建 JSON 文件：

```json
// new_module.json
[
  {
    "id": 1,
    "content": "内容",
    "translation": "翻译",
    "imageFile": "image_1.jpg",
    "lesson": 1,
    "category": "基础"
  }
]
```

#### 2️⃣ 创建卡片组件

在 `src/components/` 创建组件：

```vue
<template>
  <div class="new-card">
    <!-- 卡片内容 -->
  </div>
</template>

<script setup>
import { getImageUrl, handleImageError } from '@/utils/imageLoader'
// 组件逻辑
</script>

<style scoped>
/* 特殊样式，公共样式已在 card-common.css */
</style>
```

#### 3️⃣ 创建场景页面

在 `src/views/` 创建场景：

```vue
<template>
  <LearningCard
    :current-item="currentItem"
    :total-items="items.length"
    @next="handleNext"
    @previous="handlePrevious"
    @back="handleBack"
    @tap="handleTap"
  >
    <NewCard :item="currentItem" />
  </LearningCard>
</template>

<script setup>
// 场景逻辑
</script>
```

#### 4️⃣ 添加路由

在 `src/router/index.js` 添加：

```javascript
{
  path: '/new/module',
  name: 'NewModule',
  component: () => import('@/views/new/ModuleScene.vue'),
  meta: { title: '新模块' }
}
```

#### 5️⃣ 添加菜单入口

在 `src/views/MainMenu.vue` 添加按钮：

```vue
<button
  class="module-button"
  @click="navigate('/new/module')"
>
  <span class="button-icon">🆕</span>
  <span class="button-title">新模块</span>
</button>
```

### 自定义主题

编辑 `src/stores/theme.js`：

```javascript
customTheme: {
  name: '自定义主题',
  description: '主题描述',
  colors: {
    background: '#F0F8FF',
    cardBackground: '#FFFFFF',
    primaryText: '#2C3E50',
    secondaryText: '#7F8C8D',
    // ... 其他颜色
  }
}
```

### 调试模式

#### 启用调试日志

项目已默认开启详细的调试日志：

```javascript
// src/composables/useGesture.js
const DEBUG = true  // 手势操作日志

// src/composables/useTTS.js
const DEBUG = true  // 语音合成日志

// src/utils/dataLoader.js
const DEBUG = true  // 数据加载日志

// src/utils/imageLoader.js
const DEBUG = true  // 媒体加载日志
```

打开浏览器控制台（F12）可以看到：
- 🚀 路由导航
- 👆 手势操作
- 🔊 TTS语音
- 📖 场景加载
- 🖼️ 图片加载
- 📂 数据加载

## 🚀 部署说明

### 方法1：Cloudflare Pages（推荐）

#### 自动构建部署

在 Cloudflare Pages 设置：

```yaml
构建命令: npm install && npm run sync-all && npm run build
输出目录: dist
Node版本: 18
环境变量: NODE_VERSION=18
```

### 方法2：Vercel

```yaml
构建命令: npm run sync-all && npm run build
输出目录: dist
Node版本: 18
```

### 方法3：Netlify

```yaml
构建命令: npm run sync-all && npm run build
发布目录: dist
Node版本: 18
```

### 方法4：GitHub Pages

#### 1️⃣ 修改 `vite.config.js`

```javascript
export default defineConfig({
  base: '/仓库名/',  // 替换为你的仓库名
  // ...
})
```

#### 2️⃣ 构建并部署

```bash
npm run sync-all
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:用户名/仓库名.git master:gh-pages
```

### 本地构建并部署

```bash
# 1. 同步资源
npm run sync-all

# 2. 构建
npm run build

# 3. 部署 dist/ 目录到服务器
```

### 环境配置

#### 开发环境

- 数据：本地 `public/data/` 优先
- 图片：本地 `public/images/` 优先
- 视频：本地 `public/videos/` 优先
- 失败时自动回退到 GitHub Pages

#### 生产环境

- 所有资源从 `dist/` 目录加载
- 确保运行 `npm run sync-all` 同步资源
- 静态资源CDN加速（可选）

## 🐛 常见问题

### Q1: 启动开发服务器失败？

**解决方案：**

```bash
# 清理缓存并重新安装
rm -rf node_modules package-lock.json
npm install

# 使用批处理脚本（Windows）
.\启动服务器.bat
```

### Q2: 图片/视频不显示？

**检查清单：**
- [ ] `public/images/` 或 `public/videos/` 目录存在
- [ ] 文件名与JSON中的 `imageFile` 一致
- [ ] 运行过 `npm run sync-media`
- [ ] 检查浏览器控制台的加载日志

**手动修复：**

```bash
# 同步图片
npm run sync-images

# 同步视频
npm run sync-videos

# 同步所有媒体
npm run sync-media
```

### Q3: TTS 语音不工作？

**检查：**
1. 浏览器是否支持 Web Speech API（推荐 Chrome/Edge）
2. 系统音量是否打开
3. 浏览器是否静音
4. 查看控制台是否有 `⚠️ 浏览器不支持 Web Speech API`

**浏览器支持：**
- ✅ Chrome / Edge（最佳）
- ✅ Firefox（良好）
- ✅ Safari（基础支持）
- ❌ IE（不支持）

### Q4: 手势不响应？

**调试步骤：**
1. 打开控制台（F12）
2. 查看是否有 `👆 Touch Start` 和 `👆 Touch End` 日志
3. 确认滑动距离 `distance >= 100px`

**手势判定：**
- **点击**：`distance < 10px` 且 `时间 < 300ms`
- **水平滑动**：`absX > absY` 且 `absX >= 100px`
- **垂直滑动**：`absY > absX` 且 `absY >= 100px`

### Q5: 路由跳转失败？

**调试：**
1. 查看控制台错误信息
2. 检查是否显示 `❌ 路由错误: TypeError: Failed to fetch...`
3. 清除浏览器缓存：`Ctrl+Shift+R`

**解决：**

```bash
# 清除 Vite 缓存
rm -rf node_modules/.vite

# 重启服务器
npm run dev
```

### Q6: 数据更新不生效？

**原因：** 浏览器缓存了旧数据

**解决：**

```bash
# 1. 同步最新数据
npm run sync-data

# 2. 强制刷新浏览器
Ctrl+Shift+R  # Windows/Linux
Cmd+Shift+R   # Mac

# 3. 清除 localStorage
# 在浏览器控制台执行：
localStorage.clear()
```

### Q7: 端口 3000 被占用？

**解决：**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

或修改 `vite.config.js`：

```javascript
server: {
  port: 3001,  // 改为其他端口
  // ...
}
```

## 🤝 贡献指南

欢迎贡献新功能、修复Bug或改进文档！

### 贡献流程

1. **Fork** 本仓库
2. 创建功能分支
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 提交更改
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. 推送到分支
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 开启 **Pull Request**

### 代码规范

- 遵循 Vue 3 Composition API 风格
- 使用 ESLint 和 Prettier 格式化代码
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case
- 提交信息使用清晰的描述

### 提交信息格式

```
类型: 简短描述

详细说明（可选）

相关issue: #123
```

**类型：**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

## 📊 项目统计

- **代码行数:** ~5,000+ 行
- **组件数量:** 20+ 个
- **页面数量:** 11 个
- **数据条目:** 200+ 个
- **主题配色:** 5 套
- **支持年龄:** 3-12 岁
- **学习模块:** 10 个
- **支持语言:** 英语 + 普通话

## 🎯 使用场景

- 👶 **家长辅导** - 家长辅导儿童在家学习
- 🏫 **课堂教学** - 幼儿园/小学课堂教学辅助
- 📚 **自主学习** - 儿童独立使用自主学习
- 🌐 **在线教育** - 集成到在线教育平台
- 👨‍👩‍👧 **亲子互动** - 家庭亲子学习活动

## 🔮 未来计划

### 短期计划（v2.5.x）
- [ ] 添加学习进度追踪
- [ ] 支持用户账户系统
- [ ] 添加成就徽章系统
- [ ] 优化移动端体验

### 中期计划（v3.0.x）
- [ ] 支持离线模式（PWA）
- [ ] 添加更多语言（日语、韩语）
- [ ] AI 语音评测
- [ ] 家长管理后台

### 长期计划（v4.0+）
- [ ] 多人互动游戏
- [ ] AR/VR 学习模式
- [ ] 社区分享功能
- [ ] 智能学习推荐

## 📞 联系我们

- **项目主页:** [GitHub](https://github.com/mazaiguo/english-study-by-vue)
- **问题反馈:** [Issues](https://github.com/mazaiguo/english-study-by-vue/issues)
- **作者:** mazaiguo

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue状态管理
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) - 浏览器语音API

## 📜 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

```
MIT License

Copyright (c) 2025 mazaiguo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**🎉 祝学习愉快！**

Made with ❤️ by [mazaiguo](https://github.com/mazaiguo)

⭐ 如果这个项目对你有帮助，请给个 Star！

</div>

