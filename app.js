const hideBtn = document.querySelector('.X');
const unHideBtn = document.querySelector('.O');
const chipsSec = document.querySelector('.chipsSec');

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