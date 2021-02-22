import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";
import SingleMovie from "./pages/SingleMovie"
import About from "./pages/About"
import MyWatchlist from "./pages/MyWatchlist"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movie/:id">
          <SingleMovie />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/mymovies">
          <MyWatchlist />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
