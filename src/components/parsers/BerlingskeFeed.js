export function parseBerlingskeFeed(data) {
  if (!data || !data.rss) {
    console.error('Invalid data structure')
    return []
  }
  return data.rss.channel.item.map((item) => ({
    title: item.title['_cdata'] || 'No title',
    description: item.description['_cdata'] || 'No description',
    categories: item.category['_cdata'] || 'Uncategorized',
    link: item.link['_cdata'] || '#',
    author: item.author || 'Unknown author',
    pubDate: item.pubDate['_text'] || new Date().toISOString(),
    media: 'Berlingske',
    mediaLink: data.rss.channel.title['_cdata'] || '#',
    mediaSource: 'https://www.berlingske.dk/content/rss'
  }))
}
