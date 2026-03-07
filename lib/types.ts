export interface Product {
  p_id: number;
  name: string;
  price: number;
  colour: string;
  brand: string;
  img: string;
  ratingCount: number | string;
  avg_rating: number | string;
  description: string;
  p_attributes: string;
}

export interface SearchResult {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  confidence_score: number;
}

export interface SearchResponse {
  results: SearchResult[];
}

export interface SearchRequest {
  query: string;
  limit?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}
