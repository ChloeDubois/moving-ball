// Create Scene
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = "700px";
screen.style.height = "400px";
screen.style.border = "solid 1px black";
screen.style.background = "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)";

const floor = document.createElement('div');
floor.style.position = "absolute";
floor.style.bottom = 0;
floor.style.width = "700px";
floor.style.height = "10px";
floor.style.border = "solid 1px green";
floor.style.backgroundColor = "green";
screen.appendChild(floor);

const box = document.createElement('div');
box.style.position = "absolute";
box.style.bottom = "12px";
box.style.right = "25px";
box.style.width = "80px";
box.style.height = "120px";
box.style.backgroundColor = "#eae060";
box.style.border = "solid 2px #bbb44f";
box.style.borderRadius = "5px";
screen.appendChild(box);

const perso = document.createElement('div');
perso.style.position = "absolute";
perso.style.bottom = "12px";
perso.style.left = "25px";
perso.style.width = "30px";
perso.style.height = "30px";
perso.style.backgroundColor = "red";
perso.style.border = "solid 2px black";
perso.style.borderRadius = "20px";
perso.setAttribute("id", "perso");
screen.appendChild(perso);

root.appendChild(screen);

// Make the character move and jump!
let jumping = false;

document.addEventListener('keydown', (event) => {
    let positionX = parseInt((perso.style.left).substring(0, (perso.style.left).length - 2))
    let positionY = parseInt((perso.style.bottom).substring(0, (perso.style.bottom).length - 2))
    // go left
    if (event.code == 'ArrowLeft') {
        // the ball fall on the floor if it is on the box
        if (positionX < 570 && positionY == 135) {
            let interval2 = window.setInterval(function(){
                positionY --;
                perso.style.bottom = positionY;
                if (positionY == 12){
                    clearInterval(interval2)
                }
            }, 5);
        }
        if (positionX >= 5) {
            positionX = (positionX - 5).toString() + "px";
            perso.style.left = positionX;
        }
    };
    // go right
    if (event.code == 'ArrowRight') {
        // the ball fall on the floor if it is on the box
        if (positionX > 662 && positionY == 135) {
            let interval2 = window.setInterval(function(){
                positionY --;
                perso.style.bottom = positionY;
                if (positionY == 12){
                    clearInterval(interval2)
                }
            }, 5);
        }
        if (positionX <= 663) {
            positionX = (positionX + 5).toString() + "px";
            perso.style.left = positionX;
        }
    };
    // jump
    // to jump & move in the same time, press jump first, then move r/l when the ball is in the air.
    if (event.code == 'Space') {
        if (!jumping) {
            jumping = true
            let interval = window.setInterval(function(){
                positionY ++;
                perso.style.bottom = positionY;
            }, 5);
            window.setTimeout (function(){
                window.clearInterval(interval);
                let interval2 = window.setInterval(function(){
                    positionY --;
                    perso.style.bottom = positionY;
                    // the ball stay on the box vs on the floor depending on position on X axis.
                    if (((positionX >= 570 && positionX <=660 ) && positionY == 135) 
                    || ((positionX < 570 || positionX > 660) && positionY == 12)){
                        clearInterval(interval2)
                        jumping = false
                    }
                }, 5);
            }, 750);
        }
    };
});
