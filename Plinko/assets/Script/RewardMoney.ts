// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PoolManager, { PoolType } from "./Manager/PoolManager";





const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardMoney extends cc.Component {

    @property(cc.Label)
    public label : cc.Label = null;

    protected onEnable(): void {
        this.node.scale = 1;
        this.node.position = cc.v3(0, 0, 0);
        
        cc.tween(this.node)
        .to(0.25, {opacity: 255, position: cc.v3(this.node.x, this.node.y + 20, this.node.z)})
        .to(0.5, {scale: 0.5})
        .call(() => {
            PoolManager.Instance.recycle(this.node, PoolType.RewardMoney);
        })
        .start();
    }
    public SetColor(color : cc.Color){
        this.node.color = color;
    }
}
