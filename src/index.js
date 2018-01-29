// @flow

import React, { Component } from "react";

type Options = {
  map: OptionsMap
};

type OptionsMap = {
  [string]: string
};

const defaultOptions: Options = {
  map: {
    value: "onChange"
  }
};

function createFunc(comp, propName, funcName) {
  return function(value: any) {
    const func = comp.props[funcName];
    comp.setState({ [propName]: value });
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
      result.props[propName] = comp.props[propName];
      return result;
    },
    {
      funcs: {},
      props: {}
    }
  );
}

export const withValue = (Comp: Class<Component<*>>, options: Options) => {
  options = { ...defaultOptions, ...options };
  return class extends Component<Object, Object> {
    render() {
      const mapped = createFuncsAndProps(this, options.map);
      return <Comp {...this.props} {...mapped.funcs} {...mapped.props} />;
    }
  };
};
