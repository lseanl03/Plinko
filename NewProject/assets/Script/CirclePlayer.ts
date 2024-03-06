import { ColorType } from "./RewardColorBase";
const {ccclass, property} = cc._decorator;

@ccclass
export default class CirclePlayer extends cc.Component {

    //24 radius == 8
    //22 radius == 7
    //20 radius == 6
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
    public GetSize(size : number){
        switch(size){
            case 12:
                this.node.scale = 1.3;
                break;
            case 14:
                this.node.scale = 1.1;
                break;
            case 16:
                this.node.scale = 1;
                break;
        
        }
    }
    public ChangeColor(color : cc.Color){
        this.node.color = color;
    }
    public ChangeColorType(type : ColorType){
        this.colorType = type;
    }

    
}

