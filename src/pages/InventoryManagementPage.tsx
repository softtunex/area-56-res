import React, { useState } from "react";
import InventoryHeader from "../components/inventoryManagement/InventoryHeader";
import EmptyState from "../components/inventoryManagement/EmptyState";
import AddProductsModal from "../components/inventoryManagement/AddProductsModal";
import InventoryTable from "../components/inventoryManagement/InventoryTable";
import { Product, useProducts } from "../hooks/useProducts";
import { Spin } from "antd";

const InventoryManagementPage: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // 🔥 Fetch products from API
  const { data: productsData, isLoading } = useProducts(1);

  const handleUpdateList = () => {
    setModalVisible(true);
  };

  const handleModifyProduct = (product: Product) => {
    console.log("Modify product:", product);
    setModalVisible(true);
  };

  const handleAddProduct = (newProduct: Product) => {
    console.log("New Product Added:", newProduct);
    setModalVisible(false); // ✅ Close modal after adding
  };

  // Dynamically set `userLocationId` based on logged-in user
  const userLocationId = 1; // Replace with actual user location logic

  return (
    <div className="p-6 bg-white min-h-screen">
      <InventoryHeader onAddProductClick={() => setModalVisible(true)} />

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : !productsData?.data ? (
        <EmptyState onUpdateListClick={handleUpdateList} />
      ) : (
        <InventoryTable onModifyProduct={handleModifyProduct} />
      )}

      <AddProductsModal
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onAddProduct={handleAddProduct} // ✅ Fixes the TS error
        userLocationId={userLocationId} // ✅ Replace with actual logged-in user's location
      />
    </div>
  );
};

export default InventoryManagementPage;
