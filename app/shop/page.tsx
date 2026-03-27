"use client";

import { useEffect, useState } from "react";
import DrinkCard from "@/components/DrinkCard";
import styles from "./shop.module.css";

export default function ShopPage() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon")
      .then((res) => res.json())
      .then((data) => setDrinks(data.drinks || []));
  }, []);

  return (
    <main className={styles.shopContainer}>
      <div className={styles.menuWrapper}>
        <h1>La Carte - Le Mon Noire</h1>
        <div className={styles.cardWrapper}>
          <div className={styles.grid}>
          {drinks.slice(0, 8).map((drink: any) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
        </div>
      </div>
    </main>
  );
}
