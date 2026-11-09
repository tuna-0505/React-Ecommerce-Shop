import { create } from 'zustand';

function loadInitialCart() {
  try {
    const raw = localStorage.getItem('shopping_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load cart from localStorage:', e);
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: loadInitialCart(),

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return {
        items: [
          ...state.items,
          { id: product.id, title: product.title, price: product.price, quantity: 1 }
        ]
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    })),

  setQuantity: (id, quantity) =>
    set((state) => {
      if (quantity < 1) {
        return { items: state.items.filter((item) => item.id !== id) };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }),

  clear: () => set({ items: [] })
}));

useCartStore.subscribe((state) => {
  try {
    localStorage.setItem('shopping_cart', JSON.stringify(state.items));
  } catch (e) {
    console.error('Failed to save cart to localStorage:', e);
  }
});
