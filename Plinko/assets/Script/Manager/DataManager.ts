import GameManager from "./GameManager";
import PopupUIManager from "./PopupUIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class DataManager extends cc.Component {

    static instance: DataManager = null;

    nickName : string = 'null'; 
    host : string = "https://apigame.agaming.studio/v1/csa/"; 

    protected onLoad(): void {
        DataManager.instance = this;

        this.Init();
    }

    Init(){

        this.GetUser();
        this.GetMoneyLocalData();
        this.GetMyTopLocalData();

    }
    
    //Local
    
    // ClearDataLocal(){
        
    //     this.RemoveLocalData('nickname');
    //     this.RemoveLocalData('money');
    //     this.RemoveLocalData('mytopdata');
    // }
    
    GetMyTopLocalData(){
        var myTopData = this.LoadLocalData('mytopdata');
        if(myTopData != null){
            var date = myTopData.date;
            var hour = myTopData.hour;
            var betValue = myTopData.betValue;
            var point = myTopData.point;
            PopupUIManager.Instance.topBetPopup.GetMyTopBet(date, hour, betValue, point);
        }
    }
    GetMoneyLocalData(){
        var money = this.LoadLocalData('money');

        if(money == null) GameManager.Instance.currentMoney = 100000;
        else GameManager.Instance.currentMoney = money;
    }

    SaveLocalData(key: string, value: any) {
        cc.sys.localStorage.setItem(key, JSON.stringify(value));
    }

    LoadLocalData(key: string): any {
        const data = cc.sys.localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    RemoveLocalData(key: string) {
        cc.sys.localStorage.removeItem(key);
    }

    
    //Request

    SendCheckNickNameRequest(APIName: string, callback : (valid : boolean) => void) {
        var responseData = true;

        const url = `${this.host}${APIName}?nickname=${this.nickName}`;

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                responseData = JSON.parse(xhr.responseText);
                callback(responseData);
            }
            else {
                console.log('The request failed!');
            }

        }
        xhr.open('GET', url);
        xhr.send();

    }

    private SendCheckHistoryRequest(APIName: string, callback: (data: any) => void) {
        const url = `${this.host}${APIName}?nickname=${this.nickName}`;

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData = JSON.parse(xhr.responseText);
                callback(responseData);
            }
            else {
                console.log('The request failed!');
            }

        }
        xhr.open('GET', url);
        xhr.send();
    }

    private SendCheckTopRequest(APIName: string, callback: (data: any) => void) {
        const url = `${this.host}${APIName}`;

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData = JSON.parse(xhr.responseText);
                callback(responseData);
            } else {
                console.log('The request failed!');
            }
        };

        xhr.open('GET', url);
        xhr.send();
    }

    
    //Get Post Data

    DataReturn(nickname: string, game: string, betValue: number, point: number) {
        const data = {
            nickname: nickname,
            game: game,
            betValue: betValue,
            point: point
        };
        return data;
    }

    PostData(APIName: string, data: any) {

        //cc.log(data);
        
        const url = `${this.host}${APIName}`;

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                //console.log('Post success!');
            } else {
                console.log('The request failed!');
            }
        };

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    GetHistoryData(data: any) {
        var length = data.length >= 20 ? 20 : data.length;
        for (let i = length - 1; i >= 0; i--) {
            const record = data[i];

            var date = record.created_at.substr(0, 10);
            var point = record.point;
            var betValue = record.betValue;
            var session = record.point / record.betValue;

            if(betValue == 0 && point == 0) return;
            PopupUIManager.Instance.historyPopup.GetHistory(date ,session, betValue, point);
        }
    }

    GetTopBetData(data : any){
        var length = data.length >= 20 ? 20 : data.length;
        for (let i = 0; i < length; i++) {
            const record = data[i];

            var date = record.created_at.substr(0, 10);
            var hour = record.created_at.substr(11, 5);
            var nickname = record.nickname;
            var point = record.point;
            var betValue = record.betValue;

            if(betValue == 0 && point == 0) return;
            var topBetPopup = PopupUIManager.Instance.topBetPopup;
            topBetPopup.GetTopBet(date, hour,nickname, betValue, point);

        }
    }

    GetUser(){
        var nicknameLocal = this.LoadLocalData('nickname');
        if(nicknameLocal != null){

            this.nickName = nicknameLocal;
            GameManager.Instance.SetNickname(this.nickName);

            this.SendCheckHistoryRequest('me/history', (data: any) => {
                this.GetHistoryData(data);
            });
        }
        else
        {
            PopupUIManager.Instance.ShowUserNamePopup();
        }

        this.SendCheckTopRequest('top', (data: any) => {
            this.GetTopBetData(data);
        });
    }

    CreateUsername(){
        cc.log('CreateUsername');

        this.nickName = PopupUIManager.Instance.userNamePopup.UsernameEntering();

        this.SendCheckNickNameRequest('user', (valid : boolean) => {
            this.UsernameIsValid(valid);
        });
    }

    UsernameIsValid(valid : boolean){
        if(valid){
            this.SaveLocalData('nickname', this.nickName);
            this.PostData('point', this.DataReturn(this.nickName, 'plinko', 0, 0));

            PopupUIManager.Instance.ShowNotificationPopup();
            PopupUIManager.Instance.notificationPopup.NotificationState(true, this.nickName);
        }
        else{
            PopupUIManager.Instance.ShowNotificationPopup();
            PopupUIManager.Instance.notificationPopup.NotificationState(false, "");
        }
    }
}

