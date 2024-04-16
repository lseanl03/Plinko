// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PopupUIManager from "../Manager/PopupUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AutoPlayPopup extends cc.Component {

    public numberOfAutoPlay : number = 0;
    public stopIfMoneyDecreaseBy : number = 0;
    public stopIfSingleWinExceedsGroup : number = 0;


    @property(cc.Button)
    closeButton : cc.Button = null;

    @property(cc.Node)
    panel : cc.Node = null;

    @property(cc.Button)
    startAutoButton : cc.Button = null;
}
