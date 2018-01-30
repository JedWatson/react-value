import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withValue } from "react-value";
import "./index.css";

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
    this.props.altHandler(inc(this.props.value));
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

const Example = withValue(Input);
const ExampleWithMapping = withValue(InputWithMapping, {
  altProp: "altHandler"
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
        <Example onChange={logChange("Basic")} defaults={{ value: 1 }} />

        <h3>Default Value (controlled)</h3>
        <Example onChange={logChange("Default value")} value={2} />

        <h3>Alternate Prop Names (controlled)</h3>
        <ExampleWithMapping altHandler={logChange("Alt Props")} altProp={3} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
