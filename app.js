// helper function to map value
map_range = function(value, low1, high1, low2, high2) {
 if (value < low1) { return low2; }
 else if (value > high1) { return high2; }
 else return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

iPhone = new View({
	x: 200,
	y: 50,
	width: 320,
	height: 568
});

app.superView = iPhone;

talk3.dragger = new ui.Draggable(talk3);

// animation for: slide talk to the right to save
talk3.on(Events.DragMove, function () {
	talk3.y = talk3.originalFrame.y;
	saveTalk3.opacity = map_range(talk3.x,0,200,0,1);
});

talk3.dragger.on(Events.DragEnd, function () {
	if (talk3.x > 200) {
		talk3.animateDefault({
			x: talk3.originalFrame.x + iPhone.frame.width*2
		});
		utils.delay(200,function () {
			talk4.animateDefault({
				y: talk4.originalFrame.y - talk3.height
			});
			talk4.style = {
				"z-index":"5"
			}
		});
	} else {
		talk3.animateDefault({
			x: talk3.originalFrame.x
		});
	}
})

// set initial state for voted button
doneVoteBtn1.opacity = 0;
doneVoteBtn1.scale = 2;
doneVoteBtn1.visible = false;

// Upvote animation
voteBtn1.on('click', function () {
	// fade unvote button out
	voteBtn1.animateDefault({
		opacity: 0,
		scale: 0
	});
	utils.delay(200, function () {
		voteBtn1.visible = false;
	});

	// fade voted button in
	doneVoteBtn1.visible = true;
	doneVoteBtn1.animateDefault({
		opacity: 1,
		scale: 1
	});
});

// Unvote animation
doneVoteBtn1.on('click', function () {
	// fade voted button out
	doneVoteBtn1.animateDefault({
		opacity: 0,
		scale: 2
	});
	utils.delay(200,function () {
		doneVoteBtn1.visible = false;
	});

	// fade unvote button in
	voteBtn1.visible = true;
	voteBtn1.animateDefault({
		opacity: 1,
		scale: 1
	});
});

// create dynamic inner search field View
searchField = new View({
	x: 16,
	y: 11,
	width: 608,
	height: 58
});

searchField.originalFrame = searchField.frame;

searchField.superView = searchBar;
searchField.style = {
	"background": "white",
	"border-radius": "6px",
	"z-index": "1"
};

searchLabel.style = {
	"z-index": "2"
};

// animation: click on search bar to reveal more themes
revealThemes = function () {
	searchLabel.animateDefault({
		x: 35
	});
	searchField.animateDefault({
		width: 480
	});
	searchTalk.style = {"z-index":"5"};
	searchTalk.y = statusBar.height + searchBar.height;
	themes.y = searchTalk.originalFrame.height;
	keyboard.y = searchTalk.originalFrame.height;

	themes.animateDefault({
		y: themes.originalFrame.y
	});
	utils.delay(200,function () {
		keyboard.animateDefault({
			y: keyboard.originalFrame.y
		});
	});
}

searchField.on('click', revealThemes);
searchLabel.on('click', revealThemes);

// animation: click on cancel button to cancel search
hideSearch = function () {
	searchLabel.animateDefault({
		x: searchLabel.originalFrame.x
	});
	searchField.animateDefault({
		width: searchField.originalFrame.width
	});
	keyboard.animateDefault({
		y: searchTalk.originalFrame.height
	});
	utils.delay(200, function () {
		themes.animateDefault({
			y: searchTalk.originalFrame.height
		});
	});
	utils.delay(400,function () {
		searchTalk.y = searchTalk.originalFrame.y;
		themes.y = themes.originalFrame.y;
		keyboard.y = keyboard.originalFrame.y;
	});
	utils.delay(600,function () {
		content.animateDefault({
			y: content.originalFrame.y
		});
	});
}

cancelSearch.on('click', hideSearch);

// drag to reveal search bar
content.dragger = new ui.Draggable(content);

content.on(Events.DragMove, function () {
	searchBar.visible = true;
	content.x = content.originalFrame.x;
});

content.dragger.on(Events.DragEnd, function () {
	if (content.y > (content.originalFrame.y + searchBar.height/2)) {
		content.animateDefault({
			y: content.originalFrame.y + searchBar.height
		})
	} else {
		content.animateDefault({
			y: content.originalFrame.y
		});
		searchBar.visible = false;
	}
});