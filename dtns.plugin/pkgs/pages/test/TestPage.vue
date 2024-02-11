<!--
 * @Description: 测试
 * @Author: poplang
 * @Date: 2024-1-2
 * @LastEditors: 
 * @LastEditTime:
 -->
 <template>
    <div>
        <h1>测试页面</h1>
        <span @click="cnt++">{{ cnt }}</span>
    </div>
  </template>
  <script>
  if(window.g_pop_event_bus)
  {
      window.g_pop_event_bus.on('init-poplang',function(poplang){
          if(!poplang) return false

          poplang.binderAddOpcode('ib3.test.page',async function(context){
              context['$ret'] = true
              alert('from TestPage.vue:call ib3.test.page now!')
              })
          return true
      })
  }
  export default {
    name: "TestPage",
    props: ["value"],
    components: {  },
    data() {
      return {
        cnt:0
      }
    },
    methods: {
    }
  }
  </script>
  