// @flow

import React, { Component } from "react";

type Comp = Component<Props, State>;
type Ctor = Class<Component<any>>;

type Mapped = {
  funcs: { [string]: Function },
  props: { [string]: any }
};

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

function createFuncsAndProps(comp: Comp, map: OptionsMap): Mapped {
  return Object.keys(map).reduce(
    (result, propName) => {
      const funcName = map[propName];
      result.funcs[funcName] = createFunc(comp, propName, funcName);
      Object.defineProperty(result.props, propName, {
        enumerable: true,
        get() {
          const { props, state } = comp;
          return propName in props
            ? props[propName]
            : propName in state ? state[propName] : props.defaults[propName];
        }
      });
      return result;
    },
    {
      funcs: {},
      props: {}
    }
  );
}

export const withValue = (Comp: Ctor, options: Options) => {
  options = { ...defaultOptions, ...options };
  return class extends Component<Props, State> {
    mapped: Mapped;
    static defaultProps = {
      defaults: {
        value: ""
      }
    };
    state = {};
    constructor(props: Props) {
      super(props);
      this.mapped = createFuncsAndProps(this, options.map);
    }
    render() {
      const { funcs, props } = this.mapped;
      return <Comp {...this.props} {...funcs} {...props} />;
    }
  };
};
