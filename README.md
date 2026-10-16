# Memoria v3

既存の `index.html`、`style.css`、`script.js` をこのフォルダの同名ファイルで丸ごと置き換えてください。`config.js`、`manifest.webmanifest`、`supabase.sql` も同じ階層に置きます。`icon.png` は現在のものを残します。

## 今回の変更
- 初期表示名を「○○ ＆ ○○」へ変更
- 「その場で撮る」「写真から選ぶ」の2択を追加
- 4種類のフォント選択を追加
- 画像を最大960px、JPEG品質68%へ縮小して軽量化
- それ以外のカレンダー、プロフィール、共有機能、下部メニューは維持

## 共有機能
Supabaseを使う場合は `supabase.sql` を実行し、`config.js` にProject URLと公開用anon keyを入力します。
