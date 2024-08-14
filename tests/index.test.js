'use strict'

const { it, describe, beforeEach } = require('node:test')
const assert = require('assert/strict')

describe('parent', () => {
  it('something', () => {
    assert.ok(!1)
  })

  describe('nested', () => {
    it('nested something', () => {
      assert.ok(!1)
    })
  })
})
