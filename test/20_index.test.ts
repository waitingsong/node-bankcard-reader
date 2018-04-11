/// <reference types="mocha" />

import { basename } from 'path'
import * as assert from 'power-assert'

import * as bcr from '../src/lib/index'
import { Options } from '../src/lib/model'
import { join } from '../src/shared/index'


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
})
