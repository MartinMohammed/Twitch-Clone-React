import React, { Component } from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  // we do not know wheter signed in or not - not use component state anymore
  // state = { isSignedIn: null };

  componentDidMount() {
    // load up the library to the gapi object
    // gapi is available on window scope in our browser
    // -> to make really clear gapi is a variable

    // calback is going to be called when after this clients 0auth library has been successfully loaded up into api
    window.gapi.load("client:auth2", () => {
      // initialize our application with client id / init the application
      // return a promise = asynchronous to initialize our client
      window.gapi.client
        .init({
          clientId:
            "1041984164255-knc9846s0sa4nbhl3p8gjhd6j7jofckv.apps.googleusercontent.com",
          // different scopes --> to load up when we take that user / fetch when the user goes trough the process
          // similar to "grant for accessing personalized data" (what we want to access from the users account)
          scope: "email",
        })
        // our notice when the initialization is complete
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          // event listener for user authentication state
          // onAuthChange is a callback for the auth object
          // when the callback which containes this keyword gets passed as an argument
          // any moment it will be invoked but who/what is left from the function call? nothing - undefined -> error
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // call action creator - get user google id
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };
  // difference between that and a function declared as one
  // because it is a nameless function the this keyword will reference to GoogleAuth component (bind)
  ToggleSignStatus = () => {
    this.props.isSignedIn ? this.auth.signOut() : this.auth.signIn();
  };

  // helper function/method
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={this.ToggleSignStatus}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui red google button"
          onClick={this.ToggleSignStatus}
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
// ------------------- ALL THOSE RETURN VALUES -> WILL BE AVAILABLE in this.props ----------------
const mapStateToProps = (state) => {
  // state is an object, auth too and it returns the isSignedIn
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
