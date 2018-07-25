//地址填写脚本
var t = getApp();
Page({
    data: {
        listArr: [],
        data: {},
        addressID: ""
    },
    onLoad: function(t) {},
    openwin: function(t) {
        console.log(t);
        var a = t.target.dataset.url;
        this.data.data.id = t.target.dataset.id, this.data.data.name = t.target.dataset.name, 
        this.data.data.phone = t.target.dataset.phone, this.data.data.province = t.target.dataset.province, 
        this.data.data.city = t.target.dataset.city, this.data.data.district = t.target.dataset.district, 
        this.data.data.address = t.target.dataset.address;
        try {
            wx.setStorageSync("order_data", this.data.data);
        } catch (t) {
            console.log("address页面的保存本地数据catch"), console.log(t);
        }
        wx.navigateTo({
            url: "../" + a + "/" + a
        });
    },
    select: function(t) {
        for (var a = t.target.dataset.id, e = this.data.listArr, s = 0; s < e.length; s++) e[s].addressID == a ? e[s].class = !0 : e[s].class = !1;
        this.setData({
            listArr: e
        }), this.data.data.addressID = a, this.data.data.serverAddress = t.target.dataset.province + t.target.dataset.city + t.target.dataset.district;
        try {
            wx.setStorageSync("order_data", this.data.data);
        } catch (t) {
            console.log("address页面的保存本地数据catch"), console.log(t);
        }
        wx.navigateBack({
            delta: 1
        });
    },
    del: function(a) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确定要删除该地址？",
            success: function(s) {
                s.confirm && (wx.showToast({
                    title: "删除中...",
                    icon: "loading",
                    duration: 1e4
                }), wx.request({
                    url: t.globalData.serverUrl + "saveAddress",
                    data: {
                        name: "",
                        phone: "",
                        province: "",
                        address: "",
                        city: "",
                        district: "",
                        userID: wx.getStorageSync("azooo_userID"),
                        isOn: 0,
                        id: a.target.dataset.id
                    },
                    method: "POST",
                    success: function(t) {
                        if (console.log(t), 0 == t.data.error_code) {
                            for (var s = e.data.listArr, d = 0; d < s.length; d++) s[d].addressID == a.target.dataset.id && s.splice(d, 1);
                            e.setData({
                                listArr: s
                            });
                        } else console.log(t.data.error_msg), setTimeout(function() {
                            wx.showToast({
                                title: t.data.error_msg,
                                icon: "success",
                                duration: 2e3
                            });
                        }, 1e3);
                    },
                    fail: function() {},
                    complete: function() {
                        wx.hideToast();
                    }
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        try {
            var e = wx.getStorageSync("order_data");
            e && a.setData({
                data: e,
                addressID: e.addressID
            });
        } catch (t) {
            console.log("address页面的获取本地数据catch"), console.log(t);
        }
        wx.showToast({
            title: "获取数据中...",
            icon: "loading",
            duration: 1e4
        }), wx.request({
            url: t.globalData.serverUrl + "getAddressList",
            data: {
                userID: wx.getStorageSync("azooo_userID")
            },
            method: "POST",
            success: function(t) {
                if (0 == t.data.error_code) {
                    for (var e = t.data.data.list, s = 0; s < e.length; s++) e[s].district || (e[s].district = ""), 
                    e[s].addressID == a.data.addressID ? e[s].class = !0 : e[s].class = !1;
                    a.setData({
                        listArr: e
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
    },
    onHide: function() {},
    onUnload: function() {}
});