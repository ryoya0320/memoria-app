/* Memoria v25 share room hotfix */
(async()=>{
  const status=document.querySelector('#shareStatus');
  const clearBrokenShare=()=>{
    try{localStorage.removeItem('memoriaShareRoom')}catch{}
    if(typeof shareRoom!=='undefined')shareRoom='';
    if(status)status.textContent='端末内モード';
  };
  const validateRoom=async()=>{
    if(typeof db==='undefined'||!db||typeof shareRoom==='undefined'||!shareRoom){clearBrokenShare();return false}
    try{
      const{data,error}=await db.from('share_rooms').select('id').eq('id',shareRoom).maybeSingle();
      if(error||!data){clearBrokenShare();return false}
      return true;
    }catch(error){console.error('share room check failed',error);clearBrokenShare();return false}
  };
  await validateRoom();
  const save=document.querySelector('#saveEvent');
  if(save)save.onclick=async()=>{
    const title=document.querySelector('#eventTitle').value.trim();
    if(!title)return notify('予定を入力してください');
    const event={id:crypto.randomUUID(),date:selectedDate,title,emoji:document.querySelector('#selectedEmoji').value||'♡'};
    if(await validateRoom()){
      let{error}=await db.from('shared_events').insert({id:event.id,room_id:shareRoom,event_date:event.date,title:event.title,emoji:event.emoji,created_by:deviceId});
      if(error&&error.code==='PGRST204')({error}=await db.from('shared_events').insert({id:event.id,room_id:shareRoom,event_date:event.date,title:event.title,stamp:event.emoji,created_by:deviceId}));
      if(error){console.error('shared event save failed',error);clearBrokenShare();notify('共有先を解除し、端末内に保存しました')}
    }
    const all=events();all.push(event);write('memoria.events',all);
    document.querySelector('#eventTitle').value='';renderDay();renderCalendar();notify('保存しました');
  };
})();
