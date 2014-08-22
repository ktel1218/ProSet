

var pool_size = 7;

var binaryString = function (int) {
	binary_string = int.toString(2);
	while (binary_string.length < 6){
		binary_string = '0' + binary_string;
	}
	return binary_string;
}

var create_deck = function () {
	unshuffled_deck = []
	var i = 1; // Stewart Stewart says: The trivial card is too trivial (exclude the blank card, 64 (2^6) permutations but 63 cards)
	while (i < 64){
		unshuffled_deck.push(i);
		i ++;
	}
	return unshuffled_deck;
}

var shuffle = function (unshuffled_deck) {
	//Fisher-Yates
	shuffled_deck = [];
	while (unshuffled_deck.length>0){
		randInt = Math.floor(Math.random() * (unshuffled_deck.length));
		shuffled_deck.push(unshuffled_deck.splice(randInt,1)[0]);
	}
	return shuffled_deck;
}

var deal = function (shuffled_deck, pool, index) {
	pool[index]=(shuffled_deck.pop())
	return pool;
}

var display = function (pool) {
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

// just represent whats in the code in the CSS
// Cards and dots already exist, just turn them on or off
// select cards
// add selected cards to an array
// xor them
// change the display to signal if its wrong OR
// remember their IDs and redisplay based on new cards
// 		SO 'pool' as an array is probably not the right data structure
// 		either I splice and insert (pretty easy)
// 		or I use a dict... this sounds kinda dumb.
// 		
// [[[0,1,0,1,0,1]],[1,0,1,0,1,0],[0,0,0,0,1,1],[card],[card],[card],[card]]
// 
// id = 0, 1, 2, 3, 4, 5 or 6
// select 1, 3 and 4
// 


var deck = create_deck();

var shuffled_deck = shuffle(deck);

var pool = [];
for (var i = 0; i < pool_size; i ++) {
	pool = deal(shuffled_deck, pool, i);
}

display(pool);
