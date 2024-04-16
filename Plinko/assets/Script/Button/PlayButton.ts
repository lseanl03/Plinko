// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import EventManager from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import Spawner from "../Manager/Spawner";
import ButtonBase from "./ButtonBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayButton extends ButtonBase {

    isOn : boolean = false;
    button : cc.Button = null;

    @property(cc.Sprite)
    sprite : cc.Sprite = null;

    @property(cc.SpriteFrame)
    onSprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    offSprite: cc.SpriteFrame = null;

    

    protected onLoad(): void {
        super.onLoad();

        this.AddListener();

    }
    protected start(): void {
        this.Init();        
    }

    Init(){
        this.button = this.node.getComponent(cc.Button);
        
        if(!this.isOn) this.onButtonClick();
    }
    AddListener(){
        this.node.on('click', this.onButtonClick, this);

        EventManager.on('Play', this.OnPlay, this);
        EventManager.on('SpawnCirclePlayer', this.OnSpawnCirclePlayer, this);
        EventManager.on('DestroyCirclePlayer', this.OnDestroyCirclePlayer, this);
        EventManager.on('StartAutoPlay', this.OnStartAutoPlay, this);

    }
    OnStartAutoPlay(){
        this.ButtonState(false);
    }
    OnDestroyCirclePlayer(){
        
        this.ButtonState(true);
    }
    OnSpawnCirclePlayer(){
        this.ButtonState(false);
    }

    OnPlay(){
        this.isOn = !this.isOn;
        this.sprite.spriteFrame = this.isOn ? this.onSprite : this.offSprite;        
    }
    protected onButtonClick(){
        if(GameManager.Instance.isBetting) return;

        EventManager.emit('Play', this.isOn);
    }
    ButtonState(state : boolean){

        this.button.interactable = state;

        let hideColor = new cc.Color(150, 150, 150);
        let showColor = new cc.Color(255, 255, 255);
        
        this.sprite.node.color = state ? showColor = showColor : hideColor;
    }
}
