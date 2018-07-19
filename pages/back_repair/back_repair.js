var t = getApp(), e = "";

Page({
    data: {
        info: {
            addressID: "",
            serverAddress: "请选择服务地址",
            name: "",
            phone: "",
            province: "",
            city: "",
            district: "",
            address: "",
            timeStr: "请选择上门时间",
            orderID: "",
            repairWay: 72,
            orderTime: "",
            desc: ""
        },
        timeShadeFlag: !1,
        dateValue: [ 0 ],
        timeValue: [ 0 ],
        timeFlag: !1,
        imgArr: [],
        uploadimgArr: [],
        textArea: !1,
        selectAddress_status: !0,
        openSettingBtn: !1
    },
    onLoad: function(a) {
        var s = this;
        console.log(a);
        var o = a.orderid;
        wx.getStorage({
            key: "azooo_userID",
            success: function(a) {
                console.log(a.data), a.data ? (e = a.data, wx.showToast({
                    title: "获取数据中...",
                    icon: "loading",
                    duration: 1e4
                }), wx.request({
                    url: t.globalData.serverUrl + "getOrder",
                    data: {
                        orderID: o,
                        userID: e
                    },
                    method: "POST",
                    success: function(t) {
                        if (console.log(t), 0 == t.data.error_code) {
                            var e = s.data.info, a = t.data.data.info;
                            e.phoneBrand = a.phoneBrand, e.phoneModel = a.phoneModel, e.Failurelist = a.Failurelist, 
                            e.orderSn = a.orderSn, a.colorName ? e.colorName = a.colorName : e.colorName = "", 
                            e.dealTime = s.getTime(new Date(1e3 * parseInt(a.dealTime))), e.totalPrice = a.totalPrice, 
                            e.orderID = o, s.setData({
                                info: e
                            }), console.log(e);
                            try {
                                wx.setStorageSync("backRepair_data", s.data.info);
                            } catch (t) {
                                console.log(t);
                            }
                        }
                    },
                    fail: function() {},
                    complete: function() {
                        wx.hideToast();
                    }
                })) : wx.showModal({
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
    getTime: function(t) {
        if (console.log(t), t) {
            var e = t.getYear() + 1900, a = t.getMonth() + 1, s = t.getDate(), o = t.getHours(), i = t.getMinutes(), r = t.getSeconds();
            return e + "-" + this.bl(a) + "-" + this.bl(s) + " " + this.bl(o) + ":" + this.bl(i) + ":" + this.bl(r);
        }
        var e = (t = new Date()).getYear() + 1900, a = t.getMonth() + 1, s = t.getDate(), o = t.getHours(), i = t.getMinutes(), r = t.getSeconds();
        return e + "-" + this.bl(a) + "-" + this.bl(s) + " " + this.bl(o) + ":" + this.bl(i) + ":" + this.bl(r);
    },
    bl: function(t) {
        return t < 10 ? "0" + t : t;
    },
    addImg: function() {
        var e = this, a = this.data.imgArr, s = this.data.uploadimgArr;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                var i = o.tempFilePaths;
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    duration: 1e4
                }), wx.uploadFile({
                    url: t.globalData.serverUrl + "upload",
                    filePath: i[0],
                    name: "file",
                    formData: {},
                    success: function(t) {
                        var o = JSON.parse(t.data.trim());
                        0 == o.error_code ? (a.push(i[0]), s.push(o.data.path), e.setData({
                            imgArr: a,
                            uploadimgArr: s
                        })) : wx.showToast({
                            title: o.error_msg,
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            }
        });
    },
    imgDel: function(t) {
        var e = this.data.imgArr, a = t.target.dataset.index;
        if (e.length) for (var s = 0; s < e.length; s++) s == a && e.splice(s, 1);
        this.setData({
            imgArr: e
        });
    },
    previewImage: function(t) {
        wx.previewImage({
            current: t.target.dataset.url,
            urls: [ t.target.dataset.url ]
        });
    },
    selectConTime: function() {
        this.setData({
            timeShadeFlag: !this.data.timeShadeFlag,
            textArea: !0
        });
    },
    time_cancle: function() {
        this.setData({
            timeShadeFlag: !this.data.timeShadeFlag,
            textArea: !1
        });
    },
    time_confirm: function() {
        var t = this.data.dateArr, e = this.data.timeArr, a = t[this.data.dateValue].text;
        a += e[this.data.timeValue].text, this.data.info.timeStr = a, this.setData({
            timeFlag: !0,
            info: this.data.info,
            timeShadeFlag: !1,
            textArea: !1
        });
        try {
            wx.setStorageSync("backRepair_data", this.data.info);
        } catch (t) {
            console.log(t);
        }
    },
    ChangeDate: function(t) {
        var e = t.detail.value[0];
        console.log(e), this.setData({
            dateValue: [ e ],
            timeValue: [ 0 ]
        }), 0 == e ? this.showTimeDetaile(!0) : this.showTimeDetaile(!1);
    },
    ChangeTime: function(t) {
        var e = t.detail.value[0];
        this.setData({
            timeValue: [ e ]
        });
    },
    showTime: function(t) {
        if (this.isLeapYear(o)) e = [ "31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31" ]; else var e = [ "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31" ];
        var a = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"), s = new Date(), o = s.getFullYear(), i = s.getMonth(), r = s.getDate() - 1, n = s.getDay() - 1;
        s.getHours(), s.getMinutes(), s.getSeconds();
        i < 10 && (i = "0" + i);
        for (var c = i = parseInt(i) + 1, l = "", d = [], u = 0; u < t; u++) {
            var h = n + 1;
            h >= 7 && (h -= 7), n = h, (l = r + 1) > e[c - 1] && (l -= e[c - 1], (c += 1) > 12 && (c -= 12)), 
            r = l, this.checkoutWeek(a[h]) ? 0 == u ? d.push({
                text: "今天" + c + "月" + l + "日",
                class: !0
            }) : 1 == u ? d.push({
                text: "明天" + c + "月" + l + "日",
                class: !1
            }) : d.push({
                text: c + "月" + l + "日",
                class: !1
            }) : t++;
        }
        this.setData({
            dateArr: d
        });
    },
    showTimeDetaile: function(t) {
        var e = this.data.time_list, a = this.data.time_interval_str, s = parseInt(a.sm_star_hour), o = parseInt(a.sm_star_minute), i = parseInt(a.sm_end_hour), r = parseInt(a.sm_end_minute), n = parseInt(e.seg_time_periods), c = 60 * s + o, l = 60 * i + r, d = c;
        d += n;
        var u = [];
        for (t && u.push({
            text: "尽快到达",
            class: !1
        }); d <= l + n; ) t ? c >= 60 * new Date().getHours() + new Date().getMinutes() + parseInt(e.reservation_time) && u.push({
            text: this.transformTime(c),
            class: !1
        }) : u.push({
            text: this.transformTime(c),
            class: !1
        }), c = d, d += n;
        this.setData({
            timeArr: u
        });
    },
    transformTime: function(t) {
        var e = parseInt(t / 60), a = t % 60;
        return e < 10 && (e = "0" + e), a < 10 && (a = "0" + a), e + ":" + a;
    },
    checkoutWeek: function(t) {
        for (var e = this.data.time_list_weekArr, a = 0; a < e.length; a++) if (e[a] == t) return !0;
        return !1;
    },
    isLeapYear: function(t) {
        var e = t % 100 != 0, a = t % 400 == 0;
        return !!(t % 4 == 0 && e || a);
    },
    inputMark: function(t) {
        this.data.info.desc = t.detail.value;
    },
    openwin: function(t) {
        console.log(t);
        var e = t.target.dataset.url;
        wx.navigateTo({
            url: "../" + e + "/" + e
        });
    },
    confirm: function() {
        var a = this, s = this.data.info, o = s.desc, i = this.data.uploadimgArr;
        if (console.log(s), a.data.selectAddress_status) return wx.showModal({
            title: "提示",
            content: "请选择服务地址",
            showCancel: !1,
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        }), !1;
        if ("请选择上门时间" == s.timeStr) return wx.showModal({
            title: "提示",
            content: "请选择上门时间",
            showCancel: !1,
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        }), !1;
        var r = new Date().getFullYear(), n = s.timeStr.split("月")[0].replace(/(明天|今天)/gi, ""), c = s.timeStr.split("月")[1].split("日")[0], l = s.timeStr.split("日")[1];
        n < 10 && (n = "0" + n), c < 10 && (c = "0" + c);
        var d = r + "-" + n + "-" + c + " " + l;
        if ("尽快到达" == l && (d = 0), !o) return wx.showModal({
            title: "提示",
            content: "请填写返修原因",
            showCancel: !1,
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        }), !1;
        wx.showToast({
            title: "提交中...",
            icon: "loading",
            duration: 1e4
        }), wx.request({
            url: t.globalData.serverUrl + "backRepair",
            data: {
                orderID: s.orderID,
                addressID: "",
                name: s.name,
                orderPhone: s.phone,
                province: s.province,
                city: s.city,
                district: s.district,
                orderAddr: s.address,
                userID: e,
                repairWay: s.repairWay,
                orderTime: d,
                userUploadImgs: i,
                desc: o,
                promo_code: ""
            },
            method: "POST",
            success: function(t) {
                console.log(t), 0 == t.data.error_code ? wx.showModal({
                    title: "提示",
                    content: "提交成功",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && (console.log("用户点击确定"), wx.navigateBack({
                            delta: 2
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
    onShow: function() {
        var e = this;
        wx.getSetting ? wx.getSetting({
            success: function(t) {
                console.log(t), !1 === t.authSetting["scope.address"] ? e.setData({
                    openSettingBtn: !1
                }) : e.setData({
                    openSettingBtn: !0
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "您的微信版本过低，暂不支持此功能，可以下载最新微信版本，获取更多的小程序功能",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {}
        }), wx.request({
            url: t.globalData.serverUrl + "getOrderTime",
            data: {},
            method: "GET",
            success: function(t) {
                console.log(t);
                var a = t.data.data.time, s = JSON.parse(a.time_interval_str.trim()), o = s.weekArr;
                e.setData({
                    time_list: a,
                    time_interval_str: s,
                    time_list_weekArr: o
                }), e.showTime(parseInt(a.longest_appointment)), e.showTimeDetaile(!0);
            },
            fail: function() {},
            complete: function() {}
        });
    },
    onHide: function() {},
    onUnload: function() {},
    selectAddress: function() {
        var t = this;
        wx.chooseAddress ? wx.chooseAddress({
            success: function(e) {
                t.setData({
                    "info.name": e.userName,
                    "info.phone": e.telNumber,
                    "info.province": e.provinceName,
                    "info.city": e.cityName,
                    "info.district": e.countyName,
                    "info.address": e.detailInfo,
                    selectAddress_status: !1
                });
            },
            fail: function(e) {
                t.setData({
                    selectAddress_status: !0,
                    openSettingBtn: !1
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "您的微信版本过低，暂不支持此功能，可以下载最新微信版本，获取更多的小程序功能",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {}
        });
    }
});