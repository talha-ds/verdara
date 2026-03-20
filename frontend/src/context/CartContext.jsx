import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cartItems.find(x => x._id === action.payload._id)
      const cartItems = exists
        ? state.cartItems.map(x => x._id === action.payload._id ? action.payload : x)
        : [...state.cartItems, action.payload]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cartItems }
    }
    case 'REMOVE_FROM_CART': {
      const cartItems = state.cartItems.filter(x => x._id !== action.payload)
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cartItems }
    }
    case 'UPDATE_QTY': {
      const cartItems = state.cartItems.map(x =>
        x._id === action.payload.id ? { ...x, qty: action.payload.qty } : x
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cartItems }
    }
    case 'CLEAR_CART': {
      localStorage.removeItem('cartItems')
      return { ...state, cartItems: [] }
    }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const initialState = {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  }

  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product, qty = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, qty } })
  }

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  const updateQty = (id, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const cartCount = state.cartItems.reduce((acc, item) => acc + item.qty, 0)
  const cartTotal = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{
      cartItems: state.cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)