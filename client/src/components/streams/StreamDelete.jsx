import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends Component {
  componentDidMount() {
    // load up the stream into the store
    this.props.fetchStream(this.props.match.params.id);
  }

  // render Buttons with action
  renderActions() {
    const { id } = this.props.match.params;

    return (
      // you can only assign one parent jsx element to an variable
      // we use React.Fragment because it will not show up in the DOM
      // jsx fragements
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <Link className="ui button" to="/">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    return this.props.stream
      ? `Are you sure you want to delete stream with the title: "${this.props.stream.title}"`
      : "Loading...";
  }

  render() {
    return (
      // inside the body child: div #modal
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const routingParam = ownProps.match.params.id;
  return { stream: state.streams[routingParam] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
