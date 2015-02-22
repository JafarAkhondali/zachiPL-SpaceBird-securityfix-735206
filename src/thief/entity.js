/**
 * Entity in a entity-component system
 */
function Entity(world){
	Engine.Model.call(this);

	this.world = world;
	this.world.entities.push(this);

	this.components = {};
}

Entity.prototype = Object.create(Engine.Model.prototype);
Object.addProperty(Entity.prototype, 'constructor', Object.WRITABLE, Entity);

/**
 * Add component to an entity
 */
Entity.prototype.addComponent = function(name, component){
	if (this.components.hasOwnProperty(name))
		throw ReferenceError('Entity already has a component ' + name);
	this.components[name] = component;

	if (name in this)
		Engine.log('Cannot set a component "'+name+'" as a entity property. Property "'+name+'" already exists. Use entity.get("'+name+'")', Engine.WARN);
	else
		Object.addProperty(this, name, Object.WRITABLE | Object.ENUMERABLE, function(){
			return this.get(name);
		}, function(value){
			this.components[name] = value;
		});

	return this;
};

/**
 * Remove component from an entity
 */
Entity.prototype.removeComponent = function(name, component){
	if (!this.components.hasOwnProperty(name))
		throw ReferenceError('Entity does not have a component ' + name);

	if (this[name] === component)
		delete this.name;

	delete this.components[name];

	return this;
};

/**
 * Add an entity to a group
 *
 * It registers entity in a group.
 */
Entity.prototype.addToGroup = function(name){
	this.world.addToGroup(this, name);

	return this;
};

/**
 * Remove an entity from a group
 *
 * It unregisters entity from a group
 */
Entity.prototype.removeFromGroup = function(tag){
	this.world.removeFromGroup(tag);

	return this;
};

/**
 * Get a component by name
 */
Entity.prototype.get = function(name){
	return this.components[name] || null;
};

/**
 * Kill an entity
 */
Entity.prototype.kill = function(){

	// remove all components
	for (var key in this.components)
		this.removeComponent(key);

	this.world.entities.remove(this);

	var groups = this.world.group;

	for (var key in groups)
		groups[key].remove(this);

	return this;

};

var Entity = new Entity();
