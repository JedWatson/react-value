// @flow

import React, { Component } from 'react';

// This is similar to { ...state, ...props } but it doesn't
// include prop values that aren't in the current state.
function getOverriddenState(props: Object, state: Object) {
  return Object.keys(state).reduce((prev, next) => {
    prev[next] = next in props ? props[next] : state[next];
    return prev;
  }, {});
}

export const withValue = (Base: any = Component) => {
  return class extends Base<any, any> {
    // $FlowFixMe - unsafe getter
    get state() {
      return getOverriddenState(this.props, this._state || {});
    }
    // $FlowFixMe - unsafe setter
    set state(state) {
      this._state = state;
    }
  };
};
