import random


def create_deck():
	unshuffled_deck = []
	for i in range(64):
		binary = bin(i)[2:]
		while len(binary) < 6:
			binary += '0'
		unshuffled_deck.append(binary)

	return unshuffled_deck

def shuffle(unshuffled_deck):
	shuffled_deck = []
	while unshuffled_deck:
		randInt = int(random.random()*len(unshuffled_deck)-1)
		shuffled_deck.append(unshuffled_deck.pop(randInt))
	return shuffled_deck

deck = create_deck()
print deck

shuffled_deck = shuffle(deck)
print shuffled_deck


