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
        view.x -= 0.7;
        if(view.x < -1000) {
          view.x = 1000; 
        }
      }
    }
});
  
}