/* Memoria v31: Supabase cloud account authentication */
(()=>{
  const get=id=>document.getElementById(id);
  const cfg=window.MEMORIA_CONFIG||{};
  const authDb=cfg.supabaseUrl&&cfg.supabaseAnonKey&&window.supabase
    ? window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})
    : null;
  const normalizeId=id=>id.trim().toLowerCase();
  const accountEmail=id=>`${normalizeId(id)}@users.memoria-app.com`;
  const message=text=>{const el=get('authMessage');if(el)el.textContent=text||''};
  const busy=value=>['loginButton','signupButton'].forEach(id=>{const el=get(id);if(el)el.disabled=value});
  const validId=id=>/^[A-Za-z0-9_-]{3,24}$/.test(id);
  const publicId=user=>user?.user_metadata?.login_id||user?.email?.split('@')[0]||'';
  async function showState(){
    let user=null;
    if(authDb){const{data}=await authDb.auth.getUser();user=data?.user||null}
    const screen=get('authScreen');if(screen)screen.classList.toggle('hidden',!!user);
    const label=get('loginEmail');if(label)label.textContent=publicId(user);
    const settings=get('settingsLoginId');if(settings)settings.textContent=publicId(user)||'未ログイン';
    window.MEMORIA_AUTH_USER=user;
  }
  async function login(){
    const id=(get('authUserId')?.value||'').trim(),password=get('authPassword')?.value||'';
    if(!authDb)return message('Supabaseの設定を確認してください');
    if(!validId(id))return message('IDは3〜24文字の英数字・_・-で入力してください');
    if(!password)return message('パスワードを入力してください');
    busy(true);
    try{
      const{error}=await authDb.auth.signInWithPassword({email:accountEmail(id),password});
      if(error)return message('IDまたはパスワードが正しくありません');
      localStorage.setItem('memoria.lastLoginId',id);
      message('');await showState();
    }catch(error){console.error(error);message('ログインできませんでした')}
    finally{busy(false)}
  }
  async function signup(){
    const id=(get('authUserId')?.value||'').trim(),password=get('authPassword')?.value||'';
    if(!authDb)return message('Supabaseの設定を確認してください');
    if(!validId(id))return message('IDは3〜24文字の英数字・_・-で入力してください');
    if(password.length<6)return message('パスワードは6文字以上で入力してください');
    busy(true);
    try{
      const{data,error}=await authDb.auth.signUp({email:accountEmail(id),password,options:{data:{login_id:id}}});
      if(error){
        const text=(error.message||'').toLowerCase();
        return message(text.includes('already')?'このIDはすでに使われています':'IDを作成できませんでした');
      }
      localStorage.setItem('memoria.lastLoginId',id);
      if(!data.session)return message('Supabaseでメール確認を無効にしてから、もう一度ログインしてください');
      message('');await showState();
    }catch(error){console.error(error);message('IDを作成できませんでした')}
    finally{busy(false)}
  }
  async function logout(){if(authDb)await authDb.auth.signOut();await showState()}
  get('loginButton')?.addEventListener('click',e=>{e.preventDefault();login()});
  get('signupButton')?.addEventListener('click',e=>{e.preventDefault();signup()});
  get('authPassword')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();login()}});
  get('toggleAuthPassword')?.addEventListener('click',()=>{const input=get('authPassword'),button=get('toggleAuthPassword');if(!input||!button)return;const visible=input.type==='text';input.type=visible?'password':'text';button.textContent=visible?'表示':'隠す'});
  get('logoutButton')?.addEventListener('click',logout);
  get('settingsLogout')?.addEventListener('click',async()=>{await logout();get('accountSettings')?.classList.add('hidden')});
  const remembered=localStorage.getItem('memoria.lastLoginId');if(remembered&&get('authUserId'))get('authUserId').value=remembered;
  window.MEMORIA_AUTH={client:authDb,showState,logout,publicId};
  if(authDb)authDb.auth.onAuthStateChange(()=>setTimeout(showState,0));
  window.addEventListener('pageshow',showState);
  showState();
})();
