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
  'die' : Engine.Sound('static/snd/die.mp3'),
  'fire' : Engine.Sound('static/snd/fire.mp3'),
  'getstar' : Engine.Sound('static/snd/boom.mp3'),
  'sndstart' : Engine.Sound('static/snd/sndstart.mp3'),
  'introsnd' : Engine.Sound('static/snd/intro.mp3'),
  'lionsnd' : Engine.Sound('static/snd/lion.mp3'),
  'teslasnd' : Engine.Sound('static/snd/tesla_snd.mp3'),
  
});

Engine.Asset.Manager.load('assets');
Engine.Asset.Manager.groups.assets.loader.on('ready', function() {
  
});
