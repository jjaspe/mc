import {Ally} from './classes.js'

class Hero extends Ally {
  constructor(name, text, health, attack, thawrt, defense, alterEgo) {
    super(name, text, health, attack, thawrt)
    this.alterEgo = alterEgo
    this.defense = defense
    this.inHeroForm = true
    this.ready=true
    this.maxHealth=health
  }
  shouldHeroDefend = function(){
    return(this.health<14 && this.health>10)
  }

  shouldHeroSwitch = function() {
    return (this.health<10 && this.inHeroForm) ||(this.health >=10 && !this.inHeroForm)
  } 
  reducedDamage= function(damage){
    return damage - this.defense
  }
  takeDamage=function(damage){
    this.health=this.health-Math.max(damage,0)
  }
  switch = function(){
    this.inHeroForm = !this.inHeroForm
  }
  
  villainPhase= function(damage){
    this.ready=true
    if (this.inHeroForm){
      if (this.shouldHeroDefend){
          this.takeDamage(this.reducedDamage(damage))
          this.ready=false
    }
      else{
          this.takeDamage(damage)
      }
    }
  }
  
  
  playerPhase = function(boss,card,scheme){
    if(this.shouldHeroSwitch() ){
      this.switch()
    }
    if (this.inHeroForm && this.ready && scheme.threat>14){
      scheme.threat=Max(scheme.threat-this.thwartAction,0)
    }
    if(this.inHeroForm && this.ready){
      this.attackAction(boss,card)
      this.ready=false
    }
    else{
      if (!this.inHeroForm){
        this.alterEgo.playerPhase(boss,card,this)}
    }
  }
  thwartAction = function(scheme,card) {
    scheme.threat = scheme.threat - card.thwart
      
    }
  
  attackAction = function(boss,card) {
    var damage = card.attack
    boss.health = boss.health - damage
    //print('Hit boss for ' + damage + ' damage')
  }

}



class AlterEgo extends Ally{
  regen=0
  
  constructor(name, text, health, regen){
    super(name,text,health, 0, 0)
    this.regen=regen
  }
  playerPhase= function(boss,card,hero){
    hero.health= Math.min(this.regen+hero.health,hero.maxHealth)
    
  }
}
export {Hero,AlterEgo}