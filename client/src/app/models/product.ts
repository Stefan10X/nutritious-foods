export interface Product {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  pictureUrl: string;
  grams: number;
  calories: number;
  proteins: number;
  carbohidrates: number;
  fats: number;
  quantityInStock?: number;
  sideDish?: string;
  meat: string;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  meats: string[];
  sideDishes: string[];
  pageNumber: number;
  pageSize: number;
}
