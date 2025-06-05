import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock cart items
const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Traditional Rwandan Basket",
    price: 25000,
    quantity: 2,
    image: "https://source.unsplash.com/100x100/?basket",
  },
  {
    id: 2,
    name: "Handmade Beaded Necklace",
    price: 15000,
    quantity: 1,
    image: "https://source.unsplash.com/100x100/?necklace",
  },
  {
    id: 3,
    name: "Local Coffee Beans",
    price: 12000,
    quantity: 3,
    image: "https://source.unsplash.com/100x100/?coffee",
  },
  {
    id: 4,
    name: "Artisanal Honey",
    price: 8000,
    quantity: 2,
    image: "https://source.unsplash.com/100x100/?honey",
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
