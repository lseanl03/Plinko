import DataManager from "../Manager/DataManager";
import EventManager from "../Manager/EventManager";
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
        var dataManager = DataManager.instance;

        GameManager.Instance.UpdateMoney(moneyReward);
        GameplayUIManager.Instance.SetMoneyPopupLabel(moneyReward);
        PopupUIManager.Instance.CheckStopIfSingleWinExceeds(moneyReward);
        PopupUIManager.Instance.historyPopup.GetHistory(this.GetCurrentDate(), this.cost, betMoney, moneyReward);
        PopupUIManager.Instance.topBetPopup.GetTopBet(this.GetCurrentDate(), this.GetCurrentHour(), dataManager.nickName, betMoney, moneyReward);
        
        dataManager.PostData('point', dataManager.DataReturn(dataManager.nickName, 'plinko', betMoney, moneyReward));

        if(moneyReward > PopupUIManager.Instance.topBetPopup.myTopBet.moneyWin){
            PopupUIManager.Instance.topBetPopup.GetMyTopBet(this.GetCurrentDate(), this.GetCurrentHour(), betMoney, moneyReward);
            dataManager.SaveLocalData('mytopdata', {date: this.GetCurrentDate(), hour: this.GetCurrentHour(), betValue: betMoney, point: moneyReward});
        }
    }
    EffectActive(){
        cc.tween(this.node)
        .to(0.25, { scale: 0.7})
        .to(0.2, { scale: 1})
        .start();
    }

    GetCurrentDate(){
        //định dạng yyyy-mm-dd
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return year + "-" + month + "-" + day;
    }

    GetCurrentHour(){
        //định dạng hh:mm
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();

        return hour + ":" + minute;
    }
}
