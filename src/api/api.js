
export default {
	jsonData : function(data){
		// console.log(data);
		var jsondata = '';
		const reg = /^\".*\"$/;
		for(const key in data) {
			if(data[key]) {

				const tm = JSON.stringify(data[key]);
				// console.log(tm);

				if(tm.match(reg)) {
					var atm = tm.substr(1,tm.length - 2);
					atm = encodeURIComponent(atm);

					jsondata += key + '=' + atm + '&';
				}else {
					jsondata += key + '=' + encodeURIComponent(tm) + '&';
				}

			}
		}
		const json = jsondata.substr(0,jsondata.length-1);
		return json;
	},
	login : '/verifyUser.do',
	menus : '/sys/menu/fetchUserMenus.do',

	//  公用
	queryAll : 'queryAll.do',		//查询所有  get
	add : 'add.do'	,				//添加 post

	/* 客户分类 */
	category : '/api/customer/category/', 	//客户分类 api 根路径
	categoryGetRoots : 'queryAll.do' , 		//查询客户分类列表
	categoryGetById : '/query.do', 			// 根据ID查询某一个客户分类详情 -- 之前添加查询ID 如 /12/query.do
	categoryPostAddRoot :'addRoot.do' ,  	//增加跟节点 post请求
	cetegoryAdd : 'add.do', 				//增加子节点 post请求 ，其中必须指定 parentId
	cetegoryModify : 'modify.do', 			//修改指定节点
	cetegoryDelete : '/delete.do',  		//删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	cetegoryMoveUp : '/moveUp.do', 			//将特定节点上移-- 之前添加上移ID  如 /12/moveUp.do
	cetegoryMoveDown : '/moveDown.do', 		//将特定节点下移-- 之前添加上移ID  如 /12/moveDown.do
	//  客户级别
	clientLevel : '/api/customer/level/',   // 客户级别 api 根路径
	clientLevelqueryAll : 'queryAll.do',   	// 查询客户级别列表
	clientLevelQueryById : '/query.do',  	// 根据ID查询某一个客户级别详情 -- 之前添加查询ID 如 /12/query.do
	clientLevelAdd : 'add.do',   			// 添加客户级别
	clientLevelModify : 'modify.do',   		// 编辑客户级别
	clientLevelDel : '/delete.do',   		// 删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	// 区域设置
	region : '/api/customer/region/', 	//区域设置 api 根路径
	regionGetRoot : 'queryAll.do',		//查询区域设置列表
	regionGetById : '/query.do',		//根据ID查询某一个节点详情 -- 之前添加查询ID 如 /12/query.do
	regionAddRoot : 'addRoot.do',		//添加一级区域
	regionAdd : 'add.do',				//添加区域设置子分类
	regionModify : 'modify.do',			//修改区域设置
	regionMoveUp : '/moveUp.do',		//将特定节点上移-- 之前添加上移ID  如 /12/moveUp.do
	regionMoveDown : '/moveDown.do',	//将特定节点下移-- 之前添加上移ID  如 /12/moveDown.do
	regionDel : '/delete.do',			//删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	// 客户行业
	indeustry : '/api/customer/industry/' ,  	//客户行业 api 根路径
	indeustryqueryAll : 'queryAll.do',			// 查询客户行业列表
	indeustryGetById : '/query.do',				//根据ID查询某一个节点详情 -- 之前添加查询ID 如 /12/query.do
	indeustryAdd : 'add.do',					//添加客户行业分类
	indeustryModify : 'modify.do',				// 修改客户行业分类
	indeustryDel : '/delete.do',				//删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	//商品
	product : '/api/product/main/',				//商品
	productByRequset : 'queryByRequest.do',		//post 
	productModeify : 'modify.do',
	productQueryById : '/queryById.do',			//根据ID查询某一个客户级别详情 -- 之前添加查询ID 如 /12/query.do
	productDelete : '/deleteById.do',			// 删除指定节点 -- 之前添加删除ID  如 /12/deleteById.do

	// 商品分类
	qroductCatalog: '/api/product/catalog/'	,		//商品分类根路径



	// 商品属性
	productAttr : '/api/product/attribute/',		//商品属性 api 根路径
	productGetById : '/queryByIds.do',				//根据多	个id查询商品属性   如 /1,2,3/queryByIds.do

	//计量单位
	baseUnit : '/api/base/unit/',			// 单位 api 根路径

	//商品品牌
	baseBrand : 'api/base/brand/'			//商品品牌
}
