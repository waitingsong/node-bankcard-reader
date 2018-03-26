import {
  FfiDef,
  Options,
} from './model'


// 初始化参数
export const initialOpts: Options = {
  cardType: 'fj',
  debug: false,
  dllPath: '',
  findCardRetryTimes: 5,
}


export const ffiDef: FfiDef = {
  JC_GetBankNumber: ['int', ['pointer'] ], // 接触获取银行卡卡号
  FJ_GetBankNumber: ['int', ['pointer'] ], // 非接获取银行卡卡号
  // CT_GetBankNumber: ['int', ['int', 'int', 'pointer', 'pointer']], // 磁条获取银行卡卡号
  // ReadCard: ['int', ['char', 'pointer', 'pointer', 'pointer', 'pointer']] // 读2、3磁道数据
}
