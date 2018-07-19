Page({
    data: {
        question_info: [ {
            question: "什么是机友？",
            answer: [ "成为加速度机友，推荐好友使用加速度可获得现金收益，不设上限，推荐越多收益越高，真正做到加速度、机友双方共赢。" ]
        }, {
            question: "如何加入机友计划？",
            answer: [ "1. 在加速度完成维修订单后，已关注加速度的用户将会获得自己的专属机友海报。", "2. 在加速度 H5 网站或小程序「个人中心」，点击「机友中心」手动加入。" ]
        }, {
            question: "别人如何成为你的「机友」？",
            answer: [ "1. 通过你分享的专属海报关注加速度。", "2. 必须是首次关注使用加速度，才能成为你的「机友」。" ]
        }, {
            question: "机友的回报？",
            answer: [ "1. 你的每一位机友完成的每笔加速度订单，你都可获得相应的5元收益，不设上限。", "2. 当你的机友超过5位后，你的收益将变更为10元奖励，不设上限。推广10个新朋友加入，可获得免费碎屏宝一份。", "3. 收益可通过「机友中心」查询，可随时申请提现至微信钱包，3 ~5 个工作日到账。", "4. 在“机友中心”可以查询你的机友，以及机友订单明细。" ]
        } ],
        status_num: 0
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    click_show: function(n) {
        var t = this, o = n.target.dataset.status;
        t.data.status_num == o ? t.setData({
            status_num: 100
        }) : t.setData({
            status_num: o
        });
    }
});