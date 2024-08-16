'use strict'

const { test, before } = require('node:test')
const { spawnSync } = require('child_process')
const snapshot = require('@barelyhuman/node-snapshot').snapshot

const removeTimeStamps = text => {
  return text.replace(/\[((\d+\.\d+)ms)\]/g, '')
}

test('spawn with reporter', async t => {
  const child = spawnSync(
    process.execPath,
    ['--test-reporter', './index.js', './tests/__spec__/basic.test.js'],
    { env: { FORCE_COLOR: 1 } }
  )
  snapshot(t, removeTimeStamps(child.stdout.toString()))
})
