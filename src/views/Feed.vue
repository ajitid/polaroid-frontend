<template>
  <div class="home">
    <div class="flex flex-col items-center">
      <PostCard :key="post.url" v-for="post in posts" :post="post" />
    </div>
    <p v-if="!!posts && posts.length === 0" class="text-center text-grey-dark">
      No post to show. Follow other people and come back here.
    </p>
    <infinite-loading @infinite="fetchPosts" spinner="spiral">
      <span slot="no-more"></span>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

import PostCard from "@/components/PostCard";

export default {
  name: "feed",
  components: { InfiniteLoading, PostCard },
  data() {
    return {
      nextPostsFetchUrl: "",
      posts: null
    };
  },
  async created() {
    this.nextPostsFetchUrl = `/posts/feed`;
  },
  methods: {
    async fetchPosts(infiniteLoading) {
      const { data } = await this.$api(this.nextPostsFetchUrl);
      this.nextPostsFetchUrl = data.next;
      if (this.posts === null) {
        this.posts = data.results;
      } else {
        this.posts.push(...data.results);
      }
      infiniteLoading.loaded();
      if (this.nextPostsFetchUrl === null) {
        infiniteLoading.complete();
      }
    }
  }
};
</script>
