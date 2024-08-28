import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../api";
import OrderCartItem from "../../components/order/orderCartItem.components";
import { ProductType } from "../../constants.types";
import { InnerContainer, StyledContainer, StyledText } from "./profile.style";
import { Button } from "../../components";
import { StyledLoader } from "../products/products.style";
import { ErrorText } from "../auth/auth.style";

type OrderItem = {
  createdAt: Date;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
  };
  orderItems: [
    {
      product: ProductType;
      quantity: number;
    }
  ];
};

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [page, setPage] = useState(0);
  const [isNextPage, setIsNextPage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true);
        const response = await getAllOrders(1);
        console.log(response);
        setPage(1);
        setIsNextPage(response.data.isNextPage);
        setOrders(response.data.orders);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load orders. Please try again later.");
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  async function loadMoreOrders() {
    try {
      const response = await getAllOrders(page + 1);
      console.log(response);
      setPage(page + 1);
      setOrders([...orders, ...response.data.orders]);
      setIsNextPage(response.data.isNextPage);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledContainer>
      {isLoading ? (
        <StyledLoader />
      ) : (
        <>
          <h1>My orders</h1>
          {orders.map((order) => {
            return (
              <InnerContainer>
                <StyledText>
                  Date : {new Date(order.createdAt).toLocaleDateString()}
                </StyledText>
                <StyledText>Delivered to : </StyledText>
                <StyledText>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}
                </StyledText>

                {order.orderItems.map((item) => (
                  <OrderCartItem
                    cartItem={item.product}
                    quantity={item.quantity}
                  />
                ))}
              </InnerContainer>
            );
          })}
          {isNextPage ? (
            <Button onClick={loadMoreOrders}>Load more</Button>
          ) : (
            <p>All orders have been loaded!</p>
          )}
        </>
      )}
      {message && <ErrorText>{message}</ErrorText>}
    </StyledContainer>
  );
}

export default Profile;
