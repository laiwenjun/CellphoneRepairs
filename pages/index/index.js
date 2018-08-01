var a = getApp(), t = null, e = null, o = null, l = null, r = null, n = !0;

Page({
   //数据声明初始化
    data: {
        imgUrls: [],
        localModel: "",
        changeModel_alert: !1,
        brandArr: null,
        modelArr: null,
        brandValue: [ 0 ],
        modleValue: [ 0 ],
        faultArr: null,
        faultDetailFlag: !1,
        faultTitle: "",
        faultDetailArr: [],
        faultDetail_note: "",
        is_ico_start: !1,
        dataForm: {
            brandID: "",
            brandName: "",
            modelID: "",
            color_name: "",
            modelName: "",
            thumbImg: "",
            otherRepair: ""
        },
        selectedFaults: [],
        bottom_price: 0,
        number_px: 0,
        guzhang_status: 0,
        othersFailureFlag: !1,
        otherRepair: "",
        focusFlag: !1,
        activityFlag: !1
    },

     //请求加载
    onLoad: function(r) {
        var n = this;
        //
        wx.request({
            url: a.globalData.serverUrl + "viewRecord",
            data: {
                from_appid: a.globalData.appId,
                url: "pages/index/index",
                userID: wx.getStorageSync("azooo_userID")
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                console.log("统计访问首页人数:", a);
            }
        }) , 
        
        n.judge_city(), wx.getSystemInfo({
            success: function(a) {
                n.setData({
                    h: a.windowHeight,
                    into: "ceshi"
                });
            }
        }),

        wx.request({
            url: a.globalData.serverUrl + "getCarousel",
            data: {},
            method: "get",
            success: function(a) {
                console.log("获取轮播图片", a), 0 == a.data.error_code ? n.setData({
                    imgUrls: a.data.data.carousel
                  
                }) : wx.showModal({
                    title: "提示",
                    content: a.data.error_msg,
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定1") : a.cancel && console.log("用户点击取消");
                    }
                });
            }
        });


        try {
            var s = wx.getStorageSync("Allbrandmodel"), i = wx.getStorageSync("AllFault");//所有故障
            if (console.log("本地缓存：", s), s && i) {
                t = s.brandList, e = s.modelList, o = i.lagerRepairList, l = i.repairDetailList;
                var d = n.selectBrand(t[0].brandID);
                n.setData({
                    brandArr: t,
                    modelArr: d,
                    "dataForm.brandID": t[0].brandID,
                    "dataForm.brandName": t[0].brandName,
                    "dataForm.modelID": d[0].modelID,
                    "dataForm.color_name": d[0].color_name,
                    "dataForm.modelName": d[0].modelName,
                    "dataForm.thumbImg": d[0].thumbImg
                }),
                 n.pipei(), n.setData({
                    faultArr: n.getFault(n.data.dataForm.modelID)
                }),
                 wx.getLocation({
                    type: "wgs84",
                    success: function(a) {},
                    fail: function(a) {},
                    complete: function(r) {
                        var s = "", i = "";
                        null != r.latitude && (s = r.latitude, i = r.longitude), wx.request({
                            url: a.globalData.serverUrl + "getAllRepairList",
                            data: {
                                latitude: s,
                                longitude: i
                            },
                            method: "POST",
                            success: function(a) {
                                if (console.log("重新获取所有品牌型号故障信息", a.data), 0 == a.data.error_code) {
                                    t = a.data.data.brandList, e = a.data.data.modelList, o = a.data.data.lagerRepairList, 
                                    l = a.data.data.repairDetailList;
                                    var r = n.selectBrand(11);
                                    a.data.data.firstModelList = r;
                                    try {
                                        wx.setStorage({
                                            key: "Allbrandmodel",
                                            data: {
                                                firstModelList: r,
                                                brandList: t,
                                                modelList: e
                                            }
                                        }), wx.setStorage({
                                            key: "AllFault",
                                            data: {
                                                lagerRepairList: o,
                                                repairDetailList: l
                                            }
                                        }), console.log("保存AllRepairList在本地成功", a);
                                    } catch (a) {
                                        console.log("e", a);
                                    }
                                } else wx.showModal({
                                    title: "提示",
                                    content: a.data.error_msg,
                                    success: function(a) {
                                        a.confirm ? console.log("用户点击确定22") : a.cancel && console.log("用户点击取消");
                                    }
                                });
                            }
                        });
                    }
                });
            } else n.ajaxAllRepairList();
        } catch (a) {
            n.ajaxAllRepairList();
        }
        if (wx.getUpdateManager) {
            var c = wx.getUpdateManager();
            c.onCheckForUpdate(function(a) {
                console.log(a.hasUpdate);
            }), c.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "更新到最新版小程序，获得更好体验。",
                    success: function(a) {
                        a.confirm && c.applyUpdate();
                    }
                });
            }), c.onUpdateFailed(function() {});
        } else wx.showModal({
            title: "提示",
            content: "您的微信版本过低，可以下载最新微信版本，获取更多的小程序功能",
            showCancel: !1,
            confirmText: "知道了",
            success: function(a) {}
        });
    },
      //点击右上角头像，显示个人中心
    bindGetUserInfo: function(t) {
        console.log("bindGetUserInfo", t), wx.getStorage({
            key: "azooo_userID",
            success: function(e) {
                console.log(e.data), e.data ? wx.navigateTo({
                    url: "../my/my"
                }) : t.detail.userInfo && a.wxlogin({
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv,
                    callback: function(a) {
                        1 == a && wx.navigateTo({
                            url: "../my/my"
                        });
                    }
                });
            },

            fail: function() {
                t.detail.userInfo && a.wxlogin({
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv,
                    callback: function(a) {
                        1 == a && wx.navigateTo({
                            url: "../my/my"
                        });
                    }
                });
            }
        });
    },
    swiperClick: function(a) {
        console.log(a);
        var t = a.target.dataset.url;
        t && wx.navigateTo({
            url: "../activity_page/activity_page?url=" + t
        });
    },
    ajaxAllRepairList: function() {
        var r = this;
        console.log("进入ajaxAllRepairList"), wx.getLocation({
            type: "wgs84",
            success: function(a) {},
            fail: function(a) {},
            complete: function(n) {
                var s = "", i = "";
                null != n.latitude && (s = n.latitude, i = n.longitude), console.log("latitude", s), 
                console.log("longitude", i), wx.request({
                    url: a.globalData.serverUrl + "getAllRepairList",
                    data: {
                        latitude: s,
                        longitude: i
                    },
                    method: "POST",
                    success: function(a) {
                        if (console.log("ajaxAllRepairList请求", a), 0 == a.data.error_code) {
                            t = a.data.data.brandList, e = a.data.data.modelList, o = a.data.data.lagerRepairList, 
                            l = a.data.data.repairDetailList;
                            var n = r.selectBrand(t[0].brandID);
                            r.setData({
                                brandArr: t,
                                modelArr: n,
                                "dataForm.brandID": t[0].brandID,
                                "dataForm.brandName": t[0].brandName,
                                "dataForm.modelID": n[0].modelID,
                                "dataForm.color_name": n[0].color_name,
                                "dataForm.modelName": n[0].modelName,
                                "dataForm.thumbImg": n[0].thumbImg
                            }), r.pipei(), r.setData({
                                faultArr: r.getFault(r.data.dataForm.modelID)
                            });
                            var s = r.selectBrand(11);
                            a.data.data.firstModelList = s;
                            try {
                                wx.setStorage({
                                    key: "Allbrandmodel",
                                    data: {
                                        firstModelList: s,
                                        brandList: t,
                                        modelList: e
                                    }
                                }), wx.setStorage({
                                    key: "AllFault",
                                    data: {
                                        lagerRepairList: o,
                                        repairDetailList: l
                                    }
                                }), console.log("保存Allbrandmodel在本地成功", a);
                            } catch (a) {
                                console.log("e", a);
                            }
                        } else wx.showModal({
                            title: "提示",
                            content: a.data.error_msg,
                            success: function(a) {
                                a.confirm ? console.log("用户点击确定33") : a.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                });
            }
        });
    },
    getFault: function(a) {
        var t = [];
        for (var e in o) o[e].model_id == a && (o[e].desc = o[e].desc.substring(0, 4), t.push(o[e]));
        return t;
    },
    pipei: function() {
        var o = this;
        try {
            var l = wx.getSystemInfoSync().model;
            console.log(l);
            var r = [];
            for (var n in e) if (e[n].smallModelName) {
                r = e[n].smallModelName.split(";");
                for (var s in r) if (r[s] == l || r[s] == l.split("<")[0] || r[s] == l.split("(")[0]) {
                    var i = e[n].brandID, d = "", c = e[n].modelID, u = e[n].color_name, m = e[n].modelName, g = e[n].thumbImg, f = 0, h = 0;
                    for (var p in t) t[p].brandID == e[n].brandID && (f = p, d = t[p].brandName);
                    var D = o.selectBrand(e[n].brandID);
                    for (var v in D) D[v].modelID == e[n].modelID && (h = v);
                    o.setData({
                        brandValue: [ f ],
                        modelValue: [ h ],
                        modelArr: D,
                        "dataForm.brandID": i,
                        "dataForm.brandName": d,
                        "dataForm.modelID": c,
                        "dataForm.color_name": u,
                        "dataForm.modelName": m,
                        "dataForm.thumbImg": g
                    });
                }
            }
            wx.request({
                url: a.globalData.serverUrl + "markUserPhone",
                data: {
                    modelName: l
                },
                method: "POST",
                success: function(a) {}
            });
        } catch (a) {
            console.log(a);
        }
    },
    selectBrand: function(a) {
        var t = [];
        for (var o in e) e[o].brandID == a && t.push(e[o]);
        return t;
    },
    ChangeBrand: function(a) {
        var e = this, o = a.detail.value[0], l = e.selectBrand(t[o].brandID);
        e.setData({
            brandValue: [ o ],
            modelValue: [ 0 ],
            "dataForm.brandID": t[o].brandID,
            "dataForm.brandName": t[o].brandName,
            "dataForm.modelID": l[0].modelID,
            "dataForm.color_name": l[0].color_name,
            "dataForm.modelName": l[0].modelName,
            "dataForm.thumbImg": l[0].thumbImg,
            modelArr: l
        }), e.setData({
            selectedFaults: [],
            bottom_price: 0,
            number_px: 0,
            othersFailureFlag: !1,
            faultArr: e.getFault(e.data.dataForm.modelID)
        });
    },
    ChangeModel: function(a) {
        var t = this, e = a.detail.value[0];
        t.setData({
            modelValue: [ e ],
            "dataForm.modelID": t.data.modelArr[e].modelID,
            "dataForm.color_name": t.data.modelArr[e].color_name,
            "dataForm.modelName": t.data.modelArr[e].modelName,
            "dataForm.thumbImg": t.data.modelArr[e].thumbImg
        }), t.setData({
            selectedFaults: [],
            bottom_price: 0,
            number_px: 0,
            othersFailureFlag: !1,
            faultArr: t.getFault(t.data.dataForm.modelID)
        });
    },
    changeModelClick: function() {
        this.setData({
            changeModel_alert: !0
        });
    },
    cancel_model: function() {
        this.setData({
            changeModel_alert: !1
        });
    },
    confirm_model: function() {
        this.setData({
            changeModel_alert: !1
        });
    },
    openwin: function(a) {
        var t = a.target.dataset.url;
        wx.navigateTo({
            url: "../" + t + "/" + t
        });
    },
    clickFailure: function(a) {
        var t = this, e = a.target.dataset.choose_failure, l = a.target.dataset.detail_index || "0";
        r = a.target.dataset.index;
        var n = this.selecLagerRepair(e);
        l && (n[l].class = "on");
        for (var s, i = 0; i < o.length; i++) o[i].choose_failure == e && s != e && (s = o[i].choose_failure, 
        t.setData({
            faultDetail_note: o[i].remark
        }));
        this.setData({
            faultDetailArr: n,
            faultTitle: a.target.dataset.desc,
            faultDetailFlag: !0
        });
    },
    click_fault_details: function(a) {
        var t = a.target.dataset.index, e = this.data.faultDetailArr;
        if (e[t].class) e[t].class = null; else {
            for (var o in e) e[o].class = null;
            e[t].class = "on";
        }
        this.setData({
            faultDetailArr: e
        });
    },
    faultDetail_cancel: function() {
        this.setData({
            faultDetailFlag: !1
        });
    },
    faultDetail_confirm: function() {
        var a = this.data.faultDetailArr;
        console.log(a);
        var t = null, e = !1, o = null;
        for (var l in a) if (a[l].class) {
            e = !0, o = l, t = a[l], console.log(a[l]);
            break;
        }
        var n = this.data.faultArr;
        e ? (n[r].class = "on", n[r].detail_index = o, this.selectedFault(t, n[r].choose_failure), 
        "其他故障" == n[r].desc && ("其他故障" == t.desc ? (this.setData({
            othersFailureFlag: !0
        }), this.setData({
            sTop: 1e3,
            focusFlag: !0
        })) : this.setData({
            othersFailureFlag: !1
        }))) : (n[r].class = null, n[r].detail_index = null, this.delSelectedFault(n[r].choose_failure), 
        "其他故障" == n[r].desc && this.setData({
            othersFailureFlag: !1
        })), this.setData({
            faultArr: n,
            faultDetailFlag: !1
        });
    },
    selecLagerRepair: function(a) {
        var t = [], e = this.data.dataForm.modelID;
        for (var o in l) l[o].choose_failure == a && l[o].model_id == e && (l[o].class = null, 
        t.push(l[o]));
        return t;
    },
    selectedFault: function(a, t) {
        var e = this.data.selectedFaults;
        if (e && e.length) {
            var o = !1;
            for (var l in e) e[l].choose_failure == a.choose_failure && (e[l] = a, o = !0);
            o || e.push(a);
        } else e.push(a);
        return this.setData({
            selectedFaults: e
        }), this.bottom_price(), e;
    },
    delSelectedFault: function(a) {
        var t = this.data.selectedFaults;
        if (t && t.length) for (var e in t) t[e].choose_failure == a && (console.log(t[e]), 
        "其他故障" == t[e].desc && this.setData({
            othersFailureFlag: !1
        }), t.splice(e, 1));
        this.bottom_price(), this.setData({
            selectedFaults: t
        });
    },
    bottom_price: function() {
        var a = this.data.selectedFaults, t = 0;
        if (a && a.length) for (var e in a) t += parseFloat(a[e].price);
        this.setData({
            bottom_price: t
        });
    },
    click_phoneImg: function() {
        var a = this, t = this.data.guzhang_status ? "" : "on", e = this.data.number_px;
        "0" == e && "on" == t ? e = 116 * (a.data.selectedFaults.length + 0) : "0" != e && "" == t && (e = "0"), 
        this.setData({
            guzhang_status: t,
            number_px: e
        });
    },
    delete_function: function(a) {
        var t = a.target.dataset.choose_failure;
        this.delSelectedFault(t), this.refreshBottomHeight();
        var e = this.data.faultArr;
        if (e && e.length) {
            for (var o in e) e[o].choose_failure == t && (e[o].class = null, e[o].detail_index = null);
            this.setData({
                faultArr: e
            });
        }
    },
    refreshBottomHeight: function() {
        var a = this.data.selectedFaults.length, t = 116 * (a + 0);
        0 != a ? this.setData({
            number_px: t
        }) : this.setData({
            number_px: "0",
            guzhang_status: ""
        });
    },
    bindKeyInput: function(a) {
        this.setData({
            otherRepair: a.detail.value
        });
    },
    next: function(t) {
        var e = this;
        console.log("next", t), wx.getStorage({
            key: "azooo_userID",
            success: function(o) {
                if (o.data) e.nextFun(); else {
                    if (!t.detail.userInfo) return !1;
                    a.wxlogin({
                        encryptedData: t.detail.encryptedData,
                        iv: t.detail.iv,
                        callback: function(a) {
                            if (1 != a) return !1;
                            console.log(1), e.nextFun();
                        }
                    });
                }
            },
            fail: function() {
                if (!t.detail.userInfo) return !1;
                a.wxlogin({
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv,
                    callback: function(a) {
                        if (1 != a) return !1;
                        console.log(1), e.nextFun();
                    }
                });
            }
        });
    },
    nextFun: function() {
        var a = this;
        if (!n) return !1;
        if (n = !1, a.data.othersFailureFlag && !a.data.otherRepair) return wx.showModal({
            title: "提示",
            content: "请输入其他故障描述",
            showCancel: !1,
            success: function(a) {
                a.confirm && (console.log("用户点击确定4"), n = !0);
            }
        }), !1;
        var t = a.data.dataForm, e = a.data.selectedFaults, o = t;
        o.price = a.data.bottom_price, o.combTampArr = e, o.couponName = "请选择优惠券", a.data.otherRepair && (o.otherRepair = a.data.otherRepair), 
        console.log(o);
        try {
            wx.removeStorageSync("order_Address"), wx.removeStorageSync("order_storeId"), wx.removeStorageSync("order_data");
        } catch (a) {}
        wx.setStorage({
            key: "order_data",
            data: o,
            success: function() {
                wx.navigateTo({
                    url: "../scheme/scheme"
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "请重新点击",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && console.log("用户点击确定5");
                    }
                });
            }
        });
    },
    null_fun: function() {},
    onShow: function() {
        n = !0, this.show_selModel();
    },
    onShareAppMessage: function() {
        return {
            title: "加速度手机维修",
            desc: "加速度手机维修",
            path: "pages/index/index"
        };
    },
    click_isBtn: function() {
        wx.showModal({
            title: "提示",
            content: "请先选择故障",
            showCancel: !1,
            success: function(a) {
                a.confirm ? console.log("用户点击确定6") : a.cancel && console.log("用户点击取消");
            }
        });
    },
    // openwin_small: function() {
    //     wx.navigateToMiniProgram({
    //         appId: "wxf52190102ef5ee33",
    //         path: "pages/raise/raise",
    //         extraData: {
    //             foo: "bar"
    //         },
    //         envVersion: "release",
    //         success: function(a) {
    //             console.log("跳转到免费换电池小程序");
    //         }
    //     });
    // },
    getModelArr: function() {
        var t = this;
        wx.request({
            url: a.globalData.serverUrl + "battery/getModel",
            data: {},
            method: "post",
            success: function(a) {
                var e = wx.getSystemInfoSync().model;
                for (var o in a.data.data.modelList) -1 != a.data.data.modelList[o].smallModelName.split(";").indexOf(e) && t.setData({
                    is_ico_start: a.data.data.is_start
                });
            }
        });
    },
    judge_city: function() {
        var a = this;
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                console.log("获取当前经纬度", t);
                var e = t.latitude + "," + t.longitude;
                a.find_location(e, function(t) {
                    console.log("根据经纬度获取当前位置", JSON.parse(t.data.match(/\{.*\}/)[0] || null)), -1 != t.data.indexOf("广东省") && a.getModelArr();
                });
            },
            fail: function(a) {}
        });
    },
    find_location: function(a, t) {
        wx.request({
            url: "https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&output=json&pois=0&ak=SalVkqMoNKh8lZugiLBICl0B",
            method: "GET",
            data: {
                location: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                JSON.parse(a.data.match(/\{.*\}/)[0] || null);
                console.log("经纬度获取当前位置", a), t && t(a);
            }
        });
    },
    activityClose: function(a) {
        var t = a.target.dataset.url;
        t && wx.navigateTo({
            url: "../" + t + "/" + t
        }), this.setData({
            activityFlag: !1
        });
    },
    changeModelClick02: function() {
        try {
            wx.getStorageSync("Allbrandmodel") ? wx.navigateTo({
               url: "../sel_model/sel_model"
            }) : wx.showToast({
                title: "加载数据中，请稍等再点击更换机型",
                icon: "success",
                duration: 2e3
            });
        } catch (a) {
            console.log("catch", a);
        }
    },
    show_selModel: function() {
        var a = this, e = wx.getStorageSync("sel_modelInfo"), o = void 0;
        if (e && t && t.length) {
            for (var l = 0; l < t.length; l++) t[l].brandID == e.brandID && (o = t[l].brandName);
            a.setData({
                "dataForm.brandID": e.brandID,
                "dataForm.modelID": e.modelID,
                "dataForm.color_name": e.color_name,
                "dataForm.modelName": e.modelName,
                "dataForm.thumbImg": e.thumbImg,
                "dataForm.brandName": o
            }), a.setData({
                selectedFaults: [],
                bottom_price: 0,
                number_px: 0,
                othersFailureFlag: !1,
                faultArr: a.getFault(e.modelID)
            }), wx.removeStorage({
                key: "sel_modelInfo",
                success: function(a) {}
            });
        }
    }
});