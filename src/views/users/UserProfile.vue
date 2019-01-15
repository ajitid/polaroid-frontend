<template>
  <div>
    <div class="flex items-center">
      <div class="mr-6">
        <div class="bg-grey-light h-24 w-24 rounded-full"></div>
      </div>
      <div>
        <div class="flex items-center">
          <div>
            <h1 class="font-normal mb-2 mr-3">{{ username }}</h1>
          </div>
          <div><Button>Follow</Button></div>
        </div>
        <p class="mb-2">
          <b>{{ name }}</b>
        </p>
        <div class="flex">
          <p class="mr-4">
            <b>{{ followersCount }}</b> follower<span v-if="followersCount > 1"
              >s</span
            >
          </p>
          <p class="">
            <b>{{ followingCount }}</b> following
          </p>
        </div>
      </div>
    </div>
    <div class="my-4 leading-tight">
      <p v-if="dob">Born {{ dob }}</p>
      <p v-if="bio">{{ bio }}</p>
      <Button>cddvmkf</Button>
    </div>

    <div
      v-if="posts && posts.length"
      class="flex flex-wrap overflow-hidden md:-mx-5"
    >
      <div
        v-for="post in posts"
        :key="post.post"
        class="w-1/3 overflow-hidden md:my-5 md:px-5"
      >
        <div class="post-preview hover:bg-grey-light flex items-center">
          <img :src="post.thumbnail" alt="" />
        </div>
      </div>
    </div>
    <p v-if="!!posts && posts.length === 0" class="text-center text-grey-dark">
      No post to show.
    </p>
    <infinite-loading @infinite="fetchPosts" spinner="spiral">
      <span slot="no-more"></span>
    </infinite-loading>
  </div>
</template>

<script>
import { format as formatDate } from "date-fns";
import InfiniteLoading from "vue-infinite-loading";

export default {
  components: { InfiniteLoading },
  data() {
    return {
      name: "",
      followersCount: 0,
      followingCount: 0,
      dob: null,
      bio: "",
      nextPostsFetchUrl: "",
      posts: null
    };
  },
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  async created() {
    this.nextPostsFetchUrl = `/users/${this.username}/posts`;
    await this.fetchProfile();
  },
  async mounted() {
    // await this.fetchPosts();
  },
  methods: {
    async fetchProfile() {
      const { data: profile } = await this.$api(
        `/users/${this.username}/profile`
      );
      // FIXME catch for 404 and display not found page
      this.name = profile.name;
      this.dob = profile.dob ? formatDate(profile.dob, "MMMM D") : null;
      this.bio = profile.bio;
      this.followersCount = profile["followers_count"];
      this.followingCount = profile["following_count"];
    },
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

<style scoped>
.post-preview {
  width: 320px;
  height: 320px;
}
</style>
