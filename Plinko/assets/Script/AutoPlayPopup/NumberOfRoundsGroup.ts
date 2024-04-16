// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ColorType } from "../Reward/RewardColorBase";
import NumberOfRounds from "./NumberOfRounds";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberOfRoundsGroup extends cc.Component {

    @property([NumberOfRounds])
    numberOfRoundsList : NumberOfRounds[] = [];

    @property(cc.SpriteFrame)
    unSelectedSprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    selectedSprite : cc.SpriteFrame = null;


    protected onLoad(): void {
        this.GetChildren();
        this.ChangeStateNumberOfRounds(this.numberOfRoundsList[0]);
    }

    GetChildren(){
        for (let i = 0; i < this.node.childrenCount; i++) {
            let numberOfRounds = this.node.children[i];
            let numberOfRoundsComponent = numberOfRounds.getComponent(NumberOfRounds);
            this.numberOfRoundsList.push(numberOfRoundsComponent);    
        }
    }

    ChangeStateNumberOfRounds(number : NumberOfRounds){
        for (var i = 0; i < this.numberOfRoundsList.length; i++) {
            var numberOfRound = this.numberOfRoundsList[i];  
            if(numberOfRound == number){
                numberOfRound.isSelected = true;
                numberOfRound.selectStateSprite.spriteFrame = this.selectedSprite;
            }
            else{
                numberOfRound.isSelected = false;
                numberOfRound.selectStateSprite.spriteFrame = this.unSelectedSprite;
            }
        }
    }
}
