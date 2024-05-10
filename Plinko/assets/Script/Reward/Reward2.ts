// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CirclePlayer from "../CirclePlayer";
import AudioManager from "../Manager/AudioManager";
import EventManager from "../Manager/EventManager";
import GameManager from "../Manager/GameManager";
import GameplayUIManager from "../Manager/GameplayUIManager";
import PoolManager, { PoolType } from "../Manager/PoolManager";
import Spawner from "../Manager/Spawner";
import RewardColorBase, { ColorType } from "./RewardColorBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Reward2 extends cc.Component {

    public id : number = 0;

    @property
    greenCost : number = 0;
    @property
    yellowCost : number = 0;
    @property
    redCost : number = 0;

    @property(cc.Label)
    posLabel : cc.Label = null;

    @property (RewardColorBase)
    green: RewardColorBase = null;

    @property (RewardColorBase)
    yellow: RewardColorBase = null;

    @property (RewardColorBase)
    red: RewardColorBase = null;

    protected onLoad(): void {
        // this.posLabel.node.active = true;
        // this.posLabel.string = "" + this.id;
        // this.posLabel.node.height = 8;
        // this.posLabel.fontSize = 10;
        // this.posLabel.lineHeight = 8;
        
        this.id = this.node.getSiblingIndex();
        this.Init();
    }

    Init(){
        this.green.cost = this.greenCost;
        this.yellow.cost = this.yellowCost;
        this.red.cost = this.redCost;

        this.green.Init();
        this.yellow.Init();
        this.red.Init();
    }
    public HandleRewardWithColor(colorType: ColorType, betMoney: number){
        if(colorType == ColorType.green){
            this.green.UpdateReward(betMoney);
        }
        else if(colorType == ColorType.yellow){
            this.yellow.UpdateReward(betMoney);
        }
        else if(colorType == ColorType.red){
            this.red.UpdateReward(betMoney);
        }
        
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        //console.log("collision");
        if(otherCollider.tag == 0){
            var player = otherCollider.getComponent(CirclePlayer);

            if(player != null){
                AudioManager.Instance.PlayRewardSound();
                this.HandleRewardWithColor(player.colorType, player.betMoney);
                //riel
                //if(this.id != player.idTarget)
                //console.log("id rớt: " +this.id + " | " + "is cần rớt: "+ player.idTarget + " | "+ player.posX + " posX");
                
                //test
                //if(this.id >= 16 || this.id <= 0)
                //console.log(this.id + " id" + " | "+ (player.posX + " posX"));
                
            }
            PoolManager.Instance.recycle(player.node, PoolType.CirclePlayer);
            this.HandleAfterDestroyPlayer();
        }
    }

    HandleAfterDestroyPlayer(){
        if(!Spawner.Instance.circlePlayer.active){
            EventManager.emit('DestroyCirclePlayer');
        }
    }
    
}
