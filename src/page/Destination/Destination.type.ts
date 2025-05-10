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
  getLocation: {
    latitude: number;
    longitude: number;
  };
  getReview: {
    id: number;
    content: string;
    created: string;
    photos: Photo[];
    userview: {
      id: number;
      name: string;
    };
  }[];
}
export interface GetDetailsVars {
  id: number;
}
