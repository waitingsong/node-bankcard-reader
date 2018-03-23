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



// dll接口方法
export interface DllMethod {
  JC_GetBankNumber(bankNum: Buffer): number // 接触获取银行卡卡号
  FJ_GetBankNumber(bankNum: Buffer): number   // 非接获取银行卡卡号
  // CT_GetBankNumber(track: number, ctime: number, len: Buffer, Data: Buffer): number  // 磁条获取银行卡卡号
  // ReadCard(time: string, data2: Buffer, nlen2: Buffer, data3: Buffer, nlen3: Buffer): number  // 读2、3磁道数据
}

// ffi调用dll方法定义
export interface FfiDef {
  [fn: string]: [string, string[]]
}


export type CardType = 'jc' | 'fj' | 'ct' // 接触，非接触，磁条
