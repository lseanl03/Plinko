import GameManager from "../Manager/GameManager";
import GameplayUIManager from "../Manager/GameplayUIManager";
import PoolManager from "../Manager/PoolManager";
import PopupUIManager from "../Manager/PopupUIManager";


export enum ColorType{
    none = 0,
    green = 1,
    yellow = 2,
    red = 3
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardColorBase extends cc.Component {

    cost : number = 0;
    
    protected costLabel : cc.Label = null;
    protected overlaySprite : cc.Sprite = null;

    Init(){

        this.costLabel = this.node.getComponentInChildren(cc.Label);
        this.overlaySprite = this.node.getComponentInChildren(cc.Sprite);

        this.costLabel.string = "" + this.cost;
        if(this.cost < 1) this.overlaySprite.node.active = true;
        else this.overlaySprite.node.active = false;
    }
    UpdateReward(betMoney : number){
        this.EffectActive();
        var moneyReward = this.cost * betMoney;

        GameManager.Instance.UpdateMoney(moneyReward);
        GameplayUIManager.Instance.SetMoneyPopupLabel(moneyReward);
        PopupUIManager.Instance.CheckStopIfSingleWinExceeds(moneyReward);

    }
    EffectActive(){
        cc.tween(this.node)
        .to(0.25, { scale: 0.7})
        .to(0.2, { scale: 1})
        .start();
    }
}
