// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EventManager extends cc.Component {

    private static eventEmitter: cc.EventTarget = new cc.EventTarget();

    static on(eventName: string, callback: Function, target?: any) {
        this.eventEmitter.on(eventName, callback, target);
    }

    static off(eventName: string, callback?: Function, target?: any) {
        this.eventEmitter.off(eventName, callback, target);
    }

    static emit(eventName: string, ...args: any[]) {
        this.eventEmitter.emit(eventName, ...args);
    }
}
