// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../Button/ButtonBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartAutoButton extends ButtonBase {
    protected onLoad(): void {
        this.scaleActive = 1.02;
        super.onLoad();
    }
}
