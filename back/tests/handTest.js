import { expect } from "chai";
import { buildDeck } from "../deck.js";
import { makeHand } from "../handMaker.js";

describe('poker hands comparison', () => {
    
    it('simple pair', () => {
        const deck = buildDeck()
        const cards = []
        cards.push(getCard(deck,13,'diamond'))
        cards.push(getCard(deck,2,'club'))
        cards.push(getCard(deck,4,'heart'))
        cards.push(getCard(deck,13,'club'))
        cards.push(getCard(deck,8,'spade'))
        
        expect(cards).to.be.a('Array')
        expect(cards.length).to.equal(5)

        const hand = makeHand(cards)
        expect(hand.type).to.equal('pair')
        expect(hand.rank).to.equal(13)
        expect(hand.kickers).to.be.a('Array')
        expect(hand.kickers[0].rank).to.equal(8)
    });
});

function getCard(deck,rank,suit){
    const idx = deck.findIndex((c)=>c.suit === suit && c.rank === rank)
    const card = deck.splice(idx,1)[0]
    return card
}