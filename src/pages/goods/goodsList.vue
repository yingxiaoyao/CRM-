<template>
   <div class="goodsList">
       <Breadcrumb>
            <Breadcrumb-item>商品信息</Breadcrumb-item>
            <Breadcrumb-item>商品列表</Breadcrumb-item>
        </Breadcrumb>
        <Row class="fileHandle" type='flex' justify='center'>
            <Col span='7'>
                <span>类别：</span>
                <Cascader class='catalogCascader' change-on-select :data="CatalogList" v-model='catalog' trigger='hover'
                @keyup.native='enter($event)'></Cascader>
            </Col>
            <Col span='7'>
                <span>状态：</span><Select v-model="data.status" style="width:200px" @keyup.native='enter($event)'>
                    <Option v-for="item in statusList" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span='7'>
                <span>关键字：</span>
                <Input v-model="data.name" placeholder="商品名称/编码" style="width: 200px" @keyup.native='enter($event)'></Input>
                <Row class="fileHandle" type='flex' justify='end'>
                    <Col span='9'>
                        <Button type="warning" icon="ios-search" long @click.native='query'>查询</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <router-link to='/goodsList/add'>
                    <Button type="warning">新增</Button>
                </router-link>
            </div>
            <div class="buttonM">
                <Button type="info">导入</Button>
            </div>
            <div class="buttonM">
                <Button type="info">导出</Button>
            </div>
            <div class="buttonM">
                <Button type="info">模板下载</Button>
            </div>
            <div class="buttonM">
                <a href="###" type="text">商品导入帮助</a>
            </div>
        </Row>

        <div class="fileHandle">
            <Table :columns="columns5" :data="goodsList"></Table>
        </div>
        <Row class="fileHandle" type="flex" justify="end">
            <Page :total="goodsTotalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
        </Row>
        <div class="fileHandle"></div>
        
   </div>
</template>

<script>
    import api from '@/api/api'
