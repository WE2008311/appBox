import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)
import axios from 'axios'

const STORAGE_KEY='myapp-todolist'
let ctime
const state={
    
    items:JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
    activeTask:{},
    audio:{
        location:'',
        flag:'',
        songName:'',
        singer:'',
        album:'',
        picUrl:'',
        duration:'',
        currentTime:'',
        progressPercent:'',
    },
    playlist:[],
    result:[]
}
const getters={
    // iTodo
    items:state=>state.items,
    activeTask:state=>state.activeTask,
    
    // iPlayer
    
    audio:state=>state.audio,
    playlist:state=>state.playlist,
    result:state=>state.result
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
    },

    // iPlayer
    play(state){
        clearInterval(ctime);
        const playerBar=document.getElementById("playerBar");
        const eve=$('.addPlus i')[0];
        
        
        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/60)+":"+(currentTime%60/100).toFixed(2).slice(-2);
        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/60)+":"+(duraTime%60/100).toFixed(2).slice(-2);
        state.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*100).toFixed(1);
        
        if(playerBar.paused){
            playerBar.play();
            eve.innerHTML="pause";
            state.audio.duration=duraMinute;
            state.audio.currentTime=currentMinute;
            ctime=setInterval(
                function(){
                    
                    currentTime++;
                    
                    currentMinute=Math.floor(currentTime/60)+":"+(currentTime%60/100).toFixed(2).slice(-2);
                    
                    state.audio.currentTime=currentMinute;
                    state.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*100).toFixed(1);
                    
                },1000
            )
        }else {
            playerBar.pause();
            eve.innerHTML="play_arrow";
            clearInterval(ctime);
        }
               
        
    },

    audioEnd(state){
        
        const playerBar=document.getElementById("playerBar");
        const eve=$('.addPlus i')[0];

        eve.innerHTML="play_arrow";
        clearInterval(ctime);

        
        playerBar.currentTime=0;

        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/60)+":"+(currentTime%60/100).toFixed(2).slice(-2);
        state.audio.currentTime=currentMinute;
        

        
    },

    editProgress(state,progressValue){
        const playerBar=document.getElementById("playerBar");
        const eve=$('.addPlus i')[0];

        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/60)+":"+(duraTime%60/100).toFixed(2).slice(-2);
        // console.log(progressValue);
        clearInterval(ctime);
        if(playerBar.paused){
            playerBar.play();
            eve.innerHTML="pause"
            state.audio.duration=duraMinute;
        }
        let currentTime=playerBar.duration*(progressValue/100);
        
        
        ctime=setInterval(
            function(){
                
                currentTime++;
                
                currentMinute=Math.floor(currentTime/60)+":"+(currentTime%60/100).toFixed(2).slice(-2);
                
                state.audio.currentTime=currentMinute;
                state.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*100).toFixed(1);
                
            },1000
        )

        // console.log(currentTime);
        playerBar.currentTime=currentTime;
        
        let currentMinute=Math.floor(currentTime/60)+":"+(currentTime%60/100).toFixed(2).slice(-2);

        state.audio.currentTime=currentMinute;
    },

    playlist(state,id){
        const url='http://localhost:3000/playlist/detail?id='+id;
        axios.get(url).then(res=> {
            state.playlist=res.data.playlist;
        })
    },

    getSearch(state,value){
        const url='http://localhost:3000/search?keywords='+value+'?limit=30';
        axios.get(url).then(res=>{
            state.result=res.data.result;
        })
        
    },
    getSong(state,{id,name,singer,album,arid}){
        const url="http://localhost:3000/music/url?id="+id;
        const imgUrl="http://localhost:3000/artist/album?id="+arid;
        const playerBar=document.getElementById("playerBar");
        

        axios.get(url).then(res=>{
            
            state.audio.location=res.data.data[0].url;
            state.audio.flag=res.data.data[0].flag;
            
            state.audio.songName=name;
            state.audio.singer=singer;
            state.audio.album=album;
        })
        axios.get(imgUrl).then(res=>{
            state.audio.picUrl=res.data.artist.picUrl;
        })
        
        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/60)+":"+(currentTime%60/100).toFixed(2).slice(-2);
        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/60)+":"+(duraTime%60/100).toFixed(2).slice(-2);

        state.audio.duration=duraMinute;
        state.audio.currentTime=currentMinute;
        state.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*100).toFixed(1);
        
        
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