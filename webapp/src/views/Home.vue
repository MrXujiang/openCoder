<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <Hi :msg="title"/>
    <mt-button @click="add({num: 1})" type="primary">total: <em>{{total}}</em></mt-button>
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
      title: 'Welcome to OpenCoder For webApp'
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
