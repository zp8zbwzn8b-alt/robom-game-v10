const KEY="robom_account_v2";let u=JSON.parse(localStorage.getItem(KEY)||"null");const app=document.querySelector("#app");let gameTimer=null,rewardTimer=null,gameScore=0,gameRunning=false;
function save(){localStorage.setItem(KEY,JSON.stringify(u))}
function stopTimers(){if(gameTimer)clearInterval(gameTimer);if(rewardTimer)clearInterval(rewardTimer);gameTimer=null;rewardTimer=null;gameRunning=false}
function auth(reg=false){app.innerHTML=`<div class="auth"><div class="box"><h1>🎮 Robom Games</h1><p class="sub">${reg?"Создай аккаунт":"Войди в аккаунт"}</p>${reg?'<input id="name" class="input" placeholder="Имя">':""}<input id="email" class="input" placeholder="Почта" type="email"><input id="pass" class="input" placeholder="Пароль" type="password"><button class="btn" onclick="submitAuth(${reg})">${reg?"Зарегистрироваться":"Войти"}</button><button class="link" onclick="auth(${!reg})">${reg?"Уже есть аккаунт? Войти":"Нет аккаунта? Регистрация"}</button></div></div>`}
function submitAuth(reg){const e=document.querySelector("#email").value.trim().toLowerCase(),p=document.querySelector("#pass").value;if(!e||!p)return alert("Заполни почту и пароль");if(reg){if(p.length<4)return alert("Пароль должен быть минимум 4 символа");u={name:document.querySelector("#name").value.trim()||"Игрок",email:e,pass:p,tokens:100,robom:0};save();home()}else{const old=JSON.parse(localStorage.getItem("robom_account")||"null");const found=(u&&u.email&&u.email.toLowerCase()===e&&u.pass===p)?u:(old&&old.email&&old.email.toLowerCase()===e&&old.pass===p)?old:null;if(!found)return alert("Неверная почта или пароль. Проверь раскладку и пробелы.");u={name:found.name||"Игрок",email:found.email.toLowerCase(),pass:found.pass,tokens:Number(found.tokens)||0,robom:Number(found.robom)||0};save();home()}}
function head(){return `<div class="head"><div><b>Привет, ${u.name}! 👋</b></div><div class="wallet"><span class="coin">🪙 Токены: ${u.tokens}</span><span class="coin">💠 Робом: ${u.robom}</span><button class="exchangeBtn" onclick="exchange()">Обмен</button><button class="exit" onclick="stopTimers();u=null;auth()">Выйти</button></div></div>`}
function home(){stopTimers();app.innerHTML=`<div class="wrap">${head()}<section class="hero"><span class="heroTag">ROBOM GAMES</span><h1>Играй. Зарабатывай. Побеждай. ⚡</h1><p>Добро пожаловать в Robom Games — выбирай игру, запускай раунд и собирай Токены. Потом меняй их на Робомы.</p></section><div class="sectionTitle"><h2>🎮 Игры</h2><span>Выбери свой режим</span></div><div class="grid"><div class="game"><div class="gameTop"><div><h2>Волейбол</h2><p>Играй в арене и получай +1 Токен каждые 30 секунд.</p></div><div class="gameIcon">🏐</div></div><button class="btn" onclick="volley()">Играть</button></div><div class="game"><div class="gameTop"><div><h2>Набивание мяча</h2><p>Проверяй скорость и получай +1 Токен каждую секунду.</p></div><div class="gameIcon">⚽</div></div><button class="btn" onclick="kick()">Играть</button></div><div class="game soon"><div class="gameTop"><div><h2>Баскетбол</h2><p>Новый режим уже в разработке. Скоро здесь будет жарко.</p></div><div class="gameIcon">🏀</div></div><button class="btn" disabled>Скоро будет</button></div><div class="game dev"><div class="gameTop"><div><h2>Для разработчиков</h2><p>Служебная панель для управления валютой аккаунта.</p></div><div class="gameIcon">🛠️</div></div><button class="btn" onclick="developerLogin()">Открыть</button></div></div><p class="small recovery">Потеряли аккаунт? Напишите на <a href="mailto:gamedevelover@tokman.net">gamedevelover@tokman.net</a></p></div>`}
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
