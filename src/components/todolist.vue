<template>
  <div class="todolist">
    <div class="container addInput">
      <input type="text" v-model="taskText" class="form-control col-sm-12" placeholder="新建一个任务" v-on:keyup.enter="addTask">
    </div>
    <div class="container">
      <div class="col-sm-6">
        <sidebar></sidebar>
      </div>
      <div class="col-sm-6">
        <editor></editor>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './sidebar.vue'
import editor from './editor.vue'

export default {
  name: 'todolist',
  data(){
    return{
      taskText:''
    }
  },
  components: {
    sidebar,
    editor
  },
  methods:{
    addTask(){
      if(this.taskText==''){
        alert('请输入具体任务内容！')
      }else{
        this.$store.commit('addTask',this.taskText);
        this.taskText=''
      }
    }
  }
}
</script>
  

<style scoped>
  .addInput {
    margin-top: .8rem;
    margin-bottom: .75rem;
  }
</style>
