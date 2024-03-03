import GameManager from "./GameManager";
import Pool, { PoolType } from "./Pool";
import SpawnerTest from "./Spawner";

export enum ColorType{
    none = 0,
    green = 1,
    orange = 2,
    red = 3
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardColorBase extends cc.Component {

    @property
    protected cost : number = 0;

    protected onLoad(): void {
        var costLabel = this.node.getComponentInChildren(cc.Label);
        costLabel.string = "" + this.cost;
    }

    UpdateReward(){
        this.EffectActive();
        var moneyReward = this.cost * GameManager.Instance.betLevelCurrent;
        GameManager.Instance.UpdateMoney(moneyReward);
        //Pool.Instance.SpawnRewardMoney(moneyReward, Pool.Instance.spawner.circlePlayer.position);
        cc.log(SpawnerTest.Instance);
    }
    EffectActive(){
        cc.tween(this.node)
        .to(0.25, { scale: 0.7})
        .to(0.2, { scale: 1})
        .start();
    }
}
