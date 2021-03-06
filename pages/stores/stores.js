var websocket = require('../../websocket/connect.js');
var onfire = require("../../utils/onfire.js");
//获取用户当前最近的门店定位
var t, e = getApp(),
  o = 0,
  a = 0;
Page({
  data: {
    lat_all: o,
    data: []
  },
  onLoad: function(n) {
    var s = this;
    t = "true" == n.yuyue_text_99, wx.getLocation({
      type: "wgs84",
      success: function(t) {
        o = t.latitude || 0, a = t.longitude || 0, s.setData({
          lat_all: o
        });
      },
      fail: function() {
        wx.showToast({
          title: "获取经纬度失败！",
          icon: "none",
          duration: 2e3
        });
      },
      complete: function() {
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

        var rspStores = onfire.on('rspStores', function(msg) {
          // 当消息被传递时，做具体的事
          console.log("接到rspStores事件----------------！！~~", msg)
          //var rspJson = JSON.stringify(msg)
          var rspStr = JSON.parse(msg.param)
          console.log("JSON.parse(rspStores)----------------！！~~", rspStr.store[0])

          if (rspStr) {
            var o = rspStr.store;
            if (o && o.length) {
              // for (var a = 0; a < o.length; a++) - 1 != o[a].repairWay.indexOf("72") && (o[a].status_way = !0),
              //   100 == o[a].id && t && o.splice(a, 1);
              s.setData({
                data: o
              });
            } else wx.showModal({
              title: "提示",
              content: "没有门店",
              success: function(t) {
                t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
              }
            });
          } else wx.showModal({
            title: "提示",
            content: e.data.error_msg,
            success: function(t) {
              t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
            }
          });

        })

        // wx.request({
        //     url: e.globalData.serverUrl + "getStores",
        //     data: {
        //         lat: o,
        //         lng: a
        //     },
        //     method: "GET",
        //     header: {
        //         "content-type": "application/json"
        //     },
        //     success: function(e) {
        //         if (console.log(e), 0 == e.data.error_code) {
        //             var o = e.data.data.store;
        //             if (o && o.length) {
        //                 for (var a = 0; a < o.length; a++) -1 != o[a].repairWay.indexOf("72") && (o[a].status_way = !0), 
        //                 100 == o[a].id && t && o.splice(a, 1);
        //                 s.setData({
        //                     data: o
        //                 });
        //             } else wx.showModal({
        //                 title: "提示",
        //                 content: "没有门店",
        //                 success: function(t) {
        //                     t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
        //                 }
        //             });
        //         } else wx.showModal({
        //             title: "提示",
        //             content: e.data.error_msg,
        //             success: function(t) {
        //                 t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
        //             }
        //         });
        //     }
        // });

        
      }
    }), wx.getSetting({
      success: function(t) {
        !1 === t.authSetting["scope.userLocation"] && wx.openSetting({
          success: function(t) {}
        });
      }
    });
  },
  clickAddress: function(t) {
    try {
      wx.setStorageSync("order_storeId", t.target.dataset.id), console.log("order_storeId:" + t.target.dataset.id);
      console.log("stores页面的保存本地数据成功 ", t.target.dataset.id), console.log(t);
    } catch (t) {
      console.log("stores页面的保存本地数据catch"), console.log(t);
    }
    wx.navigateBack({
      delta: 1
    });
  },
  clickPhone: function(t) {
    var e = t.target.dataset.phone; -
    1 != e.indexOf(",") && (e = e.split(",")[0]), wx.makePhoneCall({
      phoneNumber: e
    });
  },
  clickMap: function(t) {
    var e = t.target.dataset.lat - 0,
      o = t.target.dataset.lng - 0,
      a = t.target.dataset.name,
      n = t.target.dataset.address;
    console.log(e, e), wx.getLocation({
      type: "wgs84",
      success: function(t) {
        t.latitude, t.longitude;
        wx.openLocation({
          latitude: e,
          longitude: o,
          name: a,
          address: n,
          scale: 28
        });
      }
    });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {}
});