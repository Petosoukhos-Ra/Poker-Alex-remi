function makeHand(origCards) {
    const cardsByRank = [...origCards]
    cardsByRank.sort(byRank)
    //TODO : all other kind of hands
    //Exemple:
    let counts = countPairs(origCards)
    if (isPair(counts)) {
        const hand = {}
        hand.type = 'pair'
        hand.rank = cardsByRank[0].rank
        hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank)
        return hand
    }
    if (isDoublePair(counts)) {
        const hand = {}
        hand.type = 'double'
        console.log("cardsByRank = ",cardsByRank)
        console.log("counts = ",counts)
        hand.rank = cardsByRank[0].rank
        hand.sideRank = cardsByRank[3].rank
        hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank).filter((c) => c.rank !== hand.sideRank)
        return hand
    }
    if (isThreeOfAKind(counts)) {
        const hand = {}
        hand.type = 'three'
        hand.rank = cardsByRank[0].rank
        hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank)
        return hand
    }
    if (isQuad(counts)) {
        const hand = {}
        hand.type = 'quad'
        hand.rank = cardsByRank[0].rank
        hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank)
        return hand
    }
    if (isFullHouse(counts)) {
        const hand = {}
        hand.type = 'fullhouse'
        console.log("cardsByRank = ",cardsByRank)
        console.log("counts = ",counts)
        hand.rank = cardsByRank[0].rank
        hand.sideRank = cardsByRank[2].rank
        hand.kickers = cardsByRank.filter((c) => c.rank !== hand.rank && c.rank !== hand.sideRank)
        return hand
    }
    return makeSingleCard(cardsByRank)
}
function getUniqueRanks(array) {
    const values = []
    for (const val of array) {
        if (!values.some((v) => v.rank === val.rank)) {
            values.push(val.rank)
        }
    }
    return values
}

function countPairs(hand) {
    let values = getUniqueRanks(hand)
    let counts = {}
    for (let val of values) {
        counts[val] = hand.filter((c) => c.rank === val).length
    }
    return counts
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
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    
    if (entries[1] === 4 && entries [0] === 1) {
        res = true
    }
    else {
        res = false
    }
    return res
}

function isFullHouse(counts) {
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    if (entries[0] === 2 && entries[1] === 3) {
        res = true
    }
    else {
        res = false
    }
    return res
}

function isThreeOfAKind(counts) {
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    if (entries[2] === 3 && entries[1] === 1 && entries[0] === 1) {
        res = true
    }
    else {
        res = false
    }
    return res
}

function isDoublePair(counts) {
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    if (entries[2] === 2 && entries[1] === 2 && entries[0] === 1) {
        res = true
    }
    else {
        res = false
    }
    return res
}

function isPair(counts) {
    let res = false
    let entries = Object.values(counts)
    entries.sort()
    for(let entry of entries) {
        console.log("entries : ",entry)
    }
    
    if (entries[3] === 2 && entries[0] === 1 && entries[1] === 1 && entries[2] === 1) {
        res = true
    }
    else {
        res = false
    }
    console.log(counts)
    return res
}

//   function isFlush(counts) { 
//      let res = false
//      let entries = Object.values(counts)
//      entries.sort() 
//      if (entries[0] === 5) {
//          res = true
//      }
//      else {
//          res = false
//      }
//      console.log('Counts:', counts)
//      return res
//   }


export { makeHand, byRank, isPair, isDoublePair, isThreeOfAKind, isFullHouse, isQuad}
