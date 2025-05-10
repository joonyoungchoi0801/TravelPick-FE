export interface RegisterForm {
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  parent_id: number;
  timezone: string;
}

export interface LocationSearchDto {
  query: string;
  count: number;
}
export interface LocationData {
  id: number;
  name: string;
  timezone: string;
}
