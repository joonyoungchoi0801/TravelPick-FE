interface Photo {
  id: number;
  index: number;
  dataurl: string;
}
export interface GetDetailsData {
  getResort: {
    id: number;
    name: string;
    description: string;
    ancestor: {
      latitude: number;
      longitude: number;
    };
    photos: Photo[];
  };
  getReviews: {
    id: number;
    content: string;
    created: string;
    photos: Photo[];
    user: {
      name: string;
    };
  }[];
}
export interface GetDetailsVars {
  id: number;
}
