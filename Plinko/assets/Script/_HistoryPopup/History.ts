// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class History extends cc.Component {

    @property(cc.Sprite)
    sprite : cc.Sprite = null;

    @property(cc.Label)
    timeLabel : cc.Label = null;

    @property(cc.Label)
    sessionLabel : cc.Label = null;

    @property(cc.Label)
    betLevelLabel : cc.Label = null;

    @property(cc.Label)
    winLabel : cc.Label = null;

    moneyWin : number = 0;

    SetSpriteWithColor(spriteFrame : cc.SpriteFrame){
        this.sprite.spriteFrame = spriteFrame;
    }

    SetTimeLabel(time : string){
        this.timeLabel.string = time;
    }

    SetSessionLabel(session : number){
        this.sessionLabel.string = "X " + session;
    }

    SetBetLevelLabel(betLevel : number){
        this.betLevelLabel.string = betLevel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    }

    SetMoneyWinLabel(moneyWin : number){
        this.moneyWin = moneyWin;
        this.winLabel.string = moneyWin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
