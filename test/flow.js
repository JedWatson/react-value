// @flow

import * as React from 'react';
import { Value } from '../src/index.js';

{
  (
    <Value defaultValue={5} render={value => {
      (value: number);
      // $FlowFixMe
      (value: string);
    }} />
  );
}

{
  (
    <Value defaultValue={5} onChange={value => {
      // $FlowFixMe
      (value: string)
    }} render={(value: number, onChange) => {
      // $FlowFixMe
      onChange('');
    }} />
  );
}

{
  (
    <Value defaultValue={5} onChange={(value: number) => {
      // $FlowFixMe
      (value: string)
    }} render={(value, onChange) => {
      // $FlowFixMe
      onChange('');
    }} />
  );
}
