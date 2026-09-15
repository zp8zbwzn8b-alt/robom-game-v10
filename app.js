const KEY="robom_account_v2";let u=JSON.parse(localStorage.getItem(KEY)||"null");const app=document.querySelector("#app");let gameTimer=null,rewardTimer=null,gameScore=0,gameRunning=false;
function save(){localStorage.setItem(KEY,JSON.stringify(u))}
function stopTimers(){if(gameTimer)clearInterval(gameTimer);if(rewardTimer)clearInterval(rewardTimer);gameTimer=null;rewardTimer=null;gameRunning=false}
function auth(reg=false){app.innerHTML=`<div class="auth"><div class="box"><h1>🎮 Robom Games</h1><p class="sub">${reg?"Создай аккаунт":"Войди в аккаунт"}${reg?'':' по нику'}</p>${reg?'<input id="name" class="input" placeholder="Никнейм" autocomplete="username">':'<input id="name" class="input" placeholder="Никнейм" autocomplete="username">'}<input id="pass" class="input" placeholder="Пароль" type="password" autocomplete="${reg?"new-password":"current-password"}"><label class="small" style="display:flex;align-items:center;gap:8px;margin:4px 0 10px;cursor:pointer"><input id="showPass" type="checkbox" onchange="document.querySelector('#pass').type=this.checked?'text':'password'"> Показать пароль</label><button class="btn" onclick="submitAuth(${reg})">${reg?"Зарегистрироваться":"Войти"}</button><button class="link" onclick="auth(${!reg})">${reg?"Уже есть аккаунт? Войти":"Нет аккаунта? Регистрация"}</button></div></div>`}

function readStoredAccount(){let data=null;try{data=JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){}if(data&&(data.name||data.email))return data;try{data=JSON.parse(localStorage.getItem("robom_account")||"null")}catch(e){}if(data&&(data.name||data.email))return data;return null}

function submitAuth(reg){const nameEl=document.querySelector("#name"),passEl=document.querySelector("#pass");const name=nameEl.value.trim(),p=passEl.value;if(!name||!p)return alert("Заполни никнейм и пароль");if(name.length<2||name.length>24)return alert("Никнейм должен быть от 2 до 24 символов");
if(reg){if(p.length<4)return alert("Пароль должен быть минимум 4 символа");const stored=readStoredAccount();if(stored&&String(stored.name||"").trim().toLowerCase()===name.toLowerCase())return alert("Этот никнейм уже занят.");u={name:name,email:stored?.email||"",pass:p,tokens:100,robom:0};save();home();return}
const candidates=[];if(u)candidates.push(u);const stored=readStoredAccount();if(stored)candidates.push(stored);
let found=null;for(const account of candidates){const accountName=String(account.name||"").trim().toLowerCase();const accountPass=String(account.pass??account.password??"");if(accountName===name.toLowerCase()&&accountPass===p){found=account;break}}
if(!found){for(const account of candidates){const accountName=String(account.name||"").trim().toLowerCase();const accountPass=String(account.pass??account.password??"").trim();if(accountName===name.toLowerCase()&&accountPass===p.trim()){found=account;break}}}
if(!found)return alert("Неверный никнейм или пароль. Нажми «Показать пароль» и проверь ввод.");
u={name:String(found.name||name).trim(),email:String(found.email||"").trim().toLowerCase(),pass:String(found.pass??found.password??p),tokens:Number(found.tokens)||0,robom:Number(found.robom)||0};save();home()}
function head(){return `<div class="head"><div><b>Привет, ${u.name}! 👋</b></div><div class="wallet"><span class="coin">🪙 Токены: ${u.tokens}</span><span class="coin">💠 Робом: ${u.robom}</span><button class="exchangeBtn" onclick="exchange()">Обмен</button><button class="exit" onclick="stopTimers();u=null;auth()">Выйти</button></div></div>`}

