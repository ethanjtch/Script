export default {
  key: "telegram_channel",
  name: "Telegram频道视频",
  type: "video",

  async search(query, page = 1) {
    const url = `https://t.me/s/${query}?page=${page}`;
    const html = await req(url);
    if (!html) return [];

    const result = [];

    // 识别视频链接（部分频道视频为 <video src="..." />）
    const videoRegex = /<video[^>]+src="([^"]+)"[^>]*>/g;

    let match;
    while ((match = videoRegex.exec(html)) !== null) {
      const videoUrl = match[1];
      const title = `Telegram 视频 ${result.length + 1}`;
      result.push({
        name: title,
        pic: "", // 可留空或设置默认封面
        url: videoUrl
      });
    }

    return result;
  },

  async play(url) {
    return {
      type: "video",
      url: url
    };
  }
};
