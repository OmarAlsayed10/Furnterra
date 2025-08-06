export interface Order {
  cartItems: { productId: string; quantity: number }[];
  address: {
    fullName: string;
    phone: string;
    city: string;
    street: string;
    country: string;
    zipcode: string;
  };
  paymentMethod: string;
}
