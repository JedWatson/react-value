// @flow

import React, { Component } from 'react';

type Comp = Component<any, any>;

type Ctor = Class<Comp>;

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
    handlers: Array<string>,
  },
};

type SetStateUpdater = Function | Object | void;
type SetStateCallback = Function | void;

const defaultOptions: Options = {
  value: {
    defaultName: 'defaultValue',
    defaultValue: '',
    handlers: ['onChange'],
  },
};

// function createFunc(comp, propName, handlerName) {
//   return function(stateValue: any, callbackValue: any) {
//     const func = comp.props[handlerName];

//     if (!(propName in comp.props)) {
//       comp.setState({ [propName]: stateValue });
//     }

//     if (typeof func === 'function') {
//       func(callbackValue);
//     }
//   };
// }

// function createFuncsAndProps(comp: Comp, opts: Options): Mapped {
//   return Object.keys(opts).reduce(
//     (result, propName) => {
//       const { defaultName, defaultValue, handlers } = opts[propName];

//       handlers.forEach(handlerName => {
//         result.funcs[handlerName] = createFunc(comp, propName, handlerName);
//       });

//       Object.defineProperty(result.props, propName, {
//         enumerable: true,
//         get() {
//           const { props, state } = comp;
//           return propName in props
//             ? props[propName]
//             : propName in state
//               ? state[propName]
//               : defaultName in props ? props[defaultName] : defaultValue;
//         },
//       });

//       return result;
//     },
//     {
//       funcs: {},
//       props: {},
//     }
//   );
// }

function getState(
  updater: SetStateUpdater,
  prevState: SetStateUpdater,
  props: Object
): SetStateUpdater {
  return typeof updater === 'function' ? updater(prevState, props) : updater;
}

function getOverriddenState(props: Object, state: Object) {
  return Object.keys(state).reduce((prev, next) => {
    prev[next] = next in props ? props[next] : state[next];
    return prev;
  }, {});
}

// export const withValue = (Comp: Ctor, opts: Options) => {
//   opts = { ...defaultOptions, ...opts };
//   return class extends Component<any, any> {
//     // mapped: Mapped;
//     constructor(props: Object) {
//       super(props);
//       this.state = getOverriddenState(props, {});
//     }
//     setState(updater: SetStateUpdater, callback: SetStateCallback) {
//       super.setState((prevState, props) => {
//         const state = getState(updater, prevState, props) || {};
//         const overriddenState = getOverriddenState(props, state);
//       }, callback);
//     }
//     render() {
//       const { funcs, props } = this.mapped;
//       return <Comp {...this.props} />;
//     }
//   };
// };

export const withValue = (Base: any = Component) => {
  return class extends Base<any, any> {
    // $FlowFixMe
    get state() {
      return getOverriddenState(this.props, this._state || {});
    }
    // $FlowFixMe
    set state(state) {
      this._state = state;
    }
  };
};
