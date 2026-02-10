<script setup>
  import HelloPage from "./components/HelloPage.vue";
  import Header from "./components/Header.vue";
  import About from "./components/About.vue";
  import Reason from "./components/Reason.vue";
  import Reading from "./components/Reading.vue";
  import Footer from "./components/Footer.vue";
import Container from "../../shared/ui/container/Container.vue";
</script>


<template>
  <div class="template">
    <Container>
      <Header/>
    </Container>
    <HelloPage/>
    <Container>
      <About/>
      <Reason/>
      <Reading/>
      <Footer/>
    </Container>
  </div>
</template>

<style scoped>
.template {
  background: rgb(2,0,36);
  background: linear-gradient(to bottom right,black 0%, rgba(2,0,36,1) 50%, purple 100%);
}
</style>