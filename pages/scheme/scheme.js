//选择维修方案目录1


var a, e, t = getApp(), o = !0, r = !1, s = !0, i = [ 1 ], n = 0, c = 0;
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
        status: "72",
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
            repairWay: 72,
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
        timeValue: [ 1 ],
        timeFlag: !1,
        couponFlag: !0,
        yuyue_text_99: !0
    },
    onLoad: function(e) {
        var o = this;
        wx.getStorage({
            key: "azooo_userID",
            success: function(a) {
                o.setData({
                    "data.userID": a.data
                });
            },
            fail: function() {
                wx.showModal({
                    title: "温馨提示",
                    content: "获取userid失败，请返回首页重新进入",
                    success: function(a) {
                        a.confirm && console.log("用户点击确定");
                    }
                });
            }
        }), wx.request({
            url: t.globalData.serverUrl + "getOrderTime",
            data: {},
            method: "GET",
            success: function(a) {
                var e = a.data.data.time, t = JSON.parse(e.time_interval_str.trim()), r = t.weekArr;
                o.setData({
                    time_list: e,
                    time_interval_str: t,
                    time_list_weekArr: r
                }), o.showTime(parseInt(e.longest_appointment)), o.showTimeDetaile(!0);
            },
            fail: function() {}
        }), wx.request({
            url: t.globalData.serverUrl + "getStores",
            data: {},
            method: "GET",
            success: function(e) {
                0 == e.data.error_code ? a = e.data.data.store : wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && console.log("用户点击确定");
                    }
                });
            }
        }), o.time_limit();
    },
    onShow: function() {
        var e = this;
        if (wx.getSetting ? wx.getSetting({
            success: function(a) {
                console.log(a), !1 === a.authSetting["scope.address"] ? e.setData({
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
            success: function(a) {}
        }), wx.getStorage({
            key: "order_data",
            success: function(a) {
                console.log(a.data);
                var t = a.data;
                if (console.log("缓存优惠券", t), !t.couponID) {
                    var o = t.combTampArr, r = !1;
                    if (t.color_name) for (i = 0; i < o.length; i++) 1 === o[i].is_connect_color && (r = !0);
                    if ("string" == typeof t.color_name && t.color_name) {
                        for (var s = t.color_name.split(","), i = 0; i < s.length; i++) s[i] = {
                            text: s[i],
                            class: !1
                        };
                        e.setData({
                            "data.color_name": s
                        });
                    }
                    e.setData({
                        "data.brandName": t.brandName,
                        "data.brandID": t.brandID,
                        "data.modelName": t.modelName,
                        "data.modelID": t.modelID,
                        "data.isColor": r,
                        "data.combTampArr": t.combTampArr,
                        "data.thumbImg": t.thumbImg,
                        "data.price": t.price,
                        "data.payPriceprice": t.price,
                        "data.otherRepair": t.otherRepair
                    });
                }
            }
        }), o) return o = !1, !1;
        if (e.region_price(e.getScreenRepairPrice()), wx.getStorage({
            key: "order_data",
            success: function(a) {
                var t = a.data;
                if ("请选择优惠券" != t.couponName) {
                    var o = parseFloat(t.price) - parseFloat(t.couponPrice);
                    o < 0 && (o = 0), e.setData({
                        "data.payPriceprice": o,
                        "data.couponID": t.couponID,
                        "data.couponPrice": t.couponPrice,
                        "data.couponName": t.couponName
                    });
                }
            }
        }), wx.getStorage({
            key: "order_storeId",
            success: function(t) {
                console.log(t.data);
                var o = t.data;
                e.setData({
                    "data.storeId": o
                });
                for (var r in a) a[r].id == o && e.setData({
                    store_name: a[r].name,
                    store_address: a[r].address,
                    store_time: a[r].serviceTime,
                    store_phone: a[r].phone,
                    store_status: !0
                });
            }
        }), r) {
            for (var t = e.data.data.combTampArr, s = 0, i = 0, n = t.length; i < n; i++) 20 !== t[i].choose_failure && (s += parseFloat(t[i].price));
            e.setData({
                "data.payPriceprice": s
            });
        }
    },
    onReady: function() {},
    click_color: function(a) {
        var e = a.target.dataset.index, t = this.data.data.color_name;
        if (t[e].class) t[e].class = null; else {
            for (var o in t) t[o].class = null;
            t[e].class = "on";
        }
        this.setData({
            "data.color_name": t
        }), wx.setStorage({
            key: "order_data",
            data: this.data.data
        });
    },
    openwin: function(a) {
        if (1 == n || 1 == c) wx.showModal({
            title: "提示",
            content: "当前价格为活动价，不能使用优惠券",
            showCancel: !1,
            success: function(a) {
                if (a.confirm) return console.log("用户点击确定"), !1;
                a.cancel && console.log("用户点击取消");
            }
        }); else {
            var e = a.target.dataset.url;
            wx.navigateTo({
                url: "../" + e + "/" + e
            });
        }
    },
    formSubmit: function(a) {
        var e = a.detail.formId, o = [], r = "", n = !1, c = this, d = this.data.data;
        if (72 == d.repairWay) {
            if (1 == c.data.selectAddress_status) return wx.showModal({
                title: "提示",
                content: "请选择服务地址",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1;
            if ("请选择上门时间" == d.timeStr) return wx.showModal({
                title: "提示",
                content: "请选择上门时间",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1;
            var l = new Date().getFullYear(), u = d.timeStr.split("月")[0].replace(/(明天|今天)/gi, ""), m = d.timeStr.split("月")[1].split("日")[0], p = d.timeStr.split("日")[1];
            u < 10 && (u = "0" + u), m < 10 && (m = "0" + m), r = l + "-" + u + "-" + m + " " + p, 
            "尽快到达" == p && (r = 0), n = !0;
        } else if (73 == d.repairWay) {
            if ("" == d.storeId || !c.data.store_status) return wx.showModal({
                title: "提示",
                content: "请选择门店",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1;
            if ("" == c.data.name02) return wx.showModal({
                title: "提示",
                content: "请输入您的姓名",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1;
            if (11 != c.data.phone02.length) return "" == c.data.phone02 ? (wx.showModal({
                title: "提示",
                content: "请输入您的手机号码",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1) : (wx.showModal({
                title: "提示",
                content: "请输入正确的手机号码",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1);
            n = !0, c.setData({
                "data.name": c.data.name02,
                "data.phone": c.data.phone02
            });
        } else if (74 == d.repairWay) {
            if (1 == c.data.selectAddress_status) return wx.showModal({
                title: "提示",
                content: "请填写您的回寄地址",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1;
            n = !0;
        } else if (75 == d.repairWay) {
            if ("" == c.data.name02) return wx.showModal({
                title: "提示",
                content: "请输入您的姓名",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1;
            if (11 != c.data.phone02.length) return "" == c.data.phone02 ? (wx.showModal({
                title: "提示",
                content: "请输入您的手机号码",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1) : (wx.showModal({
                title: "提示",
                content: "请输入正确的手机号码",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1);
            if ("" == d.master_id) return wx.showModal({
                title: "提示",
                content: "请输入工程师编号",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1;
            n = !0, c.setData({
                "data.name": c.data.name02,
                "data.phone": c.data.phone02
            });
        }
        if (n) {
            for (var f = d.combTampArr, h = 0; h < f.length; h++) o.push(f[h].id);
            var g = c.data.data.isColor, _ = c.data.data.color_name, w = "";
            if (g && _) {
                for (h = 0; h < _.length; h++) _[h].class && (w = _[h].text);
                if (!w) return wx.showModal({
                    title: "提示",
                    content: "请选择颜色",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && console.log("用户点击确定");
                    }
                }), !1;
            }
            if (0 == i.length) return wx.showModal({
                title: "提示",
                content: "请勾选同意下方的《服务协议》，即可立刻维修哦",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), !1;
            if (!s) return !1;
            s = !1, wx.showToast({
                title: "提交预约中...",
                icon: "loading",
                duration: 1e4,
                mask: !0
            });
            var D = null;
            try {
                D = wx.getStorageSync("from_appid"), console.log("from_appid:", D);
            } catch (a) {
                console.log("from_appid", a);
            }
            wx.request({
                url: t.globalData.serverUrl + "newEnterOrder",
                data: {
                    from_appid: D,
                    brandName: d.brandName,
                    modelName: d.modelName,
                    colorName: w,
                    storeId: d.storeId,
                    comIds: o,
                    orderTime: r,
                    brandID: d.brandID,
                    modelID: d.modelID,
                    repairWay: d.repairWay,
                    desc: d.desc,
                    promo_code: d.invitationCode,
                    name: d.name,
                    phone: d.phone,
                    master_id: d.master_id,
                    province: d.province,
                    city: d.city,
                    district: d.district,
                    address: d.address,
                    userUploadImgs: d.userUploadImgs,
                    couponID: d.couponID,
                    userID: d.userID,
                    otherRepair: d.otherRepair,
                    form_id: e || (t.globalData.appId ? t.globalData.appId : ""),
                    wxa_scene: t.globalData.scene ? t.globalData.scene : null
                },
                method: "POST",
                success: function(a) {
                    console.log(a), 0 == a.data.error_code ? wx.redirectTo({
                        url: "../success/success?id=" + a.data.data.id + "&status=" + c.data.status + "&storeId=" + d.storeId
                    }) : wx.showModal({
                        title: "提示",
                        content: JSON.stringify(a.data),
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && console.log("用户点击确定");
                        }
                    });
                },
                fail: function() {
                    wx.showModal({
                        title: "提示",
                        content: "接口调用失败fail",
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && console.log("用户点击确定");
                        }
                    });
                },
                complete: function() {
                    wx.hideToast(), s = !0;
                }
            });
        }
    },
    inputMark: function(a) {
        this.data.data.desc = a.detail.value, this.setData({
            data: this.data.data
        });
    },
    blurMark: function() {
        wx.setStorage({
            key: "order_data",
            data: this.data.data
        });
    },
    inputInvitation: function(a) {
        this.data.data.invitationCode = a.detail.value, this.setData({
            data: this.data.data
        }), e = a.detail.value;
    },
    exchange_fun: t.throttle(1e3, function() {
        var a = this, o = a.data.data.modelID, i = a.data.data.combTampArr;
        if (i) {
            if (!([ 168, 169, 22, 23, 237, 16, 35, 3, 1, 2 ].indexOf(o) > -1)) return wx.showModal({
                title: "提示",
                content: "该机型不在本次活动范围之内",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), a.setData({
                "data.invitationCode": ""
            }), !1;
            for (var n = !0, c = 0, d = i.length; c < d; c++) if (20 === i[c].choose_failure) {
                n = !1;
                break;
            }
            if (n) return wx.showModal({
                title: "提示",
                content: "维修故障类型必须包含电池故障才能使用兑换码",
                showCancel: !1,
                success: function(a) {
                    a.confirm && console.log("用户点击确定");
                }
            }), a.setData({
                "data.invitationCode": ""
            }), !1;
        }
        wx.request({
            url: t.globalData.serverUrl + "checkPromoCode",
            method: "POST",
            data: {
                promo_code: e,
                modelId: o
            },
            header: {},
            success: function(e) {
                if (s = !0, 0 == e.data.error_code) {
                    r = !0;
                    for (var t = 0, o = 0, n = i.length; o < n; o++) 20 !== i[o].choose_failure ? t += parseFloat(i[o].price) : 20 == i[o].choose_failure && a.setData({
                        "data.duihuan_price": i[o].price
                    });
                    a.setData({
                        "data.payPriceprice": t
                    }), wx.showToast({
                        title: "兑换成功",
                        icon: "success",
                        duration: 2e3,
                        mask: !0
                    });
                } else r = !1, a.setData({
                    "data.invitationCode": ""
                }), wx.showModal({
                    title: "提示",
                    content: e.data.error_msg,
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && console.log("用户点击确定");
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
        var a = this.data.dateArr, e = this.data.timeArr, t = a[this.data.dateValue].text;
        t += e[this.data.timeValue].text, this.data.data.timeStr = t, this.setData({
            timeFlag: !0,
            data: this.data.data,
            timeShadeFlag: !1
        }), wx.setStorage({
            key: "order_data",
            data: this.data.data
        });
    },
    ChangeDate: function(a) {
        var e = a.detail.value[0];
        console.log(e), this.setData({
            dateValue: [ e ],
            timeValue: [ 0 ]
        }), 0 == e ? this.showTimeDetaile(!0) : this.showTimeDetaile(!1);
    },
    ChangeTime: function(a) {
        var e = a.detail.value[0];
        this.setData({
            timeValue: [ e ]
        }), this.data.timeFlag && this.time_confirm();
    },
    showTime: function(a) {
        if (this.isLeapYear(r)) e = [ "31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31" ]; else var e = [ "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31" ];
        var t = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"), o = new Date(), r = o.getFullYear(), s = o.getMonth(), i = o.getDate() - 1, n = o.getDay() - 1;
        o.getHours(), o.getMinutes(), o.getSeconds();
        s < 10 && (s = "0" + s);
        for (var c = s = parseInt(s) + 1, d = "", l = [], u = 0; u < a; u++) {
            var m = n + 1;
            m >= 7 && (m -= 7), n = m, (d = i + 1) > e[c - 1] && (d -= e[c - 1], (c += 1) > 12 && (c -= 12)), 
            i = d, this.checkoutWeek(t[m]) ? 0 == u ? l.push({
                text: "今天" + c + "月" + d + "日",
                class: !0
            }) : 1 == u ? l.push({
                text: "明天" + c + "月" + d + "日",
                class: !1
            }) : l.push({
                text: c + "月" + d + "日",
                class: !1
            }) : a++;
        }
        this.setData({
            dateArr: l
        });
    },
    showTimeDetaile: function(a) {
        var e = this.data.time_list, t = this.data.time_interval_str, o = parseInt(t.sm_star_hour), r = parseInt(t.sm_star_minute), s = parseInt(t.sm_end_hour), i = parseInt(t.sm_end_minute), n = parseInt(e.seg_time_periods), c = 60 * o + r, d = 60 * s + i, l = c;
        l += n;
        var u = [];
        for (a && u.push({
            text: "尽快到达",
            class: !1
        }); l <= d + n; ) a ? c >= 60 * new Date().getHours() + new Date().getMinutes() + parseInt(e.reservation_time) && u.push({
            text: this.transformTime(c),
            class: !1
        }) : u.push({
            text: this.transformTime(c),
            class: !1
        }), c = l, l += n;
        this.setData({
            timeArr: u
        });
    },
    transformTime: function(a) {
        var e = parseInt(a / 60), t = a % 60;
        return e < 10 && (e = "0" + e), t < 10 && (t = "0" + t), e + ":" + t;
    },
    checkoutWeek: function(a) {
        for (var e = this.data.time_list_weekArr, t = 0; t < e.length; t++) if (e[t] == a) return !0;
        return !1;
    },
    isLeapYear: function(a) {
        var e = a % 100 != 0, t = a % 400 == 0;
        return !!(a % 4 == 0 && e || t);
    },
    selectMode: function(a) {
        for (var e = this, t = a.target.dataset.modeid, o = a.target.dataset.index, s = this.data.mode, i = 0; i < s.length; i++) s[i].class = !1, 
        o == i && (s[i].class = !0);
        this.setData({
            status: t,
            mode: s,
            "data.repairWay": t
        });
        var n = !1;
        if (72 == t ? e.data.selectAddress_status ? n = !1 : (console.log(e.data.selectAddress), 
        n = !0) : 73 == t ? n = 1 == e.data.store_status : 74 == t ? n = !e.data.selectAddress_status : 75 == t && (n = !0), 
        n ? 75 == t ? e.getScreenRepairPrice(e.region_price()) : e.region_price(e.getScreenRepairPrice()) : e.getScreenRepairPrice(), 
        wx.getStorage({
            key: "order_data",
            success: function(a) {
                var t = a.data;
                if ("请选择优惠券" != t.couponName) {
                    var o = parseFloat(t.price) - parseFloat(t.couponPrice);
                    o < 0 && (o = 0), e.setData({
                        "data.payPriceprice": o
                    });
                }
            }
        }), r) {
            for (var c = e.data.data.combTampArr, d = 0, i = 0, l = c.length; i < l; i++) 20 !== c[i].choose_failure && (d += parseFloat(c[i].price));
            e.setData({
                "data.payPriceprice": d
            });
        }
    },
    selectMode_99: function() {
        for (var a = this, e = this.data.mode, t = 0; t < e.length; t++) e[t].class = !1, 
        1 == t && (e[t].class = !0);
        this.setData({
            status: 73,
            mode: e,
            "data.repairWay": 73
        });
        if (1 == a.data.store_status ? a.region_price(a.getScreenRepairPrice()) : (a.getScreenRepairPrice(), 
        wx.getStorage({
            key: "order_data",
            success: function(e) {
                for (var t = e.data.combTampArr, o = 0, r = 0; r < t.length; r++) if (20 === t[r].choose_failure) {
                    o += 99;
                    var s = a.data.data.combTampArr;
                    s[r].price = 99, a.setData({
                        "data.combTampArr": s
                    });
                } else o += parseFloat(t[r].price);
                a.setData({
                    "data.payPriceprice": o
                });
            }
        })), wx.getStorage({
            key: "order_data",
            success: function(e) {
                var t = e.data;
                if ("请选择优惠券" != t.couponName) {
                    var o = parseFloat(t.price) - parseFloat(t.couponPrice);
                    o < 0 && (o = 0), a.setData({
                        "data.payPriceprice": o
                    });
                }
            }
        }), r) {
            for (var o = a.data.data.combTampArr, s = 0, t = 0, i = o.length; t < i; t++) 20 !== o[t].choose_failure && (s += parseFloat(o[t].price));
            a.setData({
                "data.payPriceprice": s
            });
        }
    },
    selectAddress: function() {
        var a = this;
        wx.chooseAddress ? wx.chooseAddress({
            success: function(e) {
                a.setData({
                    "data.name": e.userName,
                    "data.phone": e.telNumber,
                    "data.province": e.provinceName,
                    "data.city": e.cityName,
                    "data.district": e.countyName,
                    "data.address": e.detailInfo,
                    "data.serverAddress": e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    selectAddress_status: !1
                }), wx.setStorage({
                    key: "order_Address",
                    data: {
                        name: e.userName,
                        phone: e.telNumber,
                        province: e.provinceName,
                        city: e.cityName,
                        district: e.countyName,
                        address: e.detailInfo,
                        serverAddress: e.provinceName + e.cityName + e.countyName + e.detailInfo,
                        selectAddress_status: !1
                    }
                }), a.region_price(a.getScreenRepairPrice());
            },
            fail: function(e) {
                console.log(e), a.setData({
                    selectAddress_status: !0,
                    openSettingBtn: !1
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "您的微信版本过低，暂不支持此功能，可以下载最新微信版本，获取更多的小程序功能",
            showCancel: !1,
            confirmText: "知道了",
            success: function(a) {}
        });
    },
    input_name: function(a) {
        this.setData({
            name02: a.detail.value
        });
    },
    input_phone: function(a) {
        this.setData({
            phone02: a.detail.value
        });
    },
    input_master_id: function(a) {
        this.setData({
            "data.master_id": a.detail.value
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
    onUnload: function() {
        a = "", o = !0, e = "", r = !1, n = 0, c = 0;
    },
    clickStore: function() {
        var a = this;
        wx.navigateTo({
            url: "../stores/stores?yuyue_text_99=" + a.data.yuyue_text_99
        });
    },
    null_fun: function() {},
    openwin02: function(a) {
        var e = a.target.dataset.url;
        wx.navigateTo({
            url: "../" + e + "/" + e
        });
    },
    checkboxChange: function(a) {
        i = a.detail.value;
    },
    region_price: function(a) {
        var e, o, r, s, i = this;
        e = wx.getStorageSync("order_data");
        for (var c = 0; c < e.combTampArr.length; c++) 20 == e.combTampArr[c].choose_failure && (s = e.combTampArr[c].detail_failure);
        if (s) try {
            o = wx.getStorageSync("order_storeId"), r = wx.getStorageSync("order_Address"), 
            e && (o || r || i.data.data.repairWay) && wx.request({
                url: t.globalData.serverUrl + "getRepairPrice",
                data: {
                    brandID: e.brandID ? e.brandID : "",
                    modelID: e.modelID ? e.modelID : "",
                    city: r.city ? r.city : "",
                    district: r.district ? r.district : "",
                    ChooseFailure: 20,
                    storeID: o || "",
                    repairWay: i.data.data.repairWay ? i.data.data.repairWay : 72,
                    detailFailure: s
                },
                method: "POST",
                success: function(t) {
                    if (0 == t.data.error_code) {
                        console.log("电池价格", t.data.data.price);
                        var o = parseInt(t.data.data.price), r = 0, s = e.combTampArr;
                        (n = t.data.data.is_activity) && i.setData({
                            "data.couponID": "",
                            "data.couponName": "请选择优惠券",
                            "data.couponPrice": ""
                        });
                        for (var c = 0; c < s.length; c++) if (20 === s[c].choose_failure) {
                            r += o;
                            var d = i.data.data.combTampArr;
                            d[c].price = o, i.setData({
                                "data.combTampArr": d
                            });
                        } else r += parseFloat(s[c].price);
                        i.data.data.couponID && i.data.data.couponPrice && (r -= i.data.data.couponPrice), 
                        i.setData({
                            "data.payPriceprice": r
                        });
                    } else console.log("99换电池接口失败");
                    a && a();
                },
                fail: function() {},
                complete: function() {}
            });
        } catch (a) {}
    },
    time_limit: function() {
        var a = this, e = wx.getStorageSync("order_data");
        wx.request({
            url: t.globalData.serverUrl + "get99ScreenInfo",
            data: {},
            method: "POST",
            success: function(t) {
                if (console.log("99换屏幕活动，时间限制", t.data.data.model[0]), 0 == t.data.error_code) {
                    for (var o = 0, r = t.data.data.model.length; o < r; o++) if (t.data.data.model[o] == e.modelID) for (var s = 0, i = e.combTampArr.length; s < i; s++) if (11 == e.combTampArr[s].choose_failure && 23 == e.combTampArr[s].detail_failure) {
                        var n = new Date("2018/04/27 16:00:00").getTime(), c = new Date("2018/05/31 23:59:59").getTime(), d = new Date().getTime();
                        d > n && d < c && (a.setData({
                            yuyue_text_99: !1
                        }), a.selectMode_99());
                    }
                } else console.log("99换屏幕活动，时间限制接口失败");
            }
        });
    },
    getScreenRepairPrice: function(a) {
        var e, o, r, s, i = this;
        e = wx.getStorageSync("order_data");
        for (var n = 0; n < e.combTampArr.length; n++) 11 == e.combTampArr[n].choose_failure && (s = e.combTampArr[n].detail_failure);
        if (23 == s) try {
            o = wx.getStorageSync("order_storeId"), r = wx.getStorageSync("order_Address"), 
            e && (o || r || i.data.data.repairWay) && wx.request({
                url: t.globalData.serverUrl + "getScreenRepairPrice",
                data: {
                    brandID: e.brandID ? e.brandID : "",
                    modelID: e.modelID ? e.modelID : "",
                    city: r.city ? r.city : "",
                    district: r.district ? r.district : "",
                    ChooseFailure: 11,
                    storeID: o || 100,
                    repairWay: i.data.data.repairWay ? i.data.data.repairWay : 72,
                    detailFailure: s
                },
                method: "POST",
                success: function(t) {
                    if (0 == t.data.error_code) {
                        console.log("屏幕价格", t.data.data.price);
                        var o = parseInt(t.data.data.price), r = 0, s = e.combTampArr;
                        (c = t.data.data.is_activity) && i.setData({
                            "data.couponID": "",
                            "data.couponName": "请选择优惠券",
                            "data.couponPrice": ""
                        });
                        for (var n = 0; n < s.length; n++) if (11 === s[n].choose_failure) {
                            r += o;
                            var d = i.data.data.combTampArr;
                            d[n].price = o, i.setData({
                                "data.combTampArr": d
                            });
                        } else r += parseFloat(s[n].price);
                        i.data.data.couponID && i.data.data.couponPrice && (r -= i.data.data.couponPrice), 
                        i.setData({
                            "data.payPriceprice": r
                        }), a && a();
                    } else console.log("99换屏幕接口失败");
                },
                fail: function() {},
                complete: function() {}
            });
        } catch (a) {
            console.log(a);
        }
    }
});