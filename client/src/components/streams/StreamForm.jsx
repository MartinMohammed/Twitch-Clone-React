import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

// ----------------- GENERALIZED STREAM FORM COMPONENT ----------
class StreamForm extends Component {
  // responsible for doing some processing and decide upon the logic wheter to show error message
  // for the indivdual input items
  renderError(input) {
    const { error, touched } = input;
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // immediate re-render } because onChange -> all redux-form stuff leads to updating the store --> updating the value of the
  // ONE input field
  renderInput = (object) => {
    const { input, label, meta } = object;
    // className which should decide based on logic whether to show error field (red) or not red
    const className = `field ${meta.error && meta.touched && "error"}`;

    // controlled element
    return (
      // spread operator -> insert the key/pair values in as example {value=""} and add them as props to the input element
      // if you work with redux-form this syntax because with that you add also other props that redux form cares about.
      // destrucuted input from the formProps

      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />

        {/* pass the meta data FROM THE CURRENT INPUT FIELD  */}
        {this.renderError(meta)}
      </div>
    );
  };

  // it gets called with whatever was inside of the input fields
  onSubmit = (formValues) => {
    // parent component should pass down action creator as callback
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        // onSubmit = prop / handleSubmit = callback function provided by redux-form and then call that function with our callback method
        // handleSubmit automatically cares for preventDefault it gets the event argument as parameter
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {/* calling the function and passing some props */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          // by default redux form is going to see that we've passed some prop
          // that it does not know what to do with -> just pass it thorugh to the render input function
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// must be wired to reduxForm / A INPUT FIELD CAN ONLY HAVE ONE FORM VALUE
// CHECK FOR THE SPECIFIC CASE OF THE PARTICUALR INPUT FIELD AND RETURN / PLACE AN ERROR IN THE META DATA OF
// THE INPUT FIELD
const validate = (formValues) => {
  const errors = {};
  //--------- ATTACH ERROR MESSAGES TO CORRESPONDING FIELD WITH THE SAME NAME ------------\\
  if (!formValues.title) {
    // only ran if the user did not enter a title
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

// hook up redux form
// reduxForm/ Connect return a function and we immediately invoke it with StreamForm Class
export default reduxForm({
  // configuration - name of the form (purpose)
  form: "StreamForm",
  // call this function every re-render
  validate,
})(StreamForm);
