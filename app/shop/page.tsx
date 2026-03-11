"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { addToCart, clearCart } from "@/lib/features/cartSlice";
import Link from "next/link";

export default function ShopPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Test data - we'll replace this with your formula later!
  const testDrink = {
    id: Date.now().toString(),
    name: "Citronnade Classique",
    price: 5,
    lemonCost: 2,
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>La Carte</h1>
      <Link href="/">← Retour au Menu</Link>

      <hr style={{ margin: "2rem 0" }} />

      {/* ACTION: Add to Cart */}
      <button 
        onClick={() => dispatch(addToCart(testDrink))}
        style={{ padding: "10px 20px", cursor: "pointer", background: "#ffeb3b" }}
      >
        Ajouter une Citronnade (5€)
      </button>

      {/* DISPLAY: Cart Counter */}
      <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h3>Votre Panier</h3>
        <p>Nombre d'articles: <strong>{cartItems.length}</strong></p>
        
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name} - {item.price}€</li>
          ))}
        </ul>

        {cartItems.length > 0 && (
          <button onClick={() => dispatch(clearCart())}>Vider le panier</button>
        )}
      </div>
    </main>
  );
}