import { expect } from 'chai'

import {
  fromWei,
  toWei,
  fromWeiToGwei
} from '../../src/utils/web3'

describe('utils/web3.ts', () => {
  it('fromWei', () => {
    const wei = String(Math.pow(10, 10))
    const answer = fromWei(wei, 'ether')
    expect(answer).to.equal('0.00000001')
  })

  it('toWei', () => {
    const ether = '0.00000001'
    const answer = toWei(ether, 'ether')
    expect(answer).to.equal('10000000000')
  })

  it('toWei', () => {
    const wei = String(Math.pow(10, 10))
    const answer = fromWeiToGwei(wei)
    expect(answer).to.equal('10')
  })
})
