import { useEffect, useMemo, useState } from "react";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import { PRODUCTS } from "../data/products";
import styles from "./ShopPage.module.css";

type Sort = "default" | "price-asc" | "price-desc" | "name";

const num = (p: string) => Number(p.replace(/[^0-9.]/g, "")) || 0;

export default function ShopPage() {
  const [sort, setSort] = useState<Sort>("default");
  const [added, setAdded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    document.title = "Shop - Soul 2 Souls jazz";
  }, []);

  const products = useMemo(() => {
    const arr = [...PRODUCTS];
    if (sort === "price-asc") arr.sort((a, b) => num(a.price) - num(b.price));
    if (sort === "price-desc") arr.sort((a, b) => num(b.price) - num(a.price));
    if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [sort]);

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
              S2S Merch
            </p>
            <h1 className={styles.h1}>Coming Soon!</h1>
            <p className={styles.heroSub}>
              Rep the movement. Preview the Soul2SoulsJazz collection — tees, hoodies, drinkware and more.
              The full store is launching shortly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.toolbar}>
            <p className={styles.count}>{PRODUCTS.length} products</p>
            <label className={styles.sort}>
              <span>Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort products">
                <option value="default">Default</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>

          <div className={styles.grid}>
            {products.map((p, i) => {
              const idx = PRODUCTS.indexOf(p);
              return (
                <Reveal key={p.name} className={styles.card} delay={(i % 4) * 70}>
                  <div className={styles.thumb}>
                    <img src={p.image} alt={p.name} loading="lazy" />
                    <span className={styles.badge}>Coming Soon</span>
                  </div>
                  <h2 className={styles.name}>{p.name}</h2>
                  <p className={styles.price}>{p.price}</p>
                  <button
                    className={`${styles.add} ${added[idx] ? styles.addOn : ""}`}
                    onClick={() => setAdded((s) => ({ ...s, [idx]: true }))}
                  >
                    <Icon name="cart" size={18} />
                    {added[idx] ? "Notify me ✓" : "Add to cart"}
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
