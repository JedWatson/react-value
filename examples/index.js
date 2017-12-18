import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Value, withValue } from 'react-value';
import './index.css';

const inc = i => (i || 0) + 1;

const logChange = name => value =>
  console.log(`${name} value updated: ${value}`);

class Input extends Component {
  onClick = () => {
    const { value } = this.props;
    this.props.onChange(inc(value));
  };
  render() {
    const { value } = this.props;
    return (
      <div>
        <pre>{value || 0}</pre>
        <button onClick={this.onClick}>increment</button>
      </div>
    );
  }
}

const AltProps = ({ altValue, altOnChange, ...props }) => (
  <Input value={altValue} onChange={altOnChange} {...props} />
);

const AltPropsWithValue = withValue(AltProps, {
  valueProp: 'altValue',
  onChangeProp: 'altOnChange',
});

const InputWithValue = withValue(Input);

class App extends Component {
  render() {
    return (
      <div>
        <h3>Basic Example:</h3>
        <Value
          onChange={logChange('Basic')}
          render={(value, onChange) => (
            <Input value={value} onChange={onChange} />
          )}
        />
        <h3>Default Value:</h3>
        <Value
          defaultValue={3}
          onChange={logChange('With default')}
          render={(value, onChange) => (
            <Input value={value} onChange={onChange} />
          )}
        />
        <h3>Higher Order Component:</h3>
        <InputWithValue onChange={logChange('HOC')} defaultValue={5} />
        <h3>Alternate Prop Names:</h3>
        <AltPropsWithValue onChange={logChange('Alt Props')} defaultValue={8} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
