
export const getCart = () => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product, qty = 1) => {
  if (typeof window === "undefined") return;

  const cart = getCart();

  const index = cart.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    //  increase quantity when already in cart
    cart[index].quantity += qty;
  } else {
    // add to cart with quantity new product
    cart.push({ ...product, quantity: qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
  if (typeof window === "undefined") return;

  const cart = getCart().filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateQuantity = (productId, newQty) => {
  if (typeof window === "undefined") return;

  const cart = getCart().map((item) =>
    item.id === productId ? { ...item, quantity: newQty } : item
  );

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cart");
};

export const getTotalCartQuantity = () => {
  if (typeof window === "undefined") return 0;

  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};


