// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../Button/ButtonBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RankingToReturnButton extends ButtonBase {
    
    @property(cc.Node)
    panel : cc.Node = null;

        protected onLoad(): void {
            super.onLoad();
            this.node.on('click', this.onReturnButtonClick, this);
        }
    
        onReturnButtonClick(){

            this.buttonState(false);

            cc.tween(this.panel)
            .to(0.1, {scale: 1.1})
            .to(0.2, {scale: 0})
            .call(() => {
                this.panel.active = false;
                this.buttonState(true);
            })
            .start();
        }


}
