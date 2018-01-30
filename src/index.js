// @flow

import React, { Component } from "react";

type Options = {
  map: OptionsMap
};

type OptionsMap = {
  [string]: string
};

type Props = {
  defaults: {
    [string]: any
  }
};

type State = {
  [string]: any
};

const defaultOptions: Options = {
  map: {
    value: "onChange"
  }
};

function createFunc(comp, propName, funcName) {
  return function(value: any) {
    const func = comp.props[funcName];
    if (!(propName in comp.props)) {
      comp.setState({ [propName]: value });
    }
    if (typeof func === "function") {
      func(value);
    }
  };
}

function createFuncsAndProps(comp, map) {
  return Object.keys(map).reduce(
    (result, propName) => {
      const funcName = map[propName];
      result.funcs[funcName] = createFunc(comp, propName, funcName);
      result.props[propName] = getPropValue(comp, propName);
      return result;
    },
    {
      funcs: {},
      props: {}
    }
  );
}

function getPropValue(comp, propName) {
  const { props, state } = comp;
  return propName in props
    ? props[propName]
    : propName in state ? state[propName] : props.defaults[propName];
}

export const withValue = (Comp: Class<Component<any>>, options: Options) => {
  options = { ...defaultOptions, ...options };
  return class extends Component<Props, State> {
    static defaultProps = {
      defaults: {
        value: ""
      }
    };
    state = {};
    render() {
      const { funcs, props } = createFuncsAndProps(this, options.map);
      return <Comp {...this.props} {...funcs} {...props} />;
    }
  };
};
