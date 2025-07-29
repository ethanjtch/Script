export default {
  key: "telegram_channel",
  name: "Telegram频道视频",
  type: "video",
  async search(query, page = 1) {
    const url = `https://t.me/s/${query}?page=${page}`;
    const html = await req(url);
    const result = [];

    const regex = /<video[^>]*src="([^"]+)"[^>]*>.*?<div[^>]*class="tgme_widget_message_text[^"]*"[^>]*>(.*?)<\/div>/g;

    let match;
    while ((match = regex.exec(html)) !== null) {
      const videoUrl = match[1];
      const title = match[2]?.replace(/<[^>]*>?/gm, '').trim() || 'Telegram 视频';

      result.push({
        name: title,
        pic: "",
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
