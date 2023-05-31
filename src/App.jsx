import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { NavBar } from "./common/NavBar";
import { ShoppingCartPage } from "./features/shoppingCart/ShoppingCartPage";
import { ShopPage } from "./features/shop/ShopPage";

import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={ShopPage} />
          <Route exact path="/shopping-cart" component={ShoppingCartPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
