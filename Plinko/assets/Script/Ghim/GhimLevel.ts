

import ButtonBase from "../Button/ButtonBase";
import GameManager from "../Manager/GameManager";
import { GhimType } from "./GhimController";
import GhimLevelSelect from "./GhimLevelSelect";
import GhimLevelView from "./GhimLevelView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhimLevel extends ButtonBase {
    
    isSelect: boolean = false;

    @property({type: cc.Enum(GhimType)})
    public ghimType : GhimType = GhimType.ghim_0;

    protected onLoad(): void {

        super.onLoad();

        this.node.on('click', this.onClick, this);

    }

    onClick(){
        GameManager.Instance.SwitchGhimLevel(this.ghimType);
    }
}
