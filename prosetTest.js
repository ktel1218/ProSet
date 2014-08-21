

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
		randInt = Math.floor(Math.random() * (unshuffled_deck.length-1));
		shuffled_deck.push(unshuffled_deck.splice(randInt,1)[0]);
	}
	return shuffled_deck;
}

var deal = function (shuffled_deck, pool, index) {
	pool[index]=(shuffled_deck.pop())
	return pool;
}

var display = function (pool) {
	// $('#1').
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
console.log(deck);

var shuffled_deck = shuffle(deck);

var pool = [];
pool = deal(shuffled_deck, pool, pool_size);
console.log(pool);

console.log(shuffled_deck);

console.log(binaryString(pool[0]));
console.log(binaryString(pool[1]));
console.log(binaryString(pool[2]));
console.log(binaryString(pool[0]^pool[1]^pool[2]));
