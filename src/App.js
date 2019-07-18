import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import "./style.scss";


class HandleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
  }
  handleFormState() {
    this.setState({ disabled: !this.state.disabled });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="creative-name">Creative name:</label>
        <Field
          className="textarea"
          name="creative"
          required="required"
          placeholder="Write name here"
          component="input"
        />
        <div className="input-group">
          <label htmlFor="device">Device:</label>

          <div className="input input-group radio-toolbar">
            <Field
              name="device"
              id="mobile"
              className="input__radio"
              component="input"
              type="radio"
              value="Mobile"
            />{" "}
            <label htmlFor="mobile">Mobile</label>
            <Field
              name="device"
              id="desktop"
              className="input__radio"
              component="input"
              type="radio"
              value="Desktop"
            />{" "}
            <label htmlFor="desktop">Desktop</label>
          </div>
        </div>

        <div className="input-group">
          <label
            htmlFor="placement"
            style={{ lineHeight: "18px" }}
            className="label"
          >
            Placement size:
          </label>
          <Field
            name="placement"
            className="input__radio"
            component="input"
            type="radio"
            onChange={this.handleFormState.bind(this)}
            value="Fullscreen"
          />{" "}
          <span style={{ marginRight: 34 }}>Fullscreen</span>
          <Field
            name="placement"
            className="input__radio"
            component="input"
            onChange={this.handleFormState.bind(this)}
            type="radio"
            value=""
          />{" "}
          <span>Size:</span>
        </div>
        <div className="input-group">
          <label htmlFor="width">W</label>
          <Field
            className="textarea"
            name="width"
            id="size-width"
            disabled={this.state.disabled ? "disabled" : ""}
            placeholder="Width"
            component="input"
            type="number"
            style={{ marginRight: 16 }}
          />
          <label htmlFor="height">H</label>
          <Field
            className="textarea"
            name="height"
            type="number"
            disabled={this.state.disabled ? "disabled" : ""}
            id="size-height"
            placeholder="Height"
            component="input"
          />
        </div>
        <button className="button is-link is-right">Create</button>
      </form>
    );
  }
}

HandleForm = reduxForm({
  form: "creative",
  initialValues: { device: "Mobile", placement: "Fullscreen" }
})(HandleForm);

class App extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
      isSaveMode: false,
      objects: [],
      arrayOfObjects: [],
      text: "No Creatives Found",
      inputText: "",
      mode: "output"
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  handleCancel() {
    this.setState({ mode: "output" });
    this.setState({ isSaveMode: false });
  }

  handleEdit() {
    this.setState({ mode: "edit" });
    this.setState({ isSaveMode: false});
  }

  handleForm = values => {
    this.setState({
      objects: Object.assign([], values),
      mode: "output",
      text: this.state.objects
    });
    console.log(values);
    this.setState({ isSaveMode: true});
  };

  addObjects() {
    const obj = this.state.objects;
    let fullscreen = `${obj.creative} | ${obj.device} | ${obj.placement}`;
    let mobile = `${obj.creative} | ${obj.device} | ${obj.width} x ${
      obj.height
    }`;
     if (this.state.isSaveMode) {
      if (obj.placement === "") {
        return this.state.arrayOfObjects.push(mobile);
      } else {
        return this.state.arrayOfObjects.push(fullscreen);
      }
    }
  }

  render() {
    this.addObjects();

    return (
      <div className="App">
        <div className="my-creatives">
          <span className="header">My Creatives</span>
          <button onClick={this.handleEdit} className="button is-link">
            Add
          </button>
        </div>
        {this.state.mode === "output" ? (
          <div>
            <p className="print">{this.state.text}</p>
            {this.state.arrayOfObjects.map((item, key) => (
              <p className="print" key={key}>
                {item}
              </p>
            ))}
          </div>
        ) : (
          <div id="Form">
            <span className="header">New Creative</span>

            <hr className="top-divider" />
            <hr className="bottom-divider" />
            <HandleForm onSubmit={this.handleForm} />
            <div className="field">
              <div className="control">
                <button
                  onClick={this.handleCancel}
                  className="button is-cancel is-left"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
