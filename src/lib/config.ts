import {
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import {
  Config,
} from './model'


export {
  initialOpts,
} from '@waiting/bankcard-reader-base'

export const config: Config = {
  appDir: '',
}

export const dllFuncs: FM.DllFuncs = {
  JC_GetBankNumber: [W.INT, [W.POINT] ], // 接触获取银行卡卡号
  FJ_GetBankNumber: [W.INT, [W.POINT] ], // 非接获取银行卡卡号
  // CT_GetBankNumber: ['int', ['int', 'int', 'pointer', 'pointer']], // 磁条获取银行卡卡号
  // ReadCard: ['int', ['char', 'pointer', 'pointer', 'pointer', 'pointer']] // 读2、3磁道数据
}
