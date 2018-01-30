import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withValue } from 'react-value';
import './index.css';

const inc = i => (i || 0) + 1;

const logChange = name => value =>
  console.log(`${name} value updated: ${value}`);

class Input extends Component {
  onClick = () => {
    this.props.onChange(inc(this.props.value));
  };
  render() {
    return (
      <div>
        <pre>{this.props.value}</pre>
        <button onClick={this.onClick}>increment</button>
      </div>
    );
  }
}

class InputWithMapping extends Component {
  onClick = () => {
    this.props.altHandler(inc(this.props.altProp));
  };
  render() {
    return (
      <div>
        <pre>{this.props.altProp}</pre>
        <button onClick={this.onClick}>increment</button>
      </div>
    );
  }
}

class Toggle extends Component {
  handleToggle = () => {
    if (this.props.isOpen) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  };
  render() {
    return (
      <button onClick={this.handleToggle}>
        Toggle ({this.props.isOpen ? 'open' : 'closed'})
      </button>
    );
  }
}

const Example = withValue(Input);
const ExampleWithMapping = withValue(InputWithMapping, {
  altProp: {
    defaultName: 'defaultAltProp',
    handlers: {
      altHandler: v => v,
    },
  },
});
const ExampleWithMultiProps = withValue(Toggle, {
  isOpen: {
    defaultName: 'isOpenByDefault',
    defaultValue: false,
    handlers: {
      onClose: () => false,
      isOpen: () => true,
    },
  },
});

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

        <h3>Basic Example (uncontrolled)</h3>
        <Example onChange={logChange('Basic')} defaultValue={1} />

        <h3>Default Value (controlled)</h3>
        <Example onChange={logChange('Default value')} defaultValue={2} />

        <h3>Alternate Prop Names (uncontrolled)</h3>
        <ExampleWithMapping
          altHandler={logChange('Alt Props')}
          defaultAltProp={3}
        />

        <h3>Handling several props via a single map</h3>
        <ExampleWithMultiProps
          onClose={logChange('Closed')}
          onOpen={logChange('Open')}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
