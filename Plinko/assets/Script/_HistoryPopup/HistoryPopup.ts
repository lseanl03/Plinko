// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryPopup extends cc.Component {

    @property(cc.Button)
    closeButton : cc.Button = null;

    @property(cc.Node)
    panel : cc.Node = null;

    @property(cc.Node)
    historyHolder : cc.Node = null;

    GetNumberOfHisory(){
        return this.historyHolder.children.length;
    }
}
