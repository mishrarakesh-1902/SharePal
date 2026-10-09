export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag: "Trending" | "New" | "Vote to Launch" | string;
  per_day_rent: number;
  out_of_stock: boolean;
  category?: string;
  originalIndex?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  category: string;
  query?: string;
  sort?: string;
}

export type CategoryId =
  | "all"
  | "gta-6"
  | "ps5-console"
  | "xbox-console"
  | "vr"
  | "racing-wheel"
  | "big-screen-gaming";

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  iconName: string;
}
