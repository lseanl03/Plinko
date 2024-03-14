// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TutorialGameplayButton extends ButtonBase {

    @property(cc.Node)
    tutorialPanel : cc.Node = null;

    @property(cc.Node)
    tutorialBg : cc.Node = null;

    protected onLoad(): void {
        this.tutorialBg.active = false;
        this.tutorialPanel.active = false;
        
        super.onLoad();
        this.node.on('click', this.onButtonClick, this);

    }
    onButtonClick(){
        
        this.tutorialBg.active = true;
        this.tutorialPanel.active = true;
        this.tutorialPanel.position = cc.v3(0, 200, 0);
        this.tutorialPanel.opacity = 0;
        
        this.buttonState(false);

        cc.tween(this.tutorialPanel)
        .to(0.2, { position: cc.v3(0, 0, 0), opacity: 255})
        .call(() => {
            this.buttonState(true);
        })
        .start();
    }
}
