// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../Manager/DataManager";
import PoolManager, { PoolType } from "../Manager/PoolManager";
import PopupUIManager from "../Manager/PopupUIManager";
import TopBet from "./TopBet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TopBetPopup extends cc.Component {


    @property(cc.SpriteFrame)
    top1Sprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    top2Sprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    top3Sprite : cc.SpriteFrame = null;

    @property(cc.Button)
    closeButton : cc.Button = null;

    @property(cc.Node)
    panel : cc.Node = null;

    @property(cc.Node)
    topBetHolder : cc.Node = null;

    @property(cc.SpriteFrame)
    oddSprite : cc.SpriteFrame = null;

    
    @property(cc.SpriteFrame)
    evenSprite : cc.SpriteFrame = null;

    @property(TopBet)
    myTopBet : TopBet = null;

    currentTop : number = 0;

    GetNumberOfHisory(){
        return this.topBetHolder.children.length;
    }

    GetTopBet(date : string, hour : string, honors : string,  betLevel : number, moneyWin : number){

        var topBetPrefab = PoolManager.Instance.spawn(PoolType.TopBet);
        var topBet = topBetPrefab.getComponent(TopBet);

        topBet.SetTimeLabel(date, hour);
        topBet.SetHonorsLabel(honors);
        topBet.SetBetLevelLabel(betLevel);
        topBet.SetMoneyWinLabel(moneyWin);

        this.TopBetHolderGetChild(topBet);
    }

    TopBetHolderGetChild(currentTopBet : TopBet){
        if(this.topBetHolder.childrenCount == 0){
            this.SetupTopBet(currentTopBet, 0);
        }
        else{
            for(let i=0; i<this.topBetHolder.childrenCount; i++){
                let child = this.topBetHolder.children[i];
                let topBet = child.getComponent(TopBet);

                var indexTopBet = this.topBetHolder.childrenCount;
                if(currentTopBet.moneyWin > topBet.moneyWin){
                    indexTopBet = i; break;
                }
            }
            this.SetupTopBet(currentTopBet, indexTopBet);
        }

        this.CheckChildCount();
        this.UpdateTopBet();
        this.SetMyTopBet();

        
    }
    CheckChildCount(){
        if(this.topBetHolder.childrenCount > 10){
            let lastChild = this.topBetHolder.children[this.topBetHolder.childrenCount - 1];
            PoolManager.Instance.recycle(lastChild, PoolType.TopBet);
            cc.log("recycle");
        }
    }

    SetupTopBet(currentTopBet : TopBet, posInParent : number){
        currentTopBet.node.setParent(this.topBetHolder);
        currentTopBet.node.setSiblingIndex(posInParent);
    }
    UpdateTopBet(){
        for(let i=0; i<this.topBetHolder.childrenCount; i++){
            
            var inTop3 = i + 1 <= 3 ? true : false; 
            let child = this.topBetHolder.children[i];
            let topBet = child.getComponent(TopBet);
            
            topBet.SetTopState(inTop3);

            //SetSprite
            if(i + 1 == 1) topBet.SetTopSprite(this.top1Sprite);
            else if(i + 1 == 2) topBet.SetTopSprite(this.top2Sprite);
            else if(i + 1 == 3) topBet.SetTopSprite(this.top3Sprite);
            else{
                topBet.SetTopLabel(i + 1);
            }

            //SetColor
            if(topBet.node.getSiblingIndex() % 2 == 0) topBet.SetSpriteWithColor(this.evenSprite);
            else topBet.SetSpriteWithColor(this.oddSprite);
        }
    }
    SetMyTopBet(){

        if(this.HonorsExists(DataManager.instance.nickName) != null){

            var myTop = this.HonorsExists(DataManager.instance.nickName);
            var i = myTop.node.getSiblingIndex();

            if(i >= this.currentTop && this.currentTop != 0) return;
    
            this.currentTop = i + 1;
            this.myTopBet.SetTopState(i + 1 <= 3);
            
            if(i + 1 == 1) this.myTopBet.SetTopSprite(this.top1Sprite);
            else if(i + 1 == 2) this.myTopBet.SetTopSprite(this.top2Sprite);
            else if(i + 1 == 3) this.myTopBet.SetTopSprite(this.top3Sprite);
            else{
                this.myTopBet.SetTopLabel(i + 1);
            }
    
            this.myTopBet.SetTimeLabel(myTop.dateLabel.string, myTop.hourLabel.string);
            this.myTopBet.SetHonorsLabel(myTop.honorsLabel.string);
            this.myTopBet.SetBetLevelLabel(myTop.betLv);
            this.myTopBet.SetMoneyWinLabel(myTop.moneyWin);
        }

    }

    GetMyTopBet(date: string, hour : string, betValue: number, point: number){

        if(this.HonorsExists(DataManager.instance.nickName) != null){
            
            this.myTopBet.SetTopState(true);
            var myTop = this.HonorsExists(DataManager.instance.nickName);
            var i = myTop.node.getSiblingIndex();

            this.currentTop = i + 1;
            this.myTopBet.SetTopState(i + 1 <= 3);
            
            if(i + 1 == 1) this.myTopBet.SetTopSprite(this.top1Sprite);
            else if(i + 1 == 2) this.myTopBet.SetTopSprite(this.top2Sprite);
            else if(i + 1 == 3) this.myTopBet.SetTopSprite(this.top3Sprite);
            else this.myTopBet.SetTopLabel(i + 1);

        }
        else{
            this.myTopBet.SetTopState(false);
            this.myTopBet.SetTopLabel(0);
        }

        this.myTopBet.SetTimeLabel(date, hour);
        this.myTopBet.SetHonorsLabel(DataManager.instance.nickName);
        this.myTopBet.SetBetLevelLabel(betValue);
        this.myTopBet.SetMoneyWinLabel(point);
        
    }

    HonorsExists(honors : string){
        for(let i=0; i<this.topBetHolder.childrenCount; i++){
            let child = this.topBetHolder.children[i];
            let topBet = child.getComponent(TopBet);

            if(topBet.honorsLabel.string == honors){
                return topBet;
            }
        }
        return null;
    }
}