export default {
    mounted () {
        const _this = this;
        const goods = [];

        this.DOM = {
            content : document.getElementById('content'),

        };

        // 获取商品分类
        _this.axios({
                method : 'get',
                url :api.qroductCatalog + api.queryAll
            })
            .then(function(res) {
                _this.CatalogList = res.data.datas;
                // console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            })

        _this.axios({
                method : 'post',
                header : {
                    "Content-Type" : 'application/x-www-form-urlencoded'
                },
                url : api.product + api.productByRequset,
                data : api.jsonData({pageStart : _this.$store.state.goodsListPage , pageNums : _this.$store.state.pageNums})
            })
            .then(function(res) {
                const data = res.data.datas.rows;
                console.log(res);
                _this.goodsTotalCount = res.data.datas.total;
                _this.originalGoodsList = data;
                data.forEach(function(item , index){
                    goods.push({
                        id : item.id,
                        name : {
                            img : item.imageUrl,
                            name : item.name , 
                            code : item.barCode
                        },
                        prize : item.price ? item.price : '协商',
                        unit : item.unitId,
                        qrUrl : item.qrUrl,
                        status : item.status == 0 ? '下架' : '上架',
                        classify : item.catalogId,
                        inventoryQty : item.inventoryQty,
                        spec : item.spec
                    })
                })
                _this.goodsList = goods;

            })
            .catch(function(err){
                console.log(err);
            })
       

    },
    data () {
        return {
            DOM : {},
            CatalogList : [],
            catalog : [],
            statusList: [
                {
                    value: '3',
                    label: '无'
                },
                {
                    value: '1',
                    label: '上架'
                },
                {
                    value: '0',
                    label: '下架'
                }
            ],
            columns5 : [
                {
                    type: '排序号',
                    key : 'sort',
                    width: 40,
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'name',
                    width : 300,
                    render (row , column , index) {
                        return  `<div class="wares">
                                    <img src='${row.name.img}'>
                                    <div class="waresInfo">
                                        <h3>${row.name.name}</h3> 
                                    </div>
                                </div>`
                    }
                },
                {
                    title: '规格型号',
                    key: 'spec'
                },
                {
                    title: '销售价格',
                    key: 'prize',
                    sortable: true,
                    render (row, column, index) {
                        return `<span class='prize'>${row.prize}</span>`;
                    }
                },
                
                {
                    title: '库存数量',
                    key: 'inventoryQty',
                },
                {
                    title : '商品二维码',
                    key : 'qrUrl',
                    render (row , column , index) {
                        return `<img src='${row.qrUrl}' class='qrUrl'>`
                    }
                },
                {
                    title : '状态',
                    key : 'status'
                },
                {
                    title : '操作',
                    key: 'action',
                    align: 'center',
                    render (row, column, index) {
                        return `<i-button type="text" size="small" @click="modify(${index},row)">修改</i-button> <i-button type="text" size="small" @click="remove(${index})">删除</i-button>`;
                    }
                }
            ],
            originalGoodsList : [],
            goodsList : [],
            goodsTotalCount : 0 ,
            // pageCount : 1
            data : {
                catalogId : '',
                status : '',
                name : '',
                pageStart :  this.$store.state.goodsListPage , 
                pageNums : this.$store.state.pageNums
            }
        }
    },
    methods : {
        query () {
            
            const _this = this;
            let catalogId;
            if(this.catalog.length > 0) {
                catalogId = this.catalog[this.catalog.length - 1];
            }else {
                catalogId = '';
            }
            if (this.data.status == 3) {
                this.data.status = '';
            }


            _this.$store.commit('goodsListPage',1);
            this.data.catalogId = catalogId;

            this.axios({
                method : 'post',
                url :api.product + api.productByRequset,
                data : api.jsonData(this.data)
            })
                .then(function(res) {
                    const data = res.data.datas.rows;
                    if(res.data.status == 1) {
                        _this.goodsTotalCount = res.data.datas.total;
                        _this.originalGoodsList = data;
                        if(data.length == 0 ){
                            _this.goodsList = [];
                            return;
                        }
                        let goods = [];
                        data.forEach(function(item , index){
                            goods.push({
                                id : item.id,
                                name : {
                                    img : item.imageUrl,
                                    name : item.name , 
                                    code : item.barCode
                                },
                                prize : item.price ? item.price : '协商',
                                unit : item.unitId,
                                qrUrl : item.qrUrl,
                                status : item.status == 0 ? '下架' : '上架',
                                classify : item.catalogId,
                                inventoryQty : item.inventoryQty,
                                spec : item.spec
                            })
                        })
                        _this.goodsList = goods;
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        enter (event) {
            console.log(event.keyCode);
            if(event.keyCode == 13) {
                this.query();
            }
        },
        toPage (count) {
           
            const _this = this;
            const goods = [];
            // _this.pageCount = count;
            _this.$store.commit('goodsListPage',count);
            this.data = {
                pageStart :  _this.$store.state.goodsListPage , 
                pageNums : _this.$store.state.pageNums
            }

            _this.axios({
                    method : 'post',
                    header : {
                        "Content-Type" : 'application/x-www-form-urlencoded'
                    },
                    url : api.product + api.productByRequset,
                    data : api.jsonData({pageStart :  _this.$store.state.goodsListPage , pageNums : _this.$store.state.pageNums})
                })
                .then(function(res) {
                    console.log(res);
                    const data = res.data.datas.rows;
                    _this.goodsTotalCount = res.data.datas.total;
                    data.forEach(function(item , index){
                        goods.push({
                            id : item.id,
                            name : {
                                img : item.imageUrl,
                                name : item.name , 
                                code : item.barCode
                            },
                            prize : item.price ? item.price : '协商',
                            unit : item.unitId,
                            qrUrl : item.qrUrl,
                            status : item.status == 0 ? '下架' : '上架',
                            classify : item.catalogId,
                            inventoryQty : item.inventoryQty,
                            spec : item.spec
                        })
                    })
                    _this.goodsList = goods;
                    _this.DOM.content.scrollTop = 0;
                })
                .catch(function(err){
                    console.log(err);
                })

        },
        remove (index) {
            this.$Modal.confirm({
                content: '确定要删除吗？',
                onOk  : () => {

                    console.log(index);
                    console.log(this.originalGoodsList[index]);
                    const _this = this;
                    const id = this.originalGoodsList[index].id;
                    _this.axios(api.product + id + api.productDelete)
                        .then(function(res){
                            console.log(res);
                            const goods = [];
                            _this.axios({
                                    method : 'post',
                                    header : {
                                        "Content-Type" : 'application/x-www-form-urlencoded'
                                    },
                                    url : api.product + api.productByRequset,
                                    data : api.jsonData({pageStart :  _this.pageCount , pageNums : _this.$store.state.pageNums})
                                })
                                .then(function(res) {
                                    console.log(res);
                                    const data = res.data.datas.rows;
                                    _this.goodsTotalCount = res.data.datas.total;
                                    data.forEach(function(item , index){
                                        goods.push({
                                            id : item.id,
                                            name : {
                                                img : item.imageUrl,
                                                name : item.name , 
                                                code : item.barCode
                                            },
                                            prize : item.price ? item.price : '协商',
                                            unit : item.unitId,
                                            qrUrl : item.qrUrl,
                                            status : item.status == 0 ? '下架' : '上架',
                                            classify : item.catalogId,
                                            inventoryQty : item.inventoryQty,
                                            spec : item.spec
                                        })
                                    })
                                    _this.goodsList = goods;
                                    _this.DOM.content.scrollTop = 0;
                                })
                                .catch(function(err){
                                    console.log(err);
                                })
                        })
                        .catch(function(err){
                            console.log(err);
                        })
                }
            });

        },
        modify (index, data) {
            this.$router.push({name : 'addGoods' , params : {id : this.goodsList[index].id}})
        },
       
    }
}
</script>

<style>
.goodsList .qrUrl {
    width: 80px;
    height: auto;
}
.ivu-select .ivu-select-dropdown {
    overflow: inherit;
}
.control {
    margin-top: 20px;
}
.fileHandle {
    margin-top: 20px;
}
.buttonM {
    margin-right: 10px;
}
.ivu-table-cell .ivu-table-sort i:first-child {
    top: -1px;
}
.prize {
    color: red;
}
/*.prize:before {
    content : '￥';
}*/
.wares {
    display: flex;
    padding: 10px 0;
}
.wares  img {
    width : 80px;
    height: 80px;
}
.wares .waresInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
}
.wares .waresInfo h3 {
    font-weight: 500;
    margin: 10px 0;
}
.catalogCascader {
    width: 200px;
    display: inline-block;
}
</style>