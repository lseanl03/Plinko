// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ColorType } from "../Reward/RewardColorBase";
import BetColor from "./BetColor";
import BetColor2 from "./BetColor2";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetColorGroup extends cc.Component {

    @property([BetColor2])
    betColorList2 : BetColor2[] = [];

    @property([BetColor])
    betColorList : BetColor[] = [];
    
    @property(cc.SpriteFrame)
    unSelectedSprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    selectedSprite : cc.SpriteFrame = null;

    protected onLoad(): void {
        this.ChangeStateBetColor(ColorType.green);
    }

    ChangeStateBetColor(colorType : ColorType){
        for (var i = 0; i < this.betColorList2.length; i++) {
            var betColor = this.betColorList2[i];
            if(betColor.colorType == colorType){
                
                if(betColor.isSelected && this.NumbersBetColorIsSelectes() == 1) return;

                betColor.isSelected = !betColor.isSelected;
                betColor.selectStateSprite.spriteFrame = betColor.isSelected ? this.selectedSprite : this.unSelectedSprite;
            }
        }
    }
    NumbersBetColorIsSelectes(){
        var count = 0;
        for (var i = 0; i < this.betColorList2.length; i++) {
            if(this.betColorList2[i].isSelected) count ++;
        }
        return count;
    }
}
