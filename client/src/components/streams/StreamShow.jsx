import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

import flv from "flv.js";

// 192.168.2.125
const HOST = "localhost";

class StreamShow extends Component {
  // pass props to basis class to use References
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    // try to build player
    this.buildPlayer();
  }
  // when component rerenders (when maybe the stream is finally fetched from the api )
  componentDidUpdate() {
    this.buildPlayer();
  }

  // when component gets unmounted/ 'removed' from screen (when user leaves route)
  componentWillUnmount() {
    // detach itself from the created video element
    this.player.destroy();
  }

  buildPlayer() {
    const { id } = this.props.match.params;

    if (this.player || !this.props.stream) {
      return;
    }
    // a video player that can play flv format
    // if stream is shut down the video player is still attempting to download and process the stream
    this.player = flv.createPlayer({
      type: "flv",
      // the streamkey - everything afeter 'live' is totally independent of our react
      // application. It is the designated stream key which the user enters in the
      // obs software when creating a new stream

      // in order the user can stream on our platform
      // the streamkey must equal the stream id

      // ip address
      url: `http://${HOST}:8000/live/${id}.flv`,
    });
    // when a ref is passed to an element in render, a reference to the node
    // becomes accessible at the current attribute of the ref.
    this.player.attachMediaElement(this.videoRef.current);
    // load up the player
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { description, title } = this.props.stream;

    return (
      <div>
        {/* The HTML controls Attribute is used to specify that the audio and video controls must be displayed. */}
        <video ref={this.videoRef} style={{ width: "100%" }} controls></video>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const routingParam = ownProps.match.params.id;
  return { stream: state.streams[routingParam] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
