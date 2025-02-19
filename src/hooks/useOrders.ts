import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export interface Order {
  id: number;
  user_id: number;
  order_status_id: number;
  location_id: number;
  reference: string;
  is_internal_order: number;
  start_date: string;
  end_date?: string | null;
  estimated_end_date?: string | null;
  is_archived: number;
  is_approved: number;
  is_express: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;

  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    user_type?: {
      id: number;
      name: string;
      description?: string;
      icon?: string;
    };
    location?: {
      id: number;
      name: string;
      address?: string;
      code?: string;
    };
  };

  order_status: {
    id: number;
    name: string;
  };

  order_items: {
    id: number;
    order_id: number;
    product_id: number;
    qty: number;
    amount: string;
    product: {
      id: number;
      name: string;
      amount: string;
      discount?: string;
      category?: {
        id: number;
        name: string;
      };
      vendor?: {
        id: number;
        name: string;
        email: string;
        phone: string;
        avatar?: string;
      };
      image?: {
        id: number;
        url: string;
      };
    };
  }[];
}

export interface OrderStatus {
  id: number;
  name: string;
}

// ✅ Custom function to create a stable query key
const createQueryKey = (page: number, filters: Record<string, any>) => {
  return ["orders", page, JSON.stringify(filters)]; // 🔥 Ensures filters don't cause unnecessary re-renders
};

export const useOrders = (page: number, filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: createQueryKey(page, filters), // ✅ Prevents duplicate fetches
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== null && v !== "")
        ),
      }).toString();

      const response = await apiClient.get<{
        data: Order[];
        meta: { total: number; current_page: number; last_page: number };
      }>(`/order?${queryParams}`);

      return response.data;
    },
    staleTime: 1000 * 60 * 60, // ✅ 1 Hour Cache (Keeps data fresh but prevents constant re-fetching)
    // cacheTime: 1000 * 60 * 60 * 6, // ✅ Keep in cache for 6 hours (so it doesn't refetch immediately)
    refetchOnMount: false, // ✅ Prevents refetch when returning to the page
    refetchOnWindowFocus: false, // ✅ Stops API call when the tab is focused
    refetchOnReconnect: false, // ✅ Stops refetching when internet reconnects
    // keepPreviousData: true, // ✅ Avoids UI flickering while paginating
    enabled: !!page, // ✅ Prevents fetching when page is undefined
  });
};

export const useOrderStatuses = () => {
  return useQuery({
    queryKey: ["orderStatuses"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: OrderStatus[] }>(
        "/orderstatus"
      );
      return response.data.data; // ✅ Extract only the statuses array
    },
    staleTime: 1000 * 60 * 60, // ✅ Cache for 1 hour
    // cacheTime: 1000 * 60 * 60 * 6, // ✅ Keep in cache for 6 hours
    refetchOnMount: false, // ✅ Prevents refetching on mount
    refetchOnWindowFocus: false, // ✅ Stops refetching when switching tabs
  });
};

export const useOrderDetails = (orderId: number) => {
  return useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Order }>(
        `/order/${orderId}`
      );
      return response.data.data; // ✅ Extract only the order details
    },
    staleTime: 1000 * 60 * 10, // ✅ Cache for 10 minutes
    refetchOnMount: false, // ✅ Prevents refetching on mount
    refetchOnWindowFocus: false, // ✅ Stops refetching when switching tabs
    enabled: !!orderId, // ✅ Fetch only when orderId exists
  });
};
