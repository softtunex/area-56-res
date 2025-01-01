import React, { useState } from "react";
import InventoryHeader from "../components/inventoryManagement/InventoryHeader";
import EmptyState from "../components/inventoryManagement/EmptyState";
import AddProductsModal from "../components/inventoryManagement/AddProductsModal";
import { productData } from "../data/productData";
// Define at the top or in a separate `types.ts` file
interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  selected: boolean;
}

const InventoryManagementPage: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeProducts, setActiveProducts] = useState<Product[]>([]);

  const handleUpdateList = () => {
    setModalVisible(true);
  };

  const handleAddProducts = (products: Product[]) => {
    setActiveProducts(products);
    setIsEmpty(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <InventoryHeader onAllProductsClick={() => setModalVisible(true)} />
      {isEmpty ? (
        <EmptyState onUpdateListClick={handleUpdateList} />
      ) : (
        <p>Active Products: {JSON.stringify(activeProducts, null, 2)}</p>
      )}
      <AddProductsModal
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onAddProducts={handleAddProducts}
        products={productData}
      />
    </div>
  );
};

export default InventoryManagementPage;
