<template>
	<div class="index">
		<Header></Header>
        <div class="warpper">
            <div class="leftMenu">
                <LeftMenu></LeftMenu>
            </div>
            <div class="content" id="content">
                <div class="home-warp">
                    <router-view :time='"2017-04-08"'></router-view>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import Header from '@/components/common/header'
import LeftMenu from '@/components/common/leftMenu'
import IconA from '@/components/common/icon'

// import Welcome from '@/components/welcome/welcome'
export default {
  name: 'index',
  components : {
  	Header,
    LeftMenu,
    IconA
    // Welcome
  },
  data () {
    return {
      
    }
  },
  methods : {
    ajax () {
        this.$store.dispatch('login')
        console.log(this.$store.state.user.user.name);
    }
  }
}
</script>

<style scoped>
  .index {
    height: 100%;
    background: #eee;
  }
  .warpper {
    display: flex;
    height: calc(100% - 44px);
  }
  .leftMenu {
    height: 100%;
    position: relative;
    padding: 10px 0 0 10px;
  }
  .content {
    flex-grow: 1;
    padding: 20px 30px 0 10px;
    overflow-y :scroll;
  }
    .home-warp {
        position: relative;
    }
    
</style>