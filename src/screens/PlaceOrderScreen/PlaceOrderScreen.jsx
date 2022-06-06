import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { productsContext } from "../../contexts/productsContext";
import orders from "../../apis/orders";
import CircleLoader from "react-spinners/CircleLoader";
import generateOrderNumber from "../../utils/generateOrderNumber";
import { useHistory } from "react-router-dom";
import "./PlaceOrderScreen.css";
export default function PlaceOrderScreen() {
  const { ordersObj, setOrdersObj, cartObj, setCartObj } =
    useContext(productsContext);
  const [loading, setLoading] = useState(false);
  const [orderFinished, setOrderFinished] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    (async () => {
      const orderData = await orders.get();
      setOrdersObj(orderData.data);
      setLoading(false);
    })();
  }, [setOrdersObj]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let orderCart = {
      ...cartObj,
    };
    delete orderCart.total;
    const userEmail = currentUser.multiFactor.user.email;
    const cartFinalOrderTotal = JSON.parse(localStorage.getItem("cartTotal"));
    const order = {
      items: orderCart,
      total: cartFinalOrderTotal,
      name: e.target[0].value,
      address: e.target[1].value,
      city: e.target[2].value,
      postal: e.target[3].value,
      country: e.target[4].value,
      phone: e.target[5].value,
      orderId: generateOrderNumber(),
    };
    let newOrdersObj = [...ordersObj];
    newOrdersObj[0].orders[userEmail].push(order);
    setLoading(true);
    (async () => {
      await orders.put("1", newOrdersObj[0]);
      setOrdersObj(newOrdersObj);
      setCartObj({ total: 0 });
      setOrderFinished(true);
      setLoading(false);
    })();
  };
  useEffect(() => {
    if (orderFinished) {
      localStorage.setItem("cartObj", JSON.stringify(cartObj));
      localStorage.setItem("cartTotal", JSON.stringify("$0.00"));
      history.push("/profile");
    }
  }, [cartObj, orderFinished, history]);
  return (
    <div className="place-order-container">
      <div className="place-order">
        {loading ? (
          <div className="spinner">
            <CircleLoader color={"blue"} loading={true} size={200} />
          </div>
        ) : (
          <>
            <div className="place-order-title">
              {currentUser ? "Checkout" : "Please Log In To Checkout"}
            </div>
            {currentUser ? (
              <div className="place-order-form-container">
                <div className="form-title">Shipping Address</div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Full Name</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Address</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>City</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Postal Code</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Country</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Phone</label>
                    <input type="text" />
                  </div>
                  <button
                    className="form-submit-btn"
                    type="submit"
                    disabled={loading}
                  >
                    Place Order
                  </button>
                </form>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}
