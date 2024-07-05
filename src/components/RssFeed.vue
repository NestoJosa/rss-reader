<script>
import axios from 'axios'

export default {
  data() {
    return {
      articles: [],
      feeds: [{ url: 'https://politiken.dk/rss/senestenyt.rss', parser: 'PolitikenFeed' }],
      apiKey: import.meta.env.VITE_RSS2JSON_API_KEY
    }
  },
  methods: {
    fetchAndParseFeeds() {
      console.log(this.articles)
      this.feeds.forEach((feed) => {
        axios
          .get(`https://api.rss2json.com/v1/api.json?rss_url=${feed.url}&api_key=${this.apiKey}`)
          .then(async (response) => {
            const parserModule = await import(`./parsers/${feed.parser}.js`)
            const parsedArticles = parserModule[`parse${feed.parser}`](response.data)
            this.articles = [...this.articles, ...parsedArticles]
            console.log(this.articles)
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
