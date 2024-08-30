const { describe, it } = require('node:test')
const assert = require('assert/strict')
const { setTimeout } = require('timers/promises')

describe('all passing', () => {
  it('pass 1', () => {
    assert.ok(1)
  })
  it('pass 2', () => {
    assert.ok(1)
  })
  it('pass 3', () => {
    assert.ok(1)
  })
})

describe('level 1 fails', () => {
  it('fail 1', () => {
    assert.ok(!1)
  })

  it('pass 1', () => {
    assert.ok(1)
  })
})

describe('level 1 multi assertion, single failure', () => {
  it('fail 1', () => {
    assert.ok(1)
    assert.ok(!1)
  })

  it('pass 1', () => {
    assert.ok(1)
  })
})

describe('level 2 fails', () => {
  it('pass 1', () => {
    assert.ok(1)
  })

  describe('nested level', () => {
    it('failed level 1', () => {
      assert.ok(!1)
    })
  })
})

describe('async work', () => {
  describe('async work nested', () => {
    it('pass 1', () => {
      assert.ok(2)
      new Promise(r => {
        setTimeout(() => {
          r()
        }, 4000)
      })
    })
  })
})
