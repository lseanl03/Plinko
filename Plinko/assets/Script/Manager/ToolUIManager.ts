// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./AudioManager";
import PopupUIManager from "./PopupUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ToolUIManager extends cc.Component {

    public static Instance : ToolUIManager = null;

    isVolumeOn : boolean = true;

    @property(cc.Button)
    exitButton : cc.Button = null;

    @property(cc.Button)
    tutorialButton : cc.Button = null;
    
    @property(cc.Button)
    historyButton : cc.Button = null;
    
    @property(cc.Button)
    rankButton : cc.Button = null;
    
    @property(cc.Button)
    volumeButton : cc.Button = null;
    
    @property(cc.Button)
    shopButton : cc.Button = null;



    @property(cc.SpriteFrame)
    volumeOnSprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    volumeOffSprite : cc.SpriteFrame = null;

    protected onLoad(): void {

        ToolUIManager.Instance = this;


        this.shopButton.node.on('click', this.OnShopClick, this);
        this.exitButton.node.on('click', this.OnExitClick, this);
        this.tutorialButton.node.on('click', this.OnTutorialClick, this);
        this.rankButton.node.on('click', this.OnTopBetClick, this);
        this.historyButton.node.on('click', this.OnHistoryClick, this);
        this.volumeButton.node.on('click', this.OnVolumeClick, this);
    }
    OnExitClick(){
        cc.game.end();
    }
    OnTutorialClick(){
        PopupUIManager.Instance.ShowTutorialPopup();
    }
    OnTopBetClick(){
        PopupUIManager.Instance.ShowTopBetPopup();
    }
    OnHistoryClick(){
        PopupUIManager.Instance.ShowHistoryPopup();
    }
    OnShopClick(){
        PopupUIManager.Instance.ShowShopPopup();
    }
    OnVolumeClick(){
        this.isVolumeOn = !this.isVolumeOn;
        AudioManager.Instance.MuteState(this.isVolumeOn);
        if(this.isVolumeOn){
            this.volumeButton.getComponent(cc.Sprite).spriteFrame = this.volumeOnSprite;
        }else{
            this.volumeButton.getComponent(cc.Sprite).spriteFrame = this.volumeOffSprite;
        }
    }
}
