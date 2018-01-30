// @flow

import React, { Component } from 'react';

type Comp = Component<Props, State>;

type Ctor = Class<Component<any>>;

type Event = {
  target: {
    value: string,
  },
};

type Mapped = {
  funcs: { [string]: Function },
  props: { [string]: any },
};

type Options = {
  [string]: {
    defaultName: string,
    defaultValue: string,
    handlers: { [string]: Function },
  },
};

type Props = {
  defaults: {
    [string]: any,
  },
};

type State = {
  [string]: any,
};

const defaultOptions: Options = {
  value: {
    defaultName: 'defaultValue',
    defaultValue: '',
    handlers: {
      onChange: (e: Event) => e.target.value,
    },
  },
};

function createFunc(comp, propName, handlerName, handlerFunc) {
  return function(value: any) {
    const func = comp.props[handlerName];
    const handledValue = handlerFunc(value);

    if (!(propName in comp.props)) {
      comp.setState({ [propName]: handledValue });
    }

    if (typeof func === 'function') {
      func(value);
    }
  };
}

function createFuncsAndProps(comp: Comp, opts: Options): Mapped {
  return Object.keys(opts).reduce(
    (result, propName) => {
      const { defaultName, defaultValue, handlers } = opts[propName];

      Object.keys(handlers).forEach(handlerName => {
        result.funcs[handlerName] = createFunc(
          comp,
          propName,
          handlerName,
          handlers[handlerName]
        );
      });

      Object.defineProperty(result.props, propName, {
        enumerable: true,
        get() {
          const { props, state } = comp;
          return propName in props
            ? props[propName]
            : propName in state
              ? state[propName]
              : defaultName in props ? props[defaultName] : defaultValue;
        },
      });

      return result;
    },
    {
      funcs: {},
      props: {},
    }
  );
}

export const withValue = (Comp: Ctor, opts: Options) => {
  opts = { ...defaultOptions, ...opts };
  return class extends Component<Props, State> {
    mapped: Mapped;
    static defaultProps = {
      defaults: {
        value: '',
      },
    };
    state = {};
    constructor(props: Props) {
      super(props);
      this.mapped = createFuncsAndProps(this, opts);
    }
    render() {
      const { funcs, props } = this.mapped;
      return <Comp {...this.props} {...funcs} {...props} />;
    }
  };
};
