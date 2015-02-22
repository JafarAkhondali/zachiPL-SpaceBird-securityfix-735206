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
  
}