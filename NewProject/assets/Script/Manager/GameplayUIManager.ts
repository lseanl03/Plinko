// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ConsumeMoney from "../ConsumeMoney";
import GhimLevelSelect from "../GhimLevelSelect";
import GhimLevelView from "../GhimLevelView";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameplayUIManager extends cc.Component {
    public static Instance :GameplayUIManager = null;

    //UI

    @property (cc.Button)
    subBetButton : cc.Button =  null;    
    @property (cc.Button)
    sumBetButton : cc.Button = null;
    @property (cc.Button)
    subMinBetButton : cc.Button = null;
    @property (cc.Button)
    sumMaxBetButton : cc.Button = null;


    @property (cc.Label)
    currentBetLevelLabel : cc.Label = null;

    @property (cc.Label)
    currentMoneyLabel : cc.Label = null;

    @property (ConsumeMoney)
    consumeMoney : ConsumeMoney = null;

    @property (cc.Node)
    rewardHistoryViewHolder : cc.Node = null;

    @property (cc.Node)
    rewardHistoryListHolder : cc.Node = null;
    protected onLoad(): void {
        GameplayUIManager.Instance = this;

        this.AddListener();

    }
    protected start(): void {
        this.Init();
    }

    Init(){
        this.SetCurrentBetLevelLabel(GameManager.Instance.currentBetLevel);
        this.SetCurrentMoneyLabel(GameManager.Instance.currentMoney);
    }
    AddListener(){
        this.subBetButton.node.on('click', this.onSubButtonClick, this);
        this.sumBetButton.node.on('click', this.onSumButtonClick, this);
        
        this.subMinBetButton.node.on('click', this.onSubMinButtonClick, this);
        this.sumMaxBetButton.node.on('click', this.onSumMaxButtonClick, this);
    }

    onSubButtonClick(){
        GameManager.Instance.UpdateBetLevel(-10000);
    }
    onSumButtonClick(){
        GameManager.Instance.UpdateBetLevel(10000);
    }

    onSubMinButtonClick(){
        GameManager.Instance.UpdateBetLevel(-GameManager.Instance.maxBetLevel);
    }
    onSumMaxButtonClick(){
        GameManager.Instance.UpdateBetLevel(GameManager.Instance.maxBetLevel);
    }


    public BetButtonState(state : boolean){
        this.subBetButton.interactable = state;
        this.sumBetButton.interactable = state;

        this.subMinBetButton.interactable = state;
        this.sumMaxBetButton.interactable = state;
    }


    public SetCurrentMoneyLabel(currentMoney : number){
        this.currentMoneyLabel.string = "" + currentMoney + " VND";
    }
    public SetCurrentBetLevelLabel(currentBetLevel : number){
        this.currentBetLevelLabel.string = "" + currentBetLevel;
    }
    public SetConsumeMoneyLabel(consumeMoney : number){
        this.consumeMoney.label.string = "-" + consumeMoney;
    }
    public ConsumeMoneyState(state : boolean){
        this.consumeMoney.node.active = state;
    }

    CurrentMoneyEffect(){
        cc.tween(this.currentMoneyLabel.node)
        .to(0.25, { scale: 1.1})
        .to(0.2, { scale: 1})
        .start();
    }



}
