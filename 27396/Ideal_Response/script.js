$(document).ready(function() {
	var box = $(".box"),
		orginal = Array.from({length: 18}, (_, i) => i),
		temp = [...orginal],
		x = [],
		sec = 0,
		date1, date2,
		moves = 0,
		mm = 0,
		ss = 0,
		upIMG,
		images = [
			"https://preview.ibb.co/kMdsfm/kfp.png",
			"https://preview.ibb.co/kWOEt6/minion.png",
			"https://preview.ibb.co/e0Rv0m/ab.jpg"
		],
		img = 0;

	$('.me').css({"background-image": `url(${images[0]})`});

	$(".start").click(function() {
		$(this).addClass('prevent_click').delay(100).slideUp(500);
		$(".full").hide();
		$(".pre_img").addClass("prevent_click");
		date1 = new Date();
		startGame();
	});

	function startGame() {
		randomTile();
		changeBG(img);
		let count = 0, a, b;
		$(".me").click(function() {
			count++;
			if (count === 1) {
				a = $(this).attr("data-bid");
				$('.me_' + a).css({"opacity": ".65"});
			} else {
				b = $(this).attr("data-bid");
				$('.me_' + a).css({"opacity": "1"});
				if (a !== b) {
					swapTiles(a, b);
				}
				moves++;
				checkCorrect(a);
				checkCorrect(b);
				a = b = count = 0;
			}
			if (arraysEqual(x)) { 
				date2 = new Date();
				timeDifference();
				showScore();
			}
		});
	}

	function randomTile() {
		for (let i = orginal.length - 1; i >= 0; i--) {
			let flag = getRandom(0, i);
			x[i] = temp[flag];
			[temp[flag], temp[i]] = [temp[i], x[i]];
		}
		box.empty();  // Clear previous tiles
		x.forEach((val, i) => {
			box.append(`<div class="me me_${val} tile" data-bid="${val}"></div>`);
			if ((i + 1) % 6 === 0) box.append("<br>");
		});
	}

	function arraysEqual(arr) {
		return arr.every((val, i) => val === i);
	}

	function checkCorrect(N1) {
		let pos = x.indexOf(parseInt(N1, 10));
		if (pos === N1) {
			$(".me_" + N1).addClass("correct prevent_click");
		}
	}

	function swapTiles(N1, N2) {
		let first = x.indexOf(parseInt(N1, 10)),
			second = x.indexOf(parseInt(N2, 10));
		[x[first], x[second]] = [x[second], x[first]];
		$(`.me_${N1}`).attr("data-bid", N2).removeClass(`me_${N1}`).addClass(`me_${N2}`);
		$(`.me_${N2}`).attr("data-bid", N1).removeClass(`me_${N2}`).addClass(`me_${N1}`);
	}

	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function timeDifference() {
		let diff = date2 - date1;
		mm = Math.floor(diff / 60000);
		ss = Math.floor((diff % 60000) / 1000);
	}

	function changeBG(img) {
		if (img !== 3) {
			$('.me').css({"background-image": `url(${images[img]})`});
		} else {
			$('.me').css({"background-image": `url(${upIMG})`});
		}
	}

	$('.pre_img li').hover(function() {
		img = $(this).attr("data-bid");
		changeBG(img);
	});

	function showScore() {
		$('#min').text(mm);
		$('#sec').text(ss);
		$('#moves').text(moves);
		setTimeout(() => $('.cover').slideDown(350), 1050);
	}

	$('.OK').click(() => $('.cover').slideUp(350));

	$('.reset').click(function() {
		$(".tile").remove();
		$("br").remove();
		$(".full").show();
		$(".start").show();
		$(".pre_img, .start").removeClass("prevent_click");
		temp = [...orginal];
		x = [];
		moves = ss = mm = 0;
	});

	$("#upfile1").click(() => $("#file1").trigger('click'));

	$("#file1").change(function() {
		readURL(this);
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			let reader = new FileReader();
			reader.onload = e => {
				upIMG = e.target.result;
				img = 3;
				changeBG(img);
			};
			reader.readAsDataURL(input.files[0]);
		}
	}
});
