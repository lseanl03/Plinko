// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AutoPlayPopup from "../AutoPlayPopup/AutoPlayPopup";
import BetColor from "../AutoPlayPopup/BetColor";
import BetColor2 from "../AutoPlayPopup/BetColor2";
import BetColorGroup from "../AutoPlayPopup/BetColorGroup";
import NumberOfRoundsGroup from "../AutoPlayPopup/NumberOfRoundsGroup";
import StopIfMoneyDecreasesGroup from "../AutoPlayPopup/StopIfMoneyDecreasesGroup";
import StopIfSingleWinExceedsGroup from "../AutoPlayPopup/StopIfSingleWinExceedsGroup";
import ButtonBase from "../Button/ButtonBase";
import HistoryPopup from "../_HistoryPopup/HistoryPopup";
import NotificationPopup from "../_NotificationPopup/NotificationPopup";
import ShopPopup from "../_ShopPopup/ShopPopup";
import TopBetPopup from "../_TopBetPopup/TopBetPopup";
import TutorialPopup from "../_TutorialPopup/TutorialPopup";
import UserNamePopup from "../_UserNamePopup/UserNamePopup";
import DataManager from "./DataManager";
import EventManager from "./EventManager";
import GameManager from "./GameManager";
import GameplayUIManager from "./GameplayUIManager";
import Spawner from "./Spawner";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PopupUIManager extends cc.Component {
    public static Instance : PopupUIManager = null;

    @property(BetColorGroup)
    betColorGroup : BetColorGroup = null;

    @property(NumberOfRoundsGroup)
    numberOfRoundsGroup : NumberOfRoundsGroup = null;

    @property(AutoPlayPopup)
    autoPlayPopup : AutoPlayPopup = null;

    @property(TutorialPopup)
    tutorialPopup : TutorialPopup = null;

    @property(HistoryPopup)
    historyPopup : HistoryPopup = null;

    @property(TopBetPopup)
    topBetPopup : TopBetPopup = null;

    @property(ShopPopup)
    shopPopup : ShopPopup = null;

    @property(UserNamePopup)
    userNamePopup : UserNamePopup = null;

    @property(NotificationPopup)
    notificationPopup : NotificationPopup = null;

    @property(StopIfMoneyDecreasesGroup)
    stopIfMoneyDecreasesGroup : StopIfMoneyDecreasesGroup = null;

    @property(StopIfSingleWinExceedsGroup)
    stopIfSingleWinExceedsGroup : StopIfSingleWinExceedsGroup = null;

    betColorList : BetColor2[] = [];
    currentCost : number = 0;


    protected onLoad(): void {
        PopupUIManager.Instance = this;

        this.autoPlayPopup.startAutoButton.node.on('click', this.StartAutoPlay, this);
        this.autoPlayPopup.closeButton.node.on('click', this.OnAutoPlayExit, this);
        this.tutorialPopup.closeButton.node.on('click', this.OnTutorialExit, this);
        this.historyPopup.closeButton.node.on('click', this.OnHistoryExit, this);
        this.topBetPopup.closeButton.node.on('click', this.OnTopBetExit, this);
        this.shopPopup.closeButton.node.on('click', this.OnShopExit, this);
        this.notificationPopup.closeButton.node.on('click', this.OnNotificationExit, this);

    }

    StartAutoPlay(){


        this.GetCurrentCost();
        this.GetListBetColorSelected();

        this.autoPlayPopup.closeButton.interactable = false;

        this.autoPlayPopup.panel.opacity = 255;
        this.autoPlayPopup.panel.position = cc.v3(0,0,0);
        
        cc.tween(this.autoPlayPopup.panel)
        .to(0.2, {opacity: 0, position: cc.v3(0,300,0)}, { easing: 'backIn'})
        .call(() => {
            this.autoPlayPopup.node.active = false;  
            EventManager.emit('StartAutoPlay');

        })
        .start();

    }
    OnAutoPlayExit(){
        this.HidePopUp(this.autoPlayPopup.panel, this.autoPlayPopup.node);
        this.autoPlayPopup.closeButton.interactable = false;
    }
    OnTutorialExit(){
        this.HidePopUp(this.tutorialPopup.panel, this.tutorialPopup.node);
        this.tutorialPopup.closeButton.interactable = false;
    }
    OnHistoryExit(){
        this.HidePopUp(this.historyPopup.panel, this.historyPopup.node);
        this.historyPopup.closeButton.interactable = false;
    }
    OnShopExit(){
        this.HidePopUp(this.shopPopup.panel, this.shopPopup.node);
        this.shopPopup.closeButton.interactable = false;
    }

    OnTopBetExit(){
        this.HidePopUp(this.topBetPopup.panel, this.topBetPopup.node);
        this.topBetPopup.closeButton.interactable = false;
    }
    OnNotificationExit(){
        this.HidePopUp(this.notificationPopup.panel, this.notificationPopup.node);
        this.notificationPopup.closeButton.interactable = false;

        if(this.notificationPopup.isComplete){
            this.HidePopUp(this.userNamePopup.panel, this.userNamePopup.node);
            GameManager.Instance.SetNickname(DataManager.instance.nickName);
        }
    }


    ShowAutoPlayPopup(){
        this.ShowPopUp(this.autoPlayPopup.panel, this.autoPlayPopup.node);
        this.autoPlayPopup.closeButton.interactable = true;
    }
    ShowTutorialPopup(){
        this.ShowPopUp(this.tutorialPopup.panel, this.tutorialPopup.node);
        this.tutorialPopup.closeButton.interactable = true;
    }
    ShowHistoryPopup(){
        this.ShowPopUp(this.historyPopup.panel, this.historyPopup.node);
        this.historyPopup.closeButton.interactable = true;
    }
    ShowTopBetPopup(){
        this.ShowPopUp(this.topBetPopup.panel, this.topBetPopup.node);
        this.topBetPopup.closeButton.interactable = true;
    }

    ShowShopPopup(){
        this.ShowPopUp(this.shopPopup.panel, this.shopPopup.node);
        this.shopPopup.closeButton.interactable = true;
    }
    ShowNotificationPopup(){
        this.ShowPopUp(this.notificationPopup.panel, this.notificationPopup.node);
        this.notificationPopup.closeButton.interactable = true;
    }

    //Show lên khi lân đầu chơi
    ShowUserNamePopup(){
        this.ShowPopUp(this.userNamePopup.panel, this.userNamePopup.node);
    }




    ShowPopUp(panel : cc.Node, self : cc.Node){
        self.active = true;
        panel.active = true;
        panel.opacity = 0;
        panel.position = cc.v3(0,300,0);


        cc.tween(panel)
        .to(0.5, {opacity: 255, position: cc.v3(0,0,0)}, { easing: 'backOut'})
        .call(() => {
        })
        .start();
    }
    HidePopUp(panel : cc.Node, self : cc.Node){
        panel.opacity = 255;
        panel.position = cc.v3(0,0,0);
        
        cc.tween(panel)
        .to(0.5, {opacity: 0, position: cc.v3(0,300,0)}, { easing: 'backIn'})
        .call(() => {
            panel.active = false;
            self.active = false;
            
        })
        .start();
    }



    GetListBetColorSelected(){
        this.betColorList = [];
        this.betColorGroup.betColorList2.forEach(betColor => {
            if(betColor.isSelected){
                this.betColorList.push(betColor);
            }
        });

        return this.betColorList;
    }
    GetCurrentCost(){
        this.numberOfRoundsGroup.numberOfRoundsList.forEach(numberOfRounds => {
            if(numberOfRounds.isSelected){
                this.currentCost = numberOfRounds.cost;
                return;
            }
                
        });
    }


    UpdateCurrentCost(){
        this.currentCost--;
        GameplayUIManager.Instance.autoPlayButton.SetAutoPlayLabel(this.currentCost);

        if(this.currentCost == 0){
            EventManager.emit('StopAutoPlay');
        }
    }
    
    CheckStopIfMoneyDecreases(){
        if(this.stopIfMoneyDecreasesGroup.isOn){
            if(GameManager.Instance.currentMoney <= this.stopIfMoneyDecreasesGroup.currentMoney){
                EventManager.emit('StopAutoPlay');
            }
        }
    }
    CheckStopIfSingleWinExceeds(value){
        if(this.stopIfSingleWinExceedsGroup.isOn){
            if(value >= this.stopIfSingleWinExceedsGroup.currentMoney){
                EventManager.emit('StopAutoPlay');
            }
        }
    }
    
}
