import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ContextProvider from "./contexts/productsContext";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen/ProductListScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen/PlaceOrderScreen";
import WishListScreen from "./screens/WishListScreen/WishListScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import "./App.css";

export default function App() {
  return (
    <>
      <ContextProvider>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/" exact component={HomeScreen} />
              <Route path="/products" exact component={ProductListScreen} />
              <Route path="/products/:id" component={ProductScreen} />
              <Route path="/login" exact component={LoginScreen} />
              <Route path="/register" exact component={RegisterScreen} />
              <Route path="/cart" exact component={CartScreen} />
              <Route path="/profile" exact component={ProfileScreen} />
              <Route path="/order" exact component={PlaceOrderScreen} />
              <Route path="/wishlist" exact component={WishListScreen} />
              <Route path={`/:name`} component={ProductListScreen} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </ContextProvider>
    </>
  );
}
