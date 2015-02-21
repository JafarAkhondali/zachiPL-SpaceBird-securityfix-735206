/**
 * Game viewport
 *
 * Holds all cameras defined for a game
 */
var viewport = new Engine.Viewport('engine', 800, 400);

/**
 * Game scene
 */
var scene = new Engine.Scene({
	color: "#dcdcdc"
});

/**
 * Camera that looks at the game scene
 */
var camera = new Engine.Camera({
	lookAt: scene
});

/**
 * Add the camera to the viewport
 */
viewport.addCamera(camera);