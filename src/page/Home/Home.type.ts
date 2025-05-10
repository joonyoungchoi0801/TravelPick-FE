export interface SearchResortsResponse {
  description: string;
  id: number;
  name: string;
  similarity: number;
  photos: {
    dataurl: string;
    id: number;
    index: number;
  }[];
}
export interface SearchResortsVars {
  query: string;
  dataurls: string[];
  count: number;
}
export interface SearchResortsData {
  searchResorts: SearchResortsResponse[];
}
