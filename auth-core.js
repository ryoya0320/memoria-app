/* Memoria v29: independent persistent local login */
(()=>{
  const get=id=>document.getElementById(id);
  const readAccount=()=>{try{return JSON.parse(localStorage.getItem('memoria.localAccount')||'null')}catch{return null}};
  const hex=bytes=>Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
  const hash=async(password,saltHex)=>{
    if(!saltHex||!/^[0-9a-f]+$/i.test(saltHex)||saltHex.length%2)throw new Error('invalid account');
    const salt=new Uint8Array(saltHex.match(/.{2}/g).map(x=>parseInt(x,16)));
    const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
    const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:120000,hash:'SHA-256'},key,256);
    return hex(new Uint8Array(bits));
  };
  const message=text=>{const el=get('authMessage');if(el)el.textContent=text};
  const busy=value=>['loginButton','signupButton'].forEach(id=>{const el=get(id);if(el)el.disabled=value});
  const showState=()=>{
    const signedIn=localStorage.getItem('memoria.localSession')==='1'&&!!readAccount();
    const screen=get('authScreen');if(screen)screen.classList.toggle('hidden',signedIn);
    const label=get('loginEmail');if(label)label.textContent=signedIn?(readAccount()?.id||''):'';
  };
  async function login(){
    const id=(get('authUserId')?.value||'').trim(),password=get('authPassword')?.value||'',account=readAccount();
    if(!account)return message('この端末にはIDがありません。「IDを新規作成」を押してください');
    if(!id||!password)return message('IDとパスワードを入力してください');
    busy(true);
    try{
      const passwordHash=await hash(password,account.salt);
      if(id!==account.id||passwordHash!==account.passwordHash)return message('IDまたはパスワードが正しくありません');
      localStorage.setItem('memoria.localSession','1');message('');showState();
    }catch(error){console.error(error);message('ログイン情報を読み込めません。IDを作り直してください')}
    finally{busy(false)}
  }
  async function signup(){
    const id=(get('authUserId')?.value||'').trim(),password=get('authPassword')?.value||'';
    if(!/^[A-Za-z0-9_-]{3,24}$/.test(id))return message('IDは3〜24文字の英数字・_・-で入力してください');
    if(password.length<6)return message('パスワードは6文字以上で入力してください');
    busy(true);
    try{
      const salt=crypto.getRandomValues(new Uint8Array(16)),saltHex=hex(salt),passwordHash=await hash(password,saltHex);
      localStorage.setItem('memoria.localAccount',JSON.stringify({id,salt:saltHex,passwordHash,createdAt:new Date().toISOString()}));
      localStorage.setItem('memoria.localSession','1');message('');showState();
    }catch(error){console.error(error);message('IDを作成できませんでした')}
    finally{busy(false)}
  }
  get('loginButton')?.addEventListener('click',e=>{e.preventDefault();login()});
  get('signupButton')?.addEventListener('click',e=>{e.preventDefault();signup()});
  get('toggleAuthPassword')?.addEventListener('click',()=>{const input=get('authPassword'),button=get('toggleAuthPassword');if(!input||!button)return;const visible=input.type==='text';input.type=visible?'password':'text';button.textContent=visible?'表示':'隠す'});
  get('authPassword')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();login()}});
  get('logoutButton')?.addEventListener('click',()=>{localStorage.removeItem('memoria.localSession');showState()});
  window.addEventListener('pageshow',showState);
  showState();
})();
