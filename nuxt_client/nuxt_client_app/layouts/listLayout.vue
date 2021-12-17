<template>
  <section>
    <HeaderComponent />
    <div class="content_wrap">
      <SideNavComponent />
      <Nuxt />
    </div>
    <FooterComponent />
  </section>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import SideNavComponent from '../components/SideNavComponent.vue'
export default {
  components: {
    HeaderComponent,
    FooterComponent,
    SideNavComponent
  }
}
</script>

<style lang="scss">
.content_wrap {
  display: flex;
  flex-direction: row;
  padding: 30px;
  width: 100vw;
  height: 100vh;
}
</style>