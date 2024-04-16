import CirclePlayer from "./CirclePlayer";
import PoolManager, { PoolType } from "./Manager/PoolManager";
import Spawner from "./Manager/Spawner";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pile extends cc.Component {

    canEffect: boolean = true;

    @property(cc.Node)
    pileEffect: cc.Node = null;

    protected onLoad(): void {
        this.node.getComponent(cc.RigidBody).enabledContactListener = true;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true;
    }
    protected update(dt: number): void {
    }
    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {

        if(!this.canEffect) return;

        this.canEffect = false;
        this.pileEffect.active = true;
        this.pileEffect.opacity = 200;
        this.pileEffect.scale = 1;

        var player = otherCollider.getComponent(CirclePlayer);

        cc.tween(this.pileEffect)
        .to(0.4, { color: player.currentColor})
        .to(0.1, { color: cc.Color.WHITE})
        .start();

        cc.tween(this.pileEffect)
        .to(0.5, {opacity: 0, scale: 3})
        .call(() => {
            this.pileEffect.active = false;
            this.canEffect = true;
        })
        .start();
    }
}

