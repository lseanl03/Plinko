// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../Manager/DataManager";
import PoolManager, { PoolType } from "../Manager/PoolManager";
import History from "./History";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryPopup extends cc.Component {

    isOdd : boolean = false;

    @property(cc.Button)
    closeButton : cc.Button = null;

    @property(cc.Node)
    panel : cc.Node = null;

    @property(cc.Node)
    historyHolder : cc.Node = null;

    @property(cc.SpriteFrame)
    oddSprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    evenSprite : cc.SpriteFrame = null;

    GetNumberOfHisory(){
        return this.historyHolder.children.length;
    }

    GetHistory(rewardTime : string, session : number, betLevel : number, moneyWin : number){
        var historyPrefab = PoolManager.Instance.spawn(PoolType.History);
        var history = historyPrefab.getComponent(History);

        history.SetTimeLabel(rewardTime);
        history.SetSessionLabel(session);
        history.SetBetLevelLabel(betLevel);
        history.SetMoneyWinLabel(moneyWin);

        this.HistoryHolderGetChild(history);
    }
    HistoryHolderGetChild(history : History){

        history.node.setParent(this.historyHolder);
        history.node.setSiblingIndex(0);
        this.EffectActive(history);

        //Check pos in parent
        if(this.isOdd){
            history.SetSpriteWithColor(this.evenSprite);
        }
        else{
            history.SetSpriteWithColor(this.oddSprite);
        }
        
        //Check ChildrenCount
        if(this.historyHolder.childrenCount > 20){
            let lastChild = this.historyHolder.children[this.historyHolder.childrenCount - 1]
            PoolManager.Instance.recycle(lastChild, PoolType.History);
            cc.log(" length > 20");
        }

        this.isOdd = !this.isOdd;
    }
    EffectActive(history : History){
        // let defaultHeight = history.node.height;
        // history.node.height = 0;

        // cc.tween(history.node)
        // .to(0.2, {height : defaultHeight})
        // .start();
    }
    GetMyHighPoint(){
        var historyHighPoint = new History();
        historyHighPoint.moneyWin = 0;

        for(let i=0; i<this.historyHolder.childrenCount; i++){
            let history = this.historyHolder.children[i].getComponent(History);
            if(history.moneyWin > historyHighPoint.moneyWin){
                historyHighPoint = history;
            }
        }
        return historyHighPoint;
    }
}
