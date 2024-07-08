const feedConfigs = {
  PolitikenFeed: {
    itemsPath: 'items',
    titlePath: 'title',
    descriptionPath: 'description',
    categoriesPath: 'categories[0]',
    linkPath: 'link',
    authorPath: 'author',
    pubDatePath: 'pubDate',
    media: 'Politiken',
    mediaLink: 'https://politiken.dk/'
  },
  BerlingskeFeed: {
    itemsPath: 'rss.channel.item',
    titlePath: 'title._cdata',
    descriptionPath: 'description._cdata',
    categoriesPath: 'category._cdata',
    linkPath: 'link._cdata',
    authorPath: 'author',
    pubDatePath: 'pubDate._text',
    media: 'Berlingske',
    mediaLink: 'https://www.berlingske.dk/'
  },
  JyllandsPostenFeed: {
    itemsPath: 'items',
    titlePath: 'title',
    descriptionPath: 'description',
    categoriesPath: 'categories[0]',
    linkPath: 'link',
    authorPath: 'author',
    pubDatePath: 'pubDate',
    media: 'JyllandsPosten',
    mediaLink: 'https://jyllands-posten.dk/'
  }
}

export default feedConfigs
