//订单评价
var t = getApp();
Page({
    data: {
        orderID: "",
        info: "",
        text: "",
        content: [],
        starArr: [ {
            class: !1
        }, {
            class: !1
        }, {
            class: !1
        }, {
            class: !1
        }, {
            class: !1
        } ],
        textareaVal: ""
    },
    onLoad: function(e) {
        console.log(e);
        var a = this;
        a.setData({
            orderID: e.orderid
        }), wx.request({
            url: t.globalData.serverUrl + "getMaster",
            data: {
                masterId: e.masterid
            },
            method: "POST",
            success: function(t) {
                console.log(t), 0 == t.data.error_code && a.setData({
                    info: t.data.data.info
                });
            },
            fail: function() {},
            complete: function() {}
        });
    },
    selectStar: function(t) {
        console.log(t);
        for (var e = t.target.dataset.index, a = this.data.starArr, s = 0; s < a.length; s++) a[s].class = s <= e;
        var o = [ {
            text: "很差",
            content: [ {
                text: "技术不行",
                class: !1
            }, {
                text: "态度很差",
                class: !1
            }, {
                text: "严重延迟时间",
                class: !1
            }, {
                text: "清洁整理不好",
                class: !1
            } ]
        }, {
            text: "较差",
            content: [ {
                text: "技术不行",
                class: !1
            }, {
                text: "态度很差",
                class: !1
            }, {
                text: "时间延迟很多",
                class: !1
            }, {
                text: "不注意清洁整理",
                class: !1
            } ]
        }, {
            text: "一般",
            content: [ {
                text: "技术一般",
                class: !1
            }, {
                text: "态度一般",
                class: !1
            }, {
                text: "到达不及时",
                class: !1
            }, {
                text: "清洁整理不够好",
                class: !1
            } ]
        }, {
            text: "良好",
            content: [ {
                text: "到达及时",
                class: !1
            }, {
                text: "细心专业",
                class: !1
            }, {
                text: "维修快速",
                class: !1
            }, {
                text: "帅气给力",
                class: !1
            }, {
                text: "态度亲和",
                class: !1
            }, {
                text: "注意清洁",
                class: !1
            } ]
        }, {
            text: "满意",
            content: [ {
                text: "到达及时",
                class: !1
            }, {
                text: "细心专业",
                class: !1
            }, {
                text: "维修快速",
                class: !1
            }, {
                text: "帅气给力",
                class: !1
            }, {
                text: "态度亲和",
                class: !1
            }, {
                text: "注意清洁",
                class: !1
            } ]
        } ], n = o[e].text, c = o[e].content;
        this.setData({
            starArr: a,
            text: n,
            content: c
        });
    },
    selectBtn: function(t) {
        var e = t.target.dataset.index, a = this.data.content;
        a[e].class = !a[e].class, this.setData({
            content: a
        });
    },
    textareaVal: function(t) {
        this.setData({
            textareaVal: t.detail.value
        });
    },
    confirm: function() {
        for (var e = 0, a = this.data.starArr, s = 0; s < a.length; s++) a[s].class && e++;
        if (0 == e) return wx.showModal({
            title: "提示",
            content: "您还没选择星星评价",
            showCancel: !1,
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        }), !1;
        for (var o = [], n = this.data.content, s = 0; s < n.length; s++) n[s].class && o.push(n[s].text);
        var c = this.data.textareaVal;
        wx.showToast({
            title: "提交中...",
            icon: "loading",
            duration: 1e4
        }), wx.request({
            url: t.globalData.serverUrl + "comment",
            data: {
                stars: e,
                orderID: this.data.orderID,
                CommentTitle: o,
                content: c
            },
            method: "POST",
            success: function(t) {
                console.log(t), 0 == t.data.error_code ? wx.showModal({
                    title: "提示",
                    content: "评价成功，感谢你的评价",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && (console.log("用户点击确定"), wx.navigateBack({
                            delta: 1
                        }));
                    }
                }) : wx.showModal({
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
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});