import { expect } from "chai";
import { buildDeck } from "../../deck.js";
import { makeHand } from "../../handMaker.js";

describe('poker hands creation', () => {
    
    it('manages full house', () => {
        const deck = buildDeck();
        const cards = [];
        cards.push(getCard(deck, 10, 'diamond'));
        cards.push(getCard(deck, 10, 'club'));
        cards.push(getCard(deck, 2, 'heart'));
        cards.push(getCard(deck, 2, 'diamond'));
        cards.push(getCard(deck, 2, 'spade'));

        expect(cards).to.be.a('Array');
        expect(cards.length).to.equal(5);

        const main = makeHand(cards);

        expect(main.type).to.equal('fullhouse');
        expect(main.rank).to.equal(10);
        expect(main.sideRank).to.equal(2);
        expect(main.kickers).to.be.a('Array');
        expect(main.kickers.length).to.be.equal(0);
    });
});

function getCard(deck,rank,suit){
    const idx = deck.findIndex((c)=>c.suit === suit && c.rank === rank)
    const card = deck.splice(idx,1)[0]
    return card
}