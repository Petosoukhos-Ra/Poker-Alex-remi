import { broadcast, createGame, dealAllPocketCards, dealTheCardsFlop, dealCardTurn, dealCardRiver ,getNextPlayer, listFreeSeats, removePlayer, roundIsOver, startGame, updateStack } from "./gameActions.js";
import { findBestHand,compareHands } from "./handsComparator.js";
import { makeHand } from "./handMaker.js";

let game;
let seats = [...Array(4)]
let onConnect = (socket) => {
  console.log("connexion de ", socket.id);

  socket.on("listSeats", () => {
    let freeSeats = listFreeSeats(seats)
    console.log(freeSeats);
    socket.emit("listSeats", freeSeats)
  })
  socket.on("join", (newPlayer) => {
    // console.log(newPlayer);
    console.log("player", newPlayer.name, "ready");
    newPlayer.socket = socket
    newPlayer.bet = 0
    socket.player = newPlayer
    seats[newPlayer.seat - 1] = newPlayer
    // addNewPlayer(game,newPlayer)

    // console.log("game", game, game.players.length);
    const readyPlayers = seats.filter((s) => s != undefined)
    if (readyPlayers.length > 3) {
      if (!game || !game.started) {
        console.log("deal...");
        game = createGame(readyPlayers)
        startGame(game)
        dealAllPocketCards(game)
        dealTheCardsFlop(game) //distribue les cartes sur le plateau de jeux
        game.currentPlayer.socket.emit("active")
      }
    }
  })

  socket.on("bet", ({ seat, amount }) => {
    console.log(game.currentPlayer.name);
    if (seat != game.currentPlayer.seat) {
      console.log("not your turn...");
      return
    }
    console.log("player", seat, "bet", amount);

    updateStack(game.currentPlayer, amount)
    console.log(game.currentPlayer.stack);
    socket.emit("unactive")
    broadcast(game, "bet", { seat, amount, stack: game.currentPlayer.stack, bet: game.currentPlayer.bet })
    // game.currentPlayer.bet += amount

    if (roundIsOver(game) && game.cumul === 0) {
      game.pot = 0;
      console.log("Le premier round est finie...");
      dealCardTurn(game);
      broadcast(game, "cardTurn", game.dealCardTurn);
      game.currentPlayer.socket.emit("active");
      game.cumul += 1
      return;
    }

    if (roundIsOver(game) && game.cumul === 1) {
      game.pot = 0
      console.log("Le deuxieme round est finie...");
      dealCardRiver(game);
      broadcast(game, "cardRiver", game.dealCardRiver);
      game.currentPlayer.soket.emit("active");
      game.cumul += 1
      return;
    }

    if (roundIsOver(game) && game.cumul === 2) {
      console.log("Le troisieme round est finie...");
      console.log("find winner");
      broadcast(game,"game-over");
      game.pot = 0
      for (let player of game.players) {
        player.hand = makeHand([...player.cards, ...game.flop])
        console.log("hand", player.hand);
        game.pot += player.bet
        player.bet = 0
      }
      let bestHand = findBestHand(game.players.map((p) => p.hand))
      console.log("best",bestHand);
      let winners = game.players.filter((p)=>compareHands(p.hand,bestHand)===0)
      console.log("winners", winners);
      for (let winner of winners) {
        winner.stack += game.pot/winners.length
      }
      broadcast(game, "winners", winners.map((w) => { return { hand:w.hand,seat: w.seat, prize: game.pot / winners.length, stack: w.stack } }))
      return
    }
    game.currentPlayer = getNextPlayer(game)
    console.log(game.currentPlayer.name);
    game.currentPlayer.socket.emit("active")

  })
  socket.on("show", (seat) => {
    console.log("show!",seat);
    broadcast(game, "show",{seat,cards:socket.player.cards}, seat)
  })
  socket.on("fold", (seat) => {
    console.log("player", seat, "fold");
    removePlayer(game, seat)
    broadcast(game, "fold", seat)
    broadcast(game,"game-over");
  })
}

export { onConnect }