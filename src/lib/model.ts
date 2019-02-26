import { DModel as M, FModel as FM } from 'win32-def'

export interface Config {
  appDir: string  // base directory of this module
}

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

// dll接口方法
export interface DllFuncsModel extends FM.DllFuncsModel {
  JC_GetBankNumber(bankNum: M.POINT): M.INT // 接触获取银行卡卡号
  FJ_GetBankNumber(bankNum: M.POINT): M.INT // 非接获取银行卡卡号
}


export interface Kernel32Model extends FM.DllFuncsModel {
  SetDllDirectoryW(lpPathName: M.LPCTSTR): M.BOOLEAN
  GetDllDirectoryW(nBufferLength: M.DWORD, lpBuffer: M.LPTSTR): M.DWORD
}

export type CardType = 'jc' | 'fj' | 'auto' // 接触，非接触，auto轮询
