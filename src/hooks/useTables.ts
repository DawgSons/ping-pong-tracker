import { useState, useCallback } from "react";
import { TableService } from "../services/tableService";
import type { TableInput, Table, TableServiceError, NearbyTable } from "../types/database.types";
import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function useTables() {
  const { data: tables, isLoading, error } = useQuery<Table[], TableServiceError>({
    queryKey: ['tables'],
    queryFn: () => TableService.getTables(),
  });

    // Mutation for adding a new table
    const addTableMutation = useMutation<Table, TableServiceError, { tableData: TableInput; image: File }>({
      mutationFn: ({ tableData, image }) => TableService.addTable(tableData, image),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tables'] });
      },
    });

    // Query for nearby tables
    const getNearbyTables = (latitude: number, longitude: number, radius?: number) => {
      return useQuery<NearbyTable[], TableServiceError>({
        queryKey: ['nearbyTables', latitude, longitude, radius],
        queryFn: () => TableService.getNearbyTables(latitude, longitude, radius),
      });
    };

  // const addTable = useCallback(async (tableData: TableInput, image: File) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const result = await TableService.addTable(tableData, image);
  //     return result;
  //   } catch (err) {
  //     setError(err instanceof Error ? err : new Error("Failed to add table"));
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // const getNearbyTables = useCallback(
  //   async (latitude: number, longitude: number, radius?: number) => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       return await TableService.getNearbyTables(latitude, longitude, radius);
  //     } catch (err) {
  //       setError(
  //         err instanceof Error ? err : new Error("Failed to get nearby tables"),
  //       );
  //       throw err;
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [],
  // );

  return {
    tables,
    isLoading,
    addTable: addTableMutation.mutate,
    isAdding: addTableMutation.isPending,
    getNearbyTables,
    error,
  };
}
