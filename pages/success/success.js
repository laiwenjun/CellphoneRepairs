var websocket = require('../../websocket/connect.js');
var onfire = require("../../utils/onfire.js");
//下单成功处理
var t, e, s = getApp();
Page({
    data: {
        status: 72,
        store_address: "",
        store_time: "",
        store_phone: ""
    },
    onLoad: function(a) {
        var o = this;
        console.log("成功页面接到的预定类型为：",a)
        this.setData({
            id: a.id,
            status: a.status
        }), 
        e = a.storeId,
         console.log(e); 
        
        if (73 == a.status){
          //请求门店信息
          var userId = wx.getStorageSync("azooo_userID")
          console.log("请求门店信息-=-------userId = ", userId)
          websocket.send({
            cmd: 10007, //消息号
            optId: userId, //用户标识，唯一ID
            param: {
              lat: o,
              lng: a
            }
          });

          var rspStores = onfire.on('rspStores', function (msg) {
            // 当消息被传递时，做具体的事
            console.log("接到rspStores事件----------------！！~~", msg)
            //var rspJson = JSON.stringify(msg)
            var rspStr = JSON.parse(msg.param)
            console.log("JSON.parse(rspStores)----------------！！~~", rspStr.store[0])
          
            t = rspStr.store
            for (var a in t) t[a].id == e && o.setData({
              store_address: t[a].address,
              store_time: t[a].serviceTime,
              store_phone: t[a].phone
            });
          })
        }
        // wx.request({
        //     url: s.globalData.serverUrl + "getStores",
        //     data: {},
        //     method: "GET",
        //     header: {
        //         "content-type": "application/json"
        //     },
        //     success: function(s) {
        //         t = s.data.data.store, console.log(t);
        //         for (var a in t) t[a].id == e && o.setData({
        //             store_address: t[a].address,
        //             store_time: t[a].serviceTime,
        //             store_phone: t[a].phone
        //         });
        //     }
        // });



        
    },
    clickIndex: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    look: function() {
        wx.navigateTo({
            url: "../order_details/order_details?orderid=" + this.data.id
        });
    }
});