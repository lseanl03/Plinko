// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankingView extends cc.Component {
    @property(cc.Sprite)
    iconView : cc.Sprite = null;
    @property(cc.Label)
    labelView : cc.Label = null;

    SetActive(isTop1_2_3 : boolean){
        if(isTop1_2_3){
            this.iconView.node.active = true;
            this.labelView.node.active = false;
        }
        else{
            this.iconView.node.active = false;
            this.labelView.node.active = true;
        }
    }
}
