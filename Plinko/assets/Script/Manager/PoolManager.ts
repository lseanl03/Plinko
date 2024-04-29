// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

//add more
export enum PoolType {
    CirclePlayer,
    History,
    TopBet
}
@ccclass
export default class PoolManager extends cc.Component {

    @property(cc.Prefab)
    circlePlayer: cc.Prefab = null;

    @property(cc.Prefab)
    history: cc.Prefab = null;

    @property(cc.Prefab)
    topBet: cc.Prefab = null;

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
            node.active = true;
        } 
        else { 
            //add more
            switch(poolType) {
                case PoolType.CirclePlayer:
                    node = cc.instantiate(this.circlePlayer);
                    break;
                case PoolType.History:
                    node = cc.instantiate(this.history);
                    break;
                case PoolType.TopBet:
                    node = cc.instantiate(this.topBet);
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
            node.active = false;
        }
    }
}