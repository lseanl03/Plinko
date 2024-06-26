// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import StopIfMoneyDecreasesGroup from "./StopIfMoneyDecreasesGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StopIfSingleWinExceedsGroup extends StopIfMoneyDecreasesGroup {
    protected onLoad(): void {

        this.isOn = true;

        super.onLoad();
    }
}
