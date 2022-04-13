import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
  // it gets called with whatever was inside of the input fields
  // as an object (properties) with title, descripiton
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, {
  createStream,
  // reusabled form component (child)
})(StreamCreate);
