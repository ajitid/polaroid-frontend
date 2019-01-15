<template>
  <div class="card mb-4 border bg-white rounded">
    <div class="p-2 flex items-center border-b">
      <div class="mr-2">
        <div class="w-12 h-12 rounded-full bg-grey-light"></div>
      </div>
      <div>
        <p>{{ post.name }}</p>
        <p class="font-medium">{{ post.username }}</p>
      </div>
    </div>
    <div class="card__image_container flex items-center justify-center">
      <img
        :src="post.photo"
        :alt="post.caption"
      />
      <!-- <img src="http://localhost:8000/media/post-media/80f2f4df-c28a-4130-b574-4d3b26ea4f5b.jpg" alt=""> -->
    </div>
    <div class="p-2 flex items-center justify-between border-t">
      <div class="flex">
        <div role="img" aria-label="Like" class="mr-3 text-red flex items-center">
          <HeartIcon class="fill-current" />
        </div>
        <div role="img" aria-label="Comment" class="flex items-center">
            <MessageSquareIcon />
        </div>
      </div>
      <div class="text-grey-dark text-sm text-right">
        <p>{{ post.likes }} like<span v-if="post.likes > 1">s</span></p>
        <p>{{ timeAgo }} ago</p>
      </div>
    </div>
  </div>
</template>

<script>
import { HeartIcon, MessageSquareIcon } from "vue-feather-icons";
import { distanceInWordsToNow as timeFromNow } from "date-fns";

export default {
  components: { HeartIcon, MessageSquareIcon },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    timeAgo() {
      return timeFromNow(this.post.timestamp);
    }
  }
};
</script>

<style scoped>
.card {
  width: 420px;
}

.card__image_container {
  width: 418px;
  height: 418px;
}
</style>
