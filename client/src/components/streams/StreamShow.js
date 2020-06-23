import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  //ref needed for the 3rd party flash player
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    console.log(this.videoRef);
    this.props.fetchStream(id);

    this.buildPlayer();
  }

  //if the component fetches stream successfully and component rerenders
  //componentDidUpdate is called and buildPlayer is called at both lifecycles

  componentDidUpdate() {
    this.buildPlayer();
  }

  //stops video play and receiving video from server
  componentWillUnmount() {
    this.player.destroy();
  }
  //buildPlayer needs to be called at any point in the lifecycle to ensure player is loaded
  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;

    //Followed flv.js 'getting started' documentation
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return "Please wait. Stream is loading..";
    }
    const { title, description } = this.props.stream;

    return (
      <div>
        {/* create the video player and attach react ref to it*/}
        <video ref={this.videoRef} style={{ width: "100%" }} controls />

        <h3>{title}</h3>

        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
