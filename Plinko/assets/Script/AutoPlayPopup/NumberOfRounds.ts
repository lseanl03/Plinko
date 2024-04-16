// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PopupUIManager from "../Manager/PopupUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NumberOfRounds extends cc.Component {

    isSelected : boolean = false;
    @property
    cost : number = 0;

    @property(cc.Sprite)
    selectStateSprite : cc.Sprite = null;

    @property(cc.Label)
    numberOfRoundsLabel : cc.Label = null;

    protected onLoad(): void {
        this.node.on('click', this.OnButtonClick, this);

        this.SetNumbersOfRoundsLabelInit();
    }
    SetNumbersOfRoundsLabelInit(){
        this.numberOfRoundsLabel.string = "" + this.cost.toString();
    }
    OnButtonClick(){
        PopupUIManager.Instance.numberOfRoundsGroup.ChangeStateNumberOfRounds(this);
    }
}
