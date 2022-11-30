// the game itself
let game;
 
// global object with game options
let gameOptions = {
 
    // card width, in pixels
    cardWidth: 334,
 
    // card height, in pixels
    cardHeight: 440,
 
    // card scale. 1 = original size, 0.5 half size and so on
    cardScale: 0.4
}
window.onload = function() {

    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x4488aa,
        scene: PokerTable
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}
 
// two constants for better understanding of "UP" and "DOWN"
const UP = -1;
const DOWN = 1;
class PokerTable extends Phaser.Scene {
    constructor() {
        super("PokerTable");
    }
    preload() {
 
        // loading the sprite sheet with all cards
        this.load.spritesheet("cards", "cards.png", {
            frameWidth: gameOptions.cardWidth,
            frameHeight: gameOptions.cardHeight
        });
    }
    create() {

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
 
        this.suits = ['spike','club','diamond','heart']
        this.deck = {'heart':[],
                    'diamond':[],
                    'club':[],
                    'spike':[]};
        this.curX = 10
        this.curY = 10

        for(let suitIdx of Phaser.Utils.Array.NumberArray(0, 3)){
            for(let rankIdx of Phaser.Utils.Array.NumberArray(0, 12)){
                let card = this.createCard(suitIdx,rankIdx)
                card.x = this.curX
                card.y = this.curY
                this.deck[this.suits[suitIdx]].push(card)
                this.curX += 5
                this.curY += 5
            }
        }
        let socket = io("localhost:3000");
   
        socket.on("connection",()=>{
            console.log("connected");
        })
        socket.on("deal",(cards)=>{
            console.log("cards",cards);
            this.moveCard(this.deck[cards[0].suit][cards[0].rank-1],560,560)
            this.moveCard(this.deck[cards[1].suit][cards[1].rank-1],700,560)
        })
    }
 
    createCard(suitIdx,rankIdx) {
        
        let idx = (suitIdx*13)+rankIdx
        let card = this.add.sprite(- gameOptions.cardWidth * gameOptions.cardScale, game.config.height / 2, "cards", idx);
 
        // scale the sprite
        card.setScale(gameOptions.cardScale);
 
        // return the card
        return card;
    }
 
    moveCard(card,x,y,cb) {
        this.tweens.add({
            targets: card,
            x: x,
            y : y,
            duration: 500,  
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: cb
        });
    }
}