import { type Product, ProductCategory } from "./types"

export const products: Product[] = [
  // Produits locaux
  { id: 1, name: "Pommes", category: ProductCategory.LOCAL, price: 2.5, weight: "1kg", carbonFootprint: 0.5 },
  { id: 2, name: "Carottes", category: ProductCategory.LOCAL, price: 1.8, weight: "1kg", carbonFootprint: 0.3 },
  { id: 3, name: "Lait frais", category: ProductCategory.LOCAL, price: 1.2, weight: "1L", carbonFootprint: 1.2 },
  { id: 4, name: "Œufs fermiers", category: ProductCategory.LOCAL, price: 3.5, weight: "x6", carbonFootprint: 1.5 },
  { id: 5, name: "Miel local", category: ProductCategory.LOCAL, price: 8.9, weight: "500g", carbonFootprint: 0.8 },

  // Produits importés
  { id: 6, name: "Bananes", category: ProductCategory.IMPORTED, price: 1.99, weight: "1kg", carbonFootprint: 3.0 },
  { id: 7, name: "Avocat", category: ProductCategory.IMPORTED, price: 2.5, weight: "pièce", carbonFootprint: 2.5 },
  { id: 8, name: "Café", category: ProductCategory.IMPORTED, price: 5.9, weight: "250g", carbonFootprint: 4.2 },
  { id: 9, name: "Riz basmati", category: ProductCategory.IMPORTED, price: 2.8, weight: "500g", carbonFootprint: 3.8 },
  {
    id: 10,
    name: "Chocolat noir",
    category: ProductCategory.IMPORTED,
    price: 2.5,
    weight: "100g",
    carbonFootprint: 2.9,
  },

  // Produits industriels
  {
    id: 11,
    name: "Pizza surgelée",
    category: ProductCategory.INDUSTRIAL,
    price: 3.99,
    weight: "350g",
    carbonFootprint: 5.2,
  },
  { id: 12, name: "Céréales", category: ProductCategory.INDUSTRIAL, price: 3.5, weight: "500g", carbonFootprint: 4.0 },
  { id: 13, name: "Chips", category: ProductCategory.INDUSTRIAL, price: 1.9, weight: "150g", carbonFootprint: 3.5 },
  { id: 14, name: "Soda", category: ProductCategory.INDUSTRIAL, price: 1.5, weight: "1.5L", carbonFootprint: 4.8 },
  {
    id: 15,
    name: "Plat préparé",
    category: ProductCategory.INDUSTRIAL,
    price: 4.5,
    weight: "400g",
    carbonFootprint: 6.0,
  },

  // Produits faits maison
  {
    id: 16,
    name: "Pain artisanal",
    category: ProductCategory.HOMEMADE,
    price: 3.2,
    weight: "500g",
    carbonFootprint: 0.9,
  },
  { id: 17, name: "Confiture", category: ProductCategory.HOMEMADE, price: 4.5, weight: "250g", carbonFootprint: 1.0 },
  {
    id: 18,
    name: "Fromage fermier",
    category: ProductCategory.HOMEMADE,
    price: 5.9,
    weight: "200g",
    carbonFootprint: 1.8,
  },
  { id: 19, name: "Jus pressé", category: ProductCategory.HOMEMADE, price: 3.8, weight: "750ml", carbonFootprint: 1.2 },
  { id: 20, name: "Pâtisserie", category: ProductCategory.HOMEMADE, price: 3.5, weight: "pièce", carbonFootprint: 1.5 },
]
