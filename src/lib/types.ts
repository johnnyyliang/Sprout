export interface CompanyData {
  ticker: string;
  name: string;
  esgScore: number;
  esgGrade: 'Green' | 'Yellow' | 'Red';
  carbonIntensity?: number;
  revenueGrowth1Y: number;
  revenueGrowth3Y: number;
  forwardEpsGrowth?: number;
}

export interface ApiResponse {
  success: boolean;
  data?: CompanyData;
  error?: string;
} 