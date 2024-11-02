let app = document.querySelector('.app');


const wallet = document.querySelector('#wallet_coin');
const hamster = document.querySelector('.display_tap');
const energy = document.querySelector('#energy');
const lvlProgress = document.querySelector('.level_progress');
const level = document.querySelector('#level');
const nav_mine = document.querySelector('.display_footer_mine');
const display_content = document.querySelector('.display_content');
const mine_content = document.querySelector('.mine_content');
const nav_game = document.querySelector('.display_footer_exchange');





//DB База данных
const data = {
  coin:0,
  energy:1000,
  profit:2,
  level:1,
  level_progress:0,
  earn_per_tap:1,
}



function handleGreeting(){

  let div = document.createElement('div');
  let img = document.createElement('img');
  img.src = './img/hamster-poster.png';
  div.classList.add('greating');

  div.appendChild(img);

  document.body.appendChild(div)


  setTimeout(function(){
    div.remove();
    app.style.display = 'flex';
  },6000)
}


function handleTap(e){
   if(data.energy > 0){
  
    data.coin = data.coin + data.earn_per_tap;
    data.energy = data.energy - 1;
    wallet.innerHTML = data.coin;
    energy.innerHTML = data.energy;
    hamster.classList.add('tap_mod')
    let timer = setTimeout( () => {
    hamster.classList.remove('tap_mod');
    clearTimeout(timer);
    },100);
  }


  const money = document.createElement('img')
  money.src = './img/HMSTR.png';
  money.classList.add('money');

  app.appendChild(money);

  money.style.left = e.clientX + 'px';
  money.style.top = e.clientY -50 + 'px';

  setTimeout(()=>{
    money.remove();
  },1000)
  
  upgradeLevel();

}

function upgradeLevel(){
  if(data.level_progress >= 100){
    data.level = data.level + 1;
    data.earn_per_tap = data.earn_per_tap + 1;
    data.profit = data.profit * 2;
    data.level_progress = 0;

    lvlProgress.style.width = data.level_progress + '%';
    level.innerHTML = data.level;

    
  }

  data.level_progress = data.level_progress + 1;
  lvlProgress.style.width = data.level_progress + '%';
}



function earnPerSecond(){
  let profitInterval = setInterval(function(){
  data.coin = data.coin + data.profit;
  wallet.innerHTML = data.coin;
  },1000)
}

function energyRecovery(){

  let energyInterval = setInterval(function(){
   if(data.energy < 1000){
    data.energy = data.energy + 1;
     energy.innerHTML = data.energy;
     
   }
  
  },1000)



}

function changeToMenu(){
  mine_content.style.display = 'flex';
  display_content.style.display = 'none';
  

}


function changeToGame(){
  mine_content.style.display = 'none';
  display_content.style.display = 'flex';
}








//Вызовы функций

handleGreeting();
earnPerSecond();
energyRecovery();









//События

hamster.addEventListener('click',handleTap)
nav_mine.addEventListener('click',changeToMenu)
nav_game.addEventListener('click',changeToGame)