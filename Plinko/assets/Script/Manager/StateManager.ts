// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class StateManager extends cc.Component {

    @property([cc.Node])
    public nodeList: cc.Node[] = [];

    public static Instance :StateManager = null;

    protected onLoad(): void {
        StateManager.Instance = this;
    }

    public ChangeStateNodeOnClick(self : cc.Node){
        for (let i = 0; i < this.nodeList.length; i++) {
            var element = this.nodeList[i];
            if(element.active && element != self){
                element.active = false;
            }
        }
    }
}
