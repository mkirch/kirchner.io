export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  tags: string[];
  location: string;
  description: string;
}
