import { ColorType } from "./Reward/RewardColorBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CirclePlayer extends cc.Component {

    //24 radius == 8
    //22 radius == 7
    //20 radius == 6
    
    public idTarget : number = 0;
    public posX : number = 0;
    colorType : ColorType = ColorType.none;
    sprite : cc.Sprite = null;  
    currentColor : cc.Color = null;
    betMoney : number = 0;

    @property(cc.SpriteFrame)
    greenCircle : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    yellowCircle : cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    redCircle : cc.SpriteFrame = null;

    protected onLoad(): void {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true;

        this.sprite = this.node.getComponent(cc.Sprite);

    }

    public GetIDTarget(id : number){
        this.idTarget = id;
    }
    public GetBetMoney(money : number){
        this.betMoney = money;
    }
    public GetPosX(value : number){
        this.posX = value;
    }
    public GetInfo(type : ColorType){
        this.ChangeColor(type);
        this.ChangeColorType(type);
    }
    public GetCurrentColor(color : cc.Color){
        this.currentColor = color;
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
    public ChangeColor(colorType : ColorType){
        switch(colorType){
            case ColorType.green:
                this.sprite.spriteFrame = this.greenCircle;
                break;
            case ColorType.yellow:
                this.sprite.spriteFrame = this.yellowCircle;
                break;
            case ColorType.red:
                this.sprite.spriteFrame = this.redCircle;
                break;
        
        }
    }
    public ChangeColorType(type : ColorType){
        this.colorType = type;
    }

    
}

