import {Ally} from './classes.js'

class Boss extends Ally{
  constructor(name, text, health, attack,thwart){
    super (name, text, health, attack,thwart)
  }
  getDamage=function(enemyDeck){
    var card = enemyDeck.pop
    var boost= card.attack
    var damage =this.attack + boost
    return damage
  }
  getThreat= function(enemyDeck){
    var card = enemyDeck.pop()
    var boost= card.thwart
    var threat =this.thwart + boost
    return threat
  }
  villainPhase= function(hero,scheme){
    if (hero.inHeroForm=false){
        scheme.threat=scheme.threat+this.getThreat
    }  
  }  
}

export {Boss}