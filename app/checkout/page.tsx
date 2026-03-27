"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { checkoutOrder, clearCart } from "@/lib/features/cartSlice";
import Link from "next/link";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const LEMON_UNIT_PRICE = 0.50;

  const orderTotal = items.reduce((acc, item) => acc + item.price, 0);
  const totalLemons = items.reduce((acc, item) => acc + item.lemonCost, 0);
  const totalLemonExpense = totalLemons * LEMON_UNIT_PRICE;

  const handleConfirm = () => {
    dispatch(checkoutOrder());
    alert("Commande confirmée ! Vos profits ont été mis en banque.");
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>Le panier est vide 🍋</h2>
        <Link href="/shop" className={styles.backLink}>Retourner à la carte</Link>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Facture Détillée</h1>
      
      <div className={styles.receipt}>
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className={styles.itemRow}>
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemSubtext}>
                {item.lemonCost} citrons × {LEMON_UNIT_PRICE.toFixed(2)}€
              </span>
            </div>
            <div className={styles.itemPrice}>{item.price.toFixed(2)}€</div>
          </div>
        ))}
        
        <div className={styles.divider} />
        
        <div className={styles.expenseRow}>
          <span>Coût total des citrons:</span>
          <span className={styles.expenseValue}>-{totalLemonExpense.toFixed(2)}€</span>
        </div>
        
        <div className={styles.grandTotal}>
          <span>Total Client:</span>
          <span>{orderTotal.toFixed(2)}€</span>
        </div>

        <div className={styles.profitEstimate}>
          <span>Bénéfice net sur cette commande: </span>
          <strong>{(orderTotal - totalLemonExpense).toFixed(2)}€</strong>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}>
          Vider
        </button>
        <button className={styles.confirmBtn} onClick={handleConfirm}>
          Encaisser
        </button>
      </div>
    </main>
  );
}