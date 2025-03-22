# React TypeScript Authentication Template

このプロジェクトは、React と TypeScript を使用した認証機能を持つ Web アプリケーションのテンプレートです。

## 技術スタック

### フロントエンド

- React 19
- TypeScript
- Tailwind CSS v4.0
- React Router DOM (ルーティング)
- Zod (バリデーション)
- Universal Cookie (Cookie 管理)
- Lucide React (アイコン)

### アーキテクチャ

- Atomic Design
  - atoms: 最小単位のコンポーネント（Button, Input, Label など）
  - molecules: 複数の atoms で構成（AuthInput, SubmitButton など）
  - organisms: 複数の molecules で構成（AuthForm など）
  - templates: ページレイアウトのテンプレート
  - pages: ページコンポーネント
- ディレクトリベースのコンポーネント設計
- コールバックベースの非同期処理

## プロジェクト構成

```
src/
├── components/         # Atomic Designベースのコンポーネント
│   ├── atoms/         # 最小単位のコンポーネント
│   ├── molecules/     # 複数のatomsで構成されるコンポーネント
│   ├── organisms/     # 複数のmoleculesで構成されるコンポーネント
│   ├── templates/     # ページレイアウトのテンプレート
│   └── pages/         # ページコンポーネント
├── features/          # 機能ごとのロジック
│   ├── auth/          # 認証関連
│   └── user/          # ユーザー関連
├── hooks/             # カスタムフック
├── lib/               # ユーティリティ関数やヘルパー
├── types/             # 型定義
├── styles/            # グローバルスタイル
└── mocks/             # モックデータ
```

## セットアップ手順

1. 依存パッケージのインストール

```bash
npm install
```

2. Tailwind CSS のインストールと設定

```bash
npm install tailwindcss @tailwindcss/vite
```

3. その他の必要なパッケージのインストール

```bash
npm install @hookform/resolvers universal-cookie zod react-router-dom lucide-react
```

4. 開発サーバーの起動

```bash
npm run dev
```

## 機能概要

### 認証機能

- ログインページ
  - Zod によるフォームバリデーション
  - エラーハンドリング
  - トークンベースの認証
  - パスワード表示/非表示切り替え

### トップページ

- ログイン状態の維持
- ユーザー情報の表示
- ログアウト機能

## 開発ガイドライン

### コンポーネント設計

- Atomic Design の原則に従う
- 再利用可能なコンポーネントの作成
- Props 型の明示的な定義
- React 19 の新機能を活用した実装

### スタイリング

- Tailwind CSS のユーティリティクラスを使用
- アクセシビリティに配慮した UI 実装

### 状態管理

- ローカルステート: React useState
- コンテキスト: React Context API
- フォーム状態: useFormState と useFormStatus
- トランジション: useTransition（UI 更新の優先順位付け）
- 非同期処理: async/await with Server Components

## ライセンス

MIT
