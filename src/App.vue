<script setup>
import Avatar from './components/Avatar/PLAvatar.vue'

const onAvatarClick = () => {
  alert('avatarClick!')
}
</script>

<template>
  <main>
    <Avatar 
      class="border-red"
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tLotgCDtzgTdwJcTiXWRCwHaEK%26pid%3DApi&f=1&ipt=ffbd57d86e88e48404782a87e1522200a7c8093117403b393106699dcfb3e99b&ipo=images"
      alt="logo"
      size="medium"  
    />
    <Avatar 
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tLotgCDtzgTdwJcTiXWRCwHaEK%26pid%3DApi&f=1&ipt=ffbd57d86e88e48404782a87e1522200a7c8093117403b393106699dcfb3e99b&ipo=images"
      alt="logo"
      size="large"
      @click="onAvatarClick"
    />
  </main>
</template>

<style scoped>
.border-red {
  border: 1px solid red;
}
</style>
