//优惠券
var t = getApp();
Page({
    data: {
        listArr: [],
        ChooseFailureidArr: []
    },
    onLoad: function(e) {
        var o = this, a = [], n = "";
        try {
            var s = wx.getStorageSync("order_data");
            if (console.log(s), s) {
                var i = s.combTampArr;
                if (i.length) {
                    for (var l = 0; l < i.length; l++) a.push(i[l].choose_failure);
                    o.setData({
                        data: s,
                        ChooseFailureidArr: a
                    });
                }
                n = s.modelID;
            }
        } catch (t) {
            console.log("coupon页面的获取本地数据catch"), console.log(t);
        }
        wx.showToast({
            title: "获取数据中...",
            icon: "loading",
            duration: 1e4
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {},
            fail: function(t) {},
            complete: function(e) {
                var s = "", i = "";
                null != e.latitude ? (s = e.latitude, i = e.longitude, console.log("complete:", e)) : console.log("complete:error", e), 
                wx.request({
                    url: t.globalData.serverUrl + "getAvailableCoupon",
                    data: {
                        userID: wx.getStorageSync("azooo_userID"),
                        ChooseFailureidArr: a,
                        modelID: n,
                        latitude: s,
                        longitude: i
                    },
                    method: "POST",
                    success: function(t) {
                        if (console.log(t), 0 == t.data.error_code) {
                            var e = t.data.data.list, n = [];
                            for (var s in e) n.push(s);
                            if (console.log("故障数组", a), n.length) {
                                for (var i in e) e[i].useEndTime = o.getTime(new Date(1e3 * parseInt(e[i].useEndTime))), 
                                e[i].money = parseInt(e[i].money);
                                o.setData({
                                    listArr: e
                                });
                            } else wx.showModal({
                                title: "提示",
                                content: "没有可使用优惠券",
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && wx.navigateBack({
                                        delta: 1
                                    });
                                }
                            });
                        } else wx.showModal({
                            title: "提示",
                            content: t.data.error_msg,
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && console.log("用户点击确定");
                            }
                        });
                    },
                    fail: function() {},
                    complete: function() {
                        wx.hideToast();
                    }
                });
            }
        });
    },
    select: function(t) {
        this.data.data && (this.data.data.couponID = t.target.dataset.id, this.data.data.couponName = t.target.dataset.text, 
        this.data.data.couponPrice = t.target.dataset.price), console.log(this.data.data);
        try {
            wx.setStorageSync("order_data", this.data.data);
        } catch (t) {
            console.log("address页面的保存本地数据catch"), console.log(t);
        }
        wx.navigateBack({
            delta: 1
        });
    },
    getTime: function(t) {
        if (t) {
            var e = t.getYear() + 1900, o = t.getMonth() + 1, a = t.getDate(), n = t.getHours(), s = t.getMinutes(), i = t.getSeconds();
            return e + "-" + this.bl(o) + "-" + this.bl(a) + " " + this.bl(n) + ":" + this.bl(s) + ":" + this.bl(i);
        }
        var e = (t = new Date()).getYear() + 1900, o = t.getMonth() + 1, a = t.getDate(), n = t.getHours(), s = t.getMinutes(), i = t.getSeconds();
        return e + "-" + this.bl(o) + "-" + this.bl(a) + " " + this.bl(n) + ":" + this.bl(s) + ":" + this.bl(i);
    },
    bl: function(t) {
        return t < 10 ? "0" + t : t;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});