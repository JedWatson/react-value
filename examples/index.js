import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withValue } from 'react-value';
import './index.css';

const inc = i => (i || 0) + 1;

const logChange = name => value => console.log(`${name}: ${value}`);

class Input extends Component {
  state = {
    value: this.props.defaultValue || 0,
  };
  onClick = () => {
    this.setState(state => {
      return {
        value: state.value + 1,
      };
    });
  };
  render() {
    return <button onClick={this.onClick}>Increment {this.state.value}</button>;
  }
}

class InputWithMapping extends Component {
  state = {
    altProp: this.props.defaultAltProp || 0,
  };
  onClick = () => {
    this.setState(
      state => ({ altProp: state.altProp + 1 }),
      () => this.props.altHandler(this.state.altProp)
    );
  };
  render() {
    return (
      <button onClick={this.onClick}>Increment {this.state.altProp}</button>
    );
  }
}

class Toggle extends Component {
  state = {
    isOpen: this.props.isOpenByDefault || false,
  };
  handleToggle = () => {
    this.setState(
      state => ({ isOpen: !state.isOpen }),
      () => (this.state.isOpen ? this.props.onOpen() : this.props.onClose())
    );
  };
  render() {
    return (
      <button onClick={this.handleToggle}>
        Toggle ({this.state.isOpen ? 'open' : 'closed'})
      </button>
    );
  }
}

const Example = withValue(Input);
const ExampleWithMapping = withValue(InputWithMapping);
const ExampleWithMultiProps = withValue(Toggle);

const Sample = ({ children, name }) => (
  <Fragment>
    <h3 style={{ textTransform: 'capitalize' }}>{name}</h3>
    {children(logChange(name))}
  </Fragment>
);

class App extends Component {
  render() {
    return (
      <div>
        <p>
          Controlled examples provide a <code>value</code> prop and will not
          change unless that prop is updated by the parent. You will see
          controlled components log a value because the handler is still called.
          This is so that you can update state inresponse to the change
          manually.
        </p>
        <p>
          Uncontrolled components do not provide a <code>value</code> and thus
          will update the internal value for you automatically. You may provide
          a <code>defaults</code> object prop that provides the initial, default
          values for all values you're mapping.
        </p>

        <Sample name="Basic (controlled)">
          {log => <Example onChange={log} value={1} />}
        </Sample>
        <Sample name="Basic (uncontrolled)">
          {log => <Example onChange={log} defaultValue={2} />}
        </Sample>
        <Sample name="Alternat prop name (controlled)">
          {log => <ExampleWithMapping altHandler={log} altProp={3} />}
        </Sample>
        <Sample name="Alternat prop name (uncontrolled)">
          {log => <ExampleWithMapping altHandler={log} defaultAltProp={4} />}
        </Sample>
        <Sample name="Multiple props (controlled)">
          {log => (
            <ExampleWithMultiProps onClose={log} onOpen={log} isOpen={true} />
          )}
        </Sample>
        <Sample name="Multiple props (uncontrolled)">
          {log => (
            <ExampleWithMultiProps
              onClose={log}
              onOpen={log}
              isOpenByDefault={true}
            />
          )}
        </Sample>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
