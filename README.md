# 2027 杭州·西溪·塘棲·周莊·蘇州 6日遊 旅遊規劃行程

> 🌸 **2027年春季 5天半江南水鄉與古典園林深度探索之旅**  
> 一個兼具現代視覺美感（深藍漸層、玻璃擬態 Glassmorphism）與全方位互動體驗（時間軸導航、智慧日期折疊、響應式佈局）的靜態旅遊行程網站。

---

## 📅 行程概覽（2027年 4月1日 - 4月6日）

| 日程 | 日期 | 路線規劃 | 核心精華亮點 | 住宿安排 |
|:---:|:---:|:---|:---|:---|
| **D0** | 出發前 | 行前準備清單 | 卡式台胞證・行動支付實名綁定・CCC認證行動電源規範・春季衣著裝備 | — |
| **D1** | 4/1 (四) | 高雄 ✈ 上海浦東 ➔ 杭州 | 包車出發小港機場・直飛浦東・專屬旅遊中巴接機・夜抵杭州吳山商圈 | 全季酒店 (杭州西湖吳山廣場店) |
| **D2** | 4/2 (五) | 靈隱祈福 ➔ 西溪濕地 ➔ 杭城晚景 | 靈隱寺參拜・飛來峰石窟摩崖造像・西溪水上森林搖櫓船・河坊街與南宋御街夜市 | 全季酒店 (杭州西湖吳山廣場店) |
| **D3** | 4/3 (六) | 西湖勝景 ➔ 登雷峰塔 ➔ 宋城大秀 | 西湖遊船遠眺三潭印月・蘇堤春曉花港觀魚・登雷峰塔俯瞰西湖・世界名秀《宋城千古情》・武林夜市 | 全季酒店 (杭州西湖吳山廣場店) |
| **D4** | 4/4 (日) | 塘棲古鎮 ➔ 水鄉周莊 ➔ 蘇州 | 京杭大運河廣濟橋・百年老店名產伴手禮・「中國第一水鄉」周莊雙橋沈廳手搖木船 | 全季酒店（蘇州山塘街石路地鐵站店） |
| **D5** | 4/5 (一) | 姑蘇園林 ➔ 虎丘 ➔ 山塘夜遊 | 中國名園之首拙政園・假山王國獅子林・平江路老街采風・吳中第一名勝虎丘斜塔・七里山塘夜遊木船賞紅燈籠 | 全季酒店（蘇州山塘街石路地鐵站店） |
| **D6** | 4/6 (二) | 蘇州博物館 ➔ 寒山寺 ✈ 高雄 | 貝聿銘大師封刀之作蘇州博物館・《楓橋夜泊》寒山古寺鐘聲・專車前往浦東・直飛返抵高雄平安包車返家 | 溫暖的家 🏠 |

---

## ✨ 核心特色與技術架構

1. **🎨 現代化視覺與玻璃擬態設計 (Glassmorphism)**
   - 採用深夜藍、天空藍與暖橙色的優雅漸層配色主題。
   - 柔和的毛玻璃背景模糊（`backdrop-filter`）與精細邊框高光。
   - 使用 Intersection Observer 原生 API 實現元件滾動進入視窗的平滑淡入動畫（`.fade-in`）。

2. **📍 雙向響應式時間軸導航**
   - **桌面端**：側邊固定懸浮導航列（Timeline Nav），隨著頁面滾動自動追蹤並高亮目前閱讀的日程。
   - **手機端**：底部橫向滑動導航列（Mobile Bottom Nav），自動置中當前選取的日期項目，並支援點擊平滑滾動跳轉。

3. **📅 智慧日期折疊機制 (Collapsible Sections)**
   - 自動抓取使用者當前時間（換算 UTC+8 台灣/大陸標準時區）。
   - 只要「當前日期 > 行程日期」，系統會將已結束的歷史日程自動收合，優先展開當日或未來的行程。
   - 點擊任一天的日程標頭（Header）均可隨時手動自由切換展開/折疊狀態。

4. **🔗 整合 18+ 篇深度旅遊攻略與即時天氣連結**
   - 完整收錄靈隱寺、西溪濕地、河坊街、西湖一日遊、宋城千古情、塘棲古鎮、周莊水鄉、拙政園、獅子林、虎丘斜塔、七里山塘街、蘇州博物館、寒山寺等景點之達人實測攻略與官方資訊。
   - 內建杭州、蘇州與上海的中國天氣網官方即時天氣連結。

---

## 🚀 GitHub Actions 自動部署至 GitHub Pages

本專案已完整配置 `.github/workflows/deploy.yml` 自動化部署工作流程。只要將最新程式碼推送到 GitHub 遠端儲存庫 **`2027Travel`** 的 `main` 或 `master` 分支，GitHub Actions 就會自動打包並發布至 GitHub Pages 靜態網站。

### 步驟一：建立並關聯 GitHub `2027Travel` 倉庫

1. 前往 GitHub 建立名稱為 **`2027Travel`** 的全新 Repository（建議設為 Public）。
2. 開啟終端機（Terminal）或 PowerShell，於專案目錄下執行以下指令：

