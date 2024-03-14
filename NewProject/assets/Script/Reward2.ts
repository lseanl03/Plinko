// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html


import GameManager from "./Manager/GameManager";
import CirclePlayer from "./CirclePlayer";
import SpawnerTest from "./Manager/Spawner";
import RewardColorBase, { ColorType } from "./RewardColorBase";
import PoolManager, { PoolType } from "./Manager/PoolManager";
import Spawner from "./Manager/Spawner";
import GameplayUIManager from "./Manager/GameplayUIManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Reward2 extends cc.Component {

    @property
    public id : number = 0;

    @property(cc.Label)
    posLabel : cc.Label = null;

    @property (RewardColorBase)
    green: RewardColorBase = null;

    @property (RewardColorBase)
    orange: RewardColorBase = null;

    @property (RewardColorBase)
    red: RewardColorBase = null;

    protected onLoad(): void {
        this.id = this.node.getSiblingIndex();
        this.posLabel.string = "";
        
        //this.posLabel.string = "" + this.id;
    }
    public HandleRewardWithColor(colorType: ColorType){
        if(colorType == ColorType.green){
            this.green.UpdateReward();
        }
        else if(colorType == ColorType.orange){
            this.orange.UpdateReward();
        }
        else if(colorType == ColorType.red){
            this.red.UpdateReward();
        }
        
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        console.log("collision");
        if(otherCollider.tag == 0){
            var player = otherCollider.getComponent(CirclePlayer);

            if(player != null){
                this.HandleRewardWithColor(player.colorType);
                //riel
                //console.log(this.id + " id" + " | "+ (player.posX + " posX"));
                
                //test
                // if(this.id >= 13 || this.id <= 3)
                // console.log(this.id + " id" + " | "+ (player.posX + " posX"));
                
            }
            PoolManager.Instance.recycle(player.node, PoolType.CirclePlayer);
            this.HandleAfterDestroyPlayer();
        }
    }

    HandleAfterDestroyPlayer(){
        GameManager.Instance.GhimLevelButtonState(true);
        GameplayUIManager.Instance.BetButtonState(true);
    }
    
}
