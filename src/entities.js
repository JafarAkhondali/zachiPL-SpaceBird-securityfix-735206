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
  'getStar' : Engine.Sound('static/boom.mp3'),
  'sndStartPressed' : Engine.Sound('static/snd/sndstart.wav'),
  'introsnd' : Engine.Sound('static/snd/intro.wav')
  
  /*'astar1' : Engine.Sound('static/snd/s1.mp3'),
  'astar2' : Engine.Sound('static/snd/s1.mp3'),
  'astar3' : Engine.Sound('static/snd/s1.mp3'),
  'astar4' : Engine.Sound('static/snd/s1.mp3'),
  'astar5' : Engine.Sound('static/snd/s1.mp3'),
  'astar6' : Engine.Sound('static/snd/s1.mp3'),
  'astar7' : Engine.Sound('static/snd/s1.mp3'),
  'astar8' : Engine.Sound('static/snd/s1.mp3'),
  'astar9' : Engine.Sound('static/snd/s1.mp3'),*/
});

Engine.Asset.Manager.load('assets');
Engine.Asset.Manager.groups.assets.loader.on('ready', function() {
  
});