function startAnniversaryCelebration(){
  document.body.classList.add("anniversary");
  document.querySelectorAll(".confettiPiece").forEach(e=>e.remove());
  const pieces=["🎉","✨","🎊","⭐","🥳","💫","🎈"];
  for(let i=0;i<34;i++){
    const e=document.createElement("div");
    e.className="confettiPiece";e.textContent=pieces[i%pieces.length];
    e.style.left=(Math.random()*100)+"vw";
    e.style.fontSize=(11+Math.random()*20)+"px";
    e.style.animationDuration=(4+Math.random()*5)+"s";
    e.style.animationDelay=(Math.random()*3)+"s";
    e.style.setProperty("--drift",(-120+Math.random()*240)+"px");
    document.body.appendChild(e);
  }
}
function anniversaryFirework(){
  const e=document.createElement("div");e.className="firework";
  e.style.left=(10+Math.random()*80)+"vw";e.style.top=(10+Math.random()*45)+"vh";
  e.style.color=["#ffd54a","#ff7eb6","#8be9fd","#b6ff7d","#c9a7ff"][Math.floor(Math.random()*5)];
  document.body.appendChild(e);setTimeout(()=>e.remove(),950);
}
function anniversaryGame(){
  startAnniversaryCelebration();
  for(let i=0;i<12;i++)setTimeout(anniversaryFirework,i*300);
  setTimeout(()=>alert("🎂 ЮБИЛЕЙ ROBOM GAMES! 🎉\n\n10-я версия уже здесь!\nСпасибо, что играешь ❤️"),900);
}


function home(){
  stopTimers();
  startAnniversaryCelebration();
  app.innerHTML=`<div class="wrap autumnWrap">${head()}
  <section class="hero anniversaryHero">
    <div class="anniversaryNumber">10</div>
    <div class="anniversaryStars"><span>✨</span><span>⭐</span><span>💫</span><span>✨</span></div>
    <span class="anniversaryBadge">🎉 ЮБИЛЕЙНОЕ ОБНОВЛЕНИЕ • V10</span>
    <h1>Нам уже 10! 🎂</h1>
    <p class="anniversarySub">Robom Games празднует юбилей вместе с тобой.</p>
  </section>

  <div class="anniversaryRibbon">
    🎊 <b>10-я версия</b> • Новый праздничный дизайн • Сюрпризы • Салюты • Спасибо, что ты с нами ❤️
  </div>

  <div class="sectionTitle"><h2>🎮 Игры</h2><span>Выбирай режим</span></div>
  <div class="grid">
    <div class="card anniversaryFeature">
      <div class="featureText">
        <div class="icon">🏆</div>
        <h2>Юбилей Robom Games</h2>
        <p>Сегодня особенный день. Запусти праздничный салют и отметь v10.</p>
        <button class="btn" onclick="anniversaryGame()">🎆 Праздновать</button>
      </div>
      <div class="feature10">10</div>
    </div>

    <div class="card">
      <div class="icon">🏐</div><h2>Волейбол</h2>
      <p>Играй и получай Токены.</p>
      <button class="btn" onclick="volleyball()">Играть</button>
    </div>
    <div class="card">
      <div class="icon">⚽</div><h2>Набивание мяча</h2>
      <p>Набивай мяч и зарабатывай быстрее.</p>
      <button class="btn" onclick="juggling()">Играть</button>
    </div>
    <div class="card">
      <div class="icon">🍂</div><h2>Листопад</h2>
      <p>Лови падающие листья и собирай очки.</p>
      <button class="btn" onclick="leafGame()">Играть</button>
    </div>
    <div class="card">
      <div class="icon">🏀</div><h2>Баскетбол</h2>
      <p>Новая игра уже в разработке.</p>
      <button class="btn" disabled>Скоро</button>
    </div>
    <div class="card">
      <div class="icon">🛠️</div><h2>Для разработчиков</h2>
      <p>Служебная панель Robom Games.</p>
      <button class="btn" onclick="developerLogin()">Открыть</button>
    </div>
  </div>

  <div class="anniversaryBalance">
    <span>🪙 Токены: <b>${u.tokens}</b></span>
    <span>💠 Робомы: <b>${u.robom}</b></span>
  </div>

  <p class="small recovery">Потеряли аккаунт? Напишите на gamedevelover@tokman.net</p>
  <p class="small" style="text-align:center">Robom Games v10 • Юбилей 🎉</p>
  <div class="anniversarySecret"><button onclick="anniversarySecret()">🎁 не нажимать</button></div>
  </div>`;
  startLeafFall();
}
function anniversarySecret(){
  startAnniversaryCelebration();
  for(let i=0;i<5;i++)setTimeout(anniversaryFirework,i*350);
  alert("🎁 Ты нашёл секрет юбилейной версии!\n\nС юбилеем Robom Games! 🎉");
}

