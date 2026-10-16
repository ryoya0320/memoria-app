# Memoria v9 やりたいこと修正版

「♡ やりたいこと」を押しても反応しない問題を修正しました。iPhone Safari/PWAでの動作を安定させるため、この画面だけ`dialog.showModal()`依存をやめ、アプリ内オーバーレイ方式に変更しています。

ZIP内の `index.html` `style-v9.css` `script-v9.js` をアップロードしてください。既存の `config.js` と `icon.png` はそのまま残してください。
