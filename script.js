var fappyBird = {};

fappyBird.Character = function() {

    this.domElement = document.getElementById("littleBastard");
    this.domGame = document.getElementById("game");

    this.bindEvents();

};

fappyBird.Character.prototype.bindEvents = function() {

    var that = this;
    var latestJumpId = 0;
    this.domGame.addEventListener("click", function(){
        jumpHeight = 9;
        var oldTopValue = parseInt(that.domElement.offsetTop) + "px";
        var newTopValue = parseInt(that.domElement.offsetTop - ((window.innerHeight * jumpHeight) / 100)) + "px";

        that.domElement.className = "upAnimation";
        that.domElement.style.top = newTopValue;

        latestJumpId++;
        var thisJumpId = latestJumpId;
        setTimeout(function(){
            if(thisJumpId == latestJumpId){
                that.domElement.style.top = window.innerHeight + that.domElement.offsetHeight + "px";
                that.domElement.className = "downAnimation";
            }
        }, 700);
    }, false);

    setInterval(function(){
        if(that.domElement.offsetTop + that.domElement.offsetHeight >= window.innerHeight){
            that.domGame.parentNode.removeChild(that.domGame);
            location.reload();
        } else if (that.domElement.offsetTop < 0) {
            that.domElement.style.top = 0 + "px";
        }
    }, 25);

};

fappyBird.Pipe = function(height, pipeNumber) {

    this.height = height;
    this.pipeId = "pipe_" + pipeNumber;
    this.domForeground = document.getElementById("foreground");
    this.domCharacter = document.getElementById("littleBastard");
    this.domGame = document.getElementById("game");
    this.alive = true;

    this.appendPipe(height);
    this.setAnimation(1);

};

fappyBird.Pipe.prototype.appendPipe = function(height) {

    var domPipeTemplate = this.pipeTemplate();
    this.domForeground.appendChild(domPipeTemplate);
    this.pipeDom = document.getElementById(this.pipeId);
    this.pipeDom.style.top = height + "%";

};

fappyBird.Pipe.prototype.destroyPipe = function() {

    clearInterval(this.intervalId);
    this.alive = false;
    this.pipeDom.remove();

};

fappyBird.Pipe.prototype.setAnimation = function(speed) {

    var that = this;
    this.intervalId = setInterval(function(){

        //Remove when outside boundries
        if(that.pipeDom.offsetLeft <= 0){
            that.destroyPipe();
        }

        if (that.alive == true){
            //character pipe collusion
            var characterRightPosition = that.domCharacter.offsetWidth + that.domCharacter.offsetLeft
            var pipeLeftPosition = that.pipeDom.offsetLeft;
            if(characterRightPosition >= pipeLeftPosition) {
                var characterTopPosition = that.domCharacter.offsetTop;
                var characterBottomPosition = characterTopPosition + that.domCharacter.offsetHeight;
                var pipeSpaceTop = document.getElementsByClassName("pipeHead", that.pipeDom)[0].offsetTop - ((window.innerHeight * (that.height * -1)) / 100) + document.getElementsByClassName("pipeHead", that.pipeDom)[0].offsetHeight;
                var pipeSpaceBottom = document.getElementsByClassName("pipeHead", that.pipeDom)[1].offsetTop - ((window.innerHeight * (that.height * -1)) / 100);
                if(characterTopPosition < pipeSpaceTop || characterBottomPosition > pipeSpaceBottom){
                    that.domGame.parentNode.removeChild(that.domGame);
                    location.reload();
                }
            }
        }

    }, 25);

};

fappyBird.Pipe.prototype.pipeTemplate = function() {

    var pipeEl = document.createElement("div");
    pipeEl.className = "pipe";
    pipeEl.id = this.pipeId;
    pipeEl.innerHTML = '<div class="pipeBody"></div>' +
                       '<div class="pipeHead down"></div>' +
                       '<div class="pipeHead"></div>'+
                       '<div class="pipeBody"></div>';
    return pipeEl;

};

fappyBird.Level = function() {

    this.littleBastard = new fappyBird.Character();

    this.domBackground = document.getElementById("background");
    this.domGame = document.getElementById("game");
    this.bindEvents(3);

};

fappyBird.Level.prototype.bindEvents = function(speed) {

    var that = this;

    var gameActions = function() {
        that.setAnimation(speed);
        that.generatePipes();
        that.domGame.removeEventListener("click", gameActions, false);
    };

    that.domGame.addEventListener("click", gameActions, false);

};

fappyBird.Level.prototype.setAnimation = function(speed) {

    var that = this;

    var backgroundXPosition = 0;
    this.domBackground.style.backgroundPosition = backgroundXPosition + "px 0";
    setInterval(function(){

        backgroundXPosition -= speed;
        that.domBackground.style.backgroundPosition = backgroundXPosition + "px 0";

    }, 25);

};

fappyBird.Level.prototype.generatePipes = function(speed) {

    var pipeCount = 0;
    setInterval(function(){
        new fappyBird.Pipe( -1 * (Math.floor(Math.random() * (70 - 10 + 1)) + 10), pipeCount);
        pipeCount++
    }, 1500);

};

