export enum ProductType {
  LOCAL = "local",
  IMPORTED = "imported",
  INDUSTRIAL = "industrial",
}

export enum ProductCategory {
  LOCAL = "local",
  IMPORTED = "imported",
  INDUSTRIAL = "industrial",
  HOMEMADE = "homemade",
}

export interface Product {
  id: number
  name: string
  category: ProductCategory
  price: number
  weight: string
  carbonFootprint: number
}
