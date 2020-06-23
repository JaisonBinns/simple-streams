import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  //Loads the google API library once component mounts
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "120857588340-r3iio6bn6lp2g1m7aanb3sodqalt1i92.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          //grabs a reference to AUTH object from promise init above
          this.auth = window.gapi.auth2.getAuthInstance();
          //USES onAuthChange at INIT to determine if user is signed in
          this.onAuthChange(this.auth.isSignedIn.get());

          //AUTH LISTENER UPDATES ON CHANGE
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //CHANGES STATE ON AUTH CHANGES arrow function bounds it to this component
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //once this action creator is called...the user ID gets passed as well
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  //SIGN IN/OUT ACTIONS to add onClick
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  renderCheck() {
    return console.log(this.props.isSignedIn);
  }

  render() {
    return (
      <div>
        <div>{this.renderAuthButton()}</div>
        <div>{this.renderCheck()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signOut, signIn })(GoogleAuth);
