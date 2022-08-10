//import * as Classesfrom 'classes.js'
import { Hero, AlterEgo } from './hero.js'
import { Ally } from './classes.js'
import { Scheme } from './scheme.js'
import { Boss } from './boss.js'

function intializeAlly() {
  var card2 = new Ally('Card2', '', 1, Math.floor(Math.random() * 6), Math.floor(Math.random() * 6))
  card2.cost = Math.floor(card2.attack / 2)
  return card2
}

function makeDeck(deckSize) {
  var deck = []
  for (var x = 0; x < deckSize; x++) {
    deck.push(intializeAlly())
  }
  return deck
}
function makeScheme() {
  var scheme = new Scheme('Scheme', '', 0, 20, 2)
  return scheme
}

function makeBoss() {
  var boss = new Boss('boss', '', 130, 2, 1)
  return boss
}

function makeHero() {
  var hero = new Hero('Hero', '', 100, 0, 0, 4, makeAlterEgo(100),)
  return hero
}

function makeAlterEgo(heroHealth) {
  var alterEgo = new AlterEgo('AlterEgo', '', heroHealth, 40)
  return alterEgo
}

function makeHand(handSize, deckCards) {
  var hand = []
  for (var x = 0; x < handSize; x++)
    hand.push(deckCards.pop())
  return hand
}

function pickFirstCard(hand) {
  var card = hand.pop()
  return card
}
function pickBestCard(hand) {
  var card = hand[0]
  for (var x = 0; x < hand.length; x++) {
    if (hand[x].attack > card.attack) {
      card = hand[x]
    }
  }
  print('best card: ' + card.name + ' with attack: ' + card.attack)
  return card
}

// function attackBoss(boss, card) {
//   var damage = card.attack
//   boss.health = boss.health - damage
//   print('Hit boss for ' + damage + ' damage')
// }

function drawCard(hand, deck, handSize) {
  if (deck.length < handSize) {
    deck = makeDeck(40)
    print('rebuilding deck')
  }
  for (var x = hand.length; x < handSize; x++) {
    hand.push(deck.pop())
  }
  return deck
}

function isdead(unit) {
  if (unit.health <= 0) {
    return true
  }
  else
    return false
}

function payForCards(playedCard, hand) {
  hand.splice(0, playedCard.cost)
}

function print(...stuff) {
  if (allowPrint) {
    console.log(...stuff)
  }
}

function startGame(pickCard) {
  var enemyHand = []
  var deck = makeDeck(40)
  var boss = makeBoss()
  var hero = makeHero()
  var hand = makeHand(5, deck)
  var enemyDeck = makeDeck(40)
  var scheme = makeScheme()
  var gameEnd = false
  var victory = false
  while (gameEnd == false) {
    scheme.threat = scheme.gainThreat()
    var playedCard = pickCard(hand)
    payForCards(playedCard, hand)
    hero.playerPhase(boss, playedCard, hero)
    if (isdead(boss)) {
      print('victory', hero.health)
      gameEnd = true
      victory = true
    }
    else {
      hero.villainPhase(boss.getDamage(enemyDeck))
      boss.villainPhase(enemyDeck)
      if (isdead(hero) || scheme.threat == scheme.maxThreat) {
        gameEnd = true
        print('defeat', boss.health)
      }
      else {
        deck = drawCard(hand, deck, 5)
        enemyDeck = drawCard(enemyHand, enemyDeck, 1)
      }
    }
    print('Hero:', hero.health)
    print('Boss:', boss.health)
    print('Scheme:', scheme.threat)
  }
  return victory
}
var allowPrint = true
var victorys = 0
for (var x = 0; x < 100; x++)
  if (startGame(pickFirstCard)) {
    victorys++
  }
console.log('firstCard' + victorys)
victorys = 0
for (var x = 0; x < 100; x++)
  if (startGame(pickBestCard)) {
    victorys++
  }
console.log('bestCard' + victorys)