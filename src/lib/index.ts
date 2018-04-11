import * as ffi from 'ffi'

import {
  isPathAcessible,
  logger,
  normalize,
} from '../shared/index'

import { dllFuncs, initialOpts } from './config'
import {
  DeviceOptions,
  DllFuncsModel,
  Options,
} from './model'


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

async function init(args: Options): Promise<[DeviceOptions, DllFuncsModel]> {
  const opts = <DeviceOptions> { ...initialOpts, ...args }

  if (typeof opts.dllPath === 'undefined' || !opts.dllPath) {
    return Promise.reject('params dllPath undefined or blank')
  }
  await validateDllFiles(opts.dllPath)
  opts.dllPath = normalize(opts.dllPath)
  opts.debug = !! opts.debug

  if (typeof opts.findCardRetryTimes === 'undefined' || isNaN(opts.findCardRetryTimes) || opts.findCardRetryTimes < 0) {
    opts.findCardRetryTimes = 5
  }
  opts.debug && logger(opts)

  return [opts, <DllFuncsModel> ffi.Library(opts.dllPath, dllFuncs)]
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

