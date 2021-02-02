const cardText = document.querySelector('h1');
const symbols = ["♣","♦","♥","♠"];
const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const button = document.querySelector('button'); 
firstCard = true;

button.addEventListener('click',dealCardBTN);

function dealCardBTN(e){
    var x = dealCard(roll13(),roll4());
    firstCard = false;
    return x;
}

function roll13(){
return Math.round((Math.random()*13));
}
function roll4(){
return Math.round((Math.random()*3));
}


function dealCard(x,y){
    if(x>2 && x<=10){
        cardText.innerHTML = (cards[x]-1 + " of " + symbols[y] );
        return cards[x];
    }
    else{
        if(x === 1){
            cardText.innerHTML = ("Ace of "+ symbols[y]);
            if(firstCard)
                return 11;
            else
                return 1;
            }
        else if(x === 11){
            cardText.innerHTML = ("Queen of "+ symbols[y]);
            return 10;
        }
        else if(x === 12){
            cardText.innerHTML = ("Jack of "+ symbols[y]);
            return 10;
        }
        
        else{
            cardText.innerHTML = ("King of "+ symbols[y]);
            return 10;
        }
    }
}