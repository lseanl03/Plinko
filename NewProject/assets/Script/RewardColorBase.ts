import GameManager from "./GameManager";
import Pool, { PoolType } from "./Pool";
import Spawner from "./Spawner";
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
    
    protected costLabel : cc.Label = null;
    protected overlaySprite : cc.Sprite = null;
    protected onLoad(): void {
        this.costLabel = this.node.getComponentInChildren(cc.Label);
        this.overlaySprite = this.node.getComponentInChildren(cc.Sprite);
        
        this.Init();
    }

    Init(){
        this.costLabel.string = "" + this.cost;
        if(this.cost < 1) this.overlaySprite.node.active = true;
        else this.overlaySprite.node.active = false;
    }
    UpdateReward(){
        this.EffectActive();
        var moneyReward = this.cost * GameManager.Instance.betLevelCurrent;

        GameManager.Instance.UpdateMoney(moneyReward);
        GameManager.Instance.GetRewardHistory(this.cost, this.node.color);

        //riel
        //Pool.Instance.SpawnRewardMoney(moneyReward, GameManager.Instance.circlePlayer.position);

        //test
        Pool.Instance.SpawnRewardMoney(moneyReward, cc.v3(0, 0, 0));
    }
    EffectActive(){
        cc.tween(this.node)
        .to(0.25, { scale: 0.7})
        .to(0.2, { scale: 1})
        .start();
    }
}
