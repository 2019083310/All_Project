type IFormType='input'|'password'|'select'|'button'|'datepicker'|'checkbox'|'radio'

export interface IForm{
  labelWidth?:string
  formItems:IFormItem[]
  colLayout?:any
  itemLayout:any
}
export interface IFormItem{
  // 用于双向数据绑定
  field:string,
  type:IFormType,
  label:string,
  rules?:any[],
  placeholder?:any,
  // 针对select
  options?:any[],
  // 针对特殊的属性
  otherOptions?:any
}