```bash
# 1. 初始化 Git 儲存庫（若尚未初始化）
git init

# 2. 加入所有修改與新增的檔案（含 Photo 實景照片與 2027 新增頁面）
git add .

# 3. 提交版本紀錄
git commit -m "feat: 升級為 2027 年蘇杭 6 日遊旅遊規劃行程並整合 2027Travel 實景美圖"

# 4. 將預設分支命名為 main
git branch -M main

# 5. 關聯或切換至 2027Travel 遠端儲存庫
git remote set-url origin https://github.com/v1277chen/2027Travel.git
# （若尚未設定過 origin，請執行：git remote add origin https://github.com/v1277chen/2027Travel.git）

# 6. 推送至 GitHub
git push -u origin main
```

### 步驟二：於 GitHub 倉庫啟用 Pages 來源

1. 開啟瀏覽器，進入您的 GitHub **`2027Travel`** 專案倉庫首頁：  
   `https://github.com/v1277chen/2027Travel`
2. 點擊頂部選單最右側的 **「Settings」**（設定）分頁。
3. 於左側功能選單中找到並點擊 **「Pages」**。
4. 在 **「Build and deployment」** 區塊中的 **「Source」**（來源）下拉選單：
   - 預設可能為 *Deploy from a branch*。
   - **請切換選取為 👉【GitHub Actions】**。
5. 點擊儲存，無須額外手動指定分支。

### 步驟三：檢視自動部署進度與存取網址

1. 點擊倉庫頂部的 **「Actions」** 分頁，即可看到名稱為 **「自動部署到 GitHub Pages」** 的 Workflow 正在運行。
2. 流程執行完成後（約 30～60 秒，呈現綠色勾勾 ✅）：
   - 部署完成之網站公開網址為：  
     👉 **`https://v1277chen.github.io/2027Travel/`**
3. 日後只要本機端執行 `git push`，GitHub Actions 即會自動觸發更新發布，無需再手動操作任何伺服器！
4. 亦可在「Actions」頁面中點擊工作流程，隨時手動點選「Run workflow」進行強制重新發布。

---

## 💻 本地環境預覽與測試

本專案為純原生前端結構（HTML5 / CSS3 / ES6+ JavaScript），不依賴任何外部編譯工具或龐大 node_modules，直接開啟即可預覽：

### 方法 A：直接點擊開啟
於檔案總管中雙擊 `index.html`，即可使用預設瀏覽器（Chrome、Edge、Safari）開啟檢視。

### 方法 B：使用 Python 內建輕量 HTTP 伺服器
```bash
# 於專案根目錄執行：
python -m http.server 8000
```
開啟瀏覽器訪問：`http://localhost:8000`

### 方法 C：VS Code Live Server
若使用 Visual Studio Code，可安裝擴充套件「Live Server」，在 `index.html` 上按右鍵選擇「Open with Live Server」即可支援存檔即時熱重載。

---

## 📁 專案檔案結構說明

```text
2027Travel/
├── index.html                   # 核心行程網頁（包含 D0-D6 完整語意化標籤與所有攻略連結）
├── index.css                    # 樣式表（CSS 變數、深藍玻璃擬態主題、響應式 Media Queries）
├── index.js                     # 互動邏輯腳本（平滑滾動、時間軸監聽、智慧日期折疊、展開卡片）
├── 2027.txt                     # 原始 2027 蘇杭行程規劃文字稿資料
├── README.md                    # 專案中文說明文件與 GitHub Actions 部署操作手冊
├── Walkthrough.md               # 改版成果驗證報告與元件架構走讀說明
├── Photo/                       # 行程與景點照片靜態資源目錄
│   ├── Itinerary/               # 每日行程攻略圖與中國大陸旅遊注意事項圖
│   └── Landmark/                # 各景點代表照片
└── .github/
    └── workflows/
        └── deploy.yml           # GitHub Actions 自動化部署到 GitHub Pages 之 CI/CD 工作流程檔
```

---

## 🛠️ 程式碼維護與函式規格說明

所有的 JavaScript 函式皆包含完整的繁體中文 JSDoc 規範註解：

| 函式名稱 | 參數 (Type) | 回傳值 (Type) | 功能描述 |
|:---|:---|:---|:---|
| `initScrollAnimations()` | 無 | `void` | 運用 `IntersectionObserver` 監控 `.fade-in` 元素進場並觸發淡入動畫 |
| `initTimelineNav()` | 無 | `void` | 監控視窗滾動高度，即時更新桌面側邊欄與手機底部導航的 active 選取狀態 |
| `throttle(func, limit)` | `func: Function`, `limit: number` | `Function` | 函式執行節流器，限制在特定毫秒間隔內僅觸發一次，避免滾動卡頓 |
| `updateNav()` | 無 | `void` | 計算當前視窗中線所在的日程段落 ID 並連動更新各導航按鈕樣式 |
| `initExpandableCards()` | 無 | `void` | 為具備 `.expandable` 的卡片綁定點擊展開/收合高度過渡動畫 |
| `initSmoothScroll()` | 無 | `void` | 攔截內部錨點點擊，執行平滑滾動至目標元素高度 |
| `initCollapsibleDays()` | 無 | `void` | 抓取 UTC+8 日期與各 section 之 `data-date` 比較，自動折疊已過期歷史日程 |

---

## 📄 授權條款

本專案規劃內容供個人與同行親友旅遊查閱分享使用。
