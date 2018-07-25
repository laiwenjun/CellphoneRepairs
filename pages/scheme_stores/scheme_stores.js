//选择维修方案目录2
var t, e, a, o, s = getApp(), n = !0, i = !1, r = !0, c = [ 1 ], d = 0;
Page({
    data: {
        faultListFlag: !1,
        name02: "",
        phone02: "",
        store_name: "",
        store_address: "",
        store_time: "",
        store_phone: "",
        store_status: !1,
        status: "73",
        openSettingBtn: !1,
        mode: [ {
            img: "../../images/1_2.png",
            img_avtive: "../../images/1_1.png",
            text: "上门维修",
            modeID: "72",
            class: !0
        }, {
            img: "../../images/2_2.png",
            img_avtive: "../../images/2_1.png",
            text: "到店维修",
            modeID: "73",
            class: !1
        }, {
            img: "../../images/3_2.png",
            img_avtive: "../../images/3_1.png",
            text: "邮寄维修",
            modeID: "74",
            class: !1
        }, {
            img: "../../images/4_2.png",
            img_avtive: "../../images/4_1.png",
            text: "现场维修",
            modeID: "75",
            class: !1
        } ],
        data: {
            brandName: "",
            modelName: "",
            brandID: "",
            modelID: "",
            name: "",
            phone: "",
            master_id: "",
            thumbImg: "",
            combTampArr: [],
            imgArr: [],
            userUploadImgs: [],
            price: "",
            storeId: "",
            serverAddress: "",
            province: "",
            city: "",
            district: "",
            address: "",
            timeStr: "请选择上门时间",
            couponID: "",
            couponName: "请选择优惠券",
            couponPrice: 0,
            payPrice: "",
            userID: "",
            repairWay: 73,
            orderTime: "",
            desc: "",
            invitationCode: "",
            otherRepair: "",
            duihuan_price: 0
        },
        selectAddress: "请选择服务地址",
        selectAddress01: "请填写您的回寄地址",
        selectAddress_status: !0,
        timeShadeFlag: !1,
        dateArr: [],
        timeArr: [],
        dateValue: [ 0 ],
        timeValue: [ 0 ],
        timeFlag: !1,
        couponFlag: !0,
        code_name: null
    },
    onLoad: function(e) {
        var n = this;
        try {
            a = wx.getStorageSync("code_name"), o = wx.getStorageSync("code_id");
        } catch (t) {}
        "storeID" == a ? n.setData({
            code_name: a,
            "data.repairWay": 77,
            status: 73
        }) : "masterID" == a && n.setData({
            code_name: a,
            "data.repairWay": 75,
            "data.master_id": o,
            status: 75
        }), wx.getStorage({
            key: "azooo_userID",
            success: function(t) {
                n.setData({
                    "data.userID": t.data
                });
            },
            fail: function() {
                wx.showModal({
                    title: "温馨提示",
                    content: "获取userid失败，请返回首页重新进入",
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            }
        }), wx.request({
            url: s.globalData.serverUrl + "getOrderTime",
            data: {},
            method: "GET",
            success: function(t) {
                var e = t.data.data.time, a = JSON.parse(e.time_interval_str.trim()), o = a.weekArr;
                n.setData({
                    time_list: e,
                    time_interval_str: a,
                    time_list_weekArr: o
                }), n.showTime(parseInt(e.longest_appointment)), n.showTimeDetaile(!0);
            },
            fail: function() {}
        }), wx.request({
            url: s.globalData.serverUrl + "getStores",
            data: {},
            method: "GET",
            success: function(e) {
                console.log("获取门店列表:", e), 0 == e.data.error_code ? t = e.data.data.store : wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    },
    onShow: function() {
        var e = this;
        if (wx.getSetting ? wx.getSetting({
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
        }), wx.getStorage({
            key: "order_data",
            success: function(t) {
                console.log(t.data);
                var a = t.data;
                if (console.log("缓存优惠券", a), !a.couponID) {
                    var o = a.combTampArr, s = !1;
                    if (a.color_name) for (i = 0; i < o.length; i++) 1 === o[i].is_connect_color && (s = !0);
                    if ("string" == typeof a.color_name && a.color_name) {
                        for (var n = a.color_name.split(","), i = 0; i < n.length; i++) n[i] = {
                            text: n[i],
                            class: !1
                        };
                        e.setData({
                            "data.color_name": n
                        });
                    }
                    e.setData({
                        "data.brandName": a.brandName,
                        "data.brandID": a.brandID,
                        "data.modelName": a.modelName,
                        "data.modelID": a.modelID,
                        "data.isColor": s,
                        "data.combTampArr": a.combTampArr,
                        "data.thumbImg": a.thumbImg,
                        "data.price": a.price,
                        "data.payPriceprice": a.price,
                        "data.otherRepair": a.otherRepair
                    });
                }
            }
        }), n) return n = !1, !1;
        if (e.region_price(), wx.getStorage({
            key: "order_data",
            success: function(t) {
                var a = t.data;
                if ("请选择优惠券" != a.couponName) {
                    var o = parseFloat(a.price) - parseFloat(a.couponPrice);
                    o < 0 && (o = 0), e.setData({
                        "data.payPriceprice": o,
                        "data.couponID": a.couponID,
                        "data.couponPrice": a.couponPrice,
                        "data.couponName": a.couponName
                    });
                }
            }
        }), wx.getStorage({
            key: "order_storeId",
            success: function(a) {
                console.log(a.data);
                var o = a.data;
                e.setData({
                    "data.storeId": o
                });
                for (var s in t) t[s].id == o && e.setData({
                    store_name: t[s].name,
                    store_address: t[s].address,
                    store_time: t[s].serviceTime,
                    store_phone: t[s].phone,
                    store_status: !0
                });
            }
        }), i) {
            for (var a = e.data.data.combTampArr, o = 0, s = 0, r = a.length; s < r; s++) 20 !== a[s].choose_failure && (o += parseFloat(a[s].price));
            e.setData({
                "data.payPriceprice": o
            });
        }
    },
    click_color: function(t) {
        var e = t.target.dataset.index, a = this.data.data.color_name;
        if (a[e].class) a[e].class = null; else {
            for (var o in a) a[o].class = null;
            a[e].class = "on";
        }
        this.setData({
            "data.color_name": a
        }), wx.setStorage({
            key: "order_data",
            data: this.data.data
        });
    },
    openwin: function(t) {
        if (1 == d) wx.showModal({
            title: "提示",
            content: "当前价格为活动价，不能使用优惠券",
            showCancel: !1,
            success: function(t) {
                if (t.confirm) return console.log("用户点击确定"), !1;
                t.cancel && console.log("用户点击取消");
            }
        }); else {
            var e = t.target.dataset.url;
            wx.navigateTo({
                url: "../" + e + "/" + e
            });
        }
    },
    formSubmit: function(t) {
        var e = t.detail.formId, a = [], n = "", i = !1, d = this, l = this.data.data;
        if (72 == l.repairWay) {
            if (1 == d.data.selectAddress_status) return wx.showModal({
                title: "提示",
                content: "请选择服务地址",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1;
            if ("请选择上门时间" == l.timeStr) return wx.showModal({
                title: "提示",
                content: "请选择上门时间",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1;
            var u = new Date().getFullYear(), m = l.timeStr.split("月")[0].replace(/(明天|今天)/gi, ""), h = l.timeStr.split("月")[1].split("日")[0], f = l.timeStr.split("日")[1];
            m < 10 && (m = "0" + m), h < 10 && (h = "0" + h), n = u + "-" + m + "-" + h + " " + f, 
            "立即上门" == f && (n = 0), i = !0;
        } else if (73 == l.repairWay || 77 == l.repairWay) {
            if ("" == d.data.name02) return wx.showModal({
                title: "提示",
                content: "请输入您的姓名",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1;
            if (11 != d.data.phone02.length) return "" == d.data.phone02 ? (wx.showModal({
                title: "提示",
                content: "请输入您的手机号码",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1) : (wx.showModal({
                title: "提示",
                content: "请输入正确的手机号码",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1);
            i = !0, d.setData({
                "data.name": d.data.name02,
                "data.phone": d.data.phone02
            });
        } else if (74 == l.repairWay) {
            if (1 == d.data.selectAddress_status) return wx.showModal({
                title: "提示",
                content: "请填写您的回寄地址",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1;
            i = !0;
        } else if (75 == l.repairWay) {
            if ("" == d.data.name02) return wx.showModal({
                title: "提示",
                content: "请输入您的姓名",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1;
            if (11 != d.data.phone02.length) return "" == d.data.phone02 ? (wx.showModal({
                title: "提示",
                content: "请输入您的手机号码",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1) : (wx.showModal({
                title: "提示",
                content: "请输入正确的手机号码",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1);
            if ("" == l.master_id) return wx.showModal({
                title: "提示",
                content: "请输入工程师编号",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1;
            i = !0, d.setData({
                "data.name": d.data.name02,
                "data.phone": d.data.phone02
            });
        }
        if (i) {
            for (var p = l.combTampArr, g = 0; g < p.length; g++) a.push(p[g].id);
            var _ = d.data.data.isColor, w = d.data.data.color_name, v = "";
            if (_ && w) {
                for (g = 0; g < w.length; g++) w[g].class && (v = w[g].text);
                if (!v) return wx.showModal({
                    title: "提示",
                    content: "请选择颜色",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                }), !1;
            }
            if (0 == c.length) return wx.showModal({
                title: "提示",
                content: "请勾选同意下方的《服务协议》，即可立刻维修哦",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), !1;
            if (!r) return !1;
            r = !1, wx.showToast({
                title: "提交预约中...",
                icon: "loading",
                duration: 1e4,
                mask: !0
            });
            var D = null;
            try {
                D = wx.getStorageSync("from_appid"), console.log("from_appid:", D);
            } catch (t) {
                console.log("from_appid", t);
            }
            wx.request({
                url: s.globalData.serverUrl + "newEnterOrder",
                data: {
                    from_appid: D,
                    brandName: l.brandName,
                    modelName: l.modelName,
                    colorName: v,
                    storeId: o,
                    comIds: a,
                    orderTime: n,
                    brandID: l.brandID,
                    modelID: l.modelID,
                    repairWay: l.repairWay,
                    desc: l.desc,
                    promo_code: l.invitationCode,
                    name: l.name,
                    phone: l.phone,
                    master_id: l.master_id,
                    province: l.province,
                    city: l.city,
                    district: l.district,
                    address: l.address,
                    userUploadImgs: l.userUploadImgs,
                    couponID: l.couponID,
                    userID: l.userID,
                    otherRepair: l.otherRepair,
                    form_id: e || (s.globalData.appId ? s.globalData.appId : ""),
                    wxa_scene: s.globalData.scene ? s.globalData.scene : null
                },
                method: "POST",
                success: function(t) {
                    console.log(t), 0 == t.data.error_code ? wx.redirectTo({
                        url: "../success/success?id=" + t.data.data.id + "&status=" + d.data.status + "&storeId=" + o
                    }) : wx.showModal({
                        title: "提示",
                        content: JSON.stringify(t.data),
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && console.log("用户点击确定");
                        }
                    });
                },
                fail: function() {
                    wx.showModal({
                        title: "提示",
                        content: "接口调用失败fail",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && console.log("用户点击确定");
                        }
                    });
                },
                complete: function() {
                    wx.hideToast(), r = !0;
                }
            });
        }
    },
    inputMark: function(t) {
        this.data.data.desc = t.detail.value, this.setData({
            data: this.data.data
        });
    },
    blurMark: function() {
        wx.setStorage({
            key: "order_data",
            data: this.data.data
        });
    },
    inputInvitation: function(t) {
        this.data.data.invitationCode = t.detail.value, this.setData({
            data: this.data.data
        }), e = t.detail.value;
    },
    exchange_fun: s.throttle(1e3, function() {
        var t = this, a = t.data.data.modelID, o = t.data.data.combTampArr;
        if (o) {
            if (!([ 168, 169, 22, 23, 237, 16, 35, 3, 1, 2 ].indexOf(a) > -1)) return wx.showModal({
                title: "提示",
                content: "该机型不在本次活动范围之内",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), t.setData({
                "data.invitationCode": ""
            }), !1;
            for (var n = !0, c = 0, d = o.length; c < d; c++) if (20 === o[c].choose_failure) {
                n = !1;
                break;
            }
            if (n) return wx.showModal({
                title: "提示",
                content: "维修故障类型必须包含电池故障才能使用兑换码",
                showCancel: !1,
                success: function(t) {
                    t.confirm && console.log("用户点击确定");
                }
            }), t.setData({
                "data.invitationCode": ""
            }), !1;
        }
        wx.request({
            url: s.globalData.serverUrl + "checkPromoCode",
            method: "POST",
            data: {
                promo_code: e,
                modelId: a
            },
            header: {},
            success: function(e) {
                if (r = !0, 0 == e.data.error_code) {
                    i = !0;
                    for (var a = 0, s = 0, n = o.length; s < n; s++) 20 !== o[s].choose_failure ? a += parseFloat(o[s].price) : 20 == o[s].choose_failure && t.setData({
                        "data.duihuan_price": o[s].price
                    });
                    t.setData({
                        "data.payPriceprice": a
                    }), wx.showToast({
                        title: "兑换成功",
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    });
                } else i = !1, t.setData({
                    "data.invitationCode": ""
                }), wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && console.log("用户点击确定");
                    }
                });
            }
        });
    }),
    blurInvitation: function() {
        wx.setStorage({
            key: "order_data",
            data: this.data.data
        });
    },
    selectConTime: function() {
        this.setData({
            timeFlag: !1,
            timeShadeFlag: !this.data.timeShadeFlag
        });
    },
    time_cancle: function() {
        this.setData({
            timeShadeFlag: !this.data.timeShadeFlag
        });
    },
    time_confirm: function() {
        var t = this.data.dateArr, e = this.data.timeArr, a = t[this.data.dateValue].text;
        a += e[this.data.timeValue].text, this.data.data.timeStr = a, this.setData({
            timeFlag: !0,
            data: this.data.data,
            timeShadeFlag: !1
        });
        try {
            wx.setStorageSync("order_data", this.data.data);
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
        }), this.data.timeFlag && this.time_confirm();
    },
    showTime: function(t) {
        if (this.isLeapYear(s)) e = [ "31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31" ]; else var e = [ "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31" ];
        var a = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"), o = new Date(), s = o.getFullYear(), n = o.getMonth(), i = o.getDate() - 1, r = o.getDay() - 1;
        o.getHours(), o.getMinutes(), o.getSeconds();
        n < 10 && (n = "0" + n);
        for (var c = n = parseInt(n) + 1, d = "", l = [], u = 0; u < t; u++) {
            var m = r + 1;
            m >= 7 && (m -= 7), r = m, (d = i + 1) > e[c - 1] && (d -= e[c - 1], (c += 1) > 12 && (c -= 12)), 
            i = d, this.checkoutWeek(a[m]) ? 0 == u ? l.push({
                text: "今天" + c + "月" + d + "日",
                class: !0
            }) : 1 == u ? l.push({
                text: "明天" + c + "月" + d + "日",
                class: !1
            }) : l.push({
                text: c + "月" + d + "日",
                class: !1
            }) : t++;
        }
        this.setData({
            dateArr: l
        });
    },
    showTimeDetaile: function(t) {
        var e = this.data.time_list, a = this.data.time_interval_str, o = parseInt(a.sm_star_hour), s = parseInt(a.sm_star_minute), n = parseInt(a.sm_end_hour), i = parseInt(a.sm_end_minute), r = parseInt(e.seg_time_periods), c = 60 * o + s, d = 60 * n + i, l = c;
        l += r;
        var u = [];
        for (t && u.push({
            text: "立即上门",
            class: !1
        }); l <= d + r; ) t ? c >= 60 * new Date().getHours() + new Date().getMinutes() + parseInt(e.reservation_time) && u.push({
            text: this.transformTime(c),
            class: !1
        }) : u.push({
            text: this.transformTime(c),
            class: !1
        }), c = l, l += r;
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
    selectMode: function(t) {
        for (var e = this, a = t.target.dataset.modeid, o = t.target.dataset.index, s = this.data.mode, n = 0; n < s.length; n++) s[n].class = !1, 
        o == n && (s[n].class = !0);
        if (this.setData({
            status: a,
            mode: s,
            "data.repairWay": a
        }), e.region_price(), wx.getStorage({
            key: "order_data",
            success: function(t) {
                var a = t.data;
                if ("请选择优惠券" != a.couponName) {
                    var o = parseFloat(a.price) - parseFloat(a.couponPrice);
                    o < 0 && (o = 0), e.setData({
                        "data.payPriceprice": o
                    });
                }
            }
        }), i) {
            for (var r = e.data.data.combTampArr, c = 0, n = 0, d = r.length; n < d; n++) 20 !== r[n].choose_failure && (c += parseFloat(r[n].price));
            console.log("54545454", c), e.setData({
                "data.payPriceprice": c
            });
        }
    },
    selectAddress: function() {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                t.setData({
                    "data.name": e.userName,
                    "data.phone": e.telNumber,
                    "data.province": e.provinceName,
                    "data.city": e.cityName,
                    "data.district": e.countyName,
                    "data.address": e.detailInfo,
                    "data.serverAddress": e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    selectAddress_status: !1
                });
                try {
                    wx.setStorageSync("order_Address", {
                        name: e.userName,
                        phone: e.telNumber,
                        province: e.provinceName,
                        city: e.cityName,
                        district: e.countyName,
                        address: e.detailInfo,
                        serverAddress: e.provinceName + e.cityName + e.countyName + e.detailInfo,
                        selectAddress_status: !1
                    });
                } catch (t) {}
                t.region_price();
            },
            fail: function() {
                console.log("小程序用户信息没授权"), t.setData({
                    selectAddress_status: !0,
                    openSettingBtn: !1
                });
            }
        });
    },
    input_name: function(t) {
        this.setData({
            name02: t.detail.value
        });
    },
    input_phone: function(t) {
        this.setData({
            phone02: t.detail.value
        });
    },
    input_master_id: function(t) {
        this.setData({
            "data.master_id": t.detail.value
        });
    },
    backPage: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    showFlautCon: function() {
        this.setData({
            faultListFlag: !0
        });
    },
    closefaultListBG: function() {
        this.setData({
            faultListFlag: !1
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {
        t = "", n = !0, e = "", i = !1, console.log("fff");
    },
    clickStore: function() {
        wx.navigateTo({
            url: "../stores/stores"
        });
    },
    null_fun: function() {},
    openwin02: function(t) {
        var e = t.target.dataset.url;
        wx.navigateTo({
            url: "../" + e + "/" + e
        });
    },
    checkboxChange: function(t) {
        c = t.detail.value;
    },
    region_price: function() {}
});