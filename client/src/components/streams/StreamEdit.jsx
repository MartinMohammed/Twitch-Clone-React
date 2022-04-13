import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    // make the streams available for the component
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  // if stream is not yet loaded in the component
  renderStream() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          // this.props.stream = has title and description because it is an object from the same form
          // lodash function that is going to pick out some specific properties/values from an boject
          // given the object and a list of that what we want to pass in
          initialValues={_.pick(this.props.stream, "title", "description")}
        />
      </div>
    );
  }

  render() {
    return <div>{this.renderStream()}</div>;
  }
}

// dispatch - gets option to get store
// mapStateToProps - gets option to access props
const mapStateToProps = (state, ownProps) => {
  // do some logic - check if the routing param id === to one of the ids in the stream list
  // extract routing param:
  const routingParam = ownProps.match.params.id;
  return { stream: state.streams[routingParam] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
