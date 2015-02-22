/**
 * World in a entity-component system
 */
function World(){
	Engine.Model.call(this);

	this.systems = [];
	this.group = {};
	this.entities = [];
}

World.prototype = Object.create(Engine.Model.prototype);
Object.addProperty(World.prototype, 'constructor', Object.WRITABLE, World);

/**
 * Add new system to a world
 */
World.prototype.addSystem = function(system, name){
	if (!this.systems.add(system))
		throw new ReferenceError('System already exists in the world');
	return this;
};

/**
 * Remove system from a world
 */
World.prototype.removeSystem = function(system, name){
	if (!this.systems.remove(system))
		throw new ReferenceError('System does not exist in the world');
	return this;
};

/**
 * Get group of objects by name
 */
World.prototype.getGroup = function(name){
	return this.group[name] || [];
};

/**
 * Add an entity to a group
 */
World.prototype.addToGroup = function(entity, name){
	var group = this.group[name] = this.group[name] || [];
	group.add(entity);
	return this;
};

/**
 * Remove an entity from a group
 */
World.prototype.removeFromGroup = function(entity, name){
	var group = this.group[name] = this.group[name] || [];
	group.remove(entity);
	return this;
};

/**
 * Updated all systems
 */
World.prototype.update = function(dt){
	var systems = this.systems,
	    n = systems.length;

	for (var i = 0; i < n; i++)
		systems[i].update(dt);

	return this;
};