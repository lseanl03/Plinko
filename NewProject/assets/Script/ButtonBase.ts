// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import StateManager from "./StateManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonBase extends cc.Component {

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);

    }

    protected ChangeStateNode(){
        StateManager.Instance.ChangeStateNodeOnClick(this.node);
    }
    private onMouseEnter(event: cc.Event.EventMouse): void {
        cc.tween(this.node)
        .to(0.1, {scale: 1.05})
        .start();
    }

    private onMouseLeave(event: cc.Event.EventMouse): void {
        cc.tween(this.node)
        .to(0.1, {scale: 1})
        .start();
    }

    private onMouseDown(event: cc.Event.EventMouse): void {
        cc.tween(this.node)
        .to(0.1, {scale: 0.95})
        .start();
    }
    private onMouseUp(event: cc.Event.EventMouse): void {
        cc.tween(this.node)
        .to(0.1, {scale: 1})
        .start();
        this.ChangeStateNode();
    }
}
