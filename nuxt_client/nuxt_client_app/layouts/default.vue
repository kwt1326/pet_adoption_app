<template>
  <section>
    <HeaderComponent />
    <div class="content_wrap">
      <Nuxt />
    </div>
    <FooterComponent />
  </section>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="scss">
.content_wrap {
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100vw;
  height: 100vh;
}
</style>