// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { GoldBuyType } from "./ShopPopup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GoldBuy extends cc.Component {

    @property({type: cc.Enum(GoldBuyType)})
    goldBuyType : GoldBuyType = GoldBuyType.none;

    @property(cc.Sprite)
    goldSprite : cc.Sprite = null;

    @property(cc.Button)
    buyButton : cc.Button = null;

    @property(cc.Label)
    priceLabel : cc.Label = null;

    price : number = 0;

    protected onLoad(): void {
        this.node.on('click', this.OnBuyClick, this);
    }

    OnBuyClick(){
        console.log(this.price);
    }

    protected start(): void {
        this.Init();
    }

    Init(){
        this.SetPrice();
    }

    SetPrice(){
        switch(this.goldBuyType){
            case GoldBuyType.gold_10000:
                this.price = 99999;
                break;
            case GoldBuyType.gold_100000:
                this.price = 999999;
                break;
            case GoldBuyType.gold_1000000:
                this.price = 9999999;
                break;
        }

        this.priceLabel.string = this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}
