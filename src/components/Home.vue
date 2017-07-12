<template>
  <div class="Home">
    <div class="container">
      <div class="col-sm-8">
        <div class="jumbotron">
          <img src="../assets/home-l-img.jpg">
        </div>
      </div>
      <div class="col-sm-4">
        <div class="jumbotron">
          <h1>欢迎！</h1>
          <p>这里有你需要的app</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col-sm-8 .jumbotron{
    padding: 0;
  }
  .jumbotron img{
    width: 100%;
  }
</style>
