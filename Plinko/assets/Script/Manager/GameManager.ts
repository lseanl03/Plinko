import GhimController, { GhimType } from "../Ghim/GhimController";
import GhimLevelSelect from "../Ghim/GhimLevelSelect";
import GhimLevelView from "../Ghim/GhimLevelView";
import RewardHistory from "../Reward/RewardHistory";
import EventManager from "./EventManager";
import GameplayUIManager from "./GameplayUIManager";
import Spawner from "./Spawner";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    public static Instance :GameManager = null;

    isBetting : boolean = false;
    public currentBetLevel : number = 10000;
    public minBetLevel : number = 10000;
    public maxBetLevel : number = 1000000;
    public currentMoney : number = 1000000;


    @property(GhimController)
    ghimControllerList: GhimController[] = [];

    @property (cc.Prefab)
    rewardHistoryPrefab : cc.Prefab = null;

    @property (GhimLevelView)
    ghimLevelView : GhimLevelView = null;

    @property (GhimLevelSelect)
    ghimLevelSelect : GhimLevelSelect = null;


    protected onLoad(): void {
        GameManager.Instance = this;
        this.AddListener();
    }

    protected start(): void {
        this.Init();        
    }
    AddListener(){
        EventManager.on('SpawnCirclePlayer', this.OnSpawnCirclePlayer, this);
        EventManager.on('DestroyCirclePlayer', this.OnDestroyCirclePlayer, this);
        EventManager.on('StartAutoPlay', this.OnStartAutoPlay, this);

    }
    Init(){
        this.SwitchGhimLevel(GhimType.ghim_16);
    }
    OnStartAutoPlay(){
        this.ghimLevelSelect.node.active = false;
        this.GhimLevelButtonState(false);
    }

    OnSpawnCirclePlayer(){
        this.isBetting = true;
        this.GhimLevelButtonState(false);
        this.BetMoney(this.currentBetLevel);
    }
    OnDestroyCirclePlayer(){
        this.isBetting = false;
        this.GhimLevelButtonState(true);
    }


    public UpdateMoney(value: number){
        this.currentMoney += value;
        GameplayUIManager.Instance.SetCurrentMoneyLabel(this.currentMoney);
        GameplayUIManager.Instance.CurrentMoneyEffect();
    }

    public BetMoney(value : number){
        if(value > this.currentMoney) return;
        this.currentMoney -= value;

        GameplayUIManager.Instance.SetCurrentMoneyLabel(this.currentMoney);
    }

    UpdateCurrentBetLevel(value : number){
        if(this.isBetting) return;

        this.currentBetLevel = value;

        if(!this.MoneyEnough()) this.CheckCurrentBetLevel();
        if(this.currentBetLevel < this.minBetLevel) this.currentBetLevel = this.minBetLevel;
        if(this.currentBetLevel > this.maxBetLevel) this.currentBetLevel = this.maxBetLevel;

        
        GameplayUIManager.Instance.SetCurrentBetLevelLabel(this.currentBetLevel);
    }

    CheckCurrentBetLevel(){
        do{
            this.currentBetLevel /= 2;      
            if(this.currentBetLevel <= this.minBetLevel) break;  
        }while(!this.MoneyEnough());
    }

    public MoneyEnough(){
        return this.currentMoney >= this.currentBetLevel;
    }
    
    public SwitchGhimLevel(ghimType : GhimType){

        this.ghimLevelSelect.CheckGhimLevel(ghimType);

        for(let i = 0; i < this.ghimControllerList.length; i++){
            let ghimController = this.ghimControllerList[i];

            if(ghimController.ghimType != ghimType){
                ghimController.node.active = false;
            }
            else{
                ghimController.node.active = true;
            }
        }
    }
    // public GetRewardHistory(cost: number, color: cc.Color){
    //     var rewardHistoryOnView = cc.instantiate(this.rewardHistoryPrefab);
    //     rewardHistoryOnView.setParent(GameplayUIManager.Instance.rewardHistoryViewHolder);
    //     rewardHistoryOnView.setSiblingIndex(0);
    //     rewardHistoryOnView.getComponent(RewardHistory).GetInfo(cost, color);
    //     rewardHistoryOnView.getComponent(RewardHistory).Anim();

    //     if(GameplayUIManager.Instance.rewardHistoryViewHolder.childrenCount >= 15){
    //         GameplayUIManager.Instance.rewardHistoryViewHolder.children[GameplayUIManager.Instance.rewardHistoryViewHolder.childrenCount - 1].destroy();
    //     }
        
    //     var rewardHistoryOnList = cc.instantiate(this.rewardHistoryPrefab);
    //     rewardHistoryOnList.setParent(GameplayUIManager.Instance.rewardHistoryListHolder);
    //     rewardHistoryOnList.setSiblingIndex(0);
    //     rewardHistoryOnList.getComponent(RewardHistory).GetInfo(cost, color);
       
    //     if(GameplayUIManager.Instance.rewardHistoryListHolder.childrenCount >= 15){
    //         GameplayUIManager.Instance.rewardHistoryListHolder.children[GameplayUIManager.Instance.rewardHistoryListHolder.childrenCount - 1].destroy();
    //     }
    // }

    public GhimLevelButtonState(state : boolean){
        this.ghimLevelView.button.interactable = state;
    }
}
