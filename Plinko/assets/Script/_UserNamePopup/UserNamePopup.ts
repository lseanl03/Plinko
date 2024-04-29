// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../Manager/DataManager";
import PopupUIManager from "../Manager/PopupUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UserNamePopup extends cc.Component {
    
    minLength: number = 3;
    maxLength: number = 20; 

    @property(cc.Node)
    panel : cc.Node = null;

    @property(cc.Button)
    continueButton : cc.Button = null;

    @property(cc.EditBox)
    usernameEditBox : cc.EditBox = null;

    @property(cc.Label)
    infoLabel : cc.Label = null;

    protected onLoad(): void {
        this.continueButton.node.on('click', this.OnContinueButtonClick, this);
    }
    Init(){
        this.usernameEditBox.maxLength = this.maxLength;
    }

    OnContinueButtonClick(){
        if(this.TextValid()){
            DataManager.instance.CreateUsername();
        }

        else this.InfoEffect();
    }
    TextValid(){
        const text = this.usernameEditBox.string.trim(); 
        
        if (text.length >= this.minLength && text.length <= this.maxLength) {
            return true;
        } 
        return false;
    }

    InfoEffect(){
        this.infoLabel.node.position = new cc.Vec3(0, 0, 0);
        this.continueButton.interactable = false;
        cc.tween(this.infoLabel.node)
        .by(0.1, { position: new cc.Vec3(5, 5, 0) })
        .by(0.1, { position: new cc.Vec3(-10, -10, 0) })
        .by(0.1, { position: new cc.Vec3(10, 10, 0) })
        .by(0.1, { position: new cc.Vec3(-10, -10, 0) })
        .by(0.1, { position: new cc.Vec3(5, 5, 0) })
        .by(0.1, { position: new cc.Vec3(0, 0, 0) })
        .call(() => {
            this.continueButton.interactable = true;
        })
        .start();
    }
    UsernameEntering(){
        return this.usernameEditBox.string.trim();
    }
}
