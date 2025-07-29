var widget = {
  metadata: {
    name: "Telegram Channel Video",
    version: "1.0.0",
    description: "解析并展示 Telegram 公共频道中的视频内容",
    author: "Ethan",
  },

  async run() {
    const channelUrl = "https://t.me/s/guochan0101";

    const html = await this.$http.get(channelUrl);
    const doc = this.$html(html);

    const items = [];

    doc.querySelectorAll("video").forEach((video, index) => {
      const source = video.querySelector("source")?.src || video.src;
      if (!source) return;

      items.push({
        title: `视频 ${index + 1}`,
        url: source,
        desc: "来自 Telegram 频道 guochan0101",
      });
    });

    return items;
  },
};