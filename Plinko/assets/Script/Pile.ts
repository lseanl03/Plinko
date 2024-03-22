import CirclePlayer from "./CirclePlayer";
import PoolManager, { PoolType } from "./Manager/PoolManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pile extends cc.Component {

    private timer : number = 1;

    protected onLoad(): void {
        this.node.getComponent(cc.RigidBody).enabledContactListener = true;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true;
    }
    protected update(dt: number): void {
        if(this.timer >= 0){
            this.timer -= dt;
        }
    }
    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {

        if(this.timer <= 0){
            PoolManager.Instance.SpawnPileEffect(this.node);

            cc.tween(this.node)
            .to(0.25, { color: otherCollider.node.color})
            .to(0.75, { color: cc.Color.WHITE})
            .start();

            this.timer = 1;
        }
    }
}

