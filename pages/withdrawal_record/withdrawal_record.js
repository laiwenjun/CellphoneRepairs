//提现记录处理
var o = getApp(), t = [], a = 1, n = 1;
Page(function(o, t, a) {
    return t in o ? Object.defineProperty(o, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[t] = a, o;
}({
    data: {
        info: []
    },
    onLoad: function(o) {
        this.get_withdrawalsList(a);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    get_withdrawalsList: function(e) {
        var i = this;
        wx.request({
            url: o.globalData.serverUrl + "withdrawalsList",
            data: {
                userID: wx.getStorageSync("azooo_userID"),
                page: e
            },
            method: "POST",
            success: function(o) {
                0 == o.data.error_code ? (console.log(o.data), t = t.concat(o.data.data.list), n = o.data.data.total, 
                0 != t.length ? (i.setData({
                    info: t
                }), a++, wx.hideToast(), wx.hideNavigationBarLoading()) : wx.showModal({
                    title: "提示",
                    content: "提现记录为空",
                    showCancel: !1,
                    success: function(o) {
                        o.confirm && console.log("用户点击确定");
                    }
                })) : wx.showModal({
                    title: "提示",
                    content: o.data.error_msg,
                    showCancel: !1,
                    success: function(o) {}
                });
            },
            fail: function(o) {
                console.log("fail", o), wx.showModal({
                    title: "提示",
                    content: "服务器获取数据出错",
                    showCancel: !1,
                    success: function(o) {}
                });
            }
        });
    }
}, "onReachBottom", function() {
    var o = this;
    console.log("--------上拉刷新-------", a), wx.showNavigationBarLoading(), wx.showToast({
        title: "加载中...",
        icon: "loading",
        duration: 1e4,
        mask: !0
    }), a <= n ? o.get_withdrawalsList(a) : (wx.showToast({
        title: "没有更多记录了",
        icon: "success",
        duration: 2e3,
        mask: !0
    }), wx.hideNavigationBarLoading());
}));