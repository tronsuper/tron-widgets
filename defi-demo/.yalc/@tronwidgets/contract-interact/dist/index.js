
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./transaction.cjs.production.min.js')
} else {
  module.exports = require('./transaction.cjs.development.js')
}
