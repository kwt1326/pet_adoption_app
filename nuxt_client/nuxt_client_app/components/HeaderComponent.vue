<template>
  <header>
    <nav>
      <ul class="nav_menu">
        <NuxtLink class="logo" to="/">
          <li><h1>LOGO</h1></li>
        </NuxtLink>
        <NuxtLink class="nav" to="/adoptList">
          <li><h4>입양목록</h4></li>
        </NuxtLink>
        <NuxtLink class="nav" to="/companyList">
          <li><h4>업체목록</h4></li>
        </NuxtLink>
      </ul>
      <ul class="my_menu">
        <NuxtLink class="nav" to="/myAdoptStatus">
          <li><h4>입양현황</h4></li>
        </NuxtLink>
        <NuxtLink class="nav" to="/myPage">
          <li><h4>내 정보</h4></li>
        </NuxtLink>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'HeaderComponent',
}
</script>

<style lang="scss">
header {
  width: 100%;
  height: 80px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-left: 30px;
}

ul {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding-left: 0;
}

.nav_menu {
  justify-content: flex-start;
}

.my_menu {
  justify-content: flex-end;
}

li {
  margin-right: 30px;
}

ul, h1, h4 {
  margin: 0;
}

a {
  text-decoration: none !important;
  color: #282828;
}

a:hover {
  color: #282828;
}

</style>
