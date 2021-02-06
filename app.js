//queryselectors
const hideBtn = document.querySelector('.X');
const unHideBtn = document.querySelector('.O');
const chipsSec = document.querySelector('.chipsSec');
const dealCardBTN = document.querySelector('img');
const chipsWrapper = document.querySelector('.chipsWrapper');
const tableTotalBet = document.querySelector(".theWholeBet");
const moneyLeft = document.querySelector(".moneyLeft");
const ifWin = document.querySelector(".ifWin");
const enemyCards = document.querySelector(".Enemy");
const enemyCardArray = document.querySelectorAll(".e");
const playerCardArray = document.querySelectorAll(".p");
const playerCards = document.querySelector(".playerCard");
const stopCarding = document.querySelector(".stopCarding");
const startBTN = document.querySelector(".start");
const myAlert = document.querySelector('.alert');
const reset = document.querySelector(".r");
{
    myAlert.style.opacity = 1;
    myAlert.textContent = "Bahisinizi oynayın ve başla butonuna basın.";
    myAlert.style.fontSize = "30px";
}
let totalBetValue = 0; 
let totalMoneyLeft = 800;
let audio = new Audio("images/flipcard.mp3");
let card = rollInitial();
let cardTwo = rollInitial();
let cardP = rollInitial();
let cardTwoP = rollInitial();
let EnemyPoints = initialPoint(card,cardTwo);
let playerPoint = initialPoint(cardP,cardTwoP);
let playerTurn = false;
let dealerTurn = false; 
let gameEnded = false;
const symbols = ["♣","♦","♥","♠"];
const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13];

//INITIAL FUNCTIONS
eventListeners();
adjust();

function start(){
    setUP();
    myAlert.style.visibility = "hidden";
    playerTurn = true;
    checkBlackjack();
}
function eventListeners(){

    chipsWrapper.addEventListener('click',placeBet);
    dealCardBTN.addEventListener("click",dealCard);
    hideBtn.addEventListener("click",hide);
    unHideBtn.addEventListener("click",unHide);
    stopCarding.addEventListener("click",dealersTurn);
    startBTN.addEventListener("click",start);
    reset.addEventListener('click',(resetle) => {
        localStorage.money = '800';
        location.reload();
    });
    window.addEventListener('DOMContentLoaded', (event) => {
        totalMoneyLeft = JSON.parse(localStorage.money);
        adjust();
    });
}

/* EVENT LISTENER FUNCTIONS */
function hide(){
chipsSec.className = "chipsSec chipHide";
setTimeout(function(){unHideBtn.style.opacity = 1;},1500);

}
function unHide(){
    chipsSec.className = "chipsSec chipUnHide";
    unHideBtn.style.opacity = 0;

}
function dealCard(){
    audio.play();
    playerSetUP();
    
    

}
function placeBet(e){
    console.log(e.target.className);
    switch(e.target.className) {
        case "chipTwo OneInnerOne":
            placeBetControl(1);
            break;
        case "chipTwo FiveInnerOne":
            placeBetControl(5);       
            break;
        case "chipTwo TFiveInnerOne":
            placeBetControl(25);
            break;
        case "chipTwo FiftyInnerOne":
            placeBetControl(50);
            break;
        default:
            totalBetValue = totalBetValue;
            adjust();
            break;
    }
}

/*ADJUSTERS*/
function adjust(){
    moneyLeft.textContent = totalMoneyLeft + "₺";
    tableTotalBet.textContent = totalBetValue*2 + "₺";
    ifWin.textContent = totalBetValue*2 + "₺";
}

/*CHECKERS*/ 
function haveMoney(){
    if(totalMoneyLeft > 0)
        return true;
    else
        return false;
}
function placeBetControl(x){
    if(haveMoney() && totalMoneyLeft >= x)
    {
        totalBetValue+=x;
        totalMoneyLeft-=x;
        adjust();
    }
    else{
        totalBetValue = totalBetValue;
        adjsut();
    }
}


/*ACTUAL FUNCTIONALITY*/
function setUP(){
    enemyCards.style.visibility = "visible";
    EnemyPoints = initialPoint(card,cardTwo);
    openUpEnemyCards(card,cardTwo,false,enemyCardArray);
    playerCards.style.visibility = "visible";
    openUpEnemyCards(cardP,cardTwoP,true,playerCardArray);
}
function playerSetUP(){
    
   if(playerPoint >= 21){
       playerTurn = false;
   }
   else{
        dealCardForPlayer();
   }
   
}

