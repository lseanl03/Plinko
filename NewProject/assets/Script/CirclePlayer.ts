import { ColorType } from "./RewardColorBase";
const {ccclass, property} = cc._decorator;

@ccclass
export default class CirclePlayer extends cc.Component {

    colorType : ColorType = ColorType.red;
    public posX : number = 0;

    protected onLoad(): void {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true;

    }

    public GetPosX(value : number){
        this.posX = value;
    }
    public GetInfo(color : cc.Color, type : ColorType){
        this.ChangeColor(color);
        this.ChangeColorType(type);
    }
    public ChangeColor(color : cc.Color){
        this.node.color = color;
    }
    public ChangeColorType(type : ColorType){
        this.colorType = type;
    }

    
}

