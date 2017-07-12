import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const STORAGE_KEY='myapp-todolist'
const state={
    items:JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
    activeTask:{}
}
const getters={
    items:state=>state.items,
    activeTask:state=>state.activeTask
}
const mutations={
    addTask(state,task){
        var myDate=new Date();
        var y=myDate.getFullYear();
        var m,
            mm=myDate.getMonth()+1;
        if(mm<10){
            m="0"+mm;
        }else{
            m=mm;
        }
        var d,
            dd=myDate.getDate();
        if(dd<10){
            d="0"+dd;
        }else{
            d=dd;
        }
        var currentTime=y+'-'+m+'-'+d;
        state.items.push({
            task,
            isFinished:false,
            details:"this is a new task",
            setTime:currentTime
        })
    },
    deleteTask(state,index){
        state.items.splice(index,1)
    },
    toggleCheck(state,index){
        state.items[index].isFinished=!state.items[index].isFinished
    },
    setActivetask(state,item){
        state.activeTask=item
    },
    editTask(state,task){
        state.activeTask.task=task;
        for(let i in state.items){
            if(i==state.activeTask){
                i.task=task;
            }
        }
    },
    editDetails(state,details){
        state.activeTask.details=details;
        for(let i in state.items){
            if(i==state.activeTask){
                i.details=details;
            }
        }
    },
    editSettime(state,settime){
        state.activeTask.setTime=settime;
        for(let i in state.items){
            if(i==state.activeTask){
                i.setTime=settime;
            }
        }
    },
    clearAll(state){
        state.activeTask={};
    },
    reList(state){
        function compare(propertyName){
            return function(obj1,obj2){
                var value1=obj1[propertyName];
                var value2=obj2[propertyName];
                if(value2<value1){
                    return 1;
                }else if(value2>value1){
                    return -1;
                }else{
                    return 0;
                }
            }
        }

        state.items.sort(compare('setTime'));
    }
}

const localStoragePlugin = store=>{
    store.subscribe((mutation,{items})=>{
        window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
    })
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins:[localStoragePlugin]
})