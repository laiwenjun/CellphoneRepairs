var o = getApp(), t = [], n = 1, a = 1, e = "";

Page(function(o, t, n) {
    return t in o ? Object.defineProperty(o, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[t] = n, o;
}({
    data: {
        list: []
    },
    onLoad: function(o) {
        var t = this;
        wx.getStorage({
            key: "azooo_userID",
            success: function(o) {
                console.log(o.data), o.data ? (e = o.data, t.get_myFriend(n)) : wx.showModal({
                    title: "提示",
                    content: "没有userID，请到首页重新进入",
                    showCancel: !1,
                    success: function(o) {
                        o.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    get_myFriend: function(i) {
        var s = this;
        wx.request({
            url: o.globalData.serverUrl + "myFriend",
            data: {
                userID: e,
                page: i
            },
            method: "POST",
            success: function(o) {
                0 == o.data.error_code ? (console.log(o.data.data.list), t = t.concat(o.data.data.list), 
                a = o.data.data.total, 0 != t.length ? (s.setData({
                    list: t
                }), n++, wx.hideToast(), wx.hideNavigationBarLoading()) : wx.showModal({
                    title: "提示",
                    content: "您还没有机友，快去邀请好友吧！",
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
    console.log("--------上拉刷新-------", n), wx.showNavigationBarLoading(), wx.showToast({
        title: "加载中...",
        icon: "loading",
        duration: 1e4,
        mask: !0
    }), n <= a ? o.get_myFriend(n) : (wx.showToast({
        title: "没有更多机友了",
        icon: "success",
        duration: 2e3,
        mask: !0
    }), wx.hideNavigationBarLoading());
}));