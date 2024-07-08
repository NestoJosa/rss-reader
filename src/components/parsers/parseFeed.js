import _ from 'lodash'

function parseFeed(data, config) {
  const items = _.get(data, config.itemsPath, []) // Using lodash's get for deep path resolution
  return items.map((item) => ({
    title: _.get(item, config.titlePath),
    description: _.get(item, config.descriptionPath),
    categories: _.get(item, config.categoriesPath),
    link: _.get(item, config.linkPath),
    author: _.get(item, config.authorPath),
    pubDate: _.get(item, config.pubDatePath),
    media: config.media,
    mediaLink: config.mediaLink
  }))
}

export default parseFeed
