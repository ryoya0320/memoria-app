# Memoria v2

## 使い方
1. 既存リポジトリの `index.html` `style.css` `script.js` をこのZIP内の同名ファイルで置き換えます。
2. `config.js` `manifest.webmanifest` `supabase.sql` も追加します。
3. `icon.png` は今の画像をそのまま残して使えます。

## 共有機能を使う場合
1. Supabaseでプロジェクトを作成します。
2. SQL Editorで `supabase.sql` を実行します。
3. Project SettingsのURLと公開用anon keyを `config.js` に入力します。
4. GitHubへコミット後、プロフィールから招待コードを作成します。

## 注意
`supabase.sql` のポリシーは動作確認しやすいデモ構成です。写真はbase64でDBに保存します。大切な写真を安全に本運用する場合は、Supabase Auth、非公開Storage、厳密なRLSへ移行してください。
