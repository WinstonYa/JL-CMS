const PREFIX_API_1 = 'http://192.168.8.107:8776'; // 电子商务系统
const PREFIX_API_2 = 'http://192.168.8.107:8766'; //信息追溯系统
// const PREFIX_API_3 = 'http://192.168.8.133:8777'; //公益性子系统
const PREFIX_API_3 = 'http://192.168.8.107:8777'; //公益性子系统 cj

export default {
  //追溯信息系统
  //文章管理获取文章列表
  articleList: `${PREFIX_API_2}/article/list`,
  articleListPage: `${PREFIX_API_2}/article/listArticleByPage`,
  //文章管理通过文章id获取文章数据
  articleId: id => `${PREFIX_API_2}/article/id?id=${id}`,
  //文章管理系统删除文章
  articleDel: `${PREFIX_API_2}/article/delStatus`,
  //文章管理增加文章
  articleAdd: `${PREFIX_API_2}/article/add`,
  //文章管理更新文章
  articleUpdate: `${PREFIX_API_2}/article/update`,
  //特色农产品管理获取列表
  featureProductsList: `${PREFIX_API_2}/product/all`,
  //新增特色农产品
  featureProductAdd: `${PREFIX_API_2}/product/add`,
  //删除特色农产品
  featureProductDel: id => `${PREFIX_API_2}/product/del?ids=${id}`,
  //修改特色农产品
  featureProductEdit: `${PREFIX_API_2}/product/update`,
  //获取企业名录列表
  getCompanylist: `${PREFIX_API_2}/company/allByPage`,
  //新增企业名录
  businessDirectoryAdd: `${PREFIX_API_2}/company/addNewCompanyInfo`,
  //修改企业名录
  businessDirectoryEdit: `${PREFIX_API_2}/company/updateCompanyInfo`,
  //删除企业名录
  businessDirectoryDel: id => `${PREFIX_API_2}/company/del?ids=${id}`,

  // 电子商务系统
  // 分页获取优质农产品列表
  getProductListByPage: `${PREFIX_API_1}/perfectProduct/listByPage`,
  // 新增优质农产品
  addHighQualityProduct: `${PREFIX_API_1}/perfectProduct/addNewQualityProduct`,
  // 更新优质农产品
  updateHighQualityProduct: `${PREFIX_API_1}/perfectProduct/updateQualityProduct`,
  // 更新优质农产品审核状态
  ModifyProductStatus: `${PREFIX_API_1}/perfectProduct`,
  // 根据留言id获取回复消息
  getQAReplyInfo: `${PREFIX_API_1}/reply/getReplyByqaId`,
  // 更新留言审核状态
  ModifyQAStatus: `${PREFIX_API_1}/qa`,
  // 分页获取留言信息
  getQAInfoByPage: `${PREFIX_API_1}/qa/listByPage`,
  // 回复指定id的留言信息
  replyQAById: `${PREFIX_API_1}/reply/replyQAById`,
  // 更新一条回复消息
  updateReplyQAInfo: `${PREFIX_API_1}/reply`,
  // 分页获取市场行情列表
  getMarketingListByPage: `${PREFIX_API_1}/marketing/listByPage`,
  // 更新市场行情信息
  MarketingInfo: `${PREFIX_API_1}/marketing`,
  // 根据Type类型获取农产品名称
  getProductNameDicByType: `${PREFIX_API_1}/dic/getDicByType`,
  // 分页获取价格行情列表
  getPriceInfoListByPage: `${PREFIX_API_1}/price/listByPage`,
  // 价格行情
  priceInfo: `${PREFIX_API_1}/price`,
  // 分页获取供求信息
  getSupplyDemandListByPage: `${PREFIX_API_3}/supplydemand/listByPage`,
  // 供求信息
  SupplyDemandInfo: `${PREFIX_API_3}/supplydemand`,
  // 新增供求信息
  addNewSupplyDemandInfo: `${PREFIX_API_3}/supplydemand/addNewSupplyDemand`,
  // 获取供求信息
  getSupplyDemandById: `${PREFIX_API_3}/supplydemand/getSupplyDemandById`,
  // 更新供求信息
  updateSupplyDemand: `${PREFIX_API_3}/supplydemand/updateSupplyDemand`,

  // 分页获取专家信息
  getExpertList: `${PREFIX_API_3}/expert/getExpertInfoListByPage`,
  // 获取一条专家信息
  getExpertInfo: `${PREFIX_API_3}/expert/getExpert/`,
  // 新增一条专家信息
  addExpertInfo: `${PREFIX_API_3}/expert/addExpert`,
  // 更新一条专家信息
  updateExpert: `${PREFIX_API_3}/expert/updateExpert`
};
