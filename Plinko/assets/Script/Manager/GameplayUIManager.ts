// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AutoPlayButton from "../Button/AutoPlayButton";
import PlayButton from "../Button/PlayButton";
import MoneyPopup from "../MoneyPopup";
import ConsumeMoney from "../MoneyPopup";
import { ColorType } from "../Reward/RewardColorBase";
import DataManager from "./DataManager";
import EventManager from "./EventManager";
import GameManager from "./GameManager";
import PopupUIManager from "./PopupUIManager";
import Spawner from "./Spawner";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameplayUIManager extends cc.Component {
    public static Instance :GameplayUIManager = null;

    //UI

    @property (cc.Button)
    subBetButton : cc.Button =  null;    
    @property (cc.Button)
    sumBetButton : cc.Button = null;
    @property (AutoPlayButton)
    autoPlayButton : AutoPlayButton = null;


    @property (cc.Label)
    currentBetLevelLabel : cc.Label = null;

    @property (cc.Label)
    currentMoneyLabel : cc.Label = null;

    @property (MoneyPopup)
    moneyPopup : MoneyPopup = null;

    @property (cc.Label)
    nicknameLabel : cc.Label = null;


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
        this.autoPlayButton.node.on('click', this.onAutoPlayButtonClick, this);

        EventManager.on('StartAutoPlay', this.OnStartAutoPlay, this);
        EventManager.on('StopAutoPlay', this.OnStopAutoPlay, this);
        

 
        EventManager.on('Play', this.OnPlay, this);
    }
    OnStartAutoPlay(){
        this.OnPlay(true);
    }
    OnStopAutoPlay(){
    }

    onAutoPlayButtonClick(){
        if(!this.autoPlayButton.isAuto){
            PopupUIManager.Instance.ShowAutoPlayPopup();
        }
        else{
            EventManager.emit('StopAutoPlay');
        }
    }
    OnPlay(state : boolean){

        this.BetButtonState(!state);

        let hideColor = new cc.Color(150, 150, 150);
        let showColor = new cc.Color(255, 255, 255);
        
        this.subBetButton.node.color = !state ? showColor = showColor : hideColor;        
        this.sumBetButton.node.color = !state ? showColor = showColor : hideColor;
    }


    OnDestroyCirclePlayer(){
    }
    OnSpawnCirclePlayer(){
        this.BetButtonState(false);
    }

    onSubButtonClick(){
        GameManager.Instance.UpdateCurrentBetLevel(GameManager.Instance.currentBetLevel / 2);
    }
    onSumButtonClick(){
        cc.log("onSumButtonClick");
        GameManager.Instance.UpdateCurrentBetLevel(GameManager.Instance.currentBetLevel * 2);
    }


    public BetButtonState(state : boolean){
        this.subBetButton.interactable = state;
        this.sumBetButton.interactable = state;
    }


    public SetNicknameLabel(nickname : string)
    {
        this.nicknameLabel.string = nickname;
    }
    public SetCurrentMoneyLabel(currentMoney : number){
        this.currentMoneyLabel.string = "" + currentMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        DataManager.instance.SaveLocalData('money', currentMoney);
    }
    public SetCurrentBetLevelLabel(currentBetLevel : number){
        this.currentBetLevelLabel.string = "" + currentBetLevel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    public SetMoneyPopupLabel(money : number){
        if(money >= 0) this.moneyPopup.label.string = "+" + money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        else this.moneyPopup.label.string = "-" + money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        this.MoneyPopupState(false);
        this.MoneyPopupState(true);
    }
    protected MoneyPopupState(state : boolean){
        this.moneyPopup.node.active = state;
    }

    CurrentMoneyEffect(){
        cc.tween(this.currentMoneyLabel.node)
        .to(0.25, { scale: 1.2})
        .to(0.2, { scale: 1})
        .start();
    }



}
