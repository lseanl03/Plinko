// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export enum GoldBuyType{
    none,
    gold_10000,
    gold_100000,
    gold_1000000

}

@ccclass
export default class ShopPopup extends cc.Component {
    @property(cc.Button)
    closeButton : cc.Button = null;

    @property(cc.Node)
    panel : cc.Node = null;
}
