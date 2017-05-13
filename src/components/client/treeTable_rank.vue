<template>


<div class="child-table">
    <div class="table-tbody">
        <div class="table-tr">
            <div class="table-td ">
                <div class="classityTeite">
                    {{model.name}}
                </div>
            </div>
            <div class="table-td">
                <Button type="text" v-on:click='edit'>编辑</Button>
                <Button type="text" v-on:click='isDel'>删除</Button>
            </div>
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
    </div>
</div>

</template>
 <script>
import api from '@/api/api'
export default {
	name: 'treeTable',
	props: ['model','index'],
 	data() {
	 	return {
		 	// isFolder: this.model.child && this.model.child.length > 0,
		 	moveDownCount : 0,
		 	newValue1 : '',
		 	newValue2 : '',
		 	delModel : false,
		 	compileForm: {
                name: '',
                code: '',
                description : ''
            },
            isEdit : false
            
		}
	},
	computed: {
		// this.routerName = this.$router.currentRoute.name;
	},
	methods: {
		edit () {
			
			this.$emit('edit',this.index);
			
		},
		del () {
			this.$emit('del',this.index);
			this.delModel = false;
		},
		isDel () {
			this.delModel = true;
		},
		cancel () {
			this.delModel = false;
			this.compileForm.name = '';
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