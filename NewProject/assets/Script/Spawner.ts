// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BetColor from "./BetColor";
import CirclePlayer from "./CirclePlayer";
import GameManager from "./GameManager";
import Pool, { PoolType } from "./Pool";
import Reward2 from "./Reward2";
import RewardMoney from "./RewardMoney";

const {ccclass, property} = cc._decorator;
const random = (min, max) => {
    return Math.random() * (max - min) + min
}
@ccclass
export default class Spawner extends cc.Component {


    public rewardToDropPosition: { [key: number]: number[]} = {
        //key = id của reward 
        //x random:  -25 đến 25
        //trục y : 300
        0: [-24.6],
        1: [-24.5, -23.4, 3.4],
        2: [-22],
        3: [-19, -5, 6],
        4: [-24, -8, 0, 1, 9, 23],
        5: [-25, -23, -16, -14, -11, 4, 20],
        6: [-20, -17, -9, -2, -1, 3, 5, 12, 14, 17],
        7: [-3, 8, 11, 19],
        8: [-21, -15, -13, -12, -10, -7, -6, 25],
        9: [-18, -4, 2, 7, 13, 15, 16, 18, 21, 22],
        10: [10, 24, 2.1, 7.2],
        11: [-2.8],
    };

    private timer : number = 1;

    public id : number = 0;

    public isSpawned : boolean = false;

    @property(cc.Node)
    spawnPoint: cc.Node = null;

    //UI

    @property(BetColor)
    greenBet : BetColor = null;
    
    @property(BetColor)
    orangeBet : BetColor = null;
    
    @property(BetColor)
    redBet : BetColor = null;

    
    @property (cc.Canvas)
    canvas : cc.Canvas = null;
    
    @property(cc.Node)
    rewardGroup: cc.Node = null;
    
    @property([Reward2])
    rewardList : Reward2[] = [];


    //singleton
    static Instance : Spawner;

    onLoad () {
        Spawner.Instance = this;

        var greenBetButton = this.greenBet.getComponent(cc.Button);
        var orangeBetButton = this.orangeBet.getComponent(cc.Button);
        var redBetButton = this.redBet.getComponent(cc.Button);

        greenBetButton.node.on('click', this.onGreenBetButtonClick, this);
        orangeBetButton.node.on('click', this.onOrangeBetButtonClick, this);
        redBetButton.node.on('click', this.onRedBetButtonClick, this);


        for(var i = 0; i < this.rewardGroup.childrenCount; i++){
            var reward = this.rewardGroup.children[i].getComponent(Reward2);
            this.rewardList.push(reward);
        }
        this.SetRewardID();
    }

    onGreenBetButtonClick(){
        this.SpawnCirclePlayer(this.greenBet);
    }
    onOrangeBetButtonClick(){
        this.SpawnCirclePlayer(this.orangeBet);
    }
    onRedBetButtonClick(){
        this.SpawnCirclePlayer(this.redBet);
    }
    // protected update(dt: number): void {
    //     this.timer -= dt;
    //     if(this.timer <=0){
    //         this.SpawnCirclePlayer(this.greenBet);
    //         this.timer = 1;
    //     }
    // }

    SpawnCirclePlayer(betColor : BetColor){
        if(GameManager.Instance.circlePlayer != null) return;

        if(!GameManager.Instance.MoneyEnough()){
            return;
        }
        //this.circlePlayer = cc.instantiate(this.circlePlayerPrefab); 
        GameManager.Instance.circlePlayer = Pool.Instance.spawn(PoolType.CirclePlayer);

        GameManager.Instance.circlePlayer.setParent(this.canvas.node);     

        this.spawnPoint.position = cc.v3(this.GetRewardPosition(), this.spawnPoint.y, this.spawnPoint.z);

        //test spawn
        //this.spawnPoint.position = cc.v3(this.spawnPoint.position.x + 0.1, this.spawnPoint.y, this.spawnPoint.z);
        
        GameManager.Instance.circlePlayer.position = this.spawnPoint.position;

        console.log("vi tri spawn player: " + GameManager.Instance.circlePlayer.position.x);

        this.SetCirclePlayerInfo(betColor);


        GameManager.Instance.BetButtonState(false);
        GameManager.Instance.BetMoney(GameManager.Instance.betLevelCurrent);

    }
    SetCirclePlayerInfo(betColor : BetColor){
        var player = GameManager.Instance.circlePlayer.getComponent(CirclePlayer);       
        player.GetInfo(betColor.color, betColor.colorType);
        player.GetPosX(this.spawnPoint.position.x);
    }  
    public SetRewardID(){
        this.id = Math.floor(random(0, this.rewardList.length -1));
        console.log("roi vao o thu: " + this.id);
    }
    public GetRewardPosition(){
        var rewardID = this.rewardToDropPosition[this.id];
        var randomIndex = Math.floor(random(0, rewardID.length));
        console.log("vi tri spawn: " + rewardID[randomIndex]);
        return rewardID[randomIndex];
    }

}
