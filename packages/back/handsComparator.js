
const forces = {}
forces['high'] = 1
forces['pair'] = 2
forces['double'] = 3
forces['three'] = 4
forces['straight'] = 5
forces['flush'] = 6
forces['fullhouse'] = 7
forces['quad'] = 8
forces['straightflush'] = 9

/**
 * compares two poker hands
 * 
 * @param {*} h1 a poker hand (5 cards array)
 * @param {*} h2 a poker hand (5 cards array)
 * @returns {int}
 *      -1 : h1 is weaker than h2
 *       0 : h1 and h2 are equals
 *       1 : h1 is stronger than h2
 */
function compareHands(h1, h2) {
    const h1Rank = forces[h1.type];
    const h2Rank = forces[h2.type];
  
    if (h1Rank > h2Rank) {
        return 1;
      } else if (h1Rank < h2Rank) {
        return -1;
      }
      else {
        for (let i = 0; i < 5; i++) {
            if (h1[i].rank > h2[i].rank) {
                return 1;
            } else if (h1[i].rank < h2[i].rank) {
                return -1;
            }
        }
    }
    return 0
}

function findBestHand(hands) {

    let bestHand = hands[0];

    for (let i = 1; i < hands.length; i++) {
        const comparison = compareHands(hands[i], bestHand);
        if (comparison == 1 ) {
            bestHand = hands[i];
        }
    }
    return bestHand
}

export { findBestHand,compareHands }