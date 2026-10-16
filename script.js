// ====================
// ページ切り替え
// ====================

function showPage(pageId){

document
.querySelectorAll(".page")
.forEach(page=>{
page.classList.remove("active");
});

document
.getElementById(pageId)
.classList.add("active");

}

// ====================
// 写真保存
// ====================

const gallery =
document.getElementById("gallery");

function renderGallery(){

if(!gallery) return;

gallery.innerHTML = "";

const photos =
JSON.parse(
localStorage.getItem("photos") || "[]"
);

photos.forEach((src,index)=>{

const img =
document.createElement("img");

img.src = src;

img.onclick = ()=>{
openImage(src);
};

img.oncontextmenu = (e)=>{

e.preventDefault();

if(confirm("写真を削除しますか？")){

photos.splice(index,1);

localStorage.setItem(
"photos",
JSON.stringify(photos)
);

renderGallery();

}

};

gallery.appendChild(img);

});

}

function savePhoto(){

const file =
document
.getElementById("newPhoto")
.files[0];

if(!file){

alert("写真を選択してください");
return;

}

const reader =
new FileReader();

reader.onload = function(e){

const photos =
JSON.parse(
localStorage.getItem("photos") || "[]"
);

photos.push(
e.target.result
);

localStorage.setItem(
"photos",
JSON.stringify(photos)
);

renderGallery();

alert("保存しました📸");

};

reader.readAsDataURL(file);

}

// ====================
// 写真全画面表示
// ====================

function openImage(src){

const div =
document.createElement("div");

div.style.position = "fixed";
div.style.top = "0";
div.style.left = "0";
div.style.width = "100%";
div.style.height = "100%";
div.style.background = "rgba(0,0,0,0.9)";
div.style.display = "flex";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.zIndex = "999";

div.innerHTML = `
${src}
`;

div.onclick = ()=>{

div.remove();

};

document.body.appendChild(div);

}

// ====================
// カレンダーイベント
// ====================

function addEvent(){

const date =
document.getElementById("eventDate").value;

const text =
document.getElementById("eventText").value;

if(date === "" || text === ""){

alert("入力してください");

return;

}

const events =
JSON.parse(
localStorage.getItem("events") || "[]"
);

events.push({

date,
text

});

localStorage.setItem(
"events",
JSON.stringify(events)
);

document.getElementById(
"eventText"
).value = "";

renderEvents();

}

function renderEvents(){

const ul =
document.getElementById(
"eventList"
);

if(!ul) return;

ul.innerHTML = "";

const events =
JSON.parse(
localStorage.getItem("events") || "[]"
);

events.forEach((e,index)=>{

const li =
document.createElement("li");

li.innerHTML = `
📅 ${e.date}<br>
${e.text}
`;

li.onclick = ()=>{

if(confirm("予定を削除しますか？")){

events.splice(index,1);

localStorage.setItem(
"events",
JSON.stringify(events)
);

renderEvents();

}

};

ul.appendChild(li);

});

}

// ====================
// テーマカラー変更
// ====================

const colorPicker =
document.getElementById(
"themeColor"
);

if(colorPicker){

const savedColor =
localStorage.getItem(
"themeColor"
);

if(savedColor){

document
.documentElement
.style
.setProperty(
"--main",
savedColor
);

colorPicker.value =
savedColor;

}

colorPicker.addEventListener(
"input",
function(){

localStorage.setItem(
"themeColor",
this.value
);

document
.documentElement
.style
.setProperty(
"--main",
this.value
);

}
);

}

// ====================
// 付き合った日数
// ====================

const startDateInput =
document.getElementById(
"startDate"
);

if(startDateInput){

startDateInput.addEventListener(
"change",
function(){

localStorage.setItem(
"startDate",
this.value
);

updateDays();

}
);

}

function updateDays(){

const startDate =
localStorage.getItem(
"startDate"
);

if(!startDate) return;

const start =
new Date(startDate);

const today =
new Date();

const diff =
today - start;

const days =
Math.floor(
diff / (1000*60*60*24)
);

const target =
document.getElementById(
"days"
);

if(target){

target.innerHTML =
`❤️ ${days} 日目`;

}

}

// ====================
// プロフィール画像
// ====================

const profileInput =
document.getElementById(
"profileImage"
);

if(profileInput){

profileInput.addEventListener(
"change",
function(){

const file =
this.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload = function(e){

localStorage.setItem(
"profileImage",
e.target.result
);

updateProfileImage();

};

reader.readAsDataURL(file);

}
);

}

function updateProfileImage(){

const img =
document.getElementById(
"profilePreview"
);

if(!img) return;

const saved =
localStorage.getItem(
"profileImage"
);

if(saved){

img.src = saved;

}

}

// ====================
// 初期読み込み
// ====================

renderGallery();
renderEvents();
updateDays();
updateProfileImage();
