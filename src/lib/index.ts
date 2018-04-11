import * as ffi from 'ffi'
import { DTypes as DT } from 'win32-def'

import {
  isPathAcessible,
  join,
  logger,
  normalize,
} from '../shared/index'

import { dllFuncs, initialOpts } from './config'
import {
  DeviceOptions,
  DllFuncsModel,
  Kernel32Model,
  Options,
} from './model'

export { Options }


// read card data
export async function read(args: Options): Promise<string> {
  return init(args).then(([opts, api]) => {
    switch (opts.cardType) {
      case 'fj':
        return readFJ(api)

      case 'jc':
        return readJC(api)

      case 'auto':
        try {
          return readFJ(api) || readJC(api) || ''
        }
        catch (ex) {
          return ''
        }

      default:
        throw new Error('cardType invalid')
    }
  })
}

async function init(args?: Options): Promise<[DeviceOptions, DllFuncsModel]> {
  const opts = <DeviceOptions> (args ? { ...initialOpts, ...args } : { ...initialOpts })

  if (typeof opts.dllPath === 'undefined' || !opts.dllPath) {
    opts.dllPath = join(__dirname, '../../dll')
  }
  await validateDllFiles(opts.dllPath)
  opts.dllPath = normalize(opts.dllPath)
  opts.debug = !! opts.debug
  opts.debug && logger(opts)
  SetDllDirectory(opts.dllSearchPath)

  return [opts, <DllFuncsModel> ffi.Library(opts.dllPath, dllFuncs)]
}

// set loading path of ssse32.dll
function SetDllDirectory(path: any): boolean {
  const k32Funcs = {
    SetDllDirectoryW: [DT.BOOLEAN, [DT.LPCSTR] ],
    // GetDllDirectoryW: ['int', ['int', 'pointer'] ],
  }
  const k32 = <Kernel32Model> ffi.Library('kernel32', k32Funcs)
  const search = path && typeof path === 'string' ? path : join(__dirname, '../../dll')

  return k32.SetDllDirectoryW(Buffer.from(search))
}

function readFJ(api: DllFuncsModel): string {
  const buf = Buffer.alloc(128)

  api.FJ_GetBankNumber(buf)
  return parseBuffer(buf)
}

function readJC(api: DllFuncsModel): string {
  const buf = Buffer.alloc(128)

  api.JC_GetBankNumber(buf)
  return parseBuffer(buf)
}

function parseBuffer(buf: Buffer): string {
  return buf.toString('utf8').trim().replace(/\0/g, '')
}

async function validateDllFiles(path: string): Promise<void> {
  if (! path) {
    throw new Error('File path empth ')
  }
  // only filename. can be loaded by search path such as %system%
  if (! path.includes('/')) {
    return
  }
  // absolute path
  if (await isPathAcessible(path)) {
    return
  }
  throw new Error('File not exists: ' + path)
}

