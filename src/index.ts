import { config } from './lib/config'

/* istanbul ignore next */
config.appDir = __dirname + '/..'

export * from './lib/index'
export * from './lib/model'
export { initialOpts } from './lib/config'
