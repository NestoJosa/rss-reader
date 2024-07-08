<template>
  <div class="article-card">
    <div class="article-header">
      <p>{{ article.categories }}</p>
    </div>
    <div class="article-body">
      <a :href="article.link" target="_blank">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
      </a>
    </div>
    <div class="article-footer">
      <p>
        <a :href="article.mediaLink" target="_blank">{{ article.media }}</a>
      </p>
      <p>{{ article.author || 'Unknown Author' }}</p>
      <p>
        {{ new Date(article.pubDate).toLocaleString([], { hour: 'numeric', minute: 'numeric' }) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.article-card {
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  background-color: #f9f9f9;
}

.article-head {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.article-head p,
.article-body p,
.article-body h3 {
  margin: 0;
}

.article-head a,
.article-body a {
  color: #007bff;
  text-decoration: none;
}

.article-body {
  padding: 1rem 0;
}

.article-body h3 {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.article-body p {
  color: #666;
  line-height: 1.5;
}

.article-footer a {
  color: black;
  text-decoration: none;
}
</style>
