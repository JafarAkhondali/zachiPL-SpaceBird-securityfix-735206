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

