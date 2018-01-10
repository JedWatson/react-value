// @flow

import React, { Component, type ComponentType, type Node } from 'react';

type ValueProps<T> = {
  defaultValue: T,
  onChange?: (value: T) => void,
  render: (value: T, onChange: (value: T) => void) => Node,
};

type ValueState = {
  value: any,
};

export class Value<T> extends Component<ValueProps<T>, ValueState> {
  state = {
    value: this.props.defaultValue 
  };

  onChange = (value: any) => {
    const { onChange } = this.props;
    this.setState({ value });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const value: any = this.state.value;
    return this.props.render(value, this.onChange);
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
