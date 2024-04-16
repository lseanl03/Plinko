// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TopBetPopup extends cc.Component {


    @property(cc.SpriteFrame)
    top1Sprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    top2Sprite : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    top3Sprite : cc.SpriteFrame = null;

    @property(cc.Button)
    closeButton : cc.Button = null;

    @property(cc.Node)
    panel : cc.Node = null;

    @property(cc.Node)
    topBetHolder : cc.Node = null;

    GetNumberOfHisory(){
        return this.topBetHolder.children.length;
    }

}
