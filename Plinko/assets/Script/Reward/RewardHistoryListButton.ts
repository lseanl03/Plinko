// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../Button/ButtonBase";
import StateManager from "../Manager/StateManager";



const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardHistoryListButton extends ButtonBase {
    @property(cc.Node)
    rewardHistoryList: cc.Node = null;

    protected onLoad(): void {

        super.onLoad();

        this.node.on('click', this.onClick, this);

        this.rewardHistoryList.active = false;
    }
    onClick() {
        this.rewardHistoryList.active = !this.rewardHistoryList.active;
    }
    // protected override ChangeStateNode(): void {
    //     StateManager.Instance.ChangeStateNodeOnClick(this.rewardHistoryList);    
    // }
}
