// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import RewardMoney from "./RewardMoney";
import SpawnerTest from "./Spawner";

const {ccclass, property} = cc._decorator;
export enum PoolType {
    CirclePlayer = 0,
    RewardMoney = 1,
}
@ccclass
export default class Pool extends cc.Component {
    @property(cc.Prefab)
    circlePlayer: cc.Prefab = null;

    @property(cc.Prefab)
    rewardMoney: cc.Prefab = null;

    @property (cc.Canvas)
    canvas : cc.Canvas = null

    // @property (SpawnerTest)
    // spawner : SpawnerTest = null;

    private pools: {[key in PoolType]?: cc.NodePool} = {};

    public static Instance : Pool = null;

    onLoad() {
        Pool.Instance = this;

        this.pools[PoolType.CirclePlayer] = new cc.NodePool();
        this.pools[PoolType.RewardMoney] = new cc.NodePool();
    }
    public spawn(poolType: PoolType) {
        let node;
        let pool = this.pools[poolType];
        if (pool && pool.size() > 0) { 
            node = pool.get();
        } else { 
            switch(poolType) {
                case PoolType.CirclePlayer:
                    node = cc.instantiate(this.circlePlayer);
                    break;
                case PoolType.RewardMoney:
                    node = cc.instantiate(this.rewardMoney);
                    break;
            }
        }
        return node;
    }
    public recycle(node: cc.Node, poolType: PoolType) {
        let pool = this.pools[poolType];
        if (pool) {
            pool.put(node);
        }
    }

    public SpawnRewardMoney(value : number, pos : cc.Vec3){
        var reward = this.spawn(PoolType.RewardMoney);
        reward.setParent(this.canvas.node);
        reward.position = pos;

        var rewardMoney = reward.getComponent(RewardMoney);
        rewardMoney.label.string = "+" + value.toString();    
    }
}