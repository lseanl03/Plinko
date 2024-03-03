
const {ccclass, property} = cc._decorator;

@ccclass
export default class Pile extends cc.Component {

    protected onLoad(): void {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true;
    }
    
}

