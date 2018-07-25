//问题反馈脚本
var t = getApp();
Page({
    data: {
        imgArr: [],
        uploadimgArr: [],
        textareaVal: "",
        inputVal: ""
    },
    onLoad: function(t) {},
    addImg: function() {
        var a = this, e = this.data.imgArr, o = this.data.uploadimgArr;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(n) {
                var i = n.tempFilePaths;
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
                        var n = JSON.parse(t.data.trim());
                        0 == n.error_code ? (e.push(i[0]), o.push(n.data.path), a.setData({
                            imgArr: e,
                            uploadimgArr: o
                        })) : wx.showToast({
                            title: n.error_msg,
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
        var a = this.data.imgArr, e = t.target.dataset.index;
        if (a.length) for (var o = 0; o < a.length; o++) o == e && a.splice(o, 1);
        this.setData({
            imgArr: a
        });
    },
    previewImage: function(t) {
        wx.previewImage({
            current: t.target.dataset.url,
            urls: [ t.target.dataset.url ]
        });
    },
    textareaVal: function(t) {
        this.setData({
            textareaVal: t.detail.value
        });
    },
    inputVal: function(t) {
        this.setData({
            inputVal: t.detail.value
        });
    },
    confirm: function() {
        var a = this.data.textareaVal, e = this.data.inputVal, o = this.data.uploadimgArr;
        return a ? e && !this.regularPhoneNumber(e) ? (wx.showModal({
            title: "提示",
            content: "手机号码格式不对",
            showCancel: !1,
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        }), !1) : (wx.showToast({
            title: "提交中...",
            icon: "loading",
            duration: 1e4
        }), void wx.request({
            url: t.globalData.serverUrl + "advise",
            data: {
                phone: e,
                cont: a,
                img: o
            },
            method: "POST",
            success: function(t) {
                console.log(t), 0 == t.data.error_code ? wx.showModal({
                    title: "提示",
                    content: "提交成功，感谢您的问题和建议",
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
        })) : (wx.showModal({
            title: "提示",
            content: "请填写您的问题和建议",
            showCancel: !1,
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        }), !1);
    },
    regularPhoneNumber: function(t) {
        var a = t.replace(/\s|\-/g, "");
        return 0 == a.indexOf("+86") && (a = a.substr(3)), /^1\d{10}$/g.test(a) ? a : null;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});