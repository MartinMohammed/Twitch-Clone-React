import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  // ----------------- CONDITIONALLY SHOWING EDIT AND DELETE IF
  // currentUserId === STREAM CREATOR
  renderAdmin(stream) {
    // if a person without a userId creates a stream without a userId everybody could edit/delete the stream
    // without being registered
    if (stream.userId === this.props.currentUserId && stream.userId !== null) {
      return (
        <div className="right floated content">
          {/* the current id of the current iterating element */}
          <Link to={`/streams/edit/${stream.id}`} className="ui primary button">
            EDIT
          </Link>
          <Link
            className="ui button negative"
            to={`/streams/delete/${stream.id}`}
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  // if no streams are fetched into the store --> return empty object --> which will be transformed
  //  to a empty array -> which will be not mapped = no error
  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  // ----------- EXPLOIT --------- NEED SESSION ID
  // YOU CAN CREATE STREAMS WHILE NOT being logged in --> leads to error
  // the page - create stream
  renderCreate() {
    // whenever user a a userId --> he is logged in
    if (this.props.currentUserIsSignedIn) {
      return (
        <div style={{ textAlign: "center" }}>
          <Link to="streams/new" className="ui primary button">
            Create a Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // object.values removes the keys and insertes the values of the keys inside an array
  // makes it easier to iterate through
  // transform back to an array format
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    currentUserIsSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchStreams,
})(StreamList);
