import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { Value, withValue } from '../src';

test('render Value component defaultValue', () => {
  const renderFn = jest.fn(d => d);
  const renderer = TestRenderer.create(
    <Value defaultValue='value' render={renderFn} />
  );
  expect(renderFn).toHaveBeenCalledTimes(1);
  expect(renderFn).lastCalledWith('value', expect.any(Function));
  expect(renderer.toJSON()).toEqual('value');
});

test('call back when onChange of Value render is called', () => {
  const renderFn = jest.fn().mockReturnValue(null);
  const changeFn = jest.fn()
  TestRenderer.create(
    <Value defaultValue='value1' onChange={changeFn} render={renderFn} />
  );
  renderFn.mock.calls[0][1]('value2');
  expect(changeFn).toHaveBeenCalledTimes(1);
  expect(changeFn).lastCalledWith('value2');
  expect(renderFn).toHaveBeenCalledTimes(2);
  expect(renderFn).lastCalledWith('value2', expect.any(Function));
});

test('render enhanced component defaultValue', () => {
  const renderFn = jest.fn(({ value }) => value);
  const Enhanced = withValue(renderFn);
  const renderer = TestRenderer.create(
    <Enhanced defaultValue='value' />
  );
  expect(renderer.toJSON()).toEqual('value');
});

test('call back when onChange of enhanced component is called', () => {
  const renderFn = jest.fn().mockReturnValue(null);
  const changeFn = jest.fn();
  const Enhanced = withValue(renderFn);
  const renderer = TestRenderer.create(
    <Enhanced defaultValue='value1' onChange={changeFn} />
  );
  renderFn.mock.calls[0][0].onChange('value2');
  expect(changeFn).toHaveBeenCalledTimes(1);
  expect(changeFn).lastCalledWith('value2');
  expect(renderFn).toHaveBeenCalledTimes(2);
  expect(renderFn).lastCalledWith({
    value: 'value2',
    onChange: expect.any(Function)
  }, {});
});

test('customize value and onChange props of enhanced component', () => {
  const renderFn = jest.fn().mockReturnValue(null);
  const Enhanced = withValue(renderFn, {
    onChangeProp: 'onCustomChange',
    valueProp: 'customValue'
  });
  const renderer = TestRenderer.create(
    <Enhanced defaultValue='value' />
  );
  expect(renderFn).toHaveBeenCalledTimes(1);
  expect(renderFn).lastCalledWith({
    customValue: 'value',
    onCustomChange: expect.any(Function)
  }, {});
});
