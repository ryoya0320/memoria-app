# Memoria v22 認証修正版

v21を土台に認証部分だけ修正しました。その他の画面・機能・位置・フォント設定は変更していません。

## 修正内容
- 新規登録後に実際のセッションを確認
- Confirm emailがOFFの場合はその場でログイン
- セッションが返らない場合に誤って「確認メールを送りました」と断定しない
- Invalid login credentialsを日本語で案内
- 二重押し防止
- GitHubログインボタンを追加
- GitHub/メール認証後の戻り先をMemoriaのURLに固定

## 置き換え
ZIP内の index.html / style.css / app.js / README.md をGitHubへ上書きしてください。config.jsは含めていないため、現在のSupabase接続設定はそのまま残ります。

## GitHubログインの前提
Supabase Authentication > Sign In / Providers > GitHubでGitHub Providerを有効にし、Client IDとClient Secretを保存しておいてください。
