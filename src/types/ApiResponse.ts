export interface ApiResponse {
  status: string;
  message: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  result?: any;
}