function startLeafFall(){document.querySelectorAll('.fallingLeaf').forEach(e=>e.remove());for(let i=0;i<18;i++){const el=document.createElement('div');el.className='fallingLeaf';el.textContent=['🍂','🍁','🍃'][i%3];el.style.left=(Math.random()*100)+'vw';el.style.animationDelay=(Math.random()*8)+'s';el.style.animationDuration=(7+Math.random()*7)+'s';el.style.fontSize=(14+Math.random()*18)+'px';document.body.appendChild(el)}}
function leafGame(){stopTimers();gameScore=0;app.innerHTML=`<div class="wrap play leafPlay">${head()}<button class="back" onclick="home()">← Меню</button><h1>🍂 Листопад</h1><div class="status">Собрано: <b id="score">0</b></div><div class="status">🪙 Токенов: <b id="tokens">${u.tokens}</b></div><div class="timer">⏱️ <b id="time">00:00</b></div><button id="start" class="btn" onclick="toggleLeaf()">Начать</button><div id="leafArena" class="leafArena"></div></div>`;spawnLeaf()}
function spawnLeaf(){const a=document.querySelector('#leafArena');if(!a)return;a.querySelectorAll('.catchLeaf').forEach(e=>e.remove());const e=document.createElement('button');e.className='catchLeaf';e.textContent=['🍂','🍁','🍃'][Math.floor(Math.random()*3)];e.style.left=(Math.random()*82+5)+'%';e.style.top=(Math.random()*70+8)+'%';e.onclick=()=>{if(gameRunning){gameScore++;document.querySelector('#score').textContent=gameScore;spawnLeaf()}};a.appendChild(e)}
function toggleLeaf(){if(gameRunning){stopGame();return}gameRunning=true;document.querySelector('#start').textContent='Стоп';let sec=0;gameTimer=setInterval(()=>{sec++;document.querySelector('#time').textContent=formatTime(sec);spawnLeaf()},1000);rewardTimer=setInterval(()=>{u.tokens++;save();document.querySelector('#tokens').textContent=u.tokens},20000)}
function autumnSecret(){alert('🍂 Ты нашёл осенний секрет!\n\nПохоже, один листик здесь лишний...')}
function exchange(){app.insertAdjacentHTML("beforeend",`<div class="overlay" id="ex"><div class="exchange"><h2>💱 Обмен валюты</h2><p>Обменять <b>100 Токенов</b> на <b>1 Робом</b>?</p><p class="small">У тебя: ${u.tokens} 🪙 · ${u.robom} 💠</p><button class="btn" onclick="doExchange()">Обменять</button><button class="link" onclick="document.querySelector('#ex').remove()">Отмена</button></div></div>`)}
function doExchange(){if(u.tokens<100)return alert("Нужно минимум 100 Токенов.");u.tokens-=100;u.robom+=1;save();document.querySelector("#ex").remove();home()}
function developerLogin(){
 app.insertAdjacentHTML("beforeend",`<div class="overlay" id="devLogin"><div class="exchange"><h2>🛠️ Для разработчиков</h2><p>Введите пароль разработчика.</p><input id="devPass" class="input" type="password" placeholder="Пароль"><button class="btn" onclick="checkDeveloperPassword()">Продолжить</button><button class="link" onclick="document.querySelector('#devLogin').remove()">Отмена</button></div></div>`);
}
function checkDeveloperPassword(){
 const pass=document.querySelector("#devPass").value;
 if(pass!=="developerhelp124")return alert("Неверный пароль.");
 document.querySelector("#devLogin").remove();
 developerPanel();
}
function developerPanel(){
 app.insertAdjacentHTML("beforeend",`<div class="overlay" id="devPanel"><div class="exchange"><h2>🛠️ Панель разработчика</h2>
 <p>Текущий баланс: <b>${u.tokens}</b> 🪙 · <b>${u.robom}</b> 💠</p>
 <label>Токены: 0–10000</label><input id="devTokens" class="input" type="number" min="0" max="10000" value="0">
 <button class="btn" onclick="addDevTokens()">Добавить Токены</button>
 <label>Робомы: 0–10000</label><input id="devRobom" class="input" type="number" min="0" max="10000" value="0">
 <button class="btn" onclick="addDevRobom()">Добавить Робомы</button>
 <button class="link" onclick="document.querySelector('#devPanel').remove()">Закрыть</button>
 </div></div>`);
}
function validDevNumber(id){
 const n=Number(document.querySelector(id).value);
 if(!Number.isInteger(n)||n<0||n>10000){alert("Введите целое число от 0 до 10000.");return null}
 return n;
}
function addDevTokens(){
 const n=validDevNumber("#devTokens"); if(n===null)return;
 u.tokens+=n;save();document.querySelector("#devPanel").remove();home();
}
function addDevRobom(){
 const n=validDevNumber("#devRobom"); if(n===null)return;
 u.robom+=n;save();document.querySelector("#devPanel").remove();home();
}
function volley(){stopTimers();gameScore=0;app.innerHTML=`<div class="wrap play">${head()}<button class="back" onclick="home()">← Меню</button><h1>🏐 Волейбол</h1><div class="status">Счёт: <b id="score">0</b></div><div class="status">🪙 Токенов: <b id="tokens">${u.tokens}</b></div><div class="timer">⏱️ <b id="time">00:00</b></div><button id="start" class="btn" onclick="toggleVolley()">Начать</button><div class="arena"><div class="net"></div><div id="v" class="ball">🏐</div></div></div>`;document.querySelector("#v").onclick=()=>{if(gameRunning){gameScore++;document.querySelector("#score").textContent=gameScore;moveBall()}}}
function moveBall(){const v=document.querySelector("#v");if(v){v.style.left=(Math.random()*80+5)+"%";v.style.top=(Math.random()*65+8)+"%"}}
function toggleVolley(){if(gameRunning){stopGame();return}gameRunning=true;document.querySelector("#start").textContent="Стоп";moveBall();let sec=0;gameTimer=setInterval(()=>{sec++;document.querySelector("#time").textContent=formatTime(sec)},1000);rewardTimer=setInterval(()=>{u.tokens++;save();document.querySelector("#tokens").textContent=u.tokens},30000)}
function stopGame(){stopTimers();const b=document.querySelector("#start");if(b)b.textContent="Начать"}
function formatTime(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function kick(){stopTimers();gameScore=0;app.innerHTML=`<div class="wrap play">${head()}<button class="back" onclick="home()">← Меню</button><h1>⚽ Набивание мяча</h1><div class="status">Счёт: <b id="score">0</b></div><div class="status">🪙 Токенов: <b id="tokens">${u.tokens}</b></div><div class="timer">⏱️ <b id="time">00:00</b></div><button id="start" class="btn" onclick="toggleKick()">Начать</button><div id="b" class="bigball">⚽</div></div>`;document.querySelector("#b").onclick=()=>{if(gameRunning){gameScore++;document.querySelector("#score").textContent=gameScore}}}
function toggleKick(){if(gameRunning){stopGame();return}gameRunning=true;document.querySelector("#start").textContent="Стоп";let sec=0;gameTimer=setInterval(()=>{sec++;document.querySelector("#time").textContent=formatTime(sec)},1000);rewardTimer=setInterval(()=>{u.tokens++;save();document.querySelector("#tokens").textContent=u.tokens},1000)}
u?home():auth();
