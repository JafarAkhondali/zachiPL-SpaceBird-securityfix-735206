/* global Engine */
/**
 * this event is triggered when all aseets from a default asset group
 * are loaded or just after PRELOAD event, when no assets were added to the default group
 */
Engine.ready(function(){
  
  var btnLeft = 0;
  var btnRight = 0;
  var btnUp = 0;
  var btnDown = 0;
  var AccelX = 0;
  var AccelY = 0;
  var inGame = false;
  var birdWidth = 40;
  var birdHeight = 26;
  var Bullets = [];
  var Enemies = [];
  var stars = [];
  var Score = 0;
  var bird1 = false;
  var hp = 3;
  
  var snd_catDie = new Engine.AmbientSound( {
      sound: 'boom',
      autoplay: false
  });
  
  var snd_shoot = new Engine.AmbientSound( {
      sound: 'fire',
      autoplay: false
  });
  
  var snd_die = new Engine.AmbientSound( {
      sound: 'die',
      autoplay: false
  });
  
  var snd_intro = new Engine.AmbientSound( {
    sound: 'introsnd',
    autoplay: false,
    loop: true
  });
  
  var viewport = new Engine.Viewport('engine', 800, 600);
  var scene = new Engine.Scene({
      color: "#aaaaaa"
  });
  var camera = new Engine.Camera({
      lookAt: scene
  });
  viewport.addCamera(camera);
  
  var layout = new Engine.Node();
  scene.appendChild(layout);
  
  var bg = new Engine.Rectangle ( {
    parent: layout,
    name: 'bg',
    image: 'bg',
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    zIndex: -1
  } );
  var paddle;
  
  var scoreText = new Engine.Shape.Text( {
    parent: layout,
    name: 'scoreText',
    fontSize:18,
    font: Engine.Font('static/widepixel.ttf'),
    text: 'Score: ' + Score,
    x : -380,
    y : -295,
    width: 999,
    textColor: '#ffffff'
  } );
  
  var logoImg;
  var pressStartImg;
  var startText;
  
  var lifeImg = new Engine.Rectangle( {
    parent: layout,
    name:'lifeImg',
    image: 'life3',
    x: 380,
    y: -280,
    width: 20,
    height: 20
  });
  
  var SpawnTimer = new Engine.Timer( {
    delay: 1250,
    tupe:Engine.Timer.VSYNC,
    autoplay: false,
    duration: 10000,
    loop: true,
    on : {
      loop: function() {
        if(!IntroTimer.playing) {
          this.delay *= .9;
          for(var i = 0; i < Math.min(this.count-1, 8); i++) {
            SpawnMegaEnemy(Math.random() * 520 - 210, layout, Enemies); 
          }
        }
      },
      step: function() {
        if(!IntroTimer.playing) {
          var enY = Math.random() * 520 - 210;
          SpawnEnemy(enY, layout, Enemies)
          if(Math.abs(enY) > 120) 
          {
            if(Math.random() > .3) {
              SpawnEnemy(-enY, layout, Enemies); 
            }
          }
        }
      },
      play: function () {
        this.delay = 1250;
      }
    }
  });
  
  var DeadImage;
  var IntroImage;
  
  var introId = 0;
  var IntroTimer = new Engine.Timer( {
    delay: 10,
    duration: 4300,
    type: Engine.Timer.VSYNC,
    autoplay: false,
    loop: true,
    on: {
      play: function() {
        introId = 0;
        snd_intro.play();
        IntroImage = new Engine.Rectangle( {
          width: 800,
          height: 600,
          x: 0,
          y: 0,
          parent: layout,
          zIndex: 4,
          image: 'intro0'
        });
      },
      loop: function() {
        introId++;
        if(introId == 1) {
          IntroImage.image = 'intro1'; 
        } else if(introId == 2) {
          IntroImage.image = 'intro2'; 
        } else {
          IntroTimer.stop();
        }
      },
      stop: function() {
        IntroImage.destroy();
        snd_intro.stop();
      }
    }
  });
  
  var DeadTimer = new Engine.Timer( {
    delay: 10,
    duration: 3000,
    type: Engine.Timer.VSYNC,
    autoplay: false,
    loop: false,
    on : {
      play: function() {
        snd_die.play();
        paddle.destroy();
         DeadImage = new Engine.Rectangle( {
           x: 0,
           y: 0,
           width: 10,
           height: 10,
           image: 'dead',
           zIndex: 10,
           parent: layout,
           name: 'deadImg'
         });
      },
      step : function () {
        DeadImage.width += 1.5;
        DeadImage.height += 1.5;
      },
      stop : function() {
        DeadImage.destroy();
        GameTimer.stop();
      }
    }
  });
  
  var GameTimer = new Engine.Timer( {
    delay: 10,
    duration: 500,
	type: Engine.Timer.VSYNC,
	autoplay: false,
	loop: true,
    on : {
      loop: function() {
        if(bird1) {
          paddle.image = 'spacebirdA';
          bird1 = false;
        } else {
          paddle.image = 'spacebird';
          bird1 = true;
        }
      },
      stop: function() {    
        if(paddle) {
          layout.removeChild(paddle); 
        }
        for(var i = 0; i < Enemies.length; i++) {
          Enemies[i].x -= 1000;
        }
        for(var i = 0; i < Bullets.length; i++) {
          Bullets[i].x += 1000;
        }
        for(var i = 0; i < stars.length; i++) {
          stars[i].y -= 3000;
        }
        MenuTimer.play(); 
        SpawnTimer.stop();
      },
      step: function() {
        if(IntroTimer.playing) {
         return; 
        }
        if(paddle) {
          if(btnLeft) AccelX -= .2;
          if(btnLeft && (AccelX > 0)) {
            AccelX -= 1.4; 
          }
          if(btnRight) AccelX += .2;
          if(btnRight && (AccelX < 0)) {
            AccelX += 1.4; 
          }
          if(!(btnLeft || btnRight)) {
            AccelX *= .9;
          }
          if(btnUp) AccelY -= .2;
          if(btnUp && (AccelY > 0)) {
            AccelY -= 1.4; 
          }
          if(btnDown) AccelY += .2;
          if(btnDown && AccelY < 0) {
            AccelY += 1.4; 
          }
          if(!(btnUp || btnDown)) {
            AccelY *= .9;
          }
          AccelY = Math.min(Math.max(-10, AccelY), 10);
          paddle.rotation = (-AccelY / 90) * Math.PI;
          paddle.x += Math.min(Math.max(-3, AccelX), 3);
          paddle.x = Math.min(Math.max(-380, paddle.x), 0);
          paddle.y += Math.min(Math.max(-3, AccelY), 3);
          paddle.y = Math.min(Math.max(-280, paddle.y), 280);
          
          // detect collision
          for(var i = 0; i < stars.length; i++) {
            if(stars[i].getGlobalBoundingBox().overlap(paddle.getGlobalBoundingBox())) {
              hp++;
              hp = Math.min(3, hp);  
              if(hp == 3 ) {
                lifeImg.image = 'life3';
              } else if (hp == 2) {
                lifeImg.image = 'life2'; 
              } else if (hp == 1) {
                 lifeImg.image = 'life1';
              } else {
                DeadTimer.play();
              }
              stars[i].x += 1200;
            }
          }
          for(var i = 0; i < Enemies.length; i++) {
            if(Enemies[i].getGlobalBoundingBox().overlap(paddle.getGlobalBoundingBox())) {
              hp--;
              hp = Math.min(3, hp);  
              if(hp == 3 ) {
                lifeImg.image = 'life3';
              } else if (hp == 2) {
                lifeImg.image = 'life2'; 
              } else if (hp == 1) {
                 lifeImg.image = 'life1';
              } else {
                DeadTimer.play();
                lifeImg.image = 'dead';
              }
              Enemies[i].x -= 1000;
            }
            for (var j = 0; j < Bullets.length; j++) {
               if(Enemies[i].getGlobalBoundingBox().overlap(Bullets[j].getGlobalBoundingBox())) {
                 if(Enemies[i].name != 'cat2') {
                   Bullets[j].x += 1000;
                   Enemies[i].x -= 1000;
                   if(Enemies[i].name == 'cat') {
                      Score += 100;
                      snd_catDie.play();
                   } else {
                      Score += 10; 
                   }
                  scoreText.text = 'SCORE: ' + Score; 
                 }
               }
            }
          }
        }
        if(stars.length == 0) {
          GameTimer.trigger('genStar');
        }
      },
      play: function() {
        IntroTimer.play();
        hp = 3;
        lifeImg.image = 'life3';
        GameTimer.trigger('genStar');
        bird1 = true;
        SpawnTimer.play();
        Score = 0;
        scoreText.text = 'SCORE: ' + Score; 
        paddle = new Engine.Rectangle({
          parent: layout,
          name: 'spacebird',
          image: 'spacebird',
          x: -380,
          y: 0,
          width: birdWidth,
          height: birdHeight
        });
        inGame = true; 
        AccelX = 0;
        AccelY = 0;
      },
      genStar: function() {
        Star(174, 247, layout, stars);
        Star(271, 265, layout, stars);
        Star(315, 170, layout, stars);
        Star(359, 141, layout, stars);
        Star(394, 124, layout, stars);
        Star(402, 299, layout, stars);
        Star(400, 479, layout, stars);
        Star(593, 171, layout, stars);
        Star(628, 165, layout, stars); 
      }
    }
  });
  
  var MenuTimer = new Engine.Timer({
    delay: 15,
	type: Engine.Timer.STANDARD,
	autoplay: true,
	loop: true,
    on : {
      stop: function() {
        GameTimer.play();
        logoImg.destroy();
        Engine.Rectangle.free(logoImg);
        pressStartImg.destroy();
        Engine.Rectangle.free(pressStartImg);
        startText.destroy();
      },
      step: function() {
        scene.color = "#aaaaaa"
      },
      play: function () {
         inGame = false;
        logoImg = new Engine.Rectangle( {
          parent: layout,
          name: 'logoImg',
          image: 'logo',
          x: 0,
          y: -100,
          width:618,
          height: 58
        });
        startText  =new Engine.Shape.Text ({
          parent: layout,
          name: 'startText',
          fontSize:22,
          font: Engine.Font('static/widepixel.ttf'),
          text: 'Press space to',
          x : -110,
          y : 40,
          //textAlign: Engine.Shape.Text.CENTER,
          width: 999,
          textColor: '#ffffff'
        } );
        pressStartImg = new Engine.Rectangle( {
          parent: layout,
          name: 'pressStartImg',
          image: 'press-start',
          x:0,
          y: 100,
          width: 330,
          height: 60
        });
      }
    }
  });
  
  Engine.Input.on("keydown", function(e) {
    //console.log(e.key);
    if(e.key == "SPACE") {
      if(GameTimer.playing) {
        Shoot(paddle.x, paddle.y, layout, Bullets, paddle.rotation);
        snd_shoot.play();
      } else {
        MenuTimer.stop(); 
      }
    } else if (e.key == "ESC" && GameTimer.playing) {
      GameTimer.stop();
    } else if(e.key == 'ARROW_DOWN') {
      btnDown = true;
    } else if (e.key == 'ARROW_UP') {
      btnUp = true;
    } else if (e.key == 'ARROW_LEFT') {
      btnLeft = true;
    } else if (e.key == 'ARROW_RIGHT') {
      btnRight = true;
    }
  });
  
  Engine.Input.on("keyup", function(e) {
    if(e.key == 'ARROW_LEFT') {
      btnLeft = 0;
    } else if (e.key == 'ARROW_RIGHT') {
      btnRight = 0;
    } else if (e.key == 'ARROW_DOWN') {
      btnDown = 0
    } else if (e.key == 'ARROW_UP') {
      btnUp = 0;
    }
  });
});