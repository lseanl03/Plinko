// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardHistory extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    overlay: cc.Node = null;

    public Anim(): void {
        this.label.node.scale = 0;

        let labelTween = cc.tween(this.label.node)
        .to(0.5, {scale: 1})
        .start();

        this.overlay.scale = 0;
        let overlayTween = cc.tween(this.overlay)
        .to(0.5, {scale: 1})
        .start();

        var heighTemp = this.node.height;
        var widthTemp = this.node.width;
        this.node.height = this.node.width = 0;

        let node = cc.tween(this.node)
        .to(0.5, {height: heighTemp, width: widthTemp, })
        .start();


    }
    public GetInfo(cost: number, color: cc.Color){
        this.node.color = color;
        this.label.string = cost.toString();
        if(cost < 1){
            this.overlay.active = true;
        }
    }
}