/***********************************************************************
* 
* 1.0.0
* 
***********************************************************************/
!(function(){'use strict';
function SpawnMegaEnemy(y, lay, Enemies) {
  var rotation = Math.random() * 6 - 1.5;
  var spdP = Math.random() * 2;
  var layout = lay;
  var EE = Enemies;
  var bullet = new Engine.Rectangle( {
    parent: layout,
    name: 'cat2',
    image: 'cat2',
    x: 420,
    y: y,
    width: 64,
    height: 61,
    rotation: rotation / 360
  });
  Enemies.push(bullet);
  
  var BulletTimer = new Engine.Timer( {
    delay:10,
    duration: (1000 + Math.random() * 1800),
    type:Engine.Timer.VSYNC,
    autoplay: true,
    loop: true,
    on : {
      loop: function() {
        //SpawnEnemyBullet(bullet.x, bullet.y, layout, EE, rotation);
      },
      step: function() {
        bullet.x -= 9 + spdP;
        bullet.y += rotation ;
        if(bullet.x < -420) {
          //layout.removeChild(bullet);
          bullet.destroy();
          BulletTimer.stop();
          Enemies.remove(this);
        }
      },
      stop : function() {
        Engine.Rectangle.free(bullet)
        Engine.Timer.free(BulletTimer);
      }
    }
  });
}

function SpawnEnemy(y, lay, Enemies) {
  var rotation = Math.random() * 6 - 1.5;
  var spdP = Math.random() * 2;
  var layout = lay;
  var EE = Enemies;
  var bullet = new Engine.Rectangle( {
    parent: layout,
    name: 'cat',
    image: 'enemy',
    x: 420,
    y: y,
    width: 64,
    height: 61,
    rotation: rotation / 360
  });
  Enemies.push(bullet);
  
  var BulletTimer = new Engine.Timer( {
    delay:20,
    duration: (1000 + Math.random() * 1800),
    type:Engine.Timer.VSYNC,
    autoplay: true,
    loop: true,
    on : {
      loop: function() {
        SpawnEnemyBullet(bullet.x, bullet.y, layout, EE, rotation);
      },
      step: function() {
        bullet.x -= 2 + spdP;
        bullet.y += rotation * .3;
        if(bullet.x < -420) {
          //layout.removeChild(bullet);
          bullet.destroy();
          BulletTimer.stop();
          Enemies.remove(this);
        }
      },
      stop : function() {
        Engine.Rectangle.free(bullet)
        Engine.Timer.free(BulletTimer);
      }
    }
  });
}

function SpawnEnemyBullet(x, y, lay, EnBullets, rot) {
  var layout = lay;
  var r = rot;
  var obj = new Engine.Rectangle( {
    parent: layout,
    name: 'enemyBullet',
    image: 'enemyBullet',
    x: x + 2,
    y: y - 16,
    width: 10,
    height: 5
  });
  EnBullets.push(obj);
  
  var EnBulletTimer = new Engine.Timer( {
    delay: 10,
    type: Engine.Timer.VSYNC,
    autoplay: true,
    loop: true,
    on : {
      step: function() {
        obj.x -= 7;
        obj.y += r * .85;
        if(obj.x < -420) {
          obj.destroy();
          EnBullets.remove(obj);
          EnBulletTimer.stop();  
        }
      },
      stop : function() {
        Engine.Rectangle.free(obj);
        Engine.Timer.free(EnBulletTimer);
      }
    }
  });
}
/**
 * Register entities
 */
Engine.Asset.Manager.createGroup('assets');

Engine.Asset.Manager.register({
  'font' : Engine.Font('static/widepixel.ttf', 'assets'),
  'bg' : Engine.Image('static/bg.png', 'assets'),
  'spacebird': Engine.Image('static/bird1.png','assets'),
  'spacebirdA': Engine.Image('static/bird2.png','assets'),
  'bullet' : Engine.Image('static/egg_transparent_right.png', 'assets'),
  'enemy' : Engine.Image('static/cat.png', 'assets'),
  'enemyBullet' : Engine.Image('static/Textures/enemyBullet.png', 'assets'),
  'star1': Engine.Image('static/star1.png'),
  'star2': Engine.Image('static/star2.png'),
  'star3': Engine.Image('static/star3.png'),
  'life3': Engine.Image('static/life3.png'),
  'life2': Engine.Image('static/life2.png'),
  'life1': Engine.Image('static/life1.png'),
  'dead': Engine.Image('static/dead.png'),
  'logo': Engine.Image('static/logo.png'),
  'press-start' : Engine.Image('static/press-start.png'),
  'cat2' : Engine.Image('static/cat2.png'),
  'tesla' : Engine.Image('static/tesla.png'),
  'intro0' : Engine.Image('static/intro0.png'),
  'intro1' : Engine.Image('static/intro1.png'),
  'intro2' : Engine.Image('static/intro2.png'),
  'boom' : Engine.Sound('static/snd/cat_die.mp3'),
  'die' : Engine.Sound('static/snd/die.wav'),
  'fire' : Engine.Sound('static/snd/fire.wav'),
  'getstar' : Engine.Sound('static/boom.wav'),
  'sndstart' : Engine.Sound('static/snd/sndstart.wav'),
  'introsnd' : Engine.Sound('static/snd/intro.wav'),
  'lionsnd' : Engine.Sound('static/snd/lion.mp3'),
  'teslasnd' : Engine.Sound('static/snd/tesla_snd.mp3'),
  
});

Engine.Asset.Manager.load('assets');
Engine.Asset.Manager.groups.assets.loader.on('ready', function() {
  
});

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
  
  var snd_start = new Engine.AmbientSound( {
    sound: 'sndstart',
    autoplay: false
  });
  
  var snd_intro = new Engine.AmbientSound( {
    sound: 'introsnd',
    autoplay: false,
    loop: true
  });
  
  var snd_lion = new Engine.AmbientSound( {
    sound: 'lionsnd',
    autoplay: false
  });
  
  var snd_tesla = new Engine.AmbientSound( {
    sound: 'teslasnd',
    autoplay: false
  });
  
  var snd_star = new Engine.AmbientSound( {
    sound: 'getstar',
    autoplay: false
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
          snd_lion.play();
          if(Math.random() > .05) {
             SpawnTesla(Math.random() * 520 - 210, layout, stars)
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
        this.count = 0;
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
    duration: 200,
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
          paddle.x = Math.min(Math.max(-350, paddle.x), 0);
          paddle.y += Math.min(Math.max(-3, AccelY), 3);
          paddle.y = Math.min(Math.max(-280, paddle.y), 280);
          
          // detect collision
          for(var i = 0; i < stars.length; i++) {
            if(stars[i].getGlobalBoundingBox().overlap(paddle.getGlobalBoundingBox())) {
              if(stars[i].name == 'tesla') {
                for(var z = 0; z < Enemies.length; z++) {
                  Enemies[z].x += 2000;
                  Score += 100;
                }
                stars[i].x -= 1000;
                snd_tesla.play();
              } else {
                hp++;
                hp = Math.min(3, hp);  
                if(hp == 3 ) {
                  lifeImg.image = 'life3';
                } else if (hp == 2) {
                  lifeImg.image = 'life2'; 
                } else if (hp == 1) {
                   lifeImg.image = 'life1';
                }
                stars[i].x += 1200;
                snd_star.play();
              }
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
        snd_start.play();
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
          x: -350,
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
function Shoot(posX,posY,lay, Bullets, rot) {
  var rotation = rot;
  var layout = lay;
  var bullet = new Engine.Rectangle( {
    parent: layout,
    name: 'bullet',
    image: 'bullet',
    rotation: rotation,
    x: posX + 8,
    y: posY - 4,
    width: 13,
    height: 11
  });
  Bullets.push(bullet);
  
  var BulletTimer = new Engine.Timer( {
    delay:10,
    type:Engine.Timer.VSYNC,
    autoplay: true,
    loop: true,
    on : {
      step: function() {
        bullet.x += 6;
        bullet.y += rotation * -12;
        if(bullet.x > 400) {
          layout.removeChild(bullet);
          BulletTimer.stop();
          Bullets.remove(bullet);
          Engine.Rectangle.free(bullet);
        }
      }
    }
  });
}


function Star(posX, posY, lay, stars) {
  var layout = lay;
  var scr = 0;
  var view = new Engine.Rectangle( {
    parent: layout,
    name: 'star',
    image: 'star1',
    x: posX + 1000,
    y: posY - 300 ,
    width: 12,
    height: 12
  } );
  stars.push(view);
  
  var StarTimer = new Engine.Timer( {
    delay: 80,
    duration: 160,
    type: Engine.Timer.VSYNC,
    autoplay: true,
    loop: true ,
    on : { 
      loop : function() {
        scr++;
        if(scr >= 3) {
          scr = 0;
        }
        if(scr ==0) {
          view.image = 'star1';
        } else if (scr == 1) {
          view.image = 'star2';    
        } else {
          view.image = 'star3';
        } 
      },
      step: function() {
        if(view.y < -1200) {
          layout.removeChild(view);
          StarTimer.stop();
          Engine.Rectangle.free(view);
        }
        view.x -= 1.7;
        if(view.x < -1000) {
          view.x = 1000; 
        }
      }
    }
});
  
}
function SpawnTesla(posY, lay, stars) {
  var layout = lay;
  var scr = 0;
  var view = new Engine.Rectangle( {
    parent: layout,
    name: 'tesla',
    image: 'tesla',
    x: 470 + Math.random() * 120,
    y: posY,
    width: 25,
    height: 37
  } );
  stars.push(view);
  
  var TeslaTimer = new Engine.Timer( {
    delay: 10,
    duration: 160,
    type: Engine.Timer.VSYNC,
    autoplay: true,
    loop: true ,
    on : { 
      step: function() {
        view.x -= 7.7;
        if(view.x < -500) {
          view.destroy();
          TeslaTimer.stop(); 
        }
      }
    }
});
  
}})();