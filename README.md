# Bingo Game

This is a simple bingo game that can be played by multiple players.

## Getting Started

First, clone the repository, then go into your favorite terminal

```bash
docker compose up
```

After that, open your browser and go to `http://localhost:4200`

## How to play

### Create a game

A game should be created by a **Master** player, who will be the host of the game.

The Master player should wait for all players to join the game before starting the game, otherwise the game will not allow other players to join.

### Join a game

**Participants** can join a game by scanning the QR code or shared link provided by the Master player.

After joining the game, the participant will be able to click on the bingo card to mark the numbers or click the "Random" button to randomly mark all the numbers on the card.

### Start a game

After confirm that all participants is ready, the Master player can start the game.

When the game is started, the Master player will be able to click the "Draw" button to draw a number or manually input a number to draw.