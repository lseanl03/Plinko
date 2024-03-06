// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardHistory extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    public GetInfo(cost: number, color: cc.Color){
        this.node.color = color;
        this.label.string = cost.toString();
    }
}
