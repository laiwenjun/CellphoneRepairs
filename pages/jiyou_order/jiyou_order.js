//订单记录脚本

function t(t, o, a) {
    return o in t ? Object.defineProperty(t, o, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[o] = a, t;
}

var o, a = getApp(), n = [], s = 1, e = 1;

Page((o = {
    data: {
        list: [],
        only_status: 0,
        all_status: !0
    },
    onLoad: function(t) {
        this.get_billList(s);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    get_billList: function(t) {
        var o = this;
        wx.request({
            url: a.globalData.serverUrl + "billList",
            data: {
                userID: wx.getStorageSync("azooo_userID"),
                page: t
            },
            method: "POST",
            success: function(t) {
                0 == t.data.error_code ? (console.log(t.data.data.list), n = n.concat(t.data.data.list), 
                e = t.data.data.total, 0 != n.length ? (o.setData({
                    list: n
                }), s++, wx.hideToast(), wx.hideNavigationBarLoading()) : wx.showModal({
                    title: "提示",
                    content: "您还没有订单记录",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                })) : wx.showModal({
                    title: "提示",
                    content: t.data.error_msg,
                    showCancel: !1,
                    success: function(t) {}
                });
            },
            fail: function(t) {
                console.log("fail", t), wx.showModal({
                    title: "提示",
                    content: "服务器获取数据出错",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    }
}, t(o, "onReachBottom", function() {
    var t = this;
    console.log("--------上拉刷新-------", s), wx.showNavigationBarLoading(), wx.showToast({
        title: "加载中...",
        icon: "loading",
        duration: 1e4,
        mask: !0
    }), s <= e ? t.get_billList(s) : (wx.showToast({
        title: "没有更多记录了",
        icon: "success",
        duration: 2e3,
        mask: !0
    }), wx.hideNavigationBarLoading());
}), t(o, "click_sel", function(t) {
    var o = this, a = t.target.dataset.status;
    0 == a ? o.setData({
        only_status: 0,
        all_status: !0
    }) : o.setData({
        only_status: a,
        all_status: !1
    });
}), o));