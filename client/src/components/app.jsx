import React from "react";
// Link is a react component use instead a anchor tag
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import history from "../history";

import Header from "./Header";

// const PageOne = () => {
//   return <div>Page 1</div>;
// };

// const PageTwo = () => {
//   return <div>Page 2</div>;
// };

const App = () => {
  return (
    <div className="ui container" style={{ marginTop: "15px" }}>
      {/* BrowserRouter is an acutal React Component */}

      {/* plain router which takes custom history object and maintains it  */}
      <Router history={history}>
        <div>
          {/* "global" header */}
          {/* inside BrowserRouter => use react-router features such as link */}
          {/* Not inside a Route element = global element for all routes */}
          <Header />

          {/* look at all different routes and only show one of these 
          given route for any path that we go to. 
          */}
          <Switch>
            {/* based on the url(path) show us some different content (component) onto the screen
          <Route path="/" exact component={PageOne} />
          <Route path="/pagetwo" component={PageTwo} /> */}
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" component={StreamCreate} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