function checkBlackjack(){
    if(playerTurn === true && playerPoint === 21){
        myAlert.style.visibility = "visible";
        myAlert.textContent = "BLACKJACK!";
        console.log("BLACKJACK");
        setTimeout(function(){  
           myAlert.style.visibility = "hidden"; 
            }, 7000);
        playerTurn = false;
        dealerTurn = true;
   }
   else if(playerTurn === true && playerPoint < 21){
       playerTurn = true;
       dealerTurn = false;
   }
   else if(playerTurn === true && playerPoint > 21 ){
       myAlert.style.visibility = "visible";
       myAlert.textContent = "KAYBETTİNİZ";
       localStorage.money = JSON.stringify(totalMoneyLeft);
       setTimeout(function(){  
        location.reload(); 
        }, 2000);
   }

    if(dealerTurn === true && EnemyPoints < playerPoint){
       dealerTurn = true;
       playerTurn = false;
       DealCardForDealer();
       
     }
    else if(dealerTurn === true && EnemyPoints === 21){
        if(playerPoint === EnemyPoints){
            myAlert.style.visibility = "visible";
            myAlert.textContent = "BERABERE";
            totalMoneyLeft+=totalBetValue/2;
            localStorage.money = JSON.stringify(totalMoneyLeft);
            setTimeout(function(){  
                location.reload(); 
                }, 2000);
        }
        else if(playerPoint < EnemyPoints){
            myAlert.style.visibility = "visible";
            myAlert.textContent = "KAZANDINIZ";
            totalMoneyLeft+=totalBetValue*2;
            localStorage.money = JSON.stringify(totalMoneyLeft);
            setTimeout(function(){  
                location.reload(); 
                }, 2000);
        }
        else{
            myAlert.style.visibility = "visible";
            myAlert.textContent = "KAYBETTINIZ";
            localStorage.money = JSON.stringify(totalMoneyLeft);
            setTimeout(function(){  
                location.reload(); 
                }, 2000);
        }
    }
    else if(dealerTurn === true && EnemyPoints >= 21){
            myAlert.style.visibility = "visible";
            myAlert.textContent = "KAZANDINIZ";
            totalMoneyLeft+=totalBetValue*2;
            localStorage.money = JSON.stringify(totalMoneyLeft);
            setTimeout(function(){  
                location.reload(); 
                }, 2000);
        }
    else if(dealerTurn === true && EnemyPoints > playerPoint){
            myAlert.style.visibility = "visible";
            myAlert.textContent = "KAYBETTINIZ";
            localStorage.money = JSON.stringify(totalMoneyLeft);
            setTimeout(function(){  
                location.reload(); 
                }, 2000);
        }
   
}

function initialPoint(card,cardTwo){
    if(cardTwo[1] === 1 && card[1] === 1){
        console.log("if1");
        return 12;
    }
    else if(card[1] === 1 && card[1] + cardTwo[1]<=21){
        console.log("if2");

        card[1] = 11;
        return card[1] + cardTwo[1];
    }
    else if(cardTwo[1] === 1 && card[1] + cardTwo[1]<=21){
        console.log("if3");

        cardTwo[1] = 11;
        return card[1] + cardTwo[1];
    }
   
    return card[1] + cardTwo[1];
}
function openUpEnemyCards(card,cardTwo,check,array){
    
    if(check){
        array[0].style.backgroundImage = "url(cards/"+card[0]+"_of_hearts.png)";
        array[1].style.backgroundImage = "url(cards/"+cardTwo[0]+"_of_hearts.png)";
    }
    else{
        array[1].style.backgroundImage = "url(cards/"+cardTwo[0]+"_of_hearts.png)";
    }
}
function dealersTurn(){
    openUpEnemyCards(card,cardTwo,true,enemyCardArray);
    playerTurn = false;
    dealerTurn = true;
    checkBlackjack();
}
function rollInitial(){
    let randomize = Math.round((Math.random()*13));
    if(randomize === 0)
        randomize++;
    let cardOne = randomize;
    if(randomize > 10)
        randomize = 10;
    return [cardOne,randomize];
}
function dealCardForPlayer(){
    if(playerTurn){
        
        card = rollInitial();
        
        newCard = document.createElement('div');
        newCard.className = "cards p";
        newCard.style.backgroundImage = "url(cards/"+card[0]+"_of_hearts.png)";
        playerPoint += card[1];
        playerCards.appendChild(newCard);
        checkBlackjack();
    }
}
function DealCardForDealer(){
    if(dealerTurn){
        
        card = rollInitial();
        
        newCard = document.createElement('div');
        newCard.className = "cards p";
        newCard.style.backgroundImage = "url(cards/"+card[0]+"_of_hearts.png)";
        EnemyPoints += card[1];
        enemyCards.appendChild(newCard);
        checkBlackjack();
    }
}

