// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../Button/ButtonBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RankingUIButton extends ButtonBase {

    @property(cc.Node)
    panel : cc.Node = null;

    @property(cc.Node)
    toReturnButton : cc.Node = null;

        protected onLoad(): void {
            super.onLoad();
            this.node.on('click', this.onButtonClick, this);
        }
    
        onButtonClick(){
            this.buttonState(false);

            this.panel.scale = 0;
            this.panel.active = true;

            this.toReturnButton.scale = 0;
            this.toReturnButton.opacity = 0;

            cc.tween(this.panel)
            .to(0.2, {scale: 1.1})
            .to(0.1, {scale: 1})
            .call(() => {
                this.rankingToReturnButtonEffect();
                this.buttonState(true);
            })
            .start();
        }

        rankingToReturnButtonEffect(){

            cc.tween(this.toReturnButton)
            .to(0.1, {scale: 1.1, opacity: 255})
            .to(0.1, {scale: 1})
            .start();
        }   
}
