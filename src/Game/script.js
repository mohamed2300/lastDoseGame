
export default function load() {


    var character = document.querySelector(".character");
    var map = document.querySelector(".map");
    var imgs = document.getElementsByClassName("imgc");
    //start in the middle of the map
    var x = 380;
    var y = 34;
    var held_directions = []; //State of which arrow keys we are holding down
    var speed = 1; //How fast the character moves in pixels per frame

    const placeCharacter = () => {

        var pixelSize = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
        );

        const held_direction = held_directions[0];
        if (held_direction) {
            if (held_direction === directions.right) { x += speed; }
            if (held_direction === directions.left) { x -= speed; }
            if (held_direction === directions.down) { y += speed; }
            if (held_direction === directions.up) { y -= speed; }
            character.setAttribute("facing", held_direction);
        }
        character.setAttribute("walking", held_direction ? "true" : "false");
        window.localStorage.setItem("y", y)
        window.localStorage.setItem("x", x)

        //Limits (gives the illusion of walls)
        var leftLimit = -8;
        var rightLimit = (108 * 11) + 8;
        var topLimit = -8 + 22;
        var bottomLimit = (20.5 * 8);
        if (x < leftLimit) { x = leftLimit; }
        // if (x > rightLimit) { x = rightLimit; }
        if (y < topLimit) { y = topLimit; }
        if (y > bottomLimit) { y = bottomLimit; }

        for (let i = 0; i < imgs.length; i++) {
            let ch = document.getElementsByClassName("character")[0];
            let img = document.getElementsByClassName("imgc")[i];
            const rect1 = img.getBoundingClientRect();
            const rect2 = ch.getBoundingClientRect();
            const isInHoriztonalBounds =
                rect1.x + 50 < rect2.x + rect2.width && rect1.x - 50 + rect1.width > rect2.x;
            const isInVerticalBounds =
                rect1.y + 20 < rect2.y + rect2.height && rect1.y - 60 + rect1.height > rect2.y;
            const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
            if (isOverlapping) {
                let c = document.getElementsByClassName("imgc")[i];
                if (c.id != "bid") {
                    c.remove();
                }


                if (c.id == "0") {
                    document.querySelector("#lost h1").innerHTML = "Lost";
                    document.getElementById("lost").classList.remove("hidden")
                    document.getElementById("lost").classList.add("lost")
                    document.querySelector("#lost p").innerHTML = "you got infected with the virus";


                } else if (c.id == "bid" && window.localStorage.getItem("end") == "true") {
                    document.getElementById("lost").classList.remove("hidden")
                    document.getElementById("lost").classList.add("lost")
                    let g = JSON.parse(window.localStorage.getItem("theGame"))[0];
                    let r = Math.max.apply(Math, (g.bids));
                    let s = parseInt(window.localStorage.getItem("score"));

                    if (r == s) {
                        document.querySelector("#lost h1").innerHTML = "Congraduations";
                        document.querySelector("#lost p").innerHTML = "Your bid of " + window.localStorage.getItem("score") + " was highest";

                    } else {
                        document.querySelector("#lost h1").innerHTML = "Lost";
                        document.querySelector("#lost p").innerHTML = "your ware outbidded by  $" + parseInt(r) - parseInt(window.localStorage.getItem("score")) + "";

                    }

                }
                else if (c.id == "bid" && window.localStorage.getItem("end") == "false") {
                    // alert("you still have time")
                }
                else {
                    window.localStorage.setItem("score", parseInt(window.localStorage.getItem("score")) + parseInt(c.id))
                    document.getElementById("score").innerHTML = "wallet: $" + window.localStorage.getItem("score");
                }
            }
            // return isOverlapping;

            var camera_left = pixelSize * 66;
            var camera_top = pixelSize * 42;
            check();
            if (window.localStorage.getItem("end") == "false") {
                map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
                character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;


                for (let img of imgs) {

                    img.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;


                }
            }
        }
        // console.log("======> x: " + x)
        // console.log("======> y: " + y)

    }
    function check() {
        function inRange(n, x) {
            if (x < n + 5 && x > n - 5) return true

        }

        let xloc = window.localStorage.getItem("x")
        let yloc = window.localStorage.getItem("y")

    }

    //Set up the game loop
    const step = () => {

        placeCharacter();
        window.requestAnimationFrame(() => {
            step();
        })
    }
    step(); //kick off the first step!



    /* Direction key state */
    const directions = {
        up: "up",
        down: "down",
        left: "left",
        right: "right",
    }
    const keys = {
        38: directions.up,
        37: directions.left,
        39: directions.right,
        40: directions.down,
    }
    document.addEventListener("keydown", (e) => {
        var dir = keys[e.which];
        if (dir && held_directions.indexOf(dir) === -1) {
            held_directions.unshift(dir)
        }
    })

    document.addEventListener("keyup", (e) => {
        var dir = keys[e.which];
        var index = held_directions.indexOf(dir);
        if (index > -1) {
            held_directions.splice(index, 1)
        }
    });



    /* BONUS! Dpad functionality for mouse and touch */
    var isPressed = false;
    const removePressedAll = () => {
        document.querySelectorAll(".dpad-button").forEach(d => {
            d.classList.remove("pressed")
        })
    }
    document.body.addEventListener("mousedown", () => {

        console.log('mouse is down')
        isPressed = true;
    })
    document.body.addEventListener("mouseup", () => {
        console.log('mouse is up')
        isPressed = false;
        held_directions = [];
        removePressedAll();
    })
    const handleDpadPress = (direction, click) => {
        if (click) {
            isPressed = true;
        }
        held_directions = (isPressed) ? [direction] : []

        if (isPressed) {
            removePressedAll();
            document.querySelector(".dpad-" + direction).classList.add("pressed");
        }
    }
    //Bind a ton of events for the dpad







}

