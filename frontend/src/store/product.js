import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Alle Felder müssen ausgefüllt sein." };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Produkt erfolgreich erstellt." };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({ products: state.products.filter(product => product._id !== pid) }));
        return { success: true, message: data.message };
    },
    updateProduct: async (pid, updatedProduct) => {
        price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({
            products: state.products.map((product) =>
                product._id === pid ? data.data : product
            ),
        }));
        return { success: true, message: data.message };
    },
}));