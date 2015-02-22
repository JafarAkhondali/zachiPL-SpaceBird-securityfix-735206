/**
 * System in a entity-component system
 */
function System(world){
	Engine.Model.call(this);

	this.world = world;
}

System.prototype = Object.create(Engine.Model.prototype);
Object.addProperty(System.prototype, 'constructor', Object.WRITABLE, System);

/**
 * Updates all entities registered for a system
 */
System.prototype.update = function(dt){
	this.process(dt);
};

/**
 * Process all entities that belongs to the system.
 *
 * Method has to implemented.
 */
System.prototype.process = function(dt){
	throw new ReferenceError('process method not implemented in the system');
};