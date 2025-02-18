import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export interface Payment {
  id: number;
  order_id: number;
  payment_method: string;
  amount: string;
  tax: string;
  discount: string;
  fee: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// ✅ Fetch all payments (with pagination)
export const usePayments = (page: number = 1) => {
  return useQuery({
    queryKey: ["payments", page],
    queryFn: async () => {
      const response = await apiClient.get<{
        data: Payment[];
        meta: { total: number; current_page: number; last_page: number };
      }>(`/payment?page=${page}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // ✅ Cache for 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// ✅ Fetch a single payment
export const usePayment = (paymentId: number) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Payment }>(
        `/payment/${paymentId}`
      );
      return response.data.data;
    },
    staleTime: 1000 * 60 * 10, // ✅ Cache for 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!paymentId, // ✅ Prevents fetching if no ID is provided
  });
};
