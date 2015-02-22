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
  'logo': Engine.Image('static/logo.png'),
  'press-start' : Engine.Image('static/press-start.png'),
  'boom' : Engine.Sound('static/boom.mp3')
});

Engine.Asset.Manager.load('assets');
Engine.Asset.Manager.groups.assets.loader.on('ready', function() {
  
});