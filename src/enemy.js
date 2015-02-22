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