<template>
    <div class="clientClassify">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>客户管理</Breadcrumb-item>
            <Breadcrumb-item>客户级别</Breadcrumb-item>
        </Breadcrumb>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <Button type="warning" @click='addRoot'>新增</Button>
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
        </Row>
        <div class="fileHandle">
            <div class="table">
                <div class="table-header">
                    <div class="table-td bold">客户级别</div>
                    <div class="table-td bold">操作</div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='(classify , index) in data'>
                        <tree-table :model='classify' :index='index' @del='del' @edit='edit'></tree-table>
                    </div>
                </div>
            </div>
        </div>
                     

        <Modal
            v-model="clientClassifyModel"
            title="新增分类"
            @on-ok="confirm"
            @on-cancel="cancel">

            <Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">
                <Form-item label="编码" prop="code">
                    <Input v-model="compileForm.code" placeholder="编码"></Input>
                </Form-item>
                <Form-item label="名称" prop="name">
                    <Input v-model="compileForm.name" placeholder="名称"></Input>
                </Form-item>
                <Form-item label="描述" prop="description">
                    <Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import api from '@/api/api'
    import treeTable from '@/components/client/treeTable_rank.vue'
export default {
    components : {
        treeTable : treeTable
    },
    mounted () {
        const _this = this;
        this.axios(api.clientLevel + api.clientLevelqueryAll)
            .then(function(res) {
                _this.data = res.data.datas;
                console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            })
    },
    data () {
            return {
                data : '',
                clientClassifyModel : false,
                // enterType : 1,  //  1 : root  2: child 3 : edit
                compileForm: {
                    name: '',
                    code: '',
                    description : ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '分类编码不能为空', trigger: 'blur' }
                    ]
                },
                isEdit : false,
                prevClass : null ,
                editIndex : ''
                 
            }
        },
        methods: {
            show (index) {
                this.clientClassifyModel = true;
            },
            confirm () {
                const _this = this;

                if(!this.isEdit) {
                    _this.axios({
                        method : 'post',
                        header : {
                            "Content-Type" : 'application/x-www-form-urlencoded'
                        },
                        url :api.clientLevel + api.clientLevelAdd,
                        data : api.jsonData(_this.compileForm)
                    })
                    .then(function(res) {
                        console.log(res);
                        if(res.data.status == 1) {
                            _this.data.push(res.data.datas);
                            _this.compileForm.name = '';
                            _this.compileForm.code = '';
                            _this.compileForm.description = '';
                            _this.$Message.success('添加成功');
                        }
                    })
                }else {

                    const editInfo = _this.compileForm;
                    editInfo.id = this.data[this.editIndex].id;
                    console.log( api.clientLevel + api.clientLevelModify);
                    console.log( api.jsonData(editInfo));
                    _this.axios({
                        method : 'post',
                        header : {
                            "Content-Type" : 'application/x-www-form-urlencoded'
                        },
                        url :api.clientLevel + api.clientLevelModify,
                        data : api.jsonData(editInfo)
                    })
                    .then(function(res) {
                        _this.data[_this.editIndex] = res.data.datas;
                        _this.compileForm.name = '';
                        _this.compileForm.code = '';
                        _this.compileForm.description = '';
                        _this.isEdit =false;
                    })
                }
            },
            addRoot () {
                this.clientClassifyModel = true;
            },
            edit (index) {
                 
                 const _this = this;
                 this.editIndex = index;

                 _this.axios(api.clientLevel + _this.data[index].id + api.clientLevelQueryById)
                    .then(function(res) {
                        const info = res.data.datas;
                        _this.clientClassifyModel = true;
                        _this.compileForm.name = info.name;
                        _this.compileForm.code = info.code;
                        _this.compileForm.description = info.description;
                        _this.isEdit = true;
                    })
            },
            del (index) {
                const _this = this;
                _this.axios(api.clientLevel + this.data[index].id + api.clientLevelDel)
                    .then(function(res) {
                        _this.data.splice(index,1);
                    })
            },
            cancel () {
                // this.delModel = false;
                this.clientClassifyModel = false;
                this.compileForm.name = '';
                // this.compileForm.EPR = '';
                this.compileForm.code = '';
                this.compileForm.description = '';
            }
            
            
        }
    }
</script>

<style scoped>
    .fileHandle {
        margin-top: 16px;
    }
    .buttonM {
        margin-right: 10px;
    }
    .buttonM:nth-last-child(1) {
        margin: 0;
    }
    .ivu-form-item {
        margin-bottom: 20px;
    }
    .prevClassName {
        display: flex;
        align-items: center;
    }
    .prevClassName .title {
        /*display: inline-block;*/
        width: 80px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #657180;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: content-box;
    }
    .prevName {
        /*float: none;*/
        display: inline-block;
        width: 100%;
    }

    .table {
        display: table;
        width: 100%;
        margin: 10px;
    }
    .child-table {
        display: table;
        width: 200%;
    }
    .table-header {
        display: table-header-group;
        background : #f5f7f9;
        border: 1px solid #ddd;
        /*color: #fff;*/
    }
    .table-tbody {
        display: table-row-group;
    }
    .table-tr {
        display: table-row;
        background: #fff;
    }
    .table-tr:hover {
        background: #f9f9f9;
    }
    .table-td {
        display: table-cell;
        height: 30px;
        width: 50%;
        vertical-align: middle;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
    /*.table-td {
        width: 200%;
    }*/
    .align_left {
        text-align: left;
        padding-left: 30px;
    }
    .classityTeite {
        position: relative;
    }
    .isOpenicon {
        position: absolute;
        padding: 0 5px;
        font-size: 16px;
        left: -20px;
    }
    .bold {
        font-weight: bold;
    }
</style>