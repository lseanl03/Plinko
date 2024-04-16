// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import EventManager from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import PopupUIManager from "../Manager/PopupUIManager";
import Spawner from "../Manager/Spawner";
import StateManager from "../Manager/StateManager";
import ButtonBase from "./ButtonBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AutoPlayButton extends ButtonBase {

    isAuto : boolean = false;
    button : cc.Button = null;

    @property(cc.Sprite)
    sprite : cc.Sprite = null;

    @property(cc.SpriteFrame)
    onSprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    offSprite: cc.SpriteFrame = null;

    @property(cc.Label)
    autoPlayLabel : cc.Label = null;

    

    protected onLoad(): void {
        super.onLoad();

        this.AddListener();

    }
    protected start(): void {
        this.Init();        
    }

    Init(){
        this.button = this.node.getComponent(cc.Button);
        this.autoPlayLabel.node.active = false;
        
    }
    AddListener(){
        EventManager.on('Play', this.ChangeState, this);


        EventManager.on('SpawnCirclePlayer', this.OnSpawnCirclePlayer, this);
        EventManager.on('DestroyCirclePlayer', this.OnDestroyCirclePlayer, this);
        EventManager.on('StartAutoPlay', this.OnStartAutoPlay, this);
        EventManager.on('StopAutoPlay', this.OnStopAutoPlay, this);

    }
    ChangeState(state: boolean) {
        this.ButtonState(!state);
    }

    OnDestroyCirclePlayer(){
        //this.ButtonState(true);
    }
    OnSpawnCirclePlayer(){
        //this.ButtonState(false);
    }
    OnStopAutoPlay(){
        this.isAuto = false;
        this.sprite.spriteFrame = this.onSprite;
        this.autoPlayLabel.node.active = false;
    }

    OnStartAutoPlay(){
        this.isAuto = true;
        this.sprite.spriteFrame = this.offSprite;        

        this.autoPlayLabel.node.active = true;
        this.SetAutoPlayLabel(PopupUIManager.Instance.currentCost);
    }
    ButtonState(state : boolean){

        this.button.interactable = state;

        let hideColor = new cc.Color(150, 150, 150);
        let showColor = new cc.Color(255, 255, 255);
        
        this.sprite.node.color = state ? showColor = showColor : hideColor;
    }
    SetAutoPlayLabel(value : number){
        this.autoPlayLabel.string = value.toString();
    }
}
