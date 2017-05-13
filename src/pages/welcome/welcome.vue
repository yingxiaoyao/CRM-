`<template>
	
    <div class="welcome">
        <div class="homt-top">
            <p>
                欢迎您回来
            </p>
            <span>上次登录时间为：{{ userInfo.lastTime }}</span>
        </div>
        <div class="home-warp-chart">
            <Row>
                <Col span='6'>
                    <div class="home-chart">
                        <div class="home-chart-title">
                            通知公告
                        </div>
                        <ul class="home-chart-list">
                            <li>暂无通知</li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  
</template>

<script>
export default {
  name: 'welcomes',
  props: ['time'],
  data () {
    return {
      
    }
  },
  computed : {
    userInfo () {
        return this.$store.state.user.user
    }
  }
}
</script>

<style scoped>
    .home-warp {
        position: relative;
    }
    .home-warp p {
        font-size: 16px;
    }
    .home-chart {
        background: #fff;
    }
    .home-chart .home-chart-title {
        padding-left: 20px;
        line-height: 50px;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #f1f1f1;
    }
    .home-chart .home-chart-list {
        
    }
    .home-chart .home-chart-list li {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        position: relative;
        /*border-bottom: 1px solid #f1f1f1;*/
    }
    .home-chart .home-chart-list li:hover {
        background : #f8f9fd;
    }
    .home-chart .home-chart-list li:after {
        content: '' ;
        display: block;
        height: 1px;
        background: #f1f1f1;
        position: absolute;
        bottom: 0;
        left: 20px;
        right: 20px;
    }
    .home-warp-chart {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 50px;
        /*background: #f00;*/
    }
</style>