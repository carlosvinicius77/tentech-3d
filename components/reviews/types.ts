export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  photos: string[];
  helpful: number;
  notHelpful: number;
  verified: boolean;
  material?: string;
  acabamento?: string;
  createdAt: Date;
  user: { name: string; avatar?: string };
}
