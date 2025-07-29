export default {
  key: "telegram_channel",
  name: "Telegram频道",
  type: "video", // 类型保持与 Forward 接口一致

  // 首页推荐（可选实现）
  async home(filter) {
    return [];
  },

  // 分类接口（可选实现）
  async category(filter, page = 1) {
    return {
      list: [],
      page: 1,
      pagecount: 1,
      limit: 20,
      total: 0
    };
  },

  // 搜索接口（核心）
  async search(keyword, page = 1) {
    const url = `https://t.me/s/${keyword}?page=${page}`;
    const html = await req(url);
    const result = [];

    const regex = /<video[^>]+src="([^"]+)"[^>]*>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      result.push({
        name: `Telegram 视频 ${result.length + 1}`,
        pic: "",
        remark: "",
        id: match[1], // 用视频链接作为唯一 id
      });
    }

    return {
      list: result,
      page: page,
      pagecount: 1,
      limit: 20,
      total: result.length
    };
  },

  // 详情页接口（用于展示单个视频详情，可省略内容）
  async detail(id) {
    return {
      name: "Telegram 视频",
      episodes: [
        {
          name: "播放",
          urls: [
            {
              name: "高清",
              url: id
            }
          ]
        }
      ]
    };
  },

  // 播放接口（用于视频解析）
  async play(url) {
    return {
      type: "video",
      url
    };
  }
};
