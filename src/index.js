// @flow

import React, { Component, type ComponentType, type Node } from 'react';

type ValueProps = {
  defaultValue: any,
  onChange: (value: any) => void,
  render: (value: any, onChange: (value: any) => void) => Node,
};
type ValueState = {
  value: any,
};

export class Value extends Component<ValueProps, ValueState> {
  constructor(props: ValueProps) {
    super(props);
    this.state = { value: props.defaultValue };
  }
  onChange = (value: any) => {
    const { onChange } = this.props;
    this.setState({ value });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };
  render() {
    return this.props.render(this.state.value, this.onChange);
  }
}

type WithValueProps = {
  defaultValue: any,
  onChange: (value: any) => void,
};

export const withValue = (
  Component: ComponentType<*>,
  { valueProp, onChangeProp }: { valueProp: string, onChangeProp: string } = {}
) => ({ defaultValue, onChange, ...props }: WithValueProps) => {
  return (
    <Value
      onChange={onChange}
      defaultValue={defaultValue}
      render={(value, onChange) => {
        const valueProps = {
          [valueProp || 'value']: value,
          [onChangeProp || 'onChange']: onChange,
        };
        return <Component {...props} {...valueProps} />;
      }}
    />
  );
};
