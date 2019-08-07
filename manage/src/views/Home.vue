<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <Hi :msg="title"/>
    <a-button @click="add({num: 1})" type="primary">total: <em>{{total}}</em></a-button>
  </div>
</template>

<script>
// @ is an alias to /src
import Hi from '@/components/Hi.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'home',

  components: {
    Hi
  },

  data() {
    return {
      title: 'Welcome to OpenCoder For Manage'
    }
  },

  computed: {
    ...mapState(['total'])
  },

  methods: {
    ...mapMutations([
      'add'
    ])
  }
}
</script>
