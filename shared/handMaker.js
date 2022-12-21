function makeHand(origCards) {
    const cardsByRank = [...origCards]
    cardsByRank.sort(byRank)
    //TODO : all other kind of hands
    //Exemple:
    // if (isPair()) {
    //     return makePair(cardsByRank)
    // }
    return makeSingleCard(cardsByRank)
}

function makeSingleCard(cardsByRank) {
    const hand = {}
    hand.type = 'high'
    hand.rank = cardsByRank[0].rank
    hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank)
    return hand
}

function byRank(c1, c2) {
    if (c1.rank === 1 && c2.rank === 1) {
        return 0
    }
    if (c1.rank === 1 && c2.rank > 1) {
        return 1
    }
    if (c2.rank === 1 && c1.rank > 1) {
        return -1
    }
    return c2.rank - c1.rank
}

function isQuad(counts) {
    return false
}

function isFullHouse(counts) {
    return false
}

function isThreeOfAKind(counts) {
    return false
}

function isDoublePair(counts) {
    return false
}

function isPair(counts) {
    return false
}

export { makeHand,byRank}