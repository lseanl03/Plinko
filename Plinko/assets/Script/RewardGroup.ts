// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Reward2 from "./Reward2";
import Spawner from "./Manager/Spawner";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardGroup extends cc.Component {
    
    @property({type: [Reward2]})
    rewardList : Reward2[] = [];

    protected onLoad(): void {
        for(var i = 0; i < this.node.childrenCount; i++){
            var reward = this.node.children[i].getComponent(Reward2);
            this.rewardList.push(reward);
        }
    }

    protected onEnable(): void {
        Spawner.Instance.rewardGroup = this;
        Spawner.Instance.SetRewardID();
    }
}
