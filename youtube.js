var rule = {
    title: 'YouTube',
    host: 'https://www.youtube.com',
    homeUrl: '',
    url: '',
    searchable: 0,
    quickSearch: 0,
    filterable: 0,

    // 可配置多个频道
    class_name: ['Google Dev', 'TED', 'CrashCourse'], // 频道名称
    class_url: [
        'UC_x5XG1OV2P6uZZ5FSM9Ttw', // Google Dev
        'UCsT0YIqwnpJCM-mx7-gSA4Q', // TED
        'UCX6b17PVsYBQ0ip5gyeme-Q', // CrashCourse
    ],

    play_parse: true,
    parse: true,
    lazy: '',
    limit: 10,

    推荐: '*',

    // 一级页面：获取视频列表
    一级: function (html, url) {
        var list = [];
        var items = pdfa(html, 'entry');
        items.forEach(it => {
            var title = pdfh(it, 'title&&Text');
            var vid = pdfh(it, 'yt\\:videoId&&Text');
            var pic = 'https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg';
            var desc = pdfh(it, 'author&&name&&Text');
            list.push({
                vod_id: 'https://www.youtube.com/watch?v=' + vid,
                vod_name: title,
                vod_pic: pic,
                vod_remarks: desc
            });
        });
        return list;
    },

    // 二级页面：播放视频
    二级: function (url) {
        return {
            vod_id: url,
            vod_name: url,
            vod_pic: '',
            type_name: 'YouTube',
            vod_play_from: 'YouTube',
            vod_play_url: '播放$' + url
        };
    },

    // 根据用户选择的频道生成 RSS URL
    homeVod: function (index) {
        var channelId = this.class_url[index];
        return 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
    }
};