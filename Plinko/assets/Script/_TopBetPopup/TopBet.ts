// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TopBet extends cc.Component {


    betLv : number = 0;
    moneyWin : number = 0;

    @property(cc.Sprite)
    sprite : cc.Sprite = null;

    @property(cc.Label)
    topLabel : cc.Label = null;

    @property(cc.Sprite)
    topSprite : cc.Sprite = null;

    @property(cc.Label)
    dateLabel : cc.Label = null;
    
    @property(cc.Label)
    hourLabel : cc.Label = null;

    @property(cc.Label)
    honorsLabel : cc.Label = null;

    @property(cc.Label)
    betLevelLabel : cc.Label = null;

    @property(cc.Label)
    winLabel : cc.Label = null;

    SetTimeLabel(date : string, hour : string){
        
        this.dateLabel.string = date;
        
        this.hourLabel.string = hour;
    }


    SetSpriteWithColor(spriteFrame : cc.SpriteFrame){
        this.sprite.spriteFrame = spriteFrame;
    }

    SetHonorsLabel(honors : string){
        this.honorsLabel.string = honors;
    }

    SetBetLevelLabel(betLevel : number){
        this.betLv = betLevel;
        this.betLevelLabel.string = this.betLv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    SetMoneyWinLabel(value : number){
        this.moneyWin = value;
        this.winLabel.string = this.moneyWin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    SetTopState(inTop3 : boolean){
        this.topSprite.node.active = inTop3;
        this.topLabel.node.active = !inTop3;
    }

    SetTopLabel(top : number){
        if(top == 0) {
            this.topLabel.string = "---";
            return;
        
        }
        this.topLabel.string = "" + top;
    }
    SetTopSprite(spriteFrame : cc.SpriteFrame){
        this.topSprite.spriteFrame = spriteFrame;
    }
}
