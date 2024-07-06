<script>
import axios from 'axios'
import xml2js from 'xml-js'

function fetchAndParseBerlingskeFeedDirectly() {
  const proxyUrl = 'https://api.allorigins.win/get?url='
  const targetUrl = encodeURIComponent('https://www.berlingske.dk/content/rss')
  const feedUrl = `${proxyUrl}${targetUrl}`

  axios
    .get(feedUrl)
    .then((response) => {
      // AllOrigins wraps the content in a JSON object under the 'contents' key
      const result = xml2js.xml2json(response.data.contents, { compact: true, spaces: 2 })
      console.log(result)
      // Process the JSON as needed
    })
    .catch((error) => {
      console.error('Error fetching or parsing Berlingske feed:', error)
    })
}

// Example usage
fetchAndParseBerlingskeFeedDirectly()
</script>
