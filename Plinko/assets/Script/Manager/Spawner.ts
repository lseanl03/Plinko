// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BetColor from "../BetColor";
import CirclePlayer from "../CirclePlayer";
import DropPosXData from "../DropPosXData";
import GameManager from "./GameManager";
import PoolManager, { PoolType } from "./PoolManager";

import Reward2 from "../Reward2";
import RewardGroup from "../RewardGroup";
import UIManager from "./GameplayUIManager";
import GameplayUIManagerUIManager from "./GameplayUIManager";
import GameplayUIManager from "./GameplayUIManager";

const {ccclass, property} = cc._decorator;
const random = (min, max) => {
    return Math.random() * (max - min) + min
}
@ccclass
export default class Spawner extends cc.Component {

    public dropPosXData : DropPosXData;

    private timer : number = 1;
    private indexTest : number = 0;

    public id : number = 0;

    public isSpawned : boolean = false;
    public canSpawn : boolean = true;

    @property(cc.Node)
    spawnPoint: cc.Node = null;

    public circlePlayer : cc.Node = null;   

    //UI

    @property(BetColor)
    greenBet : BetColor = null;
    
    @property(BetColor)
    orangeBet : BetColor = null;
    
    @property(BetColor)
    redBet : BetColor = null;

    
    @property (cc.Canvas)
    canvas : cc.Canvas = null;
    
    rewardGroup: RewardGroup = null;
    
    //singleton
    static Instance : Spawner;

    onLoad () {
        Spawner.Instance = this;
        this.dropPosXData = new DropPosXData();
        var greenBetButton = this.greenBet.getComponent(cc.Button);
        var orangeBetButton = this.orangeBet.getComponent(cc.Button);
        var redBetButton = this.redBet.getComponent(cc.Button);

        greenBetButton.node.on('click', this.onGreenBetButtonClick, this);
        orangeBetButton.node.on('click', this.onOrangeBetButtonClick, this);
        redBetButton.node.on('click', this.onRedBetButtonClick, this);

        //this.SetRewardID();
    }

    onGreenBetButtonClick(){
        this.SpawnCirclePlayer(this.greenBet);
    }
    onOrangeBetButtonClick(){
        this.SpawnCirclePlayer(this.orangeBet);
    }
    onRedBetButtonClick(){
        this.SpawnCirclePlayer(this.redBet);

        //test
        //this.indexTest = this.indexTest + 1;
    }

    protected update(dt: number): void {
        if(!this.canSpawn){
            this.timer -= dt;
            if(this.timer <=0){
                //this.SpawnCirclePlayer(this.greenBet);              
                this.canSpawn = true;
            }
        }
    }

    SpawnCirclePlayer(betColor : BetColor){
        if(!this.canSpawn || !GameManager.Instance.MoneyEnough()) return;

        this.circlePlayer = PoolManager.Instance.spawn(PoolType.CirclePlayer);

        this.circlePlayer.setParent(this.canvas.node);     

        //riel
        this.spawnPoint.position = cc.v3(this.GetRewardPosition(), this.spawnPoint.y, this.spawnPoint.z);

        //test
        //this.spawnPoint.position = cc.v3(this.spawnPoint.position.x + 0.1, this.spawnPoint.y, this.spawnPoint.z);
        
        this.SetCirclePlayerInfo(betColor);
        
        GameplayUIManager.Instance.BetButtonState(false);
        GameManager.Instance.GhimLevelButtonState(false);
        this.circlePlayer.position = this.spawnPoint.position;
        GameManager.Instance.BetMoney(GameManager.Instance.currentBetLevel);
        this.timer = 1;
        this.canSpawn = false;
        this.SetRewardID();

    }
    SetCirclePlayerInfo(betColor : BetColor){
        var player = this.circlePlayer.getComponent(CirclePlayer);       
        player.GetInfo(betColor.color, betColor.colorType);
        player.GetPosX(this.spawnPoint.position.x);
        player.GetSize(this.rewardGroup.node.childrenCount -1);
    }  
    public SetRewardID(){
        var length = this.rewardGroup.node.childrenCount -1;
        var rewardToDropPosition = this.dropPosXData.GetTypeRewardToDropPositionGhim(length);
        do{
            this.id = Math.floor(random(0, this.rewardGroup.node.childrenCount -1));
            var ID = rewardToDropPosition[this.id];    
        }while(ID.length == 0)

        console.log("tiep theo roi vao o: " + this.id);
    }
    public GetRewardPosition(){
        var length = this.rewardGroup.node.childrenCount -1;

        var rewardToDropPosition = this.dropPosXData.GetTypeRewardToDropPositionGhim(length);

        var rewardID = rewardToDropPosition[this.id];

        var randomIndex = Math.floor(random(0, rewardID.length -1));
        console.log("vi tri spawn: " + rewardID[randomIndex]);
        return rewardID[randomIndex];
    }
    
}
