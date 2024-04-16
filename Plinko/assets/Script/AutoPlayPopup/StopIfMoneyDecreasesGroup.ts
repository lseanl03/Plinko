// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class StopIfMoneyDecreasesGroup extends cc.Component {


    currentMoney : number = 0;
    isOn : boolean = false;

    @property(cc.SpriteFrame)
    toggleOnSprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    toggleOffSprite : cc.SpriteFrame = null;

    
    @property(cc.Label)
    moneyLabel : cc.Label = null;
    
    @property(cc.Button)
    toggleButton : cc.Button = null;
    
    @property(cc.Button)
    subMoneyButton : cc.Button = null;

    @property(cc.Button)
    sumMoneyButton : cc.Button = null;

    protected onLoad(): void {
        this.subMoneyButton.node.on('click', this.OnSubMoney, this);
        this.sumMoneyButton.node.on('click', this.OnSumMoney, this);
        this.toggleButton.node.on('click', this.OnToggle, this);
        this.SetMoneyLabel(0);
        this.OnToggle();

    }

    OnToggle(){
        this.isOn = !this.isOn;

        var toggleSprite =  this.toggleButton.node.getComponent(cc.Sprite);
        toggleSprite.spriteFrame = this.isOn ? this.toggleOnSprite : this.toggleOffSprite;
    }
    OnSubMoney(){
        this.SetMoneyLabel(this.currentMoney - 10000);
    }
    OnSumMoney(){
        this.SetMoneyLabel(this.currentMoney + 10000);
    }
    SetMoneyLabel(value : number){

        if(value < 0){
            this.currentMoney = 0; 
            return;
        } 
        
        this.currentMoney = value;
        this.moneyLabel.string = this.currentMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
