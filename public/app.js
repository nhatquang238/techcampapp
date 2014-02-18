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
	saveTalk3.x = saveTalk3.originalFrame.x + (talk3.x - talk3.originalFrame.x);
	saveTalk3.opacity = map_range(talk3.x-talk3.originalFrame.x,0,200,0,1);
});

slideBackToOriginal = function (talks) {
	for (var i = talks.length - 1; i >= 0; i--) {
		talks[i].animateDefault({
			x: talks[i].originalFrame.x
		});
	}
}

talk3.dragger.on(Events.DragEnd, function () {
	if (talk3.x - talk3.originalFrame.x > 200) {
		talk3.animateDefault({
			x: talk3.originalFrame.x + iPhone.width*2
		});
		saveTalk3.animateDefault({
			x: saveTalk3.originalFrame.x + iPhone.width*2
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
		slideBackToOriginal([talk3, saveTalk3]);
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
		utils.delay(200, function () {
			searchBar.visible = false;
		});
	});
}

cancelSearch.on('click', hideSearch);

// scroll to reveal search bar
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

// animation: switch to schedule
slideTalkRight = function (talk) {
	talk.animateDefault({
		x: talk.x+talk.width
	});
}
slideDownTalk = function (talks, object) {
	for (var i = talks.length - 1; i >= 0; i--) {
		talks[i].animate({
			properties: {
				y: talks[i].y + object.height
			},
			time: 500,
			curve: "ease-out"
		});
	};
}
slideTalkLeft = function (talk) {
	talk.animateDefault({
		x: talk.x-talk.width
	});
}
slideUpTalk = function (talks, object) {
	for (var i = talks.length - 1; i >= 0; i--) {
		talks[i].animate({
			properties: {
				y: talks[i].y - object.height
			},
			time: 500,
			curve: "ease-out"
		});
	};
}

switchBtn = new View({
	x: votingBtn.originalFrame.x,
	y: votingBtn.originalFrame.y,
	width: 200,
	height: 60
});
switchBtn.originalFrame = switchBtn.frame;
switchBtn.superView = switchView;

switchBtn.style = {
	"background":"#fff",
	"border-top-left-radius":"12px",
	"border-bottom-left-radius":"12px"
}

votingActive.visible = true;
votingActive.style = {
	"z-index": "5"
}

// animation: when clicking on schedule button, reveal schedule talks
scheduleBtn.on('click', function () {
	// slide the switch button
	switchBtn.animateDefault({
		width: switchBtn.originalFrame.width*2
	});
	utils.delay(100, function () {
		votingActive.visible = false;
		scheduleActive.visible = true;
		scheduleActive.style = {
			"z-index": "5"
		};
	});
	utils.delay(200, function () {
		switchBtn.animateDefault({
			x: switchBtn.originalFrame.x + switchBtn.originalFrame.width,
			width: switchBtn.originalFrame.width
		});
	})
	switchBtn.style = {
		"border-top-left-radius":"0px",
		"border-bottom-left-radius":"0px",
		"border-top-right-radius":"12px",
		"border-bottom-right-radius":"12px"
	}

	// slide talks right
	saveTalk3.visible = false;
	slideTalkRight(talk1);
	utils.delay(100, function () {
		slideTalkRight(talk2);
	});
	utils.delay(200, function () {
		slideTalkRight(talk3);
		timeline.opacity = 0;
		slideTalkRight(timeline);
		slideTalkRight(talk1full);
	});
	utils.delay(300, function () {
		slideTalkRight(talk4);
		slideTalkRight(talk2full);
	});
	utils.delay(400, function () {
		slideTalkRight(talk3full);
	});
	utils.delay(600, function () {
		timeline.animate({
			time: 200,
			curve: "ease-out",
			properties: {
				opacity: 1,
				y: timeline.originalFrame.y + timeline.height
			}
		});
		slideDownTalk([talk1full, talk2full, talk3full], timeline);
	});
});

// animation: when clicking on voting, reveal voting talks
votingBtn.on('click', function () {
	// slide the switch button
	switchBtn.animateDefault({
		x: switchBtn.originalFrame.x,
		width: switchBtn.originalFrame.width*2
	});
	utils.delay(200, function () {
		switchBtn.animateDefault({
			width: switchBtn.originalFrame.width
		});
		votingActive.visible = true;
		scheduleActive.visible = false;
		votingActive.style = {
			"z-index": "5"
		};
	});
	switchBtn.style = {
		"border-top-left-radius":"12px",
		"border-bottom-left-radius":"12px",
		"border-top-right-radius":"0px",
		"border-bottom-right-radius":"0px"
	}

	// slide talks left
	timeline.animate({
		time:200,
		curve: "ease-out",
		properties: {
			opacity: 0,
			y: timeline.originalFrame.y
		}
	});
	slideUpTalk([talk1full, talk2full, talk3full], timeline);
	utils.delay(500, function () {
		slideTalkLeft(talk1full);
		slideTalkLeft(timeline);
		utils.delay(100, function () {
			slideTalkLeft(talk2full);
		});
		utils.delay(200, function () {
			slideTalkLeft(talk3full);
			slideTalkLeft(talk1);
		});
		utils.delay(300, function () {
			slideTalkLeft(talk2);
		});
		utils.delay(400, function () {
			slideTalkLeft(talk3);
		});
		utils.delay(500, function () {
			slideTalkLeft(talk4);
			timeline.opacity = 1;
		});
	});

});

// page transition
talk1.style = {
	"cursor": "pointer"
};

scaleTalkDown = function (talks) {
	for (var i = talks.length - 1; i >= 0; i--) {
		talks[i].animateDefault({
			scale: 0.95
		});
	}
}

talk1.on('click', function () {

});
