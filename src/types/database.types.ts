import { Json } from "./supabase";

export interface TableLocation {
  latitude: number;
  longitude: number;
}

export type TableCondition = 'new' | 'good' | 'fair' | 'poor' | 'unknown';

export interface Table {
  id: string;
  created_at: string;
  location: string; // PostGIS Point as string
  image_url: string;
  description: string | null;
  condition: TableCondition;
  is_public: boolean;
  last_verified: string;
  added_by: string | null;
  metadata: Record<string, unknown> | null;
}

export interface TableInput {
  latitude: number;
  longitude: number;
  description: string | null;
  condition: TableCondition;
  is_public: boolean;
  // metadata?: Record<string, unknown> | null;
  metadata?: Json | undefined
}

export interface NearbyTable extends Omit<Table, 'location'> {
  location: string; // PostGIS geography type
  distance_meters: number;
}

export interface TableLatLng extends Omit<Table, 'location'> {
  id: string;
  lat: number;
  lng: number;
  image_url: string;
  description: string;
  condition: TableCondition;
}

// Custom error types
export class TableServiceError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string
  ) {
    super(message);
    this.name = 'TableServiceError';
  }
}