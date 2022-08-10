import {Card} from './classes.js'

class Scheme extends Card{
  constructor (name,text,threat,maxThreat,threatGain){
    super(name, text)
    this.threat=threat
    this.maxThreat=maxThreat
    this.threatGain= threatGain
  }
  gainThreat=function(){
    this.threat=this.threat+this.threatGain
  }
  
}
export {Scheme}