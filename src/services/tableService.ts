import { supabase } from "./supabase";
import {
  Table,
  TableInput,
  NearbyTable,
  TableServiceError,
} from "../types/database.types";
import { PostgrestError } from "@supabase/supabase-js";

// interface TableServiceError extends Error {
//   code?: string;
//   details?: string;
// }

export class TableService {
  private static readonly STORAGE_BUCKET = "table-images";

  private static handleError(error: unknown): never {
    const postgrestError = error as PostgrestError;
    if (postgrestError && postgrestError.message) {
      throw new TableServiceError(postgrestError.message, postgrestError.code, postgrestError.details);
    }
    if (error instanceof Error) {
      throw new TableServiceError(error.message);
    }
    throw new TableServiceError("An unknown error occurred");
  }

  private static async uploadImage(image: File): Promise<string> {
    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from(this.STORAGE_BUCKET)
      .upload(fileName, image);

    if (uploadError) {
      throw new TableServiceError(
        "Failed to upload image",
        uploadError.name,
        uploadError.message,
      );
    }

    const { data } = supabase.storage
      .from(this.STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  static async addTable(tableData: TableInput, image: File): Promise<Table> {
    try {
      const imageUrl = await this.uploadImage(image);

      const { data, error } = await supabase
        .from("tables")
        .insert({
          description: tableData.description,
          condition: tableData.condition,
          is_public: tableData.is_public,
          location: `POINT(${tableData.longitude} ${tableData.latitude})`,
          image_url: imageUrl,
          created_at: new Date().toISOString(),
          last_verified: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw this.handleError(error);
      if (!data) throw new TableServiceError("No data returned from insert");

      return data as Table;
    } catch (error) {
      console.error("Error adding table:", error);
      throw this.handleError(error);
    }
  }

  static async getNearbyTables(
    latitude: number,
    longitude: number,
    radiusInMeters: number = 5000,
  ): Promise<NearbyTable[]> {
    try {
      const { data, error } = await supabase.rpc("nearby_tables", {
        lat: latitude,
        lng: longitude,
        radius_meters: radiusInMeters,
      });

      if (error) throw this.handleError(error);
      if (!data) return [];

      return data as NearbyTable[];
    } catch (error) {
      console.error("Error getting nearby tables:", error);
      throw this.handleError(error);
    }
  }

  static async getTables(): Promise<Table[]> {
    try {
      const { data, error } = await supabase
        .from("tables")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw this.handleError(error);
      if (!data) return [];

      return data as Table[];
    } catch (error) {
      console.error("Error getting tables:", error);
      throw this.handleError(error);
    }
  }

  static async deleteTable(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("tables").delete().eq("id", id);

      if (error) throw this.handleError(error);
    } catch (error) {
      console.error("Error deleting table:", error);
      throw this.handleError(error);
    }
  }

  static async updateTable(
    id: string,
    updates: Partial<Omit<TableInput, "latitude" | "longitude">>,
  ): Promise<Table> {
    try {
      const { data, error } = await supabase
        .from("tables")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw this.handleError(error);
      if (!data) throw new Error("No data returned from update");

      return data as Table;
    } catch (error) {
      console.error("Error updating table:", error);
      throw this.handleError(error);
    }
  }
}
