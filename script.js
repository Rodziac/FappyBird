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
        jumpId++;
        var oldTopValue = 0;
        var jumpHeight = 9;
        var currentJumpId = jumpId;
        setInterval(function(){
            if(currentJumpId == jumpId) {
                oldTopValue = parseInt(that.domElement.style.top.replace("%",""));
                if (jumpHeight > 0) {
                    that.domElement.className = "upAnimation";
                    that.domElement.style.top = --oldTopValue + "%";
                    jumpHeight--;
                } else {
                    that.domElement.className = "downAnimation";
                    that.domElement.style.top = ++oldTopValue + "%";
                }

                if(that.domElement.style.top == "100%"){
                    location.reload();
                }
            }
        }, 40);
    }, false);

};

fappyBird.Pipe = function(height, pipeNumber) {

    this.height = height;
    this.pipeId = "pipe_" + pipeNumber;
    this.domForeground = document.getElementById("foreground");

    this.appendPipe(height);
    this.setAnimation(1);
    //this.bindEvents();

};

fappyBird.Pipe.prototype.appendPipe = function(height) {

    var domPipeTemplate = this.pipeTemplate();
    this.domForeground.innerHTML += domPipeTemplate;
    this.pipeDom = document.getElementById(this.pipeId);
    this.pipeDom.style.top = height + "%";

};

fappyBird.Pipe.prototype.setAnimation = function(speed) {

    var that = this;
    var pipeLocation = 100;
    this.pipeDom.style.left = pipeLocation + "%";
    setInterval(function(){
        pipeLocation -= speed
        that.pipeDom.style.left = pipeLocation + "%";
        if(pipeLocation == -50){
            that.pipeDom.remove();
        }
    }, 40);

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
    this.domBackground.style.backgroundPosition = backgroundXPosition + "px 0px";
    setInterval(function(){

        backgroundXPosition -= speed;
        that.domBackground.style.backgroundPosition = backgroundXPosition + "px 0px";

    }, 25);

};

fappyBird.Level.prototype.generatePipes = function(speed) {

    var pipeCount = 0;
    setInterval(function(){
        new fappyBird.Pipe(-50, pipeCount++);
    }, 5000);

};

