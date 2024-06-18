<template>
  <div>
    <!-- Display the RSS feed here -->
    <p v-if="rssData && rssData.feed">{{ rssData.feed.title }}</p>
    <ul v-if="rssData && rssData.items">
      <li v-for="(item, index) in rssData.items" v-bind:key="index">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <a v-bind:href="item.link" target="_blank">Read more</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      rssData: null
    }
  },
  created() {
    const url = 'https://api.rss2json.com/v1/api.json'
    const params = {
      rss_url: 'https://politiken.dk/rss/senestenyt.rss',
      api_key: 'api-key'
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
