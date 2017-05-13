<template>
    <div class="left-menu">

            <!--  <Menu :open-names="['openNames']" accordion width='180px'>
            
                <Submenu v-for='menu in menuList' :name="menu.id" :key='menu.id'>
                    <template slot="title">
                        <Icon v-bind:type="menu.iconType"></Icon>
                        {{ menu.name }}
                    </template>
                    <router-link to='/' v-for='(seconMenu,index) in menu.menus' :key='index'>
                     <Menu-item :name="seconMenu.id">
                       {{seconMenu.name}}
                     </Menu-item>
                    </router-link>
                </Submenu>
                <Submenu name="1">
                     <template slot="title">
                         <Icon type="ios-people"></Icon>
                         用户管理
                     </template>
                     <router-link to='/clientClassify'>
                       <Menu-item name="1-1">客户分类</Menu-item>
                     </router-link>
                     <router-link to='/clinetRank'>
                       <Menu-item name="1-2">客户级别</Menu-item>
                     </router-link>
                     <router-link to='/area'>
                       <Menu-item name="1-3">区域设置</Menu-item>
                     </router-link>
                     <router-link to='/trade'>
                       <Menu-item name="1-4">行业设置</Menu-item>
                     </router-link>
                 </Submenu>
                 <Submenu name="2">
                     <template slot="title">
                         <Icon type="ios-people"></Icon>
                         商品信息
                     </template>
                     <router-link to='/goodsList'>
                       <Menu-item name="2-1">商品列表</Menu-item>
                     </router-link>
                     <router-link to='/'>
                       <Menu-item name="2-2">商品属性</Menu-item>
                     </router-link>
                     <router-link to='/'>
                       <Menu-item name="2-3">库存量设置</Menu-item>
                     </router-link>
                     <router-link to='/'>
                       <Menu-item name="2-4">仓库设置</Menu-item>
                     </router-link>
                 </Submenu>
            </Menu> -->


         <ul class="left-menu-ul">
             <li class="left-menu-first" v-for='(menu , index) in menuList' 
             :class='{ "active" : active == menu.name ,"show-second-menu" : showName == menu.name}' 
             @mouseenter='showName = menu.name'
             @mouseleave='showName = ""'>
                 <a href="javascript:" class="left-menu-index">
                     <Icon size='18' type="ios-paper" style='margin-right: 10px;'></Icon>
                     <span class="left-menu-title">{{ menu.name }}</span>
                 </a>
                 <div class="second-menu" v-if='menu.menus.length > 0'>
                    <div class="second-menu-warp">
                         <ul class="second-menu-item" v-for='secondMenu in menu.menus' v-if='secondMenu.menus.length > 0'>
                            <span class="second-menu-title">{{ secondMenu.name }}</span>
                            <li v-for='item in secondMenu.menus' @click.stop='active = menu.name;showName = ""'>
                                <router-link :to="item.url ? item.url : 'index'">{{ item.name }}</router-link>
                            </li>
                         </ul>
                        <ul class="second-menu-item second-menu-item-colum" v-else>
                            <li @click.stop='active = menu.name;showName = ""'>
                                <router-link :to="secondMenu.url ? secondMenu.url : 'index'">{{ secondMenu.name }}</router-link>
                            </li>
                        </ul>
                    </div>
                 </div>
             </li>
         </ul>

      <div class="logo">
        <h1>智谷科技</h1>
      </div>
    </div>

</template>

<script>
import api from '@/api/api'
export default {
  name: 'leftMenu',
  mounted () {
     var _this = this;
     this.axios(api.menus)
        .then(function(res){
            console.log(res);
            _this.menuList = res.data.datas;
            _this.openNames = res.data.datas[0].id;
            const user = {
                name : '用户管理',
                menus : [
                    {
                        name : '客户分类',
                        menus : [],
                        url : '/clientClassify'
                    },
                    {
                        name : '客户级别',
                        menus : [],
                        url : '/clinetRank'
                    },
                    {
                        name : '区域设置',
                        menus : [],
                        url : '/area'
                    },
                    {
                        name : '行业设置',
                        menus : [],
                        url : '/trade'
                    }
                ]
            }
            const goods = {
                name : '商品信息',
                menus : [
                    {
                        name : '商品分类',
                        menus : [],
                        url : '/goodsList'
                    }
                ]
            }
            _this.menuList.push(user);
            _this.menuList.push(goods);
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  data () { 
    return {
      menuList : '',
      openNames : '',
      active : '',
      showName : ''
    }
  },
  methods : {
    
  }
}
</script>

<style scoped>
  .left-menu {
    height: 100%;
    /* overflow-y: auto; */
    background: #fff;
    padding-bottom: 50px;
    width: 150px;
  }
  .left-menu .logo {
    position: absolute;
    bottom: 10px;
    left: 25px;
    height: 36px;
  }
  .ivu-menu-light {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 197px !important;
    /* padding-right: 16px; */
    box-sizing: content-box;
  }


.left-menu .left-menu-ul {
    padding: 10px 0;
}
.left-menu-first {
    font-size: 14px;
    position: relative;
}
.left-menu .left-menu-ul .left-menu-first:hover {
   background: #03b8cc;
}
.left-menu .left-menu-ul .left-menu-first.active {
   background: #03b8cc;
}
.left-menu .left-menu-ul .left-menu-first.active .left-menu-index {
    color: #fff;
}
.left-menu .left-menu-ul .left-menu-first:hover .left-menu-index {
    color: #fff;
}
.left-menu .left-menu-ul .left-menu-first.show-second-menu .second-menu {
    display: block;
}
/* .left-menu .left-menu-ul .left-menu-first:hover .second-menu {
    display: block;
}  */
.left-menu .left-menu-index {
    display: block;
    line-height: 40px;
    padding: 0 28px;
    color: #333;
}
.left-menu-first .second-menu {
    position: absolute;
    left: 150px;
    z-index: 1000;
    top: 0;
    background: #fff;
    border-left: 1px solid #ddd;
    box-shadow: 4px 1px 8px #ccc;
    display: none;
}

.second-menu .second-menu-warp {
    padding: 20px 0;
    display: table;
}
.second-menu .second-menu-warp .second-menu-item {
    border-right: 1px solid #f0f0f0;
    display: table-cell;
}
.second-menu .second-menu-warp .second-menu-item.second-menu-item-colum {
    display: block;
}
.second-menu .second-menu-warp .second-menu-item .second-menu-title {
    color: #96a6b6;
    padding: 0 40px;
    line-height: 30px;
    white-space: nowrap;
}
.second-menu .second-menu-warp .second-menu-item li a {
    display: block;
    white-space: nowrap;
    padding: 5px 40px;
    font-size: 12px;
}
.second-menu .second-menu-warp .second-menu-item li a:hover {
    color: #13c19f;
}



















  /*.ivu-menu-vertical .ivu-menu-item:hover,.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background : #eee;
    color: inherit;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    width: 180px;
    background : #03b8cc;
    color: #fff;
    border: none;
  }
  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0;
  }
  .senc-menu {
    display: flex;
    padding: 20px 0;
  }
  .senc-menu .menu-group {
    padding: 0 20px;
  }
  .senc-menu .menu-group:nth-child(2) {
    border-left: 1px solid #eee;
  }
  .senc-menu .menu-group header {
    padding: 10px 0;
  }
  .senc-menu .menu-group ul li {
    padding: 5px 0;
  }*/
</style>
