import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { productsContext } from "../../contexts/productsContext";
import api from "../../apis/api";
import orders from "../../apis/orders";
import MadeOrderItem from "../../components/MadeOrderItem/MadeOrderItem";
import CircleLoader from "react-spinners/CircleLoader";
import "./ProfileScreen.css";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { ordersObj, setOrdersObj, setProductsArr, productsArr } =
    useContext(productsContext);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await api.get();
      setProductsArr(data.data);
      const orderData = await orders.get();
      setOrdersObj(orderData.data);
      setLoading(false);
    })();
  }, [setOrdersObj, setProductsArr]);

  const getMadeOrderProducts = (obj) => {
    let arr = [];
    for (const key in obj) {
      let newObj = {};
      newObj.name = productsArr[key].name;
      newObj.price = productsArr[key].price;
      newObj.img = productsArr[key].img;
      newObj.id = parseInt(key) + 1;
      newObj.quantity = obj[key];
      arr.push(newObj);
    }
    return arr;
  };

  const renderMadeOrders = () => {
    const userEmail = currentUser.multiFactor.user.email;
    if (
      !ordersObj[0].orders[userEmail] ||
      ordersObj[0].orders[userEmail].length === 0
    ) {
      return (
        <div className="profile-screen-sub-title">
          There are no orders to display!
        </div>
      );
    }
    return ordersObj[0].orders[userEmail].map((order, index) => (
      <div key={index}>
        <MadeOrderItem
          orderId={order.orderId}
          itemsArr={getMadeOrderProducts(order.items)}
          total={order.total}
          name={order.name}
          address={order.address}
          city={order.city}
          postal={order.postal}
          country={order.country}
          phone={order.phone}
          email={userEmail}
        />
      </div>
    ));
  };
  return (
    <div className="profile-screen-container">
      <div className="profile-screen">
        {loading ? (
          <div className="spinner">
            <CircleLoader color={"blue"} loading={true} size={200} />
          </div>
        ) : (
          <>
            <div className="profile-screen-title">
              {currentUser
                ? "Your Completed Orders"
                : "Please Log In To Check Your Orders"}
            </div>
            {currentUser ? (
              <div className="orders-container">{renderMadeOrders()}</div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}
