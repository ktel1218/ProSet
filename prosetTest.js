
var pool_size = 7;
var selected = [];
var score = 0;

var binaryString = function (int) {
	// prints and pads, used to display dots
	binary_string = int.toString(2);
	while (binary_string.length < 6){
		binary_string = '0' + binary_string;
	}
	return binary_string;
}

var create_deck = function () {
	//just an array from 1 to 64
	unshuffled_deck = []
	var i = 1; // Stewart Stewart says: The trivial card is too trivial (exclude the blank card, 64 (2^6) permutations but 63 cards)
	while (i < 64){
		unshuffled_deck.push(i);
		i ++;
	}
	return unshuffled_deck;
}

var shuffle = function (unshuffled_deck) {
	//Fisher-Yates deck shuffle
	shuffled_deck = [];
	while (unshuffled_deck.length>0){
		randInt = Math.floor(Math.random() * (unshuffled_deck.length));
		shuffled_deck.push(unshuffled_deck.splice(randInt,1)[0]);
	}
	return shuffled_deck;
}

var deal = function (shuffled_deck, pool, index) {
	// adds card from deck into corect index
	pool[index]=(shuffled_deck.pop())
	return pool;
}

var display = function (pool) {
	// turns css on and off
    var wrapper = document.getElementById("wrapper");
    for (var i = 0; i < pool.length; i++) {
    	for (var j = 0; j < 6; j ++) {
    		var card_id_and_dot = '.card' + '#' + i + ' .dot' + ':eq(' + j + ')' ;
    		var binary_string = binaryString(pool[i]);
    		if (binary_string[j] == 0) {
	    		$(card_id_and_dot).removeClass('on').addClass('off');
    		}
    		else {
    			$(card_id_and_dot).removeClass('off').addClass('on');
    		}
		}
    }
}


var check = function (id) {
	// poorly named function
	var index = $.inArray(pool[id], selected);
	if (index != -1) {
		selected.splice(index, 1);
		$('#'+ id).removeClass('selected');
	}
	else {
		selected.push(pool[id]);
		$('#'+ id).addClass('selected');
	}
	if (my_xor(selected) == 0) {
	// if (true) {
		for (var i = 0; i < selected.length; i ++) {
			var index = $.inArray(selected[i], pool); //have to find them all again, this is dumb
			$('#'+ index).fadeOut(150).fadeIn(150).removeClass('selected');
			deal(shuffled_deck, pool, index);
		}
		setTimeout(function() { display(pool); }, 150); //wait until fadeout/in is finished
		selected = [];
		increment_score();
	}
}

var my_xor = function (list) {
	// regular xor for each card in the list
	var result = list[0];
	for (var i = 1; i < list.length; i ++) {
		result = result ^ list[i];
	}
	return result;
}


var increment_score = function () {
	score ++;
	$('#score').text(score);
}

var deck = create_deck();

var shuffled_deck = shuffle(deck);

var pool = [];
for (var i = 0; i < pool_size; i ++) {
	pool = deal(shuffled_deck, pool, i);
}

display(pool);

$('.card').bind('click', function() { check($(this).attr('id')) });

