"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import styles from "./DrinkCard.module.css";

interface DrinkCardProps {
  drink: {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  };
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  const dispatch = useDispatch();

  // --- AI FORMULA FOR LEMONADE PRICING ---
  const name = drink.strDrink;
  const nameLength = name.length;
  const vowels = (name.match(/[aeiou]/gi) || []).length;

  // Calculate lemons: (Length + Vowels) / 7, minimum 1
  const lemonCost = Math.max(1, Math.round((nameLength + vowels) / 7));

  // Calculate price: 3.0 base + 0.1 per character
  const price = parseFloat((3.0 + nameLength * 0.1).toFixed(2));
  
  // Calculate profit for the shop's records
  const lemonPrice = 0.5;
  const profit = parseFloat((price - lemonCost * lemonPrice).toFixed(2));
  // ------------------------------

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: drink.idDrink,
        name: name,
        price: price,
        lemonCost: lemonCost,
        profit: profit, 
      }),
    );
  };

  return (
    <div className={styles.card}>
      <img
        src={drink.strDrinkThumb}
        alt={name}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>
          {price.toFixed(2)}€ <span className={styles.lemonTag}>{lemonCost} 🍋</span>
        </p>
        <button onClick={handleAddToCart} className={styles.buyBtn}>
          Ajouter
        </button>
      </div>
    </div>
  );
}