import { byRank, makeHand } from "./handMaker.js"

function buildRandomHand(deck) {
    const hand = []
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
    hand.sort(byRank)
    return hand
}

function buildHighCard(deck) {
    let hand = null
    do {
        if (hand) {
            deck.push(...hand)
        }
        hand = buildRandomHand(deck)
    }
    while (makeHand(hand).type != 'high')
    hand.sort(byRank)
    return hand
}

function buildPair(deck) {
    let hand = buildHighCard(deck)
    hand.sort(byRank)
    let idx = deck.findIndex((c) => c.rank === hand[0].rank)
    let tmp = hand[1]
    hand[1] = deck.splice(idx, 1)[0]
    deck.push(tmp)
    
    return hand
}

function buildDoublePair(deck) {
   
}

function buildThreeOfAKind(deck) {
   
}

function buildQuad(deck) {
    
}

export { buildRandomHand,buildHighCard,buildPair,buildDoublePair,buildThreeOfAKind,buildQuad }