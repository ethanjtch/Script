var widget = {
  metadata: {
    name: "Telegram Channel Video",
    description: "播放 Telegram 频道视频",
    version: "1.0.0",
    author: "Ethan",
    link: "https://t.me/your_channel_name"
  },
  // widget 的主要逻辑
  run: async function (params) {
    // 实现播放逻辑或数据提取逻辑
    return {
      type: "video", // 或者 "list", "link", 具体视你的内容而定
      title: "Telegram 视频标题",
      url: "https://telegram-cdn-url/video.mp4", // 实际播放地址
    };
  }
};