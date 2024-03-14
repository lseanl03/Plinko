// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankingUIButton extends ButtonBase {

    @property(cc.Node)
    rankingPanel : cc.Node = null;

    @property(cc.Node)
    rankingToReturnButton : cc.Node = null;

        protected onLoad(): void {
            super.onLoad();
            this.node.on('click', this.onButtonClick, this);
        }
    
        onButtonClick(){
            this.buttonState(false);

            this.rankingPanel.scale = 0;
            this.rankingPanel.active = true;

            this.rankingToReturnButton.scale = 0;

            cc.tween(this.rankingPanel)
            .to(0.2, {scale: 1.1})
            .to(0.1, {scale: 1})
            .call(() => {
                this.rankingToReturnButtonEffect();
                this.buttonState(true);
            })
            .start();
        }

        rankingToReturnButtonEffect(){
            cc.tween(this.rankingToReturnButton)
            .to(0.3, {scale: 0})
            .to(0.1, {scale: 1.1})
            .to(0.1, {scale: 1})
            .start();
        }   
}
