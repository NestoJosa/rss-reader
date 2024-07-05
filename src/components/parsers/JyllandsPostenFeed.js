export function parseJyllandsPostenFeed(data) {
  if (!data || !data.feed || !data.items) {
    console.error('Invalid data structure')
    return []
  }
  return data.items.map((item) => ({
    title: item.title || 'No title',
    description: item.description || 'No description',
    categories: item.categories ? item.categories[0] : 'Uncategorized',
    link: item.link || '#',
    author: item.author || 'Unknown author',
    pubDate: item.pubDate || new Date().toISOString(), // Current date as fallback,
    media: data.feed.title || 'Unknown media',
    mediaLink: data.feed.link || '#',
    mediaSource: data.feed.url || '#'
  }))
}
