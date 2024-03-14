import ConsumeMoney from "../ConsumeMoney";
import GhimController, { GhimType } from "../GhimController";
import GhimLevelSelect from "../GhimLevelSelect";
import GhimLevelView from "../GhimLevelView";
import RewardHistory from "../RewardHistory";
import GameplayUIManager from "./GameplayUIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    public static Instance :GameManager = null;

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
    }

    protected start(): void {
        this.Init();
    }

    Init(){
        this.SwitchGhimLevel(GhimType.ghim_12);

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

        GameplayUIManager.Instance.ConsumeMoneyState(true);
        GameplayUIManager.Instance.SetConsumeMoneyLabel(value);
    }

    public UpdateBetLevel(value : number){

        this.currentBetLevel += value;

        if(this.currentBetLevel <= this.minBetLevel) this.currentBetLevel = this.minBetLevel;
        else if(this.currentBetLevel >= this.maxBetLevel) this.currentBetLevel = this.maxBetLevel
        else if(this.currentBetLevel >= this.currentMoney) this.currentBetLevel = this.currentMoney;

        GameplayUIManager.Instance.SetCurrentBetLevelLabel(this.currentBetLevel);
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
    public GetRewardHistory(cost: number, color: cc.Color){
        var rewardHistoryOnView = cc.instantiate(this.rewardHistoryPrefab);
        rewardHistoryOnView.setParent(GameplayUIManager.Instance.rewardHistoryViewHolder);
        rewardHistoryOnView.setSiblingIndex(0);
        rewardHistoryOnView.getComponent(RewardHistory).GetInfo(cost, color);
        rewardHistoryOnView.getComponent(RewardHistory).Anim();

        if(GameplayUIManager.Instance.rewardHistoryViewHolder.childrenCount >= 15){
            GameplayUIManager.Instance.rewardHistoryViewHolder.children[GameplayUIManager.Instance.rewardHistoryViewHolder.childrenCount - 1].destroy();
        }
        
        var rewardHistoryOnList = cc.instantiate(this.rewardHistoryPrefab);
        rewardHistoryOnList.setParent(GameplayUIManager.Instance.rewardHistoryListHolder);
        rewardHistoryOnList.setSiblingIndex(0);
        rewardHistoryOnList.getComponent(RewardHistory).GetInfo(cost, color);
       
        if(GameplayUIManager.Instance.rewardHistoryListHolder.childrenCount >= 15){
            GameplayUIManager.Instance.rewardHistoryListHolder.children[GameplayUIManager.Instance.rewardHistoryListHolder.childrenCount - 1].destroy();
        }
    }

    public GhimLevelButtonState(state : boolean){
        this.ghimLevelView.button.interactable = state;
    }
}
