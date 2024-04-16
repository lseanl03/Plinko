// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import SpawnerTest from "./Manager/Spawner";
import { ColorType } from "./Reward/RewardColorBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoneyPopup extends cc.Component {

    tween : cc.Tween= null;
    offsetPos : cc.Vec3 = new cc.Vec3(0,0,0);
    @property(cc.Label)
    public label : cc.Label = null;

    protected onLoad(): void {
        this.node.active = false;

        this.offsetPos = this.node.position;
    }

    SetLabelColor(color : cc.Color){
        this.label.node.color = color;
    }
    protected onEnable(): void {

        this.node.opacity = 100;
        this.node.scale = 1;
        this.node.position = this.offsetPos;
                
        this.tween = cc.tween(this.node)
        .to(0.5, {opacity: 255, position: cc.v3(this.node.position.x, this.node.position.y + 50, 0)}, { easing: 'quintOut'})
        .to(0.3, {opacity: 0})
        .call(() => {
            this.node.active = false;          
        })
        .start();
        
    }
    protected onDisable(): void {
        if(this.tween != null){
            this.tween.stop();
        }
    }
}
