var GAME_SERVER = ""; // gameserver asset
var ASSET_ID = "" ; // game item asset

function LunesBlockchain()  {
    this.lunestestnet_url = "https://lunesnode-testnet.lunes.io/";
    this.addresses_call = {
        url:  lunestestnet_url + "addresses",
        method : "GET"
    };
    this.listboard = {
        list:[]
    };
    this.findscore = {
        base_url : lunestestnet_url + "assets/balance/",
        method : "GET"
    };

    this.gainscore = {
        base_url : lunestestnet_url + "assets/transfer",
        method : "POST"
    };
}

LunesBlockchain.prototype.getPlayerScore = function(player) {
    var link = new XMLHttpRequest();
    var data = "";
    link.onload = function() {
        if(this.readyState == 4 && this.status == 200) {
            data = link.responseText;
        };
    };
    link.overrideMimeType('application/json');
    link.open(LunesBlockchain.findscore.method, LunesBlockchain.findscore.base_url+player);
    link.send();
    var JData = JSON.parse(data);
    var score = 0;
    for (var obj in JData.balances) {
        if (obj instanceof Object){
            if (obj[assetId] == ASSET_ID) {
                score = parseInt(obj[balance]);
            }
        }
    }
    return score;
}

LunesBlockchain.prototype.getListBoard = function() {
    var link = new XMLHttpRequest();
    var data = ""
    link.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = link.responseText;
        };
    };
    link.overrideMimeType('application/json');
    link.open(LunesBlockchain.addresses_call.method, LunesBlockchain.addresses_call.base_url, true);
    link.send(null);
    var JData = JSON.parse(data);
    var listboard = {list:[]}
    for (var address in JData){
        if (JData[address] instanceof String){
            player_score = LunesBlockchain.getPlayerScore(address);
            listboard.list.push({player_address:address, score=0});
        }
    }
    return listboard;
}

LunesBlockchain.prototype.LunesTransferGame = function(player_address, score) {
    let JSONresult = {
        version: "",
        assetId: ASSET_ID,
        amount: score,
        feeAssetId: "",
        fee: 0,
        sender: GAME_SERVER,
        attachment: "",
        recipient: player_address,
        timestamp: 0
    };
    var data = JSON.stringify(JSONresult);
    var link = new XMLHttpRequest();
    link.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = link.responseText;
        };
    };
    link.overrideMimeType('application/json');
    link.open(LunesBlockchain.gainscore.method, LunesBlockchain.gainscore.base_url, true);
    link.send(data);
}

