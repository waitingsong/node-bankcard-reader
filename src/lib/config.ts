import { DTypes as W, FModel as FM } from 'win32-def'

import {
  Config,
  Options,
} from './model'


export const initialConfig: Config = {
  appDir: '',
}

// 初始化参数
export const initialOpts: Options = {
  cardType: 'auto',
  debug: false,
  dllPath: '',
  dllSearchPath: '',
}


export const dllFuncs: FM.DllFuncs = {
  JC_GetBankNumber: [W.INT, [W.POINT] ], // 接触获取银行卡卡号
  FJ_GetBankNumber: [W.INT, [W.POINT] ], // 非接获取银行卡卡号
  // CT_GetBankNumber: ['int', ['int', 'int', 'pointer', 'pointer']], // 磁条获取银行卡卡号
  // ReadCard: ['int', ['char', 'pointer', 'pointer', 'pointer', 'pointer']] // 读2、3磁道数据
}
