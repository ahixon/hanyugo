import React from 'react';
import {expect, assert} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import TextAnswer from '../../components/TextAnswer'

describe ('Simple textual answer box', () => {
  it ('should callback false if incorrect answer supplied', () => {
    let  cb = sinon.spy()
    let wrapper = shallow (<TextAnswer
      placeholder='Test'
      onSubmit={ cb }
      answers={ ['good', 'one'] }
      completed={ false } />)

    let input = wrapper.find ('input')

    input.value = 'blah'
    input.simulate ('input', {target: input})

    wrapper.find ('form').simulate('submit', {preventDefault: () => {}})
    assert.isTrue (cb.called, 'was called?')
    assert.isTrue (cb.calledOnce, 'was called once?')
    assert.isTrue (cb.calledWith (false), 'cb reported incorrect ans')

    expect (wrapper.find ('input').value).to.be.empty
  })

  it ('should callback true if a correct answer supplied', () => {
    let  cb = sinon.spy()
    let wrapper = shallow (<TextAnswer
      placeholder='Test'
      onSubmit={ cb }
      answers={ ['good', 'one'] }
      completed={ false } />)

    let input = wrapper.find ('input')

    input.value = 'one'
    input.simulate ('input', {target: input})

    wrapper.find ('form').simulate('submit', {preventDefault: () => {}})
    assert.isTrue (cb.called, 'was called?')
    assert.isTrue (cb.calledOnce, 'was called once?')
    assert.isTrue (cb.calledWith (true), 'cbh reported correct ans')

    expect (wrapper.find ('input').value).to.be.empty
  })
})