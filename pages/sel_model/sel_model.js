getApp();

var e = null;
//选择自己当前的机型
Page({
    data: {
        brandArr: null,
        windowHeight: 0,
        selModel_brandID: 11,
        sel_modelList: null,
        sel_modelList02: null,
        sel_result: !1,
        sel_resultArr: null
    },
    onLoad: function(e) {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                console.log(e.windowHeight), t.setData({
                    windowHeight: e.windowHeight
                });
            }
        }), t.getModelList();
    },
    selModel_modelid: function(e) {
        var t = e.target.dataset.model;
        console.log("选择机型", t), wx.setStorageSync("sel_modelInfo", t), wx.navigateBack({
            delta: 1
        });
    },
    selModel_brandid: function(e) {
        var t = e.target.dataset.brandid;
        this.setData({
            selModel_brandID: t
        });
    },
    input_focus: function() {
        this.setData({
            sel_result: !0
        });
    },
    input_blur: function() {
        this.setData({
            sel_result: !1
        });
    },
    input_for: function(t) {
        for (var l = t.detail.value, s = wx.getStorageSync("Allbrandmodel"), o = [], a = 0, n = (e = s.modelList).length; a < n; a++) new RegExp(l, "ig").test(e[a].modelName) && o.push(e[a]);
        this.setData({
            sel_resultArr: o
        });
    },
    getModelList: function() {
        var t = this;
        try {
            var l = wx.getStorageSync("Allbrandmodel");
            if (console.log("dsdsds", l), l && (e = l.modelList, console.log("机型缓存", l), t.setData({
                brandArr: l.brandList,
                sel_modelList: l.firstModelList
            }), e && e.length)) {
                for (var s = 0; s < e.length; s++) 11 == e[s].brandID && e.splice(s--, 1);
                t.setData({
                    sel_modelList02: e
                }), console.log("AllRepairList1111111111", l);
            }
        } catch (e) {
            console.log("catch", e);
        }
    }
});