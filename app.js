const hideBtn = document.querySelector('.X');
const unHideBtn = document.querySelector('.O');
const chipsSec = document.querySelector('.chipsSec');
const dealCardBTN = document.querySelector('img');
var audio = new Audio("images/flipcard.mp3");


dealCardBTN.addEventListener("click",dealCard);
hideBtn.addEventListener("click",hide);
unHideBtn.addEventListener("click",unHide);

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