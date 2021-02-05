const hideBtn = document.querySelector('.X');
const unHideBtn = document.querySelector('.O');
const chipsSec = document.querySelector('.chipsSec');
const dealCardBTN = document.querySelector('img');
let audio = new Audio("images/flipcard.mp3");
const chipsWrapper = document.querySelector('.chipsWrapper');
const tableTotalBet = document.querySelector(".theWholeBet");
let totalBetValue = 0; 
let totalMoneyLeft = 800;
const moneyLeft = document.querySelector(".moneyLeft");
const ifWin = document.querySelector(".ifWin");


chipsWrapper.addEventListener('click',placeBet);
dealCardBTN.addEventListener("click",dealCard);
hideBtn.addEventListener("click",hide);
unHideBtn.addEventListener("click",unHide);


adjust();
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
    tableTotalBet.textContent = totalBetValue + "₺";
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