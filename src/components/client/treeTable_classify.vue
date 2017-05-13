<template>


<div class="child-table">
    <div class="table-tbody">
        <div class="table-tr">
            <div class="table-td align_left" :style="{paddingLeft : model.level * 30 + 'px'}">
                <div class="classityTeite"  @click="toggle">
                    <Icon :type="open ? 'minus-round' : 'plus-round'" class='isOpenicon' v-if='model.children'></Icon>
                    {{model.name}}
                </div>
            </div>
            <div class="table-td">
                <Button type="text" v-on:click='add'  v-if='model.level!==5'>添加子类</Button>
                <Button type="text" v-on:click='toEdit'>编辑</Button>
                <Button type="text" v-on:click='moveUp'>上移</Button>
                <Button type="text" v-on:click='moveDown'>下移</Button>
                <Button type="text" v-on:click='isDel'>删除</Button>
            </div>
        </div>
        <div class="table-tr" v-if='model.children' v-show='open'>
        	<tree-table v-for="(item , index) in model.children" :key='index' :model="item" :parentModel='model' :index='index' v-on:del='del' v-on:addChild='addChild' v-on:edit='edit' v-on:moveUp='moveUp' v-on:moveDown='moveDown'></tree-table>
        </div>


        <Modal v-model="delModel" width="360">
            <p slot="header" style="color:#f60;text-align:center;">
                <!-- <Icon type="information-circled"></Icon> -->
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>你确定要删除吗？</p>
            </div>
            <div slot="footer">
            	<Button type='text' @click='cancel'>取消</Button>
                <Button type="error" @click="del">删除</Button>
            </div>
        </Modal>

        <Modal
            v-model="clientClassifyModel"
            title="新增分类"
            @on-ok="addChild"
            @on-cancel="cancel">

            <Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">
                <div class="prevClassName">
                    <div class="title">上级分类</div>
                    <div class="prevName">{{ parentName }}</div>
                </div>
                <Form-item label="分类编码" prop="code">
                    <Input v-model="compileForm.code" placeholder="分类编码"></Input>
                </Form-item>
                <Form-item label="分类名称" prop="name">
                    <Input v-model="compileForm.name" placeholder="分类名称"></Input>
                </Form-item>
                <!-- <Form-item label="EPR编码" prop="EPR">
                    <Input v-model="compileForm.EPR" placeholder="EPR编码"></Input>
                </Form-item> -->
                <Form-item label="描述" prop="description">
                    <Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</div>

</template>
 <script>
import api from '@/api/api'
export default {
	name: 'treeTable',
	props: ['model','index', 'parentModel'],
 	data() {
	 	return {
	 		open : false,
		 	// isFolder: this.model.child && this.model.child.length > 0,
		 	moveDownCount : 0,
		 	newValue1 : '',
		 	newValue2 : '',
		 	delModel : false,
		 	clientClassifyModel : false,
		 	compileForm: {
                parentId : '',
                name: '',
                // EPR: '',
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
            parentName : '无',  //父级分类名称
            isEdit : false
            
		}
	},
	computed: {
		// this.routerName = this.$router.currentRoute.name;
	},
	methods: {
	 	toggle () {
			if (this.model.children) {
				this.open = !this.open
		 	}
		},
		add () {
			this.parentName = this.model.name;
			this.compileForm.parentId = this.model.id;
			this.clientClassifyModel = true;
		},
		addChild (data) {
			const _this = this;
			if(!this.isEdit){
				_this.axios({
				    method : 'post',
				    header : {
				        "Content-Type" : 'application/x-www-form-urlencoded'
				    },
				    url :api.category + api.cetegoryAdd,
				    data : api.jsonData(_this.compileForm)
				})
				.then(function(res) {
				    console.log(res);
				    if(res.data.status == 1) {
				    	if(_this.model.children) {
				    		_this.model.children.push(res.data.datas);
				    	}else {
				    		_this.model.children = [res.data.datas];

				    	}
					    _this.compileForm.name = '';
					    _this.compileForm.parentId = '';
					    _this.compileForm.code = '';
					    _this.compileForm.description = '';
				    }
				})
			}else {
				const editInfo = _this.compileForm;
				editInfo.id = this.model.id;
				_this.axios({
				    method : 'post',
				    header : {
				        "Content-Type" : 'application/x-www-form-urlencoded'
				    },
				    url :api.category + api.cetegoryModify,
				    data : api.jsonData(editInfo)
				})
				.then(function(res) {
				    console.log(res);
				    _this.model = res.data.datas;
				    _this.compileForm.name = '';
				    _this.compileForm.parentId = '';
				    _this.compileForm.code = '';
				    _this.compileForm.description = '';
				})
				this.isEdit = false;
			}
		},
		toEdit () {

			const _this = this;

			_this.axios(api.category + _this.model.id + api.categoryGetById)
				.then(function(res) {
					var data = res.data.datas;
					console.log(data);

					if(res.data.status == 1) {
						_this.clientClassifyModel = true;
						_this.compileForm.name = data.name;
						_this.compileForm.parentId = data.parentId;
						_this.compileForm.code = data.code;
						_this.compileForm.description = data.description;
						_this.isEdit = true;
					}
				})


		},
		edit () {
		// 	// this.$emit('edit',this.model);
		},
		moveUp (data) {
			if (data.id) {
				this.$emit('moveUp',data);
				return;
			}
			const _this = this;
			_this.axios(api.category + _this.model.id + api.cetegoryMoveUp)
				.then(function(res) {
					// console.log(res);
					if(res.data.status == 1) {

						if(_this.model.level !== 1) {
							// console.log(data);
							if(_this.index == 0) {
							    return;
							}
							// console.log(this.parentModel);
							_this.newValue1 = _this.model;
							_this.newValue2 = _this.parentModel.children[_this.index - 1];
							_this.parentModel.children.splice(_this.index-1,2,_this.newValue1,_this.newValue2);
							_this.$emit('moveUp',_this.model);
						} else {
							
							if(_this.index == 0) {
							    return;
							}
							_this.newValue1 = _this.model;
							_this.newValue2 = _this.parentModel[_this.index - 1];
							_this.parentModel.splice(_this.index-1,2,_this.newValue1,_this.newValue2);
						}
						_this.$Message.success('上移成功');
					}
				})


		},
		moveDown (data) {
			const _this = this;
			if (data.id) {
				_this.$emit('moveDown',data);
				return;
			}
			_this.axios(api.category + _this.model.id + api.cetegoryMoveDown)
				.then(function(res){
					if(res.data.status == 1) {
						if(_this.model.level !== 1) {
							
							if(_this.index == _this.parentModel.children.length - 1) {
							    return;
							}
							_this.newValue1 = _this.parentModel.children[_this.index + 1];
							_this.newValue2 = _this.model;
							_this.parentModel.children.splice(_this.index,2,_this.newValue1,_this.newValue2);
							_this.$emit('moveDown',_this.model);
						}else {
							
							if(_this.index == _this.parentModel.length - 1) {
							    return;
							}
							_this.newValue1 = _this.parentModel[_this.index + 1];
							_this.newValue2 = _this.model;
							_this.parentModel.splice(_this.index,2,_this.newValue1,_this.newValue2);
							// _this.$emit('moveDown',_this.model);
						}
						_this.$Message.success('下移成功');
					}
				})

		},
		del (data) {
			if(data.id) {
				this.$emit('del',data);
				return;
			}

			const _this = this;
			_this.axios(api.category + _this.model.id + api.cetegoryDelete)
				.then(function(res) {
					console.log(res);
					if(res.data.status == 1) {
						if(_this.model.level !== 1) {
							_this.parentModel.children.splice(_this.index,1);
							_this.delModel = false;
							_this.$Message.success('删除成功');
							_this.$emit('del',_this.model);
						}else {
							_this.parentModel.splice(_this.index,1);
							_this.delModel = false;
							_this.$Message.success('删除成功');
							_this.$emit('del',_this.model);
						}
					}else if(res.data.status == 0) {
						_this.delModel = false;
						_this.$Message.error(res.data.message);
					}
				})

		},
		isDel () {
			// console.log(this.$router.currentRoute.name);
			this.delModel = true;
		},
		cancel () {
			this.delModel = false;
			this.clientClassifyModel = false;
			this.compileForm.name = '';
			this.compileForm.parentId = '';
			// this.compileForm.EPR = '';
			this.compileForm.code = '';
			this.compileForm.description = '';
		}
	}
}
</script>

<style>
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
</style>