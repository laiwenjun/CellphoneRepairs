var onfire = require("../../utils/onfire.js");
//查看下单情况
var t = getApp(), e = !0, o = 1, a = new Array(), n = "";
Page({
    data: {},
    onLoad: function(t) {},
    openwin: function(t) {
        var e = t.target.dataset.url, o = t.target.dataset.orderid;
        if ("appraise" == e) {
            var a = t.target.dataset.masterid;
            wx.navigateTo({
                url: "../" + e + "/" + e + "?masterid=" + a + "&orderid=" + o
            });
        } else wx.navigateTo({
            url: "../" + e + "/" + e + "?orderid=" + o
        });
    },
    onReady: function() {},
    onShow: function() {
        o = 1, a = [];
        var t = this;
        wx.getStorage({
            key: "azooo_userID",
            success: function(e) {
                console.log(e.data), (n = e.data) ? t.onReachBottom() : wx.showModal({
                    title: "提示",
                    content: "没有userID,请返回首页重新进入",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function(t) {},
    onReachBottom: function() {
        var i = this;
        if (!e) return !1;
        e = !1, console.log("--------上拉刷新-------", o), wx.showNavigationBarLoading(), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }),

        //请求所有订单信息
        websocket.send({
          cmd: 10009, //消息号
          optId: t.globalData.userid, //用户标识，唯一ID
          param: {
           userId:t.globalData.userid
          }
        });

      var rspOrder = onfire.on('rspOrder', function (msg) {
        // 当消息被传递时，做具体的事
        console.log("接到rspOrder事件----------------！！~~", msg)
        var rsp = JSON.parse(msg)

      })


        //  wx.request({
        //     url: t.globalData.serverUrl + "getOrderList",
        //     data: {
        //         userID: n,
        //         page: o,
        //         limit: 5
        //     },
        //     method: "POST",
        //     success: function(t) {
        //         if (0 == t.data.error_code) {
        //             if (0 == (a = a.concat(t.data.data.list)).length) wx.hideToast(), wx.hideNavigationBarLoading(), 
        //             wx.showModal({
        //                 title: "提示",
        //                 content: "您还没有订单，请下单后再来查看哦",
        //                 showCancel: !1,
        //                 success: function(t) {
        //                     t.confirm && console.log("用户点击确定");
        //                 }
        //             }); else if (0 == t.data.data.list.length && 0 != a.length) wx.showToast({
        //                 title: "没有更多订单了",
        //                 icon: "success",
        //                 duration: 2e3,
        //                 mask: !0
        //             }); else if (a.length) {
        //                 for (var e = 0; e < a.length; e++)
        //                  a[e].colorName || (a[e].colorName = "");
        //                 o++, 
        //                 i.setData({
        //                     list: a
        //                 }), wx.hideToast();
        //             }
        //         } else wx.showModal({
        //             title: "提示",
        //             content: t.data.error_msg,
        //             success: function(t) {
        //                 t.confirm && console.log("用户点击确定");
        //             }
        //         });
        //     },
        //     fail: function() {},
        //     complete: function() {
        //         wx.hideNavigationBarLoading(), e = !0;
        //     }
        // });
    },
    getTime: function(t) {
        if (console.log(t), t) {
            var e = t.getYear() + 1900, o = t.getMonth() + 1, a = t.getDate(), n = t.getHours(), i = t.getMinutes(), s = t.getSeconds();
            return e + "-" + this.bl(o) + "-" + this.bl(a) + " " + this.bl(n) + ":" + this.bl(i) + ":" + this.bl(s);
        }
        var e = (t = new Date()).getYear() + 1900, o = t.getMonth() + 1, a = t.getDate(), n = t.getHours(), i = t.getMinutes(), s = t.getSeconds();
        return e + "-" + this.bl(o) + "-" + this.bl(a) + " " + this.bl(n) + ":" + this.bl(i) + ":" + this.bl(s);
    },
    bl: function(t) {
        return t < 10 ? "0" + t : t;
    }
});