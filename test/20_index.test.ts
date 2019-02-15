/// <reference types="mocha" />

import { join } from '@waiting/shared-core'
import { basename } from 'path'
import * as assert from 'power-assert'

import * as bcr from '../src/lib/index'
import { Options } from '../src/lib/model'


const filename = basename(__filename)

describe(filename, () => {

  it('Should read() works', async () => {
    const dll = join(__dirname, '../dll/hsbankcardinfo.dll')
    const opts: Options = {
      cardType: 'auto',
      debug: false,
      dllPath: dll,
    }

    try {
      const ret = await bcr.read(opts)

      assert(!! ret, 'IDData invalid')
    }
    catch (ex) {
      assert(false, ex)
    }
  })

  it('Should read() without args works', async () => {
    try {
      const ret = await bcr.read()

      assert(!! ret, 'IDData invalid')
    }
    catch (ex) {
      assert(false, ex)
    }
  })
})
