for (var layerGroupName in PSD) {
	// change local variables to global to easily refer to name
	window[layerGroupName] = PSD[layerGroupName];

	// save original frame's position
	PSD[layerGroupName].originalFrame = window[layerGroupName].frame;

	// save transitioned state as an attribute
	PSD[layerGroupName].finalFrame = window[layerGroupName].originalFrame;
}

// set default animation function
View.prototype.animateDefault = function (props) {
	this.animate({
		time: 200,
		curve: 'spring(400,30,200)',
		properties: props
	});
}