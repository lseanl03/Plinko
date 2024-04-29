// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CirclePlayer from "../CirclePlayer";
import DropPosXData from "../DropPosXData";
import GameManager from "./GameManager";
import PoolManager, { PoolType } from "./PoolManager";

import UIManager from "./GameplayUIManager";
import GameplayUIManagerUIManager from "./GameplayUIManager";
import GameplayUIManager from "./GameplayUIManager";
import BetButton from "../Button/BetButton";
import RewardGroup from "../Reward/RewardGroup";
import EventManager from "./EventManager";
import { ColorType } from "../Reward/RewardColorBase";
import PopupUIManager from "./PopupUIManager";

const {ccclass, property} = cc._decorator;
const random = (min, max) => {
    return Math.random() * (max - min) + min
}
@ccclass
export default class Spawner extends cc.Component {

    public dropPosXData : DropPosXData;

    private timer : number = 0.5;
    private indexTest : number = 0;

    public id : number = 0;
    public rewardGroup: RewardGroup = null;

    public isAutoPlay : boolean = false;
    public canSpawn : boolean = true;

    @property(cc.Node)
    spawnPoint: cc.Node = null;

    public circlePlayer : cc.Node = null;   

    //UI

    @property(BetButton)
    yellowBet : BetButton = null;

    @property(BetButton)
    greenBet : BetButton = null;

    
    @property(BetButton)
    redBet : BetButton = null;

    @property (cc.Canvas)
    canvas : cc.Canvas = null;

    @property(cc.Color)
    public greenColor : cc.Color = null;
    @property(cc.Color)
    public yellowColor : cc.Color = null;
    @property(cc.Color)
    public redColor : cc.Color = null;
    
    
    //singleton
    static Instance : Spawner;

    onLoad () {
        Spawner.Instance = this;

        this.dropPosXData = new DropPosXData();

        this.greenBet.node.on('click', this.onGreenBetButtonClick, this);
        this.yellowBet.node.on('click', this.onOrangeBetButtonClick, this);
        this.redBet.node.on('click', this.onRedBetButtonClick, this);

        this.AddListener();
    }

    AddListener(){
        EventManager.on('SpawnCirclePlayer', this.OnSpawnCirclePlayer, this);
        EventManager.on('DestroyCirclePlayer', this.OnDestroyCirclePlayer, this);
        EventManager.on('StartAutoPlay', this.OnStartAutoPlay, this);
        EventManager.on('StopAutoPlay', this.OnStopAutoPlay, this);
    }
    OnStartAutoPlay(){
        this.isAutoPlay = true;
        this.canSpawn = false;
    }

    OnStopAutoPlay(){
        this.isAutoPlay = false;
        this.canSpawn = false;
    }

    OnSpawnCirclePlayer(){
        this.timer = 0.5;
        this.canSpawn = false;
        this.SetRewardID();
    }
    OnDestroyCirclePlayer(){
    }
    
    onGreenBetButtonClick(){
        this.SpawnCirclePlayer(this.greenBet);
    }
    onOrangeBetButtonClick(){
        this.SpawnCirclePlayer(this.yellowBet);
    }
    onRedBetButtonClick(){
        this.SpawnCirclePlayer(this.redBet);

        //test
        //this.indexTest = this.indexTest + 1;
    }

    protected update(dt: number): void {

        if(this.isAutoPlay){
            if(!this.canSpawn){
                this.timer -= dt;
                if(this.timer <=0){
                    this.canSpawn = true;
                    this.SpawnCirclePlayer(this.GetRandomColorBet());  
                    PopupUIManager.Instance.UpdateCurrentCost();
                    PopupUIManager.Instance.CheckStopIfMoneyDecreases();
                }
            }
        }
        else{
            if(!this.canSpawn){
                this.timer -= dt;
                if(this.timer <=0){
                    this.canSpawn = true;
                }
            }
        }
    }

    SpawnCirclePlayer(betColor : BetButton){

        if(!this.canSpawn || !GameManager.Instance.MoneyEnough()) return;
        
        this.circlePlayer = PoolManager.Instance.spawn(PoolType.CirclePlayer);

        this.circlePlayer.setParent(this.canvas.node); 
        this.circlePlayer.setSiblingIndex(this.spawnPoint.getSiblingIndex() + 1);    

        
        //riel
        this.spawnPoint.position = cc.v3(this.GetRewardPosition(), this.spawnPoint.y, this.spawnPoint.z);
        
        //test
        //this.spawnPoint.position = cc.v3((this.spawnPoint.position.x + 1).toFixed(2), this.spawnPoint.y, this.spawnPoint.z);
        
        this.circlePlayer.position = this.spawnPoint.position;
        this.SetCirclePlayerInfo(betColor);    

        EventManager.emit('SpawnCirclePlayer');

    }
    SetCirclePlayerInfo(betColor : BetButton){
        var player = this.circlePlayer.getComponent(CirclePlayer);      
        player.GetIDTarget(this.id); 
        player.GetInfo(betColor.colorType);
        player.GetPosX(this.spawnPoint.position.x);
        player.GetSize(this.rewardGroup.node.childrenCount -1);
        player.GetCurrentColor(this.GetColor(betColor.colorType));
        player.GetBetMoney(GameManager.Instance.currentBetLevel);
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

        //cc.log("vi tri spawn: " + rewardID[randomIndex]);
        
        return rewardID[randomIndex];
    }

    GetColor(colorType : ColorType){
        if(colorType == ColorType.green){
            return this.greenColor;
        }
        else if(colorType == ColorType.yellow){
            return this.yellowColor;
        }
        else if(colorType == ColorType.red){
            return this.redColor;
        }
    }
    GetRandomColorBet(){
        var randomIndex = Math.floor(random(0, PopupUIManager.Instance.betColorList.length));
        var betColor = PopupUIManager.Instance.betColorList[randomIndex];

        if(betColor.colorType == ColorType.green){
            return this.greenBet;
        }
        else if(betColor.colorType == ColorType.yellow){
            return this.yellowBet;
        }
        else if(betColor.colorType == ColorType.red){
            return this.redBet;

        }


    }
}
