export function parsePolitikenFeed(data) {
  if (!data || !data.items || !data.feed) {
    console.error('Invalid data structure')
    return []
  }
  return data.items.map((item) => ({
    title: item.title || 'No title',
    description: item.description || 'No description',
    categories: item.categories ? item.categories[0] : 'Uncategorized',
    link: item.link || '#',
    pubDate: item.pubDate || new Date().toISOString(), // Current date as fallback,
    media: data.feed.title ? data.feed.title.split('.')[0] : 'Unknown media',
    mediaLink: data.feed.link || '#',
    mediaSource: data.feed.url || '#'
  }))
}
