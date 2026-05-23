export type FilterValue = 'all' | number;

export interface ApiError {
  message: string;
  statusCode?: number;
}