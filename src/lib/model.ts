export interface Options {
  cardType?: CardType
  debug?: boolean
  dllPath: string // path of dll
  findCardRetryTimes?: number    // 找卡重试数量，间隔1sec
}
export interface DeviceOptions extends Options {
  cardType: CardType
  debug: boolean
}

export type FnCallParams = string[] | never[] // calling params
export type FnParams = [string, FnCallParams] // def for ffi [returnType, [calling param, ...]]
export interface DllFuncs {
  [fn: string]: FnParams
}

// dll接口方法
export interface DllFuncsModel {
  JC_GetBankNumber(bankNum: Buffer): number // 接触获取银行卡卡号
  FJ_GetBankNumber(bankNum: Buffer): number   // 非接获取银行卡卡号
  // CT_GetBankNumber(track: number, ctime: number, len: Buffer, Data: Buffer): number  // 磁条获取银行卡卡号
  // ReadCard(time: string, data2: Buffer, nlen2: Buffer, data3: Buffer, nlen3: Buffer): number  // 读2、3磁道数据
}

export type CardType = 'jc' | 'fj' | 'auto' // 接触，非接触，auto轮询
