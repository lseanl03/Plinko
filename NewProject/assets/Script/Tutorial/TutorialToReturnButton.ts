// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TutorialToReturnButton extends ButtonBase {
    
        @property(cc.Node)
        tutorialPanel : cc.Node = null;

        @property(cc.Node)
        tutorialBg : cc.Node = null;
    
        protected onLoad(): void {
            super.onLoad();
            this.node.on('click', this.onButtonClick, this);
        }
        onButtonClick(){

            this.buttonState(false);
            cc.tween(this.tutorialPanel)
            .to(0.2, { position: cc.v3(0, -50, 0)})
            .to(0.2, { position: cc.v3(0, 200, 0), opacity: 0})
            .call(() => {
                this.tutorialPanel.active = false;
                this.tutorialBg.active = false;
                this.buttonState(true);
            })
            .start();
        }
}
