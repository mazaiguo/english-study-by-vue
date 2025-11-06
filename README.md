# 语言学习应用（儿童版）👶📱

> 纯手势操作的双语学习应用，专为3-12岁儿童设计

[![Unity](https://img.shields.io/badge/Unity-2021%2B-black?logo=unity)](https://unity.com/)
[![C#](https://img.shields.io/badge/C%23-7.3-239120?logo=c-sharp)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![Platform](https://img.shields.io/badge/Platform-WebGL%20%7C%20Android%20%7C%20iOS-blue)](https://unity.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🎯 核心特性

- **🖐️ 纯手势操作** - 左右滑动、点击朗读、下滑返回，无物理按钮
- **🎨 5套主题配色** - 彩虹糖果、森林探险、太空冒险、海洋世界、动物乐园
- **🌍 双语学习** - 英语（单词+句子+音标）+ 普通话（单词+句子+拼音）
- **🔊 TTS发音** - WebGL浏览器语音合成，自动朗读
- **📚 10个学习模块** - 模块化设计，独立场景

---

## 📚 学习模块

### 英语学习
- **单词学习** - 基础英语单词
- **句子学习** - 日常英语句子
- **音标练习** - 元音12个 + 辅音24个 + 双元音8个

### 普通话学习
- **单词学习** - 常用汉字词语（20个）
- **句子学习** - 日常普通话句子（15个）
- **拼音练习** - 声母21个 + 韵母24个 + 声调20个

---

## 🖐️ 手势操作

```
👆 点击卡片     → 朗读当前内容
👉 右滑（>100px）→ 下一个单词/句子
👈 左滑（>100px）→ 上一个单词/句子
👇 下滑（>100px）→ 返回主菜单
👆 上滑（>100px）→ 切换课程（可选）
```

**手势判定：**
- 点击：移动距离 < 10px 且 时间 < 0.3秒
- 滑动：移动距离 ≥ 100px

---

## 🚀 快速开始

### 前置要求
- Unity 2021.3+ (支持C# 7.3)
- TextMeshPro 包
- WebGL 构建模块（用于TTS）

### 安装步骤

#### 1. 克隆项目
   ```bash
   git clone https://github.com/yourusername/EnglishStudyDemo.git
   cd EnglishStudyDemo
   ```

#### 2. 打开Unity项目
```
1. 打开Unity Hub
2. 点击"添加" → 选择项目文件夹
3. Unity版本选择 2021.3 或更高
```

#### 3. 构建WebGL（测试TTS）
```
File → Build Settings
├── Platform: WebGL
├── Switch Platform
└── Build And Run

TTS发音必须在WebGL版本中测试！
Unity编辑器不支持Web Speech API。
```

---

## 📖 项目结构

```
Assets/
├── Scenes/                     (11个场景)
│   ├── MainMenu.unity          (主菜单) ⭐
│   ├── MandarinWordScene.unity (普通话单词)
│   ├── MandarinSentenceScene.unity (普通话句子)
│   ├── PinyinInitialsScene.unity (声母练习)
│   ├── PinyinFinalsScene.unity (韵母练习)
│   ├── PinyinTonesScene.unity  (声调练习)
│   ├── PhoneticVowelsScene.unity (元音练习)
│   ├── PhoneticConsonantsScene.unity (辅音练习)
│   ├── PhoneticDiphthongsScene.unity (双元音练习)
│   ├── SampleScene.unity       (英语单词)
│   └── SentenceScene.unity     (英语句子)
│
├── Scripts/
│   ├── Core/                   (核心管理器)
│   │   ├── ThemeData.cs        (5套主题配色定义) ⭐
│   │   ├── ThemeManager.cs     (主题管理单例) ⭐
│   │   ├── DataManager.cs      (英语数据管理)
│   │   ├── MandarinDataManager.cs (普通话数据)
│   │   ├── PinyinDataManager.cs   (拼音数据)
│   │   ├── PhoneticDataManager.cs (音标数据)
│   │   ├── TTSManager.cs       (语音合成)
│   │   ├── GameManager.cs      (游戏状态)
│   │   └── AudioManager.cs     (音频播放)
│   │
│   ├── Cards/                  (卡片脚本)
│   │   ├── WordCard.cs         (英语单词卡片)
│   │   ├── SentenceCard.cs     (英语句子卡片)
│   │   ├── MandarinWordCard.cs (普通话单词卡片)
│   │   ├── MandarinSentenceCard.cs (普通话句子卡片)
│   │   ├── PinyinCard.cs       (拼音练习卡片)
│   │   └── PhoneticCard.cs     (音标练习卡片)
│   │
│   └── UI/
│       ├── ThemeableUI.cs      (自动应用主题组件) ⭐
│       └── Menus/
│           └── MainMenu.cs     (主菜单管理)
│
└── Resources/
    └── Data/                   (JSON数据文件)
        ├── mandarin_words.json         (普通话单词20个)
        ├── mandarin_sentences.json     (普通话句子15个)
        ├── pinyin_initials.json        (声母21个)
        ├── pinyin_finals.json          (韵母24个)
        ├── pinyin_tones.json           (声调20个)
        ├── phonetic_vowels.json        (元音12个)
        ├── phonetic_consonants.json    (辅音24个)
        └── phonetic_diphthongs.json    (双元音8个)
```

---

## 🎨 主题系统

### 5套预设主题

#### 1. 彩虹糖果 Rainbow（默认）⭐
```
特点: 明亮活泼，适合3-8岁
配色: 浅蓝背景 + 橙粉主色 + 黄蓝强调色
```

#### 2. 森林探险 Forest
```
特点: 自然温暖，适合喜欢自然的儿童
配色: 奶油背景 + 绿棕主色
```

#### 3. 太空冒险 Space
```
特点: 科技梦幻，适合喜欢科幻的儿童
配色: 深蓝背景 + 高对比度亮色
```

#### 4. 海洋世界 Ocean
```
特点: 清新海洋，适合喜欢海洋的儿童
配色: 浅海蓝背景 + 珊瑚橙主色
```

#### 5. 动物乐园 Animals
```
特点: 温暖可爱，适合喜欢小动物的儿童
配色: 浅黄背景 + 粉绿主色
```

### 主题切换

**用户端：**
- 主菜单右上角下拉框 → 选择主题 → 即时切换

**代码端：**
```csharp
// 按索引切换
ThemeManager.Instance.SetTheme(0); // 彩虹糖果

// 按名称切换
ThemeManager.Instance.SetThemeByName("森林探险 Forest");

// 获取当前主题
ThemeData theme = ThemeManager.Instance.GetCurrentTheme();
Color cardBg = theme.colors.cardBackground;
```

### ThemeableUI组件

自动应用主题到UI元素，无需手写代码：

```
选择UI元素 → Add Component → ThemeableUI

配置:
├── Component Type: Background / Text / Button / ButtonText
└── Color Type: CardBackground / MandarinPrimary / AccentBlue...

或使用Feature Name (按钮推荐):
└── Feature Name: "english" / "mandarin" / "pinyin"
```

**示例：**
```
HanziText (TextMeshProUGUI):
├── ThemeableUI
│   ├── Component Type: Text
│   └── Color Type: MandarinPrimary
```

---

## 💾 数据管理

### JSON数据结构

#### 普通话单词（mandarin_words.json）
```json
{
  "words": [
    {
      "id": 1,
      "hanzi": "你好",
      "pinyin": "nǐ hǎo",
      "translation": "hello",
      "audioFile": "",
      "imageFile": "",
      "level": 1,
      "category": "greeting",
      "lesson": 1
    }
  ]
}
```

#### 拼音数据（pinyin_initials.json）
```json
{
  "initials": [
    {
      "id": 1,
      "pinyin": "b",
      "description": "双唇不送气清塞音",
      "exampleCharacter": "爸",
      "examplePinyin": "bà",
      "audioFile": "",
      "category": "双唇音",
      "difficulty": "easy"
    }
  ]
}
```

### 访问数据

```csharp
// 普通话单词
MandarinWord word = MandarinDataManager.Instance.GetWordByID(1);
List<MandarinWord> lesson1Words = MandarinDataManager.Instance.GetWordsByLesson(1);

// 拼音声母
PinyinInitial initial = PinyinDataManager.Instance.GetInitialByID(1);
List<PinyinInitial> allInitials = PinyinDataManager.Instance.GetAllInitials();

// 英语音标
PhoneticVowel vowel = PhoneticDataManager.Instance.GetVowelByID(1);
```

---

## 🔊 TTS语音系统

### 支持语言

- **英语 (en-US/en-GB)** - 美式/英式发音
- **普通话 (zh-CN)** - 中文标准普通话

### 使用方法

```csharp
// 英语发音
TTSManager.Instance.Speak("Hello");
TTSManager.Instance.SpeakEnglish("How are you?");

// 普通话发音
TTSManager.Instance.SpeakMandarin("你好");

// 设置语音参数
TTSManager.Instance.pitch = 1.2f;   // 音调
TTSManager.Instance.rate = 1.0f;    // 语速
TTSManager.Instance.volume = 1.0f;  // 音量
```

### 注意事项

⚠️ **TTS只在WebGL版本中有效！**
- Unity编辑器不支持Web Speech API
- 必须构建WebGL版本在浏览器中测试
- 支持的浏览器：Chrome, Firefox, Edge

---

## 🛠️ 开发指南

### 详细UI创建步骤

#### 步骤1：创建主菜单场景（MainMenu）

##### 1.1 创建场景
```
File → New Scene → 2D
保存为: Assets/Scenes/MainMenu.unity
```

##### 1.2 创建Canvas
```
Hierarchy → UI → Canvas

Inspector配置:
├── Render Mode: Screen Space - Overlay
├── Canvas Scaler:
│   ├── UI Scale Mode: Scale With Screen Size
│   ├── Reference Resolution: 1920 x 1080
│   └── Match: 0.5
└── Graphic Raycaster: ✓
```

##### 1.3 创建标题和主题下拉框
```
Canvas → UI → Text - TextMeshPro (标题)
├── 名称: TitleText
├── Text: "语言学习乐园"
├── Font Size: 80
├── Position: (0, 300)
├── Color: #FF6B9D (粉色)
└── 添加Outline（白色，厚度3）

Canvas → UI → Dropdown - TextMeshPro (主题切换)
├── 名称: ThemeDropdown
├── Position: (850, 480) 右上角
├── 大小: (350, 60)
├── Label Font Size: 28
└── Item Font Size: 26
```

##### 1.4 创建功能按钮（10个）

**布局方式：Grid Layout Group**
```
Canvas → 创建空GameObject: ButtonArea
├── Position: (0, -50)
├── 添加Grid Layout Group:
│   ├── Cell Size: (400, 200)
│   ├── Spacing: (50, 30)
│   ├── Constraint: Fixed Column Count = 2
│   └── Child Alignment: Middle Center
```

**创建按钮（每个按钮结构相同）：**
```
ButtonArea → UI → Button - TextMeshPro
├── 名称: EnglishWordButton
├── Background Color: #FF9800 (橙色)
├── 圆角: 30px (使用Rounded Sprite)
│
├── 子对象 - IconText (Emoji图标):
│   ├── Text: "🅰️"
│   ├── Font Size: 60
│   └── Position: (0, 50)
│
├── 子对象 - TitleText (主标题):
│   ├── Text: "单词学习"
│   ├── Font Size: 36
│   └── Position: (0, 0)
│
└── 子对象 - SubtitleText (副标题):
    ├── Text: "Words"
    ├── Font Size: 28
    └── Position: (0, -30)
```

**10个按钮配置：**
```
左列（英语，橙蓝色系）:
├── EnglishWordButton (#FF9800 橙色) 🅰️ "单词学习/Words"
├── EnglishSentenceButton (#42A5F5 蓝色) 📝 "句子学习/Sentences"
├── PhoneticVowelsButton (#FFD54F 黄色) 🔤 "元音练习/Vowels"
├── PhoneticConsonantsButton (#AB47BC 紫色) 🔤 "辅音练习/Consonants"
└── PhoneticDiphthongsButton (#4CAF50 绿色) 🔤 "双元音/Diphthongs"

右列（普通话，粉红色系）:
├── MandarinWordButton (#FF6B9D 粉色) 🀄 "单词学习/Words"
├── MandarinSentenceButton (#EF5350 红色) 📝 "句子学习/Sentences"
├── PinyinInitialsButton (#FFD54F 黄色) 🎵 "声母练习/Initials"
├── PinyinFinalsButton (#AB47BC 紫色) 🎵 "韵母练习/Finals"
└── PinyinTonesButton (#4CAF50 绿色) 🎵 "声调练习/Tones"
```

##### 1.5 添加MainMenu脚本
```
创建空GameObject: MenuManager
Position: (0, 0, 0)

添加组件: MainMenu.cs

Inspector配置:
├── UI元素:
│   ├── Title Text: TitleText
│   ├── Theme Dropdown: ThemeDropdown
│   └── Version Text: (可选)
│
├── 场景名称（10个）:
│   ├── English Word Scene Name: "SampleScene"
│   ├── English Sentence Scene Name: "SentenceScene"
│   ├── Mandarin Word Scene Name: "MandarinWordScene"
│   ├── Mandarin Sentence Scene Name: "MandarinSentenceScene"
│   ├── Pinyin Initials Scene Name: "PinyinInitialsScene"
│   ├── Pinyin Finals Scene Name: "PinyinFinalsScene"
│   ├── Pinyin Tones Scene Name: "PinyinTonesScene"
│   ├── Phonetic Vowels Scene Name: "PhoneticVowelsScene"
│   ├── Phonetic Consonants Scene Name: "PhoneticConsonantsScene"
│   └── Phonetic Diphthongs Scene Name: "PhoneticDiphthongsScene"
│
└── 设置:
    ├── Show Welcome Message: ✓
    └── App Version: "v1.0.0"
```

##### 1.6 配置按钮点击事件（每个按钮）
```
选择按钮 → Inspector → Button (Script) → On Click()

点击 "+" → 拖入 MenuManager → 选择对应函数:
- EnglishWordButton → MainMenu.EnterEnglishWordScene()
- MandarinWordButton → MainMenu.EnterMandarinWordScene()
- PinyinInitialsButton → MainMenu.EnterPinyinInitialsScene()
... (共10个)
```

##### 1.7 为按钮添加ThemeableUI（可选但推荐）
```
选择按钮Background → Add Component → ThemeableUI
├── Component Type: Button
└── Feature Name: "english" (或对应功能)

选择按钮Text → Add Component → ThemeableUI
├── Component Type: ButtonText
└── Color Type: WhiteText
```

##### 1.8 保存场景
```
Ctrl + S
```

---

#### 步骤2：创建普通话单词场景（MandarinWordScene）

##### 2.1 创建场景和Canvas
```
File → New Scene → 2D
保存为: Assets/Scenes/MandarinWordScene.unity

Canvas设置（同上）
```

##### 2.2 创建卡片UI（纯手势，无按钮）

**CardBackground（卡片背景）：**
```
Canvas → UI → Image
├── 名称: CardBackground
├── 大小: (1000, 900)
├── Position: (0, 0)
├── Color: #FFF9E6 (奶白色)
├── Sprite: Rounded Rectangle（圆角矩形）
└── 添加Shadow组件:
    ├── Effect Color: #000000 (Alpha: 0.15)
    └── Effect Distance: (8, -8)
```

**HanziText（超大汉字，主内容）：**
```
CardBackground → UI → Text - TextMeshPro
├── 名称: HanziText
├── Text: "你好"
├── Font Size: 220 (超大！)
├── Position: (0, 150)
├── 大小: (900, 250)
├── Alignment: Center/Middle
├── Color: #FF6B9D (粉色)
└── 添加Outline（白色，厚度4）

💡 这是点击朗读的核心区域
```

**PinyinText（拼音）：**
```
CardBackground → UI → Text - TextMeshPro
├── 名称: PinyinText
├── Text: "nǐ hǎo"
├── Font Size: 64
├── Position: (0, 40)
├── Alignment: Center
├── Color: #42A5F5 (蓝色)
└── Font Style: Bold
```

**TranslationText（翻译）：**
```
CardBackground → UI → Text - TextMeshPro
├── 名称: TranslationText
├── Text: "hello"
├── Font Size: 52
├── Position: (0, -40)
├── Alignment: Center
└── Color: #78909C (灰色)
```

**IndexText（索引，右上角）：**
```
Canvas → UI → Text - TextMeshPro
├── 名称: IndexText
├── Text: "1 / 20"
├── Font Size: 48
├── Anchor: Top Right
├── Position: (-60, -60)
├── Color: #AB47BC (紫色)
└── Font Style: Bold
```

**GestureHint（手势提示，底部）：**
```
Canvas → UI → Text - TextMeshPro
├── 名称: GestureHint
├── Text: "点击朗读 | 左右滑动切换 | 下滑返回"
├── Font Size: 36
├── Anchor: Bottom Center
├── Position: (0, 50)
├── Color: #FFD54F (黄色)
└── 添加Outline（白色，厚度2）
```

##### 2.3 为所有UI添加ThemeableUI组件

**CardBackground:**
```
Add Component → ThemeableUI
├── Component Type: Background
└── Color Type: CardBackground
```

**HanziText:**
```
Add Component → ThemeableUI
├── Component Type: Text
└── Color Type: MandarinPrimary
```

**PinyinText:**
```
Add Component → ThemeableUI
├── Component Type: Text
└── Color Type: AccentBlue
```

**TranslationText:**
```
Add Component → ThemeableUI
├── Component Type: Text
└── Color Type: SecondaryText
```

**IndexText:**
```
Add Component → ThemeableUI
├── Component Type: Text
└── Color Type: SpecialPurple
```

##### 2.4 添加MandarinWordCard脚本

```
创建空GameObject: MandarinWordCardController
Position: (0, 0, 0)

添加组件: MandarinWordCard.cs

Inspector配置:
┌────────────────────────────────────┐
│ 📌 UI元素引用（必需）              │
├────────────────────────────────────┤
│ Hanzi Text: HanziText              │
│ Pinyin Text: PinyinText            │
│ Translation Text: TranslationText  │
│ Index Text: IndexText              │
├────────────────────────────────────┤
│ 🎯 显示设置                        │
├────────────────────────────────────┤
│ Show Translation At Start: ✓       │
│ Use Data Manager: ✓                │
├────────────────────────────────────┤
│ 📚 课程设置                        │
├────────────────────────────────────┤
│ Use Lesson Mode: ✗                 │ (全部单词)
│ Specific Lesson: 0                 │
├────────────────────────────────────┤
│ 🖐️ 手势交互设置（重要！）          │
├────────────────────────────────────┤
│ Enable Tap To Speak: ✓             │
│ Enable Swipe Gestures: ✓           │
│ Min Swipe Distance: 100            │
│ Max Tap Movement: 10               │
├────────────────────────────────────┤
│ 📄 数据文件                        │
├────────────────────────────────────┤
│ Json File Name: "mandarin_words"   │
└────────────────────────────────────┘
```

##### 2.5 添加EventSystem
```
如果场景没有EventSystem:
Hierarchy → UI → Event System

必需！否则手势无法响应。
```

##### 2.6 测试场景
```
点击Play测试:
✓ 点击汉字 → Console显示朗读信息
✓ 右滑 → 切换到下一个单词
✓ 左滑 → 返回上一个单词
✓ 下滑 → （暂时不工作，需要添加到Build Settings）
✓ 索引更新: 1/20 → 2/20
```

##### 2.7 保存场景
```
Ctrl + S
```

---

#### 步骤3：创建普通话句子场景（快速方式）

##### 3.1 复制单词场景
```
方式1: 复制文件
1. 在Project窗口找到 MandarinWordScene.unity
2. Ctrl+D 复制
3. 重命名为: MandarinSentenceScene.unity

方式2: 另存为
1. 打开 MandarinWordScene.unity
2. File → Save As...
3. 命名: MandarinSentenceScene.unity
```

##### 3.2 修改UI（5处调整）

**HanziText（句子较长，字号需缩小）:**
```
Font Size: 220 → 68
大小: (900, 250) → (1200, 300)
Position: (0, 150) → (0, 200)
```

**PinyinText:**
```
Font Size: 64 → 40
Position: (0, 40) → (0, 100)
大小: 调整为 (1200, 80)
```

**TranslationText:**
```
Font Size: 52 → 36
Position: (0, -40) → (0, 20)
```

**添加CategoryText（分类，可选）:**
```
Canvas → UI → Text - TextMeshPro
├── 名称: CategoryText
├── Text: "分类: 问候"
├── Font Size: 24
├── Anchor: Top Left
├── Position: (40, -40)
├── Color: #999999
└── Add Component → ThemeableUI:
    ├── Component Type: Text
    └── Color Type: SecondaryText
```

**添加DifficultyText（难度，可选）:**
```
Canvas → UI → Text - TextMeshPro
├── 名称: DifficultyText
├── Text: "难度: 简单 ⭐"
├── Font Size: 24
├── Anchor: Top Right
├── Position: (-150, -40)
├── Color: #FF9800
└── Add Component → ThemeableUI:
    ├── Component Type: Text
    └── Color Type: WarningOrange
```

**IndexText:**
```
Text: "1 / 20" → "1 / 15"
```

##### 3.3 修改脚本配置

```
选择: MandarinWordCardController

1. 移除组件: MandarinWordCard.cs（Remove Component）
2. 添加组件: MandarinSentenceCard.cs（Add Component）

Inspector配置:
├── UI元素引用:
│   ├── Hanzi Text: HanziText
│   ├── Pinyin Text: PinyinText
│   ├── Translation Text: TranslationText
│   ├── Index Text: IndexText
│   ├── Category Text: CategoryText ← 新增
│   └── Difficulty Text: DifficultyText ← 新增
│
├── 显示设置:
│   ├── Show Translation At Start: ✗ (句子默认隐藏翻译)
│   └── Use Data Manager: ✓
│
├── 手势交互:
│   ├── Enable Tap To Speak: ✓
│   ├── Enable Swipe Gestures: ✓
│   ├── Min Swipe Distance: 100
│   └── Max Tap Movement: 10
│
└── 数据文件:
    └── Json File Name: "mandarin_sentences" ← 重要！
```

##### 3.4 保存场景
```
Ctrl + S
```

---

#### 步骤4：创建拼音练习场景（3个）

##### 4.1 创建声母练习场景

**4.1.1 创建场景和Canvas**
```
File → New Scene → 2D
保存为: Assets/Scenes/PinyinInitialsScene.unity
Canvas设置（同上）
```

**4.1.2 创建极简UI（5个元素）**

**PinyinText（超大拼音字母）:**
```
Canvas → UI → Text - TextMeshPro
├── 名称: PinyinText
├── Text: "b"
├── Font Size: 280 (超大！)
├── Position: (0, 80)
├── Alignment: Center/Middle
├── Color: #2196F3 (蓝色)
├── 大小: (800, 400)
└── Add Component → ThemeableUI:
    ├── Component Type: Text
    └── Color Type: AccentYellow

💡 这是点击朗读的核心区域
```

**DescriptionText（发音描述）:**
```
UI → Text - TextMeshPro
├── 名称: DescriptionText
├── Text: "双唇不送气清塞音"
├── Font Size: 32
├── Position: (0, -100)
├── Color: #666666
└── Add Component → ThemeableUI:
    ├── Component Type: Text
    └── Color Type: SecondaryText
```

**ExampleText（例字+拼音）:**
```
UI → Text - TextMeshPro
├── 名称: ExampleText
├── Text: "爸 bà"
├── Font Size: 64
├── Position: (0, -200)
├── Color: #333333
└── Add Component → ThemeableUI:
    ├── Component Type: Text
    └── Color Type: PrimaryText

💡 将汉字和拼音放在一起显示
```

**IndexText（右上角）:**
```
Canvas → UI → Text - TextMeshPro
├── 名称: IndexText
├── Text: "1 / 21"
├── Font Size: 28
├── Anchor: Top Right
├── Position: (-40, -40)
└── Color: #999999
```

**GestureHint（底部）:**
```
Canvas → UI → Text - TextMeshPro
├── 名称: GestureHint
├── Text: "点击朗读 | 左右滑动切换 | 下滑返回"
├── Font Size: 24
├── Anchor: Bottom Center
├── Position: (0, 40)
└── Color: #AAAAAA
```

**4.1.3 添加PinyinCard脚本**

```
创建空GameObject: PinyinCardController
添加组件: PinyinCard.cs

Inspector配置:
├── UI元素引用:
│   ├── Pinyin Text: PinyinText
│   ├── Description Text: DescriptionText
│   ├── Example Text: ExampleText
│   ├── Index Text: IndexText
│   └── (其他可选项留空)
│
├── 拼音类型（重要！）:
│   └── Pinyin Type: Initial (声母) ⭐
│
├── 数据设置:
│   ├── Use Data Manager: ✓
│   └── Difficulty Filter: (留空=全部)
│
└── 手势交互:
    ├── Enable Tap To Speak: ✓
    ├── Enable Swipe Gestures: ✓
    ├── Min Swipe Distance: 100
    └── Max Tap Movement: 10
```

**4.1.4 保存场景**
```
Ctrl + S
```

##### 4.2 创建韵母练习场景（快速）

```
1. 复制 PinyinInitialsScene.unity
2. 重命名为: PinyinFinalsScene.unity
3. 打开场景
4. 修改2处:
   ① IndexText: "1 / 21" → "1 / 24"
   ② PinyinCardController → Pinyin Type: Initial → Final (韵母) ⭐
5. 保存（Ctrl+S）
```

##### 4.3 创建声调练习场景（快速）

```
1. 复制 PinyinInitialsScene.unity
2. 重命名为: PinyinTonesScene.unity
3. 打开场景
4. 修改2处:
   ① IndexText: "1 / 21" → "1 / 20"
   ② PinyinCardController → Pinyin Type: Initial → Tone (声调) ⭐
5. 保存（Ctrl+S）
```

---

#### 步骤5：创建英语音标场景（3个，类似拼音）

##### 5.1 创建元音练习场景

**5.1.1 创建场景**
```
File → New Scene → 2D
保存为: Assets/Scenes/PhoneticVowelsScene.unity
```

**5.1.2 创建UI（类似拼音场景）**

**PhoneticText（超大音标）:**
```
Canvas → UI → Text - TextMeshPro
├── 名称: PhoneticText
├── Text: "/iː/"
├── Font Size: 240
├── Position: (0, 80)
├── Color: #F44336 (红色)
├── Font: 需要支持IPA音标的字体
└── Add Component → ThemeableUI:
    ├── Component Type: Text
    └── Color Type: SpecialPurple

⚠️ 重要: 需要使用支持IPA音标的字体
   (如: Noto Sans, Doulos SIL)
```

**DescriptionText:**
```
UI → Text - TextMeshPro
├── 名称: DescriptionText
├── Text: "长元音，舌位高前"
├── Font Size: 32
├── Position: (0, -100)
└── Color: #666666
```

**ExampleText（例词+音标）:**
```
UI → Text - TextMeshPro
├── 名称: ExampleText
├── Text: "see /siː/"
├── Font Size: 64
├── Position: (0, -200)
└── Color: #333333
```

**IndexText + GestureHint（同拼音场景）**

**5.1.3 添加PhoneticCard脚本**

```
创建: PhoneticCardController
添加组件: PhoneticCard.cs

Inspector配置:
├── UI元素引用: (同拼音场景)
├── Phonetic Type: Vowel (元音) ⭐
├── Use Data Manager: ✓
└── 手势交互设置:
    ├── Enable Tap To Speak: ✓
    ├── Enable Swipe Gestures: ✓
    ├── Min Swipe Distance: 100
    └── Max Tap Movement: 10
```

**5.1.4 保存场景**

##### 5.2 创建辅音练习场景（快速）

```
1. 复制 PhoneticVowelsScene.unity
2. 重命名为: PhoneticConsonantsScene.unity
3. 修改2处:
   ① IndexText: "1 / 12" → "1 / 24"
   ② PhoneticCardController → Phonetic Type: Vowel → Consonant (辅音) ⭐
4. 保存
```

##### 5.3 创建双元音场景（快速）

```
1. 复制 PhoneticVowelsScene.unity
2. 重命名为: PhoneticDiphthongsScene.unity
3. 修改2处:
   ① IndexText: "1 / 12" → "1 / 8"
   ② PhoneticCardController → Phonetic Type: Vowel → Diphthong (双元音) ⭐
4. 保存
```

---

#### 步骤6：配置Build Settings

```
File → Build Settings

按顺序添加所有场景（拖入Scenes In Build）:

0. MainMenu ⭐ (必须是第一个)
1. SampleScene (英语单词)
2. SentenceScene (英语句子)
3. MandarinWordScene
4. MandarinSentenceScene
5. PinyinInitialsScene
6. PinyinFinalsScene
7. PinyinTonesScene
8. PhoneticVowelsScene
9. PhoneticConsonantsScene
10. PhoneticDiphthongsScene

总计: 11个场景

确认MainMenu的Index为0！
   ```

---

#### 步骤7：测试所有功能

##### 7.1 Unity编辑器测试

**测试主菜单:**
```
1. 打开MainMenu场景
2. 点击Play
3. 点击主题下拉框，选择不同主题
4. 观察UI颜色立即更新
5. 点击任意学习模块按钮
6. 观察是否正确跳转场景
```

**测试手势（任意学习场景）:**
```
1. 从主菜单进入普通话单词学习
2. 点击汉字 → Console显示"点击朗读"
3. 鼠标按下，向右拖动>100px，松开 → 下一个单词
4. 向左拖动>100px → 上一个单词
5. 向下拖动>100px → 返回主菜单
6. 检查索引更新: 1/20, 2/20...
```

##### 7.2 WebGL测试（TTS发音）

```
File → Build Settings
├── Platform: WebGL
├── Switch Platform
└── Build And Run

浏览器自动打开后:
1. 测试主题切换
2. 进入任意场景
3. 点击内容 → 听到语音朗读 ⭐
4. 测试普通话发音 ("你好" → 中文)
5. 测试英语发音 ("hello" → 英文)
6. 测试拼音发音 ("b" → 拼音)
```

##### 7.3 移动设备测试（可选）

```
File → Build Settings
├── Platform: Android
├── Switch Platform
└── Build And Run

真机测试:
- 手指滑动更自然
- 触摸反馈
- 性能测试
```

---

### 创建新的学习场景（通用模板）

#### 1. 创建场景和Canvas
```
File → New Scene → 2D
保存为: Assets/Scenes/MyNewScene.unity

Canvas:
├── Render Mode: Screen Space - Overlay
├── Canvas Scaler: Scale With Screen Size (1920x1080)
└── Graphic Raycaster: ✓
```

#### 2. 创建UI（无按钮设计）
```
CardBackground (Image 900x800, 奶白色)
├── ContentText (TextMeshProUGUI, 180-220px)
├── SubText (TextMeshProUGUI, 40-64px)
├── TranslationText (TextMeshProUGUI, 36-52px)
└── IndexText (TextMeshProUGUI, 右上角, "1/20")

GestureHint (TextMeshProUGUI, 底部)
└── Text: "点击朗读 | 左右滑动切换 | 下滑返回"
```

#### 3. 添加ThemeableUI到所有UI元素
```
逐个选择UI元素 → Add Component → ThemeableUI
配置Component Type和Color Type
```

#### 4. 添加Card脚本
```
创建空GameObject: CardController
添加组件: 选择对应的Card脚本

配置:
├── UI元素引用: 拖入对应Text
├── Enable Tap To Speak: ✓
├── Enable Swipe Gestures: ✓
├── Min Swipe Distance: 100
├── Max Tap Movement: 10
└── Json File Name: "your_data_file"
```

#### 5. 添加到Build Settings
```
File → Build Settings → Add Open Scenes
```

### 添加新数据

#### 1. 创建JSON文件
```
Assets/Resources/Data/my_new_data.json
```

#### 2. 定义数据结构
```json
{
  "items": [
    {
      "id": 1,
      "content": "...",
      ...
    }
  ]
}
```

#### 3. 创建数据管理器（可选）
```csharp
public class MyDataManager : MonoBehaviour
{
    private static MyDataManager _instance;
    public static MyDataManager Instance { get { return _instance; } }
    
    // ... 加载和管理数据
}
```

---

## ✅ 功能检查清单

### 场景创建
- [ ] 11个场景全部创建
- [ ] 所有场景已添加到Build Settings
- [ ] MainMenu设为首场景（Index 0）

### 主题系统
- [ ] 主菜单有ThemeDropdown
- [ ] ThemeDropdown已拖入MainMenu脚本
- [ ] 所有UI元素添加ThemeableUI组件
- [ ] 测试主题切换，所有UI同步更新

### 手势操作
- [ ] 所有Card脚本Enable Swipe Gestures = ✓
- [ ] 所有Card脚本Enable Tap To Speak = ✓
- [ ] 测试左右滑动切换
- [ ] 测试点击朗读
- [ ] 测试下滑返回主菜单

### TTS发音
- [ ] WebGL版本已构建
- [ ] 浏览器测试TTS正常
- [ ] 英语发音正常
- [ ] 普通话发音正常

### 数据管理
- [ ] JSON文件位于Resources/Data/
- [ ] 所有DataManager正常加载数据
- [ ] Card脚本正确显示数据

---

## 🐛 常见问题

### Q: 手势不响应？
**检查：**
- 场景有EventSystem
- Canvas有Graphic Raycaster
- Card脚本Enable Swipe Gestures = ✓

### Q: 主题切换无效？
**检查：**
- UI元素有ThemeableUI组件
- Component Type和Color Type配置正确
- Console无错误信息

### Q: TTS不发音？
**原因：**Unity编辑器不支持WebGL TTS

**解决：**
1. 构建WebGL版本
2. 在Chrome/Firefox浏览器测试
3. 确保浏览器支持Web Speech API

### Q: 如何添加新主题？
**步骤：**
1. 打开`Assets/Scripts/Core/ThemeData.cs`
2. 创建新方法：`public static ThemeData CreateMyTheme() { ... }`
3. 在`ThemeManager.cs`的`InitializeThemes()`中添加
4. 下拉框自动显示新主题

---

## 📚 详细文档

项目根目录下的详细文档：

- **语言学习应用开发指南_精简版.md** - 完整开发指南（600行）
- **儿童友好UI配色指南.md** - 详细配色理论、动画效果、Unity实现
- **主题配置操作指南.md** - 主题系统完整使用手册
- **主题系统迁移指南.md** - 将旧UI迁移到主题系统

---

## 🤝 贡献

欢迎贡献！请遵循以下步骤：

1. Fork项目
2. 创建Feature分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. Push到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

## 📜 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 👥 作者

**EnglishStudy Development Team**

- 项目链接: [https://github.com/yourusername/EnglishStudyDemo](https://github.com/yourusername/EnglishStudyDemo)
- 问题反馈: [https://github.com/yourusername/EnglishStudyDemo/issues](https://github.com/yourusername/EnglishStudyDemo/issues)

---

## 🙏 致谢

- Unity Technologies - 游戏引擎
- TextMeshPro - 高质量文本渲染
- Web Speech API - 浏览器TTS支持

---

## 📊 项目统计

- **代码行数:** ~5000行 C#
- **场景数量:** 11个
- **数据条目:** 200+（单词/句子/拼音/音标）
- **主题配色:** 5套
- **支持年龄:** 3-12岁

---

**版本:** v2.0.0
**更新日期:** 2025-11-04
**适用平台:** WebGL, Android, iOS
**Unity版本:** 2021.3+
