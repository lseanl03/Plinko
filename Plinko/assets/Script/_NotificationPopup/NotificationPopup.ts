// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PopupUIManager from "../Manager/PopupUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NotificationPopup extends cc.Component {

    @property(cc.Button)
    closeButton : cc.Button = null;

    @property(cc.Node)
    panel : cc.Node = null;

    @property(cc.Label)
    notificationTitle : cc.Label = null;

    @property(cc.Label)
    usernameLabel : cc.Label = null;

    @property(cc.SpriteFrame)
    retrySprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    completeSprite : cc.SpriteFrame = null;

    @property(cc.Color)
    retryColor : cc.Color = null;

    @property(cc.Color)
    completeColor : cc.Color = null;

    isComplete : boolean = false;

    NotificationState(state : boolean, username : string){

        this.isComplete = state;
        this.notificationTitle.node.color = state ? this.completeColor : this.retryColor;
        this.closeButton.getComponent(cc.Sprite).spriteFrame = state ? this.completeSprite : this.retrySprite;

        if(state){
            
            this.SetNotificationTitle("Username của bạn là:");
            this.SetUsernameLabel(username, true);
        }
        else{
            this.SetNotificationTitle("Username đã tồn tại");
            this.SetUsernameLabel("", false);
        }
    }

    SetUsernameLabel(username : string, state : boolean){
        this.usernameLabel.node.active = state ? true : false;
        this.usernameLabel.string = username;
    }

    SetNotificationTitle(title : string){
        this.notificationTitle.string = title;
    }

}
