<template>
  <div>
    <!-- Display the RSS feed here -->
    <ul v-if="rssData && rssData.feed && rssData.items">
      <li v-for="(item, index) in rssData.items" v-bind:key="index">
        <div>
          <span>{{ item.categories[0] }}</span>
          <span> | </span>
          <span>{{ rssData.feed.title.split('.')[0] }}</span>
          <span> | </span>
          <span>{{ item.pubDate }}</span>
        </div>

        <a v-bind:href="item.link" target="_blank">
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      rssData: null,
      apiKey: import.meta.env.VITE_RSS2JSON_API_KEY
    }
  },
  created() {
    const url = 'https://api.rss2json.com/v1/api.json'
    const params = {
      rss_url: 'https://politiken.dk/rss/senestenyt.rss',
      api_key: this.apiKey
    }
    axios
      .get(url, { params })
      .then((response) => {
        this.rssData = response.data
        console.log(this.rssData)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}
</script>
