

import ButtonBase from "./ButtonBase";
import GameManager from "./GameManager";
import { GhimType } from "./GhimController";
import GhimLevelSelect from "./GhimLevelSelect";
import GhimLevelView from "./GhimLevelView";
import Spawner from "./Spawner";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhimLevel extends ButtonBase {
    
    isSelect: boolean = false;

    overlaySprite : cc.Sprite = null;
    label: cc.Label = null;

    @property({type: cc.Enum(GhimType)})
    public ghimType : GhimType = GhimType.ghim_0;

    protected onLoad(): void {

        super.onLoad();

        this.label = this.getComponentInChildren(cc.Label);
        this.overlaySprite = this.getComponentInChildren(cc.Sprite);
        this.GhimLevelText(this.ghimType);

        this.node.on('click', this.onClick, this);

    }

    public GhimLevelText = (ghimLevel: number) => { this.label.string = "" + ghimLevel};

    onClick(){
        GameManager.Instance.SwitchGhimLevel(this.ghimType);
    }
}
