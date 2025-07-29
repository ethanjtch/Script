export const WidgetMetadata = {
    id: "telegram_channel",
    title: "Telegram 频道视频",
    description: "解析 Telegram 公开频道中的视频内容",
    author: "Ethan",
    site: "https://t.me",
    version: "1.0.0",
    requiredVersion: "0.0.1",
    detailCacheDuration: 60,
    modules: [
        {
            title: "抓取频道视频",
            description: "通过频道名获取 Telegram 中的视频列表",
            requiresWebView: false,
            functionName: "fetchTelegramVideos",
            sectionMode: false,
            cacheDuration: 3600,
            params: [
                {
                    name: "channel",
                    title: "频道名",
                    type: "input",
                    description: "输入 Telegram 频道名（例如 guochan0101）",
                    value: "guochan0101"
                },
                {
                    name: "page",
                    title: "页码",
                    type: "page",
                    description: "可选分页参数",
                    value: 1
                }
            ]
        }
    ],
    search: {
        title: "搜索频道视频",
        functionName: "fetchTelegramVideos",
        params: [
            {
                name: "channel",
                title: "频道名",
                type: "input",
                description: "输入 Telegram 频道名"
            }
        ]
    }
};

// ✅ 一定要导出这个函数！
export async function fetchTelegramVideos({ channel, page = 1 }) {
    const url = `https://t.me/s/${channel}?page=${page}`;
    const html = await req(url);
    const result = [];

    const regex = /<video[^>]+src="([^"]+)"[^>]*>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        result.push({
            name: `视频 ${result.length + 1}`,
            url: match[1],
            pic: "",
            remark: `来自频道 @${channel}`
        });
    }

    return result;
}