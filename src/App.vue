<template>
  <div id="app">
    <!--nav start-->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><i class="glyphicon glyphicon-home"></i></a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav" >
            <li><router-link @click.native="toggle" to="/todolist">iTodo</router-link></li>
            <li><router-link @click.native="toggle" to="/player">iPlayer</router-link></li>
            <li><a href="#">开发中...</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <!--nav end-->

    <!--content-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
      
    }
  },
  methods:{
    toggle(){
      $('.navbar-collapse').collapse('toggle');
    }
  }
}
</script>
  
<style scope>
  .navbar{
    margin-bottom: 0!important;
  }
</style>
