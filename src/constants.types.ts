export type ProductType = {
  _id: string;
  title: string;
  price: number;
  image: string;  
  category: string;
  quantity?: number;
  description?: string;
  rating: {
    rate: number;
    count: number;
  }
}