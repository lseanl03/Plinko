// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { GhimType } from "./GhimController";
import GhimLevel from "./GhimLevel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhimLevelSelect extends cc.Component {

    @property(cc.Node)
    ghimLevelHolder: cc.Node = null;

    @property([GhimLevel])
    public ghimLevelList: GhimLevel[] = [];

    public CheckGhimLevel(ghimType: GhimType){
        for(var i = 0; i < this.ghimLevelList.length; i++){
            var ghimLevel = this.ghimLevelList[i];
            if(ghimLevel.ghimType == ghimType){
                ghimLevel.isSelect = true;
                ghimLevel.overlaySprite.node.active = false;
            }
            else{
                ghimLevel.isSelect = false;
                ghimLevel.overlaySprite.node.active = true;
            }
        }
        this.ghimLevelHolder.active = false;
    }        
}
