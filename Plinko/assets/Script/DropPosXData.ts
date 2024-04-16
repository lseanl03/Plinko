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
        0: [-28, -43, -47],
        1: [1],
        2: [-24, -40, -49],
        3: [-12, -22, 3, -32, -41, -6],
        4: [0, 19, -21, -30, 6],
        5: [-10, -20, 12, 17, 20],
        6: [11, -17, 4, -45],
        7: [7, -7, 13, -13, -2],
        8: [14, -14, 15],
        9: [10, 18],
        10: [-11, -25, -3, -8, -9],
        11: [-33],
        12: [16],
    };
    public rewardToDropPosition14Ghim: { [key: number]: number[]} = {
        0: [-18, -43],
        1: [-1],
        2: [-38],
        3: [-10, 4],
        4: [-12, -20, -27, -8],
        5: [-16, 3, -3, -49],
        6: [13, 2, -28],
        7: [14, -26, -42],
        8: [6, 7, 0, 1],
        9: [-4, 7, 12],
        10: [-11, -21, -25],
        11: [11, -14, -2, 9],
        12: [-15, -19],
        13: [-32],
        14: [10],
    };
    public rewardToDropPosition16Ghim: { [key: number]: number[]} = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [-35, -36, -47],
        5: [0, -1, -12, -34],
        6: [-2, 1, -22, -27],
        7: [10, 13, -14, -2],
        8: [12, -18, -23, -38],
        9: [3, -3, -4, 9],
        10: [11, 14, 3, -5],
        11: [-16, -30, 4],
        12: [5],
        13: [],
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
