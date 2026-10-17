# Memoria v29 ログイン確実修正版

- 認証処理をauth-core.jsへ分離
- app.jsに別エラーがあってもログインボタンが動作
- Enterキーでもログイン可能
- ログイン状態はlocalStorageで保持
- ログアウト時だけログイン状態を解除
- 予定は端末内保存

ZIP内のindex.html、app.js、style.css、auth-core.jsをGitHubへ上書き・追加してください。
