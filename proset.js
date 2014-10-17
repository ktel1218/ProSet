(function () {    // IIFE
    const POOL_SIZE = 7;
    const DOTS = ["top left", "mid left", "bottom left", "top right", "mid right", "bottom right"];
    var selected = [];
    var score = 0;
    var round = 0;
    var pool = [];
    var board = $("#board");
    var deck;

    function displayPool() {
        // Display pool; turn on/off dot visibility on each card
        for (var card = 0; card < pool.length; card++) {
            for (var dotNum = 0; dotNum < 6; dotNum++) {
                var dot = $('.card' + '#' + card + ' div' + ':eq(' + dotNum + ')');
                dot.css('visibility', pool[card] & (1 << dotNum) ? 'visible' : 'hidden');
            }
        }
        for (var unseen = pool.length; unseen < POOL_SIZE; unseen++)
            $('.card' + '#' + unseen).hide();
        $('.card').removeClass('selected');
    }

    function highlightAndCheckSet(id) {
        // Add or remove clicked item from selected, depending if it was already selected
        if (_.contains(selected, pool[id])) {
            $('#' + id).removeClass('selected');
            selected = _.without(selected, pool[id]);
        } else {
            selected.push(pool[id]);
            $('#' + id).addClass('selected');
        }
        // Check if win (selected set XORed against self == 0)
        if (selected.length && selected.reduce(function (x, y) { return x ^ y }) == 0) {
            showSolution(selected, 150);
            $('#score').text(++score);
        }
    }

    function showSolution(solution, nsecs_fade) {
        // Blank out winning cards and replace with new from deck
        for (var p = 0; p < pool.length; p++) {
            if (_.contains(solution, pool[p])) {
                $('#' + p).fadeOut(nsecs_fade).fadeIn(nsecs_fade).removeClass('selected');
                pool[p] = deck.pop();
            }
        }
        // Get rid of blank cards (end of deck); if all blank, deal a new deck
        pool = pool.filter(function(x) { return x });
        if (pool.length == 0)
            setUpDeck();
        setTimeout(function () { displayPool(pool) }, nsecs_fade); // wait until fadeout/in done
        selected = [];
        $("#round").text(++round);
    }

    function findSolution() {
        // Iterate through all combinations and return winning line (XOR of set = 0)
        for (var i = 1; i < (2 << (pool.length - 1)); i++) {
            var test_solution = pool.filter(function(item, index) { return 1 << index & i });
            if (test_solution.reduce(function(x, y) { return x ^ y}) == 0)
                return test_solution;
        }
    }

    function getHint() {
        $('.card').removeClass('selected');      // get rid of existing selections
        selected = [_.sample(findSolution())];   // set selected to random card fr  om a solution
        $('#' + _.indexOf(pool, selected[0])).addClass('selected');  // and highlight it
    }

    function setUpGame() {
        // Insert HTML for board
        for (var cardnum = 0; cardnum < POOL_SIZE; cardnum++) {
            var elem = $("<div/>", {id: cardnum, class: "card"});
            DOTS.forEach(function (dot) { elem.append($("<div/>", {class: dot})) });
            board.append(elem);
        }
        $('.card').on('click', function () { highlightAndCheckSet($(this).attr('id')) });
        $('#cheat').on('click', function() { showSolution(findSolution(), 600)});
        $('#hint').on('click', function() { getHint() });
        setUpDeck();
    }

    function setUpDeck() {
        deck =  _.shuffle(_.range(1, 64));   // Skip card 0, which is blank (too easy!)
        // deal initial pool and display it
        for (var i = 0; i < POOL_SIZE; pool[i++] = deck.pop()) { }
        $(".card").show();
        displayPool(pool);
    }

    setUpGame();
}());