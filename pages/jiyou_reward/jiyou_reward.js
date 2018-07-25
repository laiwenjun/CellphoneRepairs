//奖励脚本

var t = 1, e = getApp(), a = [], o = "";
Page({
    data: {
        top_status: 0,
        nomoreFlag: !0,
        listArr: [],
        ajaxFlag: !0
    },
    onLoad: function(t) {
        a = [];
        var e = this;
        wx.getStorage({
            key: "azooo_userID",
            success: function(t) {
                console.log(t.data), t.data ? (o = t.data, e.myBillListFun()) : wx.showModal({
                    title: "提示",
                    content: "没有userID，请到首页重新进入",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    myBillListFun: function() {
        var n = this;
        if (!n.data.ajaxFlag) return !1;
        n.setData({
            ajaxFlag: !1
        }), wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: e.globalData.serverUrl + "myBillList",
            data: {
                userID: o,
                page: t,
                pageSize: 15
            },
            method: "POST",
            success: function(e) {
                if (console.log(e), 0 == e.data.error_code) {
                    var o = e.data.data.list;
                    if (o && o.length) {
                        for (var s = 0, i = o.length; s < i; s++) o[s].add_time = n.getTime(new Date(1e3 * parseInt(o[s].add_time))), 
                        o[s].headImg = o[s].headImg ? o[s].headImg : "../../images/wx_user.jpg";
                        a = a.concat(o), n.setData({
                            listArr: a
                        }), t < e.data.data.total ? (n.setData({
                            ajaxFlag: !0
                        }), t++) : n.setData({
                            nomoreFlag: !1
                        });
                    } else n.setData({
                        nomoreFlag: !1
                    });
                } else wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
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
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    getTime: function(t) {
        if (console.log(t), t) {
            var e = t.getYear() + 1900, a = t.getMonth() + 1, o = t.getDate(), n = t.getHours(), s = t.getMinutes(), i = t.getSeconds();
            return e + "-" + this.bl(a) + "-" + this.bl(o) + " " + this.bl(n) + ":" + this.bl(s) + ":" + this.bl(i);
        }
        var e = (t = new Date()).getYear() + 1900, a = t.getMonth() + 1, o = t.getDate(), n = t.getHours(), s = t.getMinutes(), i = t.getSeconds();
        return e + "-" + this.bl(a) + "-" + this.bl(o) + " " + this.bl(n) + ":" + this.bl(s) + ":" + this.bl(i);
    },
    bl: function(t) {
        return t < 10 ? "0" + t : t;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        if (!this.data.ajaxFlag) return !1;
        this.myBillListFun();
    }
});