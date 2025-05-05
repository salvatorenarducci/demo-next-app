export interface SearchResponse {
  roi_hectares: number;
  images: ImageItem[];
}

interface ImageItem {
  image_type: string;
  value_ca: number;
  value_roi: number;
}
