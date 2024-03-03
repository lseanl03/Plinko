// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ColorType } from "./RewardColorBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetColor extends cc.Component {

    
    @property(cc.Color)
    public color : cc.Color = null;

    @property({type: cc.Enum(ColorType)})
    public colorType : ColorType = ColorType.red;
    
    protected onLoad(): void {
        
    }

}
