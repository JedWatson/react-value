import React from 'react';
import { shallow } from 'enzyme';
import { Value, withValue } from '..';

function render(spy) {
  return function(value, onChange) {
    spy(value);
    return <input onChange={onChange} value={value} />;
  };
}

test('Value - should call onChange', () => {
  const spy = jest.fn();
  const val = shallow(<Value render={render(spy)} defaultValue={1} />);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith(1);
  val.find('input').simulate('change', 2);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenCalledWith(2);
});
