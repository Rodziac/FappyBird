var fappyBird = {};

fappyBird.Character = function() {

    this.domElement = document.getElementById("littleBastard");
    this.domGame = document.getElementById("game");

    this.bindEvents();

};

fappyBird.Character.prototype.bindEvents = function() {

    var that = this;
    var jumpId = 0;
    this.domGame.addEventListener("click", function(){
        var oldTopValue = that.domElement.offsetTop;
        jumpHeight = 9;
        var newTopValue = oldTopValue - (window.innerHeight * jumpHeight) / 100;
        that.domElement.className = "upAnimation";
        that.domElement.style.top = newTopValue + "px";

        setTimeout(function(){
            that.domElement.className = "downAnimation";
        }, 500);
    }, false);

    setInterval(function(){
        if(that.domElement.offsetTop + that.domElement.offsetHeight == window.innerHeight){
            that.domGame.parentNode.removeChild(that.domGame);
            location.reload();
        }
    }, 25);

};

fappyBird.Pipe = function(height, pipeNumber) {

    this.height = height;
    this.pipeId = "pipe_" + pipeNumber;
    this.domForeground = document.getElementById("foreground");
    this.domCharacter = document.getElementById("littleBastard");
    this.domGame = document.getElementById("game");

    this.appendPipe(height);
    this.setAnimation(1);

};

fappyBird.Pipe.prototype.appendPipe = function(height) {

    var domPipeTemplate = this.pipeTemplate();
    this.domForeground.innerHTML += domPipeTemplate;
    this.pipeDom = document.getElementById(this.pipeId);
    this.pipeDom.style.top = height + "%";

};

fappyBird.Pipe.prototype.setAnimation = function(speed) {

    var that = this;
    setInterval(function(){

        //Remove when outside boundries
        if(that.pipeDom.offsetLeft == that.pipeDom.offsetWidth){
            that.pipeDom.remove();
        }

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

    }, 25);

};

fappyBird.Pipe.prototype.pipeTemplate = function() {

    return '<div class="pipe" id="' + this.pipeId + '">' +
                      '<div class="pipeBody"></div>' +
                      '<div class="pipeHead down"></div>' +
                      '<div class="pipeHead"></div>'+
                      '<div class="pipeBody"></div>'
                  '</div>';

};

fappyBird.Level = function() {

    this.littleBastard = new fappyBird.Character();
    this.littleBastard.bindEvents();

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
        new fappyBird.Pipe(-50, pipeCount++);
    }, 5000);

};

