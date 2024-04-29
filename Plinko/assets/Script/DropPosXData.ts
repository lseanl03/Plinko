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
    //trục y : 400
    //-25 to 25 (trừ 0)
    public rewardToDropPosition12Ghim: { [key: number]: number[]} = {
        0: [], //-28, -43, -47
        1: [], //1
        2: [-24, -40, -49],
        3: [-12, -22, 3],
        4: [19, -21, -30],
        5: [-10, -20, 12],
        6: [11, -17, -45],
        7: [13],
        8: [14, -14, 15],
        9: [10, 18],
        10: [-11, -25, -3],
        11: [-33], //-33
        12: [], //16
    };
    public rewardToDropPosition14Ghim: { [key: number]: number[]} = {
        0: [], //-18, -43
        1: [], //-1
        2: [-38],
        3: [-10, 4],
        4: [-12, -20, -8],
        5: [-16, 3, -49],
        6: [13, 2, -28],
        7: [14, -26, -42],
        8: [6, 7, 0, 1],
        9: [-4, 12],
        10: [-11, -21, -25],
        11: [11, -14, 9],
        12: [-15, -19],
        13: [], //-32
        14: [], //10
    };
    public rewardToDropPosition16Ghim: { [key: number]: number[]} = {
        0: [],
        1: [],
        2: [],
        3: [-35],
        4: [-47, 0],
        5: [-42, -38],
        6: [-32, -3, 5],
        7: [-49, 3],
        8: [-46, -28, 4],
        9: [-40, -33],
        10: [-5],
        11: [-36, -29],
        12: [-1, 6],
        13: [-23],
        14: [],
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
