import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type CartItem = {
  id: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalQuantity: number;
};

type CartAction = {
  type: "ADD_ITEM";
  payload: {
    id: string;
    quantity: number;
  };
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      const updatedItems = [...state.items];

      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
      } else {
        updatedItems.push(action.payload);
      }

      return {
        items: updatedItems,
        totalQuantity: state.totalQuantity + action.payload.quantity,
      };
    }
    default:
      return state;
  }
}

type CartContextType = {
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity: number }) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity: number }) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  return (
    <CartContext.Provider value={{ state, addItem }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
