import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { message } from "antd";

export interface Product {
  id: number;
  category_id: number;
  location_id: number;
  vendor_id: number;
  name: string;
  description: string;
  qty: number;
  amount: string;
  slug: string;
  discount: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;

  category: {
    id: number;
    name: string;
  };

  location: {
    id: number;
    name: string;
    address: string;
    code: string;
  };

  vendor: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };

  image?: {
    id: number;
    product_id: number;
    url: string;
  };
}

// ✅ Fetch All Products with Pagination Support
export const useProducts = (page: number) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const response = await apiClient.get<{
        data: Product[];
        meta: { total: number; current_page: number; last_page: number };
      }>(`/product?page=${page}`);

      return response.data;
    },
    staleTime: 1000 * 60 * 60, // ✅ Cache for 1 hour
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// ✅ Fetch Single Product Details
export const useProductDetails = (productId: number) => {
  return useQuery({
    queryKey: ["productDetails", productId],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Product }>(
        `/product/${productId}`
      );
      return response.data.data;
    },
    staleTime: 1000 * 60 * 10, // ✅ Cache for 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!productId, // ✅ Prevents fetching if productId is undefined
  });
};

// ✅ Create a New Product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      newProduct: Omit<
        Product,
        | "id"
        | "created_at"
        | "updated_at"
        | "deleted_at"
        | "location"
        | "category"
        | "vendor"
      >
    ) => {
      const response = await apiClient.post<{ data: Product }>(
        "/product/create",
        newProduct
      );
      return response.data.data;
    },
    onSuccess: () => {
      // ✅ Refetch product list after creation
      message.success("Product created successfully!");

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// ✅ Update an Existing Product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const response = await apiClient.put<{ data: Product }>(
        `/product/${updatedProduct.id}`, // ✅ Update API URL with Product ID
        updatedProduct
      );
      return response.data.data;
    },
    onSuccess: () => {
      message.success("Product updated successfully!");

      // ✅ Refetch product list after updating
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Failed to update product. Please try again.");
    },
  });
};
