import BetColor from "./BetColor";
import ConsumeMoney from "./ConsumeMoney";
import ConsumeMoneyLabel from "./ConsumeMoney";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    public betLevelCurrent : number = 10000;
    public minBetLevel : number = 10000;
    public maxBetLevel : number = 1000000;

    public currentMoney : number = 1000000;

    public circlePlayer : cc.Node = null;
    
    public static Instance :GameManager = null;

    //UI

    @property (cc.Label)
    betLevelLabel : cc.Label = null;

    @property (cc.Label)
    moneyLabel : cc.Label = null;

    @property (cc.Button)
    subButton : cc.Button =  null;    
    @property (cc.Button)
    sumButton : cc.Button = null;
    
    @property (cc.Button)
    subMinButton : cc.Button = null;
    @property (cc.Button)
    sumMaxButton : cc.Button = null;

    @property (cc.Node)
    rewardGroup : cc.Node = null;

    @property (ConsumeMoney)
    consumeMoney : ConsumeMoney = null;

    protected onLoad(): void {
        GameManager.Instance = this;

        this.subButton.node.on('click', this.onSubButtonClick, this);
        this.sumButton.node.on('click', this.onSumButtonClick, this);
        
        this.subMinButton.node.on('click', this.onSubMinButtonClick, this);
        this.sumMaxButton.node.on('click', this.onSumMaxButtonClick, this);
        //this.CheckReward();
    }

    protected start(): void {
        this.Init();
    }

    Init(){
        this.betLevelLabel.string = "" + this.betLevelCurrent;
        this.moneyLabel.string = "" + this.currentMoney;
    }

    onSubButtonClick(){
        this.UpdateBetLevel(-10000);
    }
    onSumButtonClick(){
        this.UpdateBetLevel(10000);
    }

    onSubMinButtonClick(){
        this.UpdateBetLevel(-this.maxBetLevel);
    }
    onSumMaxButtonClick(){
        this.UpdateBetLevel(this.maxBetLevel - this.betLevelCurrent);
    }

    public UpdateMoney(value: number){
        this.currentMoney += value;
        this.moneyLabel.string = "" + this.currentMoney;
    }

    public BetMoney(value : number){
        if(value > this.currentMoney) return;
        this.currentMoney -= value;
        this.moneyLabel.string = "" + this.currentMoney;

        this.consumeMoney.node.active = true;
        this.consumeMoney.label.string = "-" + value;
    }

    public UpdateBetLevel(value : number){
        if(this.betLevelCurrent < this.minBetLevel || this.betLevelCurrent > this.maxBetLevel) return;

        this.betLevelCurrent += value;

        if(this.betLevelCurrent <= this.minBetLevel) this.betLevelCurrent = this.minBetLevel;
        else if(this.betLevelCurrent >= this.currentMoney) this.betLevelCurrent = this.currentMoney;

        this.betLevelLabel.string = "" + this.betLevelCurrent;
    }

    public BetButtonState(state : boolean){
        this.subButton.interactable = state;
        this.sumButton.interactable = state;

        this.subMinButton.interactable = state;
        this.sumMaxButton.interactable = state;
    }

    public MoneyEnough(){
        return this.currentMoney >= this.betLevelCurrent;
    }
    
}
