// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../Button/ButtonBase";
import PopupUIManager from "../Manager/PopupUIManager";
import { ColorType } from "../Reward/RewardColorBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetColor2 extends cc.Component {

    isSelected : boolean = false;

    @property(cc.Sprite)
    selectStateSprite : cc.Sprite = null;

    @property({type: cc.Enum(ColorType)})
    colorType : ColorType = ColorType.none;

    protected onLoad(): void {
        this.node.on('click', this.OnButtonClick, this);
    }
    OnButtonClick(){
       PopupUIManager.Instance.betColorGroup.ChangeStateBetColor(this.colorType);
    }
}
