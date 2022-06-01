import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen/ProductListScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ErrorScreen from "./screens/ErrorScreen/ErrorScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import OrderScreen from "./screens/OrderScreen/OrderScreen";
import "./App.css";

export default function App() {
  return (
    <>
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
            <Route path="/orders" exact component={OrderScreen} />
            <Route component={ErrorScreen} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
