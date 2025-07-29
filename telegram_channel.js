export default {
  key: "telegram_video",
  name: "Telegram频道视频",
  type: "video",
  async search(query, page = 1) {
    const url = `https://t.me/s/${query}?page=${page}`;
    const html = await req(url);
    const videoItems = [];

    const regex = /<video.+?src="([^"]+)"[^>]*>.*?<div[^>]*class="tgme_widget_message_text[^"]*"[^>]*>(.*?)<\/div>/g;

    let match;
    while ((match = regex.exec(html)) !== null) {
      const videoUrl = match[1];
      const title = match[2]?.replace(/<[^>]*>?/gm, '').trim() || 'Telegram 视频';

      videoItems.push({
        name: title,
        pic: "", // 无封面时可设为空
        url: videoUrl,
      });
    }
    return videoItems;
  },
  async play(url) {
    return {
      type: "video",
      url,
    };
  }
}
