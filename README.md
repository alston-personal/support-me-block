# Milkcat Project Utility Kit

原始專案名稱為 `support-me-block`，現在定位提升為 **所有 Milkcat Studio 專案共用的使用者互動基礎元件**。

## 必備能力

所有有終端使用者介面的專案，預設應提供：

1. **回報問題（Feedback）**
   - 統一 schema：`milkcat.project-feedback/v1`
   - 自動附帶 `projectId`、專案名稱、版本、頁面、viewport 與專案自訂 diagnostics
   - 不得預設上傳使用者私人檔案內容、圖片本體、帳號憑證或敏感資料
   - 可由專案覆寫問題類別，例如宅向可使用「沒有抓到方位／方位角度不對／其他」

2. **支持專案（Support）**
   - 所有公開互動產品採相同贊助入口
   - 預設 Buy Me a Coffee，可選配 PayPal
   - 顯示當前專案名稱，而非硬編碼某一產品

3. **Project Context**
   - `projectId`：穩定、不隨顯示名稱變動
   - `projectName`
   - `projectVersion`（若可取得）
   - `details`：專案診斷資料

## 元件

- `SupportMeBlock`
- `FeedbackBlock`
- `ProjectUtilityDock`：同時提供「回報問題」與「支持專案」兩個固定入口

## 建議接法

```tsx
<ProjectUtilityDock
  project={{
    projectId: 'fengshui-layout-overlay',
    projectName: '宅向',
    projectVersion: APP_VERSION,
    details: {
      // 僅放可安全送出的診斷資料
    }
  }}
  feedbackEndpoint="/api/feedback"
/>
```

專案可以使用自己的 endpoint，也可以日後切到 Milkcat 共用 Collector；UI 不需要跟著改寫。

## 收件流程

```text
使用者
  ↓
ProjectUtilityDock / 專案專用 Feedback UI
  ↓
feedbackEndpoint
  ↓
Durable Inbox（JSONL / DB / Queue）
  ↓
AgentOS Harvester
  ├─ 去重與分類
  ├─ 建立 GitHub Issue（需要程式修改時）
  ├─ 建立回歸測試／標註資料
  └─ 回寫處理狀態
```

### 原則

- GitHub Issue 是 downstream，不是唯一 inbox。
- AgentOS 暫時離線時，回報仍必須能保存。
- 專案特有的「正確答案」欄位應保留為結構化資料；例如宅向的 expected north angle。
- 純 library / CLI / backend 專案不強制顯示 UI，但應沿用同一 feedback schema 或提供等價回報通道。

## Rollout Policy

新建的 Milkcat Studio Web / App 專案，將 Project Utility Kit 視為預設基建；既有專案則逐步盤點導入。
