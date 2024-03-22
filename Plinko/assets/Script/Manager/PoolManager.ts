// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import RewardMoney from "../RewardMoney";


const {ccclass, property} = cc._decorator;

//add more
export enum PoolType {
    CirclePlayer = 0,
    RewardMoney = 1,
    PileEffect = 2,
}
@ccclass
export default class PoolManager extends cc.Component {

    @property(cc.Prefab)
    circlePlayer: cc.Prefab = null;

    @property(cc.Prefab)
    rewardMoney: cc.Prefab = null;

    @property(cc.Prefab)
    pileEffect: cc.Prefab = null;

    public pools: {[key in PoolType]?: cc.NodePool} = {};

    public static Instance : PoolManager = null;

    onLoad() {

        PoolManager.Instance = this;

    }
    
    public spawn(poolType: PoolType) {
        var node;
        var pool = this.pools[poolType];
        if (pool && pool.size() > 0) { 
            node = pool.get();
        } 
        else { 
            //add more
            switch(poolType) {
                case PoolType.CirclePlayer:
                    node = cc.instantiate(this.circlePlayer);
                    break;
                case PoolType.RewardMoney:
                    node = cc.instantiate(this.rewardMoney);
                    break;
                case PoolType.PileEffect:
                    node = cc.instantiate(this.pileEffect);
                    break;
                    
            }
            this.pools[poolType] = new cc.NodePool();
        }
        return node;
    }
    public recycle(node: cc.Node, poolType: PoolType) {
        var pool = this.pools[poolType];
        if (pool) {
            pool.put(node);
        }
    }

    public SpawnRewardMoney(value : number, node : cc.Node){
        var reward = this.spawn(PoolType.RewardMoney);
        reward.setParent(node.parent.parent.parent);
        reward.color = node.color;
        var rewardMoney = reward.getComponent(RewardMoney);
        rewardMoney.label.string = "+" + value.toString();    
    }

    public SpawnPileEffect(pileNode : cc.Node){
        var pileEffect = this.spawn(PoolType.PileEffect);
        pileEffect.setParent(pileNode);
    }
}