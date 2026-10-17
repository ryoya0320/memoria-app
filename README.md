# Memoria v20 置き換え版

変更点は次の3点だけです。
1. プロフィール画像を選択した瞬間にプレビューします。プロフィール保存後は従来どおり保存され、DMプロフィールにも同期します。
2. 共有予定の保存を `emoji` と旧構成の `stamp` の両方に対応させました。
3. Supabase Authによるメールアドレス＋パスワードの新規登録、ログイン、ログアウト、パスワード再設定を追加しました。

フォント、書体、DM、アルバム、共有、デザインなど、そのほかはv19から変更していません。

GitHubでは `index.html` `style.css` `app.js` `README.md` を置き換えてください。現在接続に使えている `config.js` は削除・上書きしないでください。

Supabase Dashboardの Authentication で Email Providerを有効にしてください。確認メールを使う場合、Site URLとRedirect URLにGitHub PagesのURLを登録してください。
