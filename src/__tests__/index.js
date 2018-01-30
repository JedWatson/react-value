import React, { Fragment } from "react";
import { mount } from "enzyme";
import { withValue } from "..";

const Input = props => <input {...props} type="text" />;
const InputWrapped = withValue(Input);
const CustomWrapped = withValue(
  props => (
    <Fragment>
      <input
        className="input1"
        onChange={e => props.onFunc1(e.target.value)}
        value={props.value1}
      />
      <input
        className="input2"
        onChange={e => props.onFunc2(e.target.value)}
        value={props.value2}
      />
    </Fragment>
  ),
  {
    value1: "onFunc1",
    value2: "onFunc2"
  }
);

test("onChange", () => {
  const spy = jest.fn();
  const wrapper = mount(<InputWrapped onChange={spy} />);
  const input = wrapper.find("input");

  expect(spy).toHaveBeenCalledTimes(0);
  expect(input.props()).toMatchObject({ value: "" });
  input.simulate("change", 1);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(input.props()).toMatchObject({ value: "" });
});

test("value (alone to test controlled / uncontrolled warnings)", () => {
  const wrapper = mount(<InputWrapped value={1} />);
  const input = wrapper.find("input");

  expect(input.props()).toMatchObject({ value: 1 });
});

test("onChange + value", () => {
  const spy = jest.fn();
  const wrapper = mount(<InputWrapped onChange={spy} value={1} />);
  const input = wrapper.find("input");

  expect(spy).toHaveBeenCalledTimes(0);
  expect(input.props()).toMatchObject({ value: 1 });
  input.simulate("change", 1);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(input.props()).toMatchObject({ value: 1 });
});

test("custom mapping", () => {
  const spy1 = jest.fn();
  const spy2 = jest.fn();
  const wrapper = mount(
    <CustomWrapped onFunc1={spy1} onFunc2={spy2} value1={1} value2={2} />
  );
  const input1 = wrapper.find(".input1");
  const input2 = wrapper.find(".input2");

  expect(spy1).toHaveBeenCalledTimes(0);
  expect(spy2).toHaveBeenCalledTimes(0);
  expect(input1.props().value).toBe(1);
  expect(input2.props().value).toBe(2);

  input1.simulate("change", 1);
  input2.simulate("change", 2);

  expect(spy1).toHaveBeenCalledTimes(1);
  expect(spy2).toHaveBeenCalledTimes(1);

  expect(spy1).toHaveBeenCalledWith("1");
  expect(spy2).toHaveBeenCalledWith("2");
});
