// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../Manager/GameManager";
import Reward2 from "../Reward/Reward2";
import RewardGroup from "../Reward/RewardGroup";


export enum GhimType {
    ghim_0 = 0,
    ghim_12 = 12,
    ghim_14 = 14,
    ghim_16 = 16,
}
const {ccclass, property} = cc._decorator;

@ccclass
export default class GhimController extends cc.Component {
    @property({type: cc.Enum(GhimType)})
    public ghimType : GhimType = GhimType.ghim_0;

    protected onEnable(): void {
        console.log("Ghim " +this.ghimType + " active");
        GameManager.Instance.ghimLevelView.GhimLevelState(this.ghimType);
    }
}
