
function gamestarted() {
    currentscore = 0
    crossing = true

    gameintro = document.querySelector(".gameintro")
    gameover = document.querySelector(".gameover")
    gameintro.style.visibility = "hidden"
    gameover.style.visibility = "hidden"
    btn = document.querySelector(".btn")
    btn.style.visibility = "hidden"
    score = document.querySelector(".score")
    score.innerHTML = "Your Score is: 0"

    obstacle = document.querySelector(".obstacle")
    obstacle.classList.add("animobstacle")
    audiostart = new Audio("game_start.mp3")
    audioend = new Audio("game_over.mp3")
    setTimeout(() => {
        audiostart.play();
        audiostart.loop = true
    }, 300);
    document.onkeydown = function (e) {
        console.log("keycode", e.keyCode)
        if (e.keyCode == 38) {
            boyrunning = document.querySelector(".boyrunning")
            boyrunning.classList.add("jumping")
            setTimeout(() => {
                boyrunning.classList.remove("jumping")
            }, 1000);
        }
        if (e.keyCode == 39) {
            boyrunning = document.querySelector(".boyrunning")
            dx = parseInt(window.getComputedStyle(boyrunning, null).getPropertyValue("left"))
            boyrunning.style.left = dx + 140 + "px";
        }
        if (e.keyCode == 37) {
            boyrunning = document.querySelector(".boyrunning")
            dx = parseInt(window.getComputedStyle(boyrunning, null).getPropertyValue("left"))
            boyrunning.style.left = (dx - 140) + "px";
        }
    }
    setInterval(() => {
        boyrunning = document.querySelector(".boyrunning")
        obstacle = document.querySelector(".obstacle")

        dx = parseInt(window.getComputedStyle(boyrunning, null).getPropertyValue("left"))
        dy = parseInt(window.getComputedStyle(boyrunning, null).getPropertyValue("bottom"))
        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"))
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("bottom"))

        offsetX = Math.abs(dx - ox)
        offsetY = Math.abs(dy - oy)
        // console.log(offsetX)
        // console.log(offsetY)
        if (offsetX < 10 && offsetY < 20) {
            gameover.style.visibility = "visible"
            obstacle.classList.remove("animobstacle")
            audiostart.pause();
            audioend.play();
            btn.innerHTML = "Restart"
            btn.style.visibility = "visible"
            obstacle.style.animationDuration = "5s";
            boyrunning.classList.remove("jumping")
        }
        else if (offsetX < 200 && crossing) {
            currentscore += 1
            updatScore(currentscore)
            crossing = false
            setTimeout(() => {
                crossing = true
            }, 600)
            setTimeout(() => {
                animDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = animDur - 0.001;
                //obstacle.style.animationDuration = newDur + 's';
            }, 1000);

        }

    }, 100);
}
function updatScore(currentscore) {
    score = document.querySelector(".score")
    score.innerHTML = "Your Score is: " + currentscore
}