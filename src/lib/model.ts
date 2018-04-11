import { DModel as DM } from 'win32-def'

export interface Options {
  cardType?: CardType
  debug?: boolean
  dllPath?: string // path of dll default as dll/
  dllSearchPath?: string // kernel32.SetDllDirectory(dllSearchPath)
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
  JC_GetBankNumber(bankNum: DM.POINT): DM.INT // 接触获取银行卡卡号
  FJ_GetBankNumber(bankNum: DM.POINT): DM.INT // 非接获取银行卡卡号
}


export interface Kernel32Model {
  SetDllDirectoryW(lpPathName: DM.LPCTSTR): DM.BOOLEAN
  GetDllDirectoryW(nBufferLength: DM.DWORD, lpBuffer: DM.LPTSTR): DM.DWORD
}


export type CardType = 'jc' | 'fj' | 'auto' // 接触，非接触，auto轮询
