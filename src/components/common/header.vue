<template>
    <div class="header">
        <div class="wrapper">
        	<div class="logobox">
        		<div class="logo">智谷科技</div>
				<!-- <Icon type="navicon"></Icon> -->
        	</div>
        	<div class="setup">
        		<ul class="setup-content">
                    <li class="setup-list">
                        <Poptip placement='bottom-end' trigger="hover">
        			         <div class="header-pad-20">
                				<span>
                                    <span>{{ userInfo.name }}</span>
                					<span>({{ corp.name }})</span>
                					<Icon type="android-person"></Icon>
                				</span>
                             </div>
                            <ul class="aboutMe pull-menu" slot='content'>
                                <li>
                                    <Icon type="android-list"></Icon>
                                    <span>账号信息</span>
                                </li>
                                <li>
                                    <Icon type="log-out"></Icon>
                                    <span>退出</span>
                                </li>
                            </ul>
                        </Poptip>
                    </li>
        			
        			<li class="header-pad-20 setup-list">
        				<Icon type="pricetags"></Icon>
        			</li>
        			<li class="header-pad-20 setup-list">
        				<Icon type="ios-gear"></Icon>
        			</li>
        			<li class="header-pad-20 setup-list">
        				<Icon type="ios-bell"></Icon>
        			</li>
        		</ul>
        	</div>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'header',
        data () {
            return {

            }
        },
        computed : {
            userInfo () {
                // console.log(this.$store.state.user.user);
                // console.log(this.$store.state.user.user);
                return this.$store.state.user.user;
            },
            corp () {
                return this.$store.state.user.corp;
            }
        }
    }
</script>
<style>
    .header {
    	height: 44px;
    	background : #03b8cc;
    	width: 100%;
    }

    .ivu-poptip-inner .ivu-poptip-body {
        padding: 10px 0;
    }
    .header .wrapper {
    	display: flex;
    	justify-content: space-between;
    }
    .logobox {
    	display: flex;
	    align-items: center;
	    font-size: 16px;
	    color: #fff;
	    padding-left: 30px;
	    height: 44px;
    }
    .logobox .logo {
		line-height: 44px;
		padding: 0 20px;
    }
    .setup {
    	height: 44px;
    }
    .setup ul.setup-content{
    	display: flex;
    	height: 100%;
    }
    .setup ul li.setup-list {
    	font-size: 16px;
    	display: flex;
    	align-items: center;
    	/*padding: 0 20px;*/
    	color: #fff;
    }
    .header-pad-20 {
        padding: 0 20px;
        line-height: 44px;
    }
    .setup ul li.setup-list:hover {
    	background : #03a1b3;
    }
   /* .setup .pull-menu li{
        color: #576b7e;
    }*/
    .aboutMe li {
        padding-left: 10px; 
        font-size: 14px;
        line-height: 32px;
        color: #576b7e;
        cursor: pointer;
    }
    .aboutMe li i {
        font-size: 18px;
        vertical-align: middle;
    }
    .aboutMe li span {
        display: inline-block;
        padding-left: 5px;
    }
    .aboutMe li:hover {
        background : #f1f1f1;
        color: #13c19f;
    }
</style>
