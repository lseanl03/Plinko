// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    static Instance : AudioManager = null;

    isMute : boolean = false;

    @property(cc.AudioSource)
    backGroundMusic: cc.AudioSource = null;

    @property(cc.AudioSource)
    pileCollisionSound: cc.AudioSource = null;

    @property(cc.AudioSource)
    rewardSound: cc.AudioSource = null;


    protected onLoad(): void {
        AudioManager.Instance = this;
    }


    PlayBackgroundMusic(){
        this.backGroundMusic.play();
    }

    PlayPileCollisionSound(){
        this.pileCollisionSound.play();
    }

    PlayRewardSound(){
        this.rewardSound.play();
    }

    MuteState(state : boolean){
        this.isMute = !state;
        this.backGroundMusic.mute = this.isMute;
        this.rewardSound.mute = this.isMute;
        //this.pileCollisionSound.mute = this.isMute;
    }

}