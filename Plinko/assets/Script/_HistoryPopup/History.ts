// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class History extends cc.Component {

    sprite : cc.Sprite = null;

    @property(cc.Label)
    timeLabel : cc.Label = null;

    @property(cc.Label)
    sessionLabel : cc.Label = null;

    @property(cc.Label)
    betLevelLabel : cc.Label = null;

    @property(cc.Label)
    winLabel : cc.Label = null;
    
    protected onLoad(): void {
        this.sprite = this.getComponent(cc.Sprite);
    }

    SetTimeLabel(time : Date){
        this.timeLabel.string = time.toLocaleString();
    }

    SetSessionLabel(session : string){
        this.sessionLabel.string = session;
    }

    SetBetLevelLabel(betLevel : number){
        this.betLevelLabel.string = betLevel.toString();
    }

    SetWinLabel(win : number){
        this.winLabel.string = win.toString();
    }
}
