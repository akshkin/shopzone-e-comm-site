import React, { useState } from "react";
import { FormContainer, FormPage, Input } from "../auth/auth.style";
import { FormLabel } from "./checkout.style";
import { Button } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { selectCartItems, selectTotalPrice } from "../../features/cartSlice";
import { createItemsOrder } from "../../features/orderSlice";

function CheckoutPage() {
  const [shippingInformation, setShippingInformation] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const { address, city, postalCode, country } = shippingInformation;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setShippingInformation((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(
      createItemsOrder({
        orderItems: cartItems,
        shippingAddress: shippingInformation,
        totalPrice,
        paymentMethod: "PayPal",
      })
    );
  }

  return (
    <div>
      <FormPage>
        <h2>Shipping Information</h2>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormLabel>Shipping Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={address}
              placeholder="Address"
              required
              onChange={handleChange}
            />
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="city"
              value={city}
              placeholder="City"
              required
              onChange={handleChange}
            />
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="text"
              name="postalCode"
              value={postalCode}
              placeholder="Postal Code"
              required
              onChange={handleChange}
            />
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              name="country"
              value={country}
              placeholder="Country"
              required
              onChange={handleChange}
            />

            <Button type="submit">Proceed to Payment</Button>
          </form>
        </FormContainer>
      </FormPage>
    </div>
  );
}

export default CheckoutPage;
