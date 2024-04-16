// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../Button/ButtonBase";
import StateManager from "../Manager/StateManager";
import { GhimType } from "./GhimController";
import GhimLevelSelect from "./GhimLevelSelect";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhimLevelView extends cc.Component {

    button: cc.Button = null;
    sprite: cc.Sprite = null;

    @property(cc.SpriteFrame)
    ghim12Sprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    ghim14Sprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    ghim16Sprite: cc.SpriteFrame = null;

    @property(GhimLevelSelect)
    ghimLevelSelect: GhimLevelSelect = null;

    protected onLoad(): void {
        
        this.button = this.getComponent(cc.Button);
        this.sprite = this.getComponent(cc.Sprite);

        this.node.on('click', this.onClick, this);
    }

    public GhimLevelState(ghimType : GhimType){
        switch(ghimType){
            case GhimType.ghim_12: this.sprite.spriteFrame = this.ghim12Sprite; break;
            case GhimType.ghim_14: this.sprite.spriteFrame = this.ghim14Sprite; break;
            case GhimType.ghim_16: this.sprite.spriteFrame = this.ghim16Sprite; break;
        }
    }
    
    onClick() {
        StateManager.Instance.ChangeStateNodeOnClick(this.ghimLevelSelect.node);    

        this.ghimLevelSelect.node.active = !this.ghimLevelSelect.node.active;

    }

}
