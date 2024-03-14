// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "./ButtonBase";
import { GhimType } from "./GhimController";
import GhimLevelSelect from "./GhimLevelSelect";
import StateManager from "./Manager/StateManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhimLevelView extends ButtonBase {

    label: cc.Label = null;
    button: cc.Button = null;

    @property(cc.Node)
    ghimLevelHolder: cc.Node = null;

    protected onLoad(): void {
        
        super.onLoad();

        this.label = this.getComponentInChildren(cc.Label);
        this.button = this.getComponent(cc.Button);

        this.node.on('click', this.onClick, this);
    }
    
    protected override ChangeStateNode(): void {
        StateManager.Instance.ChangeStateNodeOnClick(this.ghimLevelHolder);    
    }

    public GhimLevelText(ghimType : GhimType){
        this.label.string = "Ghim: " + ghimType.valueOf();
    }
    
    onClick() {
        this.ghimLevelHolder.active = !this.ghimLevelHolder.active;

    }

}
