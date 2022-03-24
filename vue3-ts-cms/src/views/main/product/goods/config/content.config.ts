export const contentTableConfig={
  title:'商品列表',
  showIndexColumn:true,
  showSelectColumn:true,
  propList:[
    {prop:'name',label:'商品名称',minWidth:'80'},
    {prop:'oldPrice',label:'原价格',minWidth:'80',slotName:'oldPrice'},
    {prop:'newPrice',label:'现价格',minWidth:'80',slotName:'newPrice'},
    {prop:'imgUrl',label:'商品图片',minWidth:'100',slotName:'image'},
    {prop:'status',label:'商品状态',minWidth:'100',slotName:'status'},
    {prop:'creatAt',label:'创建时间',minWidth:'230',slotName:'createAt'},
    {prop:'updateAt',label:'更新时间',minWidth:'230',slotName:'updateAt'},
    {label:'操作',minWidth:'160',slotName:'handler'},
  ]
}
