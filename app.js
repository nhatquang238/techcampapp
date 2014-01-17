iPhone = new View({
	x: 200,
	y: 50,
	width: 320,
	height: 568
});

app.superView = iPhone;

talk3.dragger = new ui.Draggable(talk3);

map_range = function(value, low1, high1, low2, high2) {
 if (value < low1) { return low2; }
 else if (value > high1) { return high2; }
 else return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// animation for: slide talk to the right to save
talk3.on(Events.DragMove, function () {
	talk3.y = talk3.originalFrame.y;
	saveTalk3.opacity = map_range(talk3.x,0,iPhone.frame.width,0,1);
});

talk3.dragger.on(Events.DragEnd, function () {
	if (talk3.x > iPhone.frame.width) {
		talk3.animateDefault({
			x: talk3.originalFrame.x + iPhone.frame.width*2
		});
		talk4.animateDefault({
			y: talk4.originalFrame.y - talk3.height
		});
	} else {
		talk3.animateDefault({
			x: talk3.originalFrame.x
		});
	}
})

// set initial state for voted button
doneVoteBtn1.opacity = 0;
doneVoteBtn1.scale = 1.5;
doneVoteBtn1.visible = false;

// Upvote animation
voteBtn1.on('click', function () {
	// fade unvote button out
	voteBtn1.animateDefault({
		opacity: 0,
		scale: 0
	});

	// fade voted button in
	doneVoteBtn1.visible = true;
	doneVoteBtn1.animateDefault({
		opacity: 1,
		scale: 1
	});
	voteBtn1.visible = false;
});

// Unvote animation
doneVoteBtn1.on('click', function () {
	// fade voted button out
	doneVoteBtn1.animateDefault({
		opacity: 0,
		scale: 1.5
	});
	doneVoteBtn1.visible = false;

	// fade unvote button in
	voteBtn1.visible = true;
	voteBtn1.animateDefault({
		opacity: 1,
		scale: 1
	});
});