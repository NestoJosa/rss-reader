<template>
  <div>
    <h1>News Articles</h1>
    <ul>
      <li v-for="article in articles" :key="article.link">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <p>Category: {{ article.categories }}</p>
        <p>Author: {{ article.author }}</p>
        <p>Published Date: {{ new Date(article.pubDate).toLocaleDateString() }}</p>
        <p>
          Media: <a :href="article.mediaLink" target="_blank">{{ article.media }}</a>
        </p>
        <p>Source: <a :href="article.mediaSource" target="_blank">Link to Source</a></p>
        <a :href="article.link" target="_blank">Read more</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      articles: [],
      feeds: [
        { url: 'https://politiken.dk/rss/senestenyt.rss', parser: 'PolitikenFeed' },
        { url: 'https://feeds.jp.dk/jp/seneste', parser: 'JyllandsPostenFeed' }
      ],
      apiKey: import.meta.env.VITE_RSS2JSON_API_KEY
    }
  },
  methods: {
    fetchAndParseFeeds() {
      this.feeds.forEach((feed) => {
        axios
          .get(`https://api.rss2json.com/v1/api.json?rss_url=${feed.url}&api_key=${this.apiKey}`)
          .then(async (response) => {
            const parserModule = await import(`./parsers/${feed.parser}.js`)
            const parsedArticles = parserModule[`parse${feed.parser}`](response.data)
            this.articles = [...this.articles, ...parsedArticles]
            console.log('Updated articles:', this.articles) // Log the updated articles array
          })
          .catch((error) => {
            console.error('Error fetching or parsing feed:', error)
          })
      })
    }
  },

  created() {
    this.fetchAndParseFeeds()
  }
}
</script>
