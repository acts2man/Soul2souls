// WooCommerce shop products, captured verbatim from the exported /shop/ page.
// The live shop displays a "Coming Soon!" banner over the catalog.

export type Product = {
  name: string;
  price: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  { name: "24 oz. Mia Recycled Acrylic Tumbler", price: "$19.95", image: "/img/shop/36.webp" },
  { name: "DJ Perry Remix – Gildan Softstyle Jersey T‑shirt", price: "$35.00", image: "/img/shop/37.webp" },
  { name: "Hoodie Ladies White (Front Logo)", price: "$84.95", image: "/img/shop/38.webp" },
  { name: "Hoodie Ladies White (logo on back)", price: "$84.95", image: "/img/shop/39.webp" },
  { name: "Hoodie Mens Black & White Tie Dye", price: "$84.00", image: "/img/shop/40.webp" },
  { name: "Ladies Curved Hem Tri‑Blend Long Sleeve Tunic T-shirt", price: "$57.00", image: "/img/shop/41.webp" },
  { name: "Laser Engraved 15 oz. Stemless Wine Glass (Set of 2)", price: "$49.95", image: "/img/shop/42.webp" },
  { name: "Laser Engraved Marble and Bamboo Coasters (Set of 4)", price: "$52.95", image: "/img/shop/43.webp" },
  { name: "S2S 10 oz. Glass Coffee Mug", price: "$24.95", image: "/img/shop/44.webp" },
  { name: "S2S Bio‑Washed Hat – Engraved Circle Faux Leather Patch", price: "$45.00", image: "/img/shop/45.webp" },
  { name: "S2S Canvas Tote Bag", price: "$50.00", image: "/img/shop/46.webp" },
  { name: "S2S DJ Steppin’ Softstyle Jersey T‑shirt", price: "$48.00", image: "/img/shop/47.webp" },
  { name: "S2S Jazz Logo Semi-fitted T Shirt", price: "$34.95", image: "/img/shop/48.webp" },
  { name: "S2S Ladies Curved Hem Adidas UPF 50 Performance Shirt", price: "$68.95", image: "/img/shop/49.webp" },
  { name: "S2S Ladies Flex Scoop Neck T‑shirt", price: "$44.95", image: "/img/shop/50.webp" },
  { name: "S2S Ladies Night Round Neck T-shirt", price: "$41.00", image: "/img/shop/51.webp" },
];
