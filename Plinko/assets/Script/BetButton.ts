// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "./ButtonBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetButton extends ButtonBase {

    @property(cc.Node)
    shadow: cc.Node = null;

    protected override Active(): void {
        this.shadow.active = false;
    }
    protected override Deactive(): void {
        this.shadow.active = true;
    }
}
