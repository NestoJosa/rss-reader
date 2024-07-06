<template>
  <div class="articles-container">
    <h2>Articles</h2>
    <ul>
      <li v-for="article in articles" :key="article.link">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
        <p>Category: {{ article.categories }}</p>
        <a :href="article.link" target="_blank">Read more</a>
        <p>Author: {{ article.author }}</p>
        <p>Published on: {{ new Date(article.pubDate).toLocaleString() }}</p>
        <p>
          Media: <a :href="article.mediaLink" target="_blank">{{ article.media }}</a>
        </p>
        <p>Source: <a :href="article.mediaSource" target="_blank">Link</a></p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import xml2js from 'xml-js'

export default {
  data() {
    return {
      articles: [],
      feeds: [
        {
          parser: 'PolitikenFeed',
          proxy: 'rss2json',
          url: 'https://politiken.dk/rss/senestenyt.rss'
        },
        {
          parser: 'JyllandsPostenFeed',
          proxy: 'rss2json',
          url: 'https://feeds.jp.dk/jp/seneste'
        },
        {
          parser: 'BerlingskeFeed',
          proxy: 'allorigins',
          url: 'https://www.berlingske.dk/content/rss'
        }
      ],
      apiKey: import.meta.env.VITE_RSS2JSON_API_KEY
    }
  },
  methods: {
    async fetchFeed(feed) {
      if (feed.proxy == 'rss2json') {
        const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&api_key=${this.apiKey}`
        const response = await axios.get(feedUrl)
        const result = response.data
        // console.log(result)
        return result
      } else if (feed.proxy == 'allorigins') {
        const feedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`
        const response = await axios.get(feedUrl)
        const result = JSON.parse(
          xml2js.xml2json(response.data.contents, { compact: true, spaces: 2 })
        )
        return result
      }
    },

    async parseFeedData(rawData, parserName) {
      const parserModule = await import(`./parsers/${parserName}.js`)
      return parserModule[`parse${parserName}`](rawData)
    },

    async fetchAndParseFeeds() {
      const feedPromises = this.feeds.map(async (feed) => {
        const rawData = await this.fetchFeed(feed)
        return this.parseFeedData(rawData, feed.parser)
      })

      Promise.all(feedPromises)
        .then((articlesArrays) => {
          const allArticles = articlesArrays.flat()
          allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
          this.articles = allArticles
          console.log('Updated articles:', this.articles)
        })
        .catch((error) => {
          console.error('Error fetching or parsing feed:', error)
        })
    }
  },

  created() {
    this.fetchAndParseFeeds()
  }
}
</script>
