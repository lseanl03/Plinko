// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import EventManager from "../Manager/EventManager";
import { ColorType } from "../Reward/RewardColorBase";
import ButtonBase from "./ButtonBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetButton extends ButtonBase {

    @property({type: cc.Enum(ColorType)})
    public colorType : ColorType = ColorType.red;
    
    protected onLoad(): void {
        super.onLoad();
        
        this.AddListener();

        this.button = this.node.getComponent(cc.Button);

    }
    protected start(): void {
        this.Init();
    }
    Init(){
        this.ChangeState(false);
    }
    AddListener(){

        this.node.on('click', this.onButtonClick, this);

        EventManager.on('Play', this.ChangeState, this);
        EventManager.on('StartAutoPlay', this.OnStartAutoPlay, this);
    }

    onButtonClick(){
    }
    
    OnStartAutoPlay(){{
        this.ChangeState(false);
    }}

    ChangeState(state: boolean) {

        this.button.interactable = state;
        
        let hideColor = new cc.Color(150, 150, 150);
        let showColor = new cc.Color(255, 255, 255);
        
        this.node.color = state ? showColor = showColor : hideColor;
        
    }
}
