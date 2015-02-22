function SpawnEnemy(y, lay, Enemies) {
  var layout = lay;
  var EE = Enemies;
  var bullet = new Engine.Rectangle( {
    parent: layout,
    name: 'cat',
    image: 'enemy',
    x: 420,
    y: y,
    width: 64,
    height: 61
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
        SpawnEnemyBullet(bullet.x, bullet.y, layout, EE);
      },
      step: function() {
        bullet.x -= 2;
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

function SpawnEnemyBullet(x, y, lay, EnBullets) {
  var layout = lay;
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
        obj.x -= 4;
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