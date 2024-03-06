// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class DropPosXData{
    //key = id của reward 
    //trục y : 300
    //-25 to 25 (trừ 0)
    public rewardToDropPosition12Ghim: { [key: number]: number[]} = {
        0: [],
        1: [-20.3,-18.7,-14.5,-11.9],
        2: [14,-23,24,-3],
        3: [17, -24.7],
        4: [-1,12,5,-6,-7,8],
        5: [-11,16,-19,-2,-20,21],
        6: [13,-13,15,-15,18,-18],
        7: [11,-16,19,2,20,-21,-9],
        8: [1,-12,-5,6,7,-8],
        9: [-17, -24.4],
        10: [-24,-14,23],
        11: [-15.6, 1.1, 20.3],
        12: [],
    };
    public rewardToDropPosition14Ghim: { [key: number]: number[]} = {
        0: [],
        1: [-22,-16.1],
        2: [13,-7,-12.1],
        3: [-5,-24.2],
        4: [-12,14],
        5: [-16,18,19,-8],
        6: [1,-10,-17,-20,24,-6],
        7: [11,-11,15,-15,2,-2],
        8: [-1,10,17,20,-24,6],
        9: [16,-18,-19,8],
        10: [12,-14,7],
        11: [5,-20.9,-3.3],
        12: [-6.6,-3.5],
        13: [22],
        14: [],
    };
    public rewardToDropPosition16Ghim: { [key: number]: number[]} = {
        0: [],
        1: [],
        2: [],
        3: [-8.1,-16.6],
        4: [12,-15,6],
        5: [10,17,-22,-4],
        6: [-16,19,-3,-9],
        7: [-13,14,-18,20,-21],
        8: [-1,11,-11,23,-23],
        9: [-14,18,-20,8],
        10: [15,16,-19,3,9],
        11: [-10,-17,22,4],
        12: [-6],
        13: [-14.3,16.6],
        14: [15.7],
        15: [],
        16: [],
    };

    GetTypeRewardToDropPositionGhim(length : number){
        switch(length){
            case 12:
                return this.rewardToDropPosition12Ghim;
            case 14:
                return this.rewardToDropPosition14Ghim;
            case 16:
                return this.rewardToDropPosition16Ghim;
            default:
                return null;    
        }
    }
    
}
