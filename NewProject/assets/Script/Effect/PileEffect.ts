// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PoolManager, { PoolType } from "../Manager/PoolManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PileEffect extends cc.Component {
    protected onEnable(): void {
        this.node.opacity = 200;
        this.node.scale = 1;
        this.node.position = cc.v3(0, 0, 0);
        
        cc.tween(this.node)
        .to(0.25, {opacity: 0, scale: 5})
        .call(() => {
            PoolManager.Instance.recycle(this.node, PoolType.PileEffect);
        })
        .start();
    }
}
