var WidgetMetadata = {
  id: "rss_video_feed",
  title: "RSS 视频订阅",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "通过 RSS 订阅源获取视频内容",
  author: "Ethan",
  site: "https://example.com",
  modules: [
    {
      title: "RSS 视频订阅",
      description: "从 RSS 地址加载视频列表",
      functionName: "getVideosFromRss",
      params: [
        {
          name: "rssUrl",
          title: "RSS 地址",
          type: "input",
          description: "请输入包含视频 enclosure 的 RSS Feed URL",
          value: "",
        },
        {
          name: "page",
          title: "页码",
          type: "page",
          value: 1,
        }
      ],
    },
  ]
};

const PAGE_SIZE = 20;

async function getVideosFromRss(params = {}) {
  const { rssUrl, page = 1 } = params;
  if (!rssUrl || !rssUrl.toLowerCase().startsWith("http")) {
    console.error("请输入有效的 RSS 地址");
    return [];
  }

  try {
    const response = await Widget.http.get(rssUrl);
    const xml = response.data;

    const $ = Widget.html.load(xml, { xmlMode: true, decodeEntities: true });

    const items = $("item");
    const episodes = [];

    items.each((index, el) => {
      const item = $(el);
      const title = cleanCData(item.find("title").text()) || `视频 ${index + 1}`;
      const description = cleanCData(item.find("description").text());
      const videoUrl = item.find("enclosure").attr("url");

      if (!videoUrl || !videoUrl.startsWith("http")) return;

      const pubDate = item.find("pubDate").text().trim();
      let releaseDate = "";
      if (pubDate) {
        const date = new Date(pubDate);
        releaseDate = date.toISOString().split("T")[0];
      }

      const image =
        item.find("itunes\\:image").attr("href") ||
        item.find("media\\:thumbnail").attr("url") ||
        "";

      episodes.push({
        id: `${index}`,
        type: "url",
        title,
        description,
        posterPath: image,
        backdropPath: image,
        releaseDate,
        videoUrl,
        mediaType: "video",
      });
    });

    const start = (page - 1) * PAGE_SIZE;
    return episodes.slice(start, start + PAGE_SIZE);
  } catch (err) {
    console.error("解析 RSS 失败: ", err.message);
    return [];
  }
}

function cleanCData(text) {
  if (!text) return "";
  const cdataMatch = text.match(/^<!\[CDATA\[(.*)\]\]>$/s);
  return cdataMatch ? cdataMatch[1].trim() : text.trim();
}