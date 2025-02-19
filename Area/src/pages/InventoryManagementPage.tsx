import React, { useState } from "react";
import InventoryHeader from "../components/inventoryManagement/InventoryHeader";
import EmptyState from "../components/inventoryManagement/EmptyState";
import AddProductsModal from "../components/inventoryManagement/AddProductsModal";
import InventoryTable from "../components/inventoryManagement/InventoryTable";
import { productData } from "../data/productData";
import { inventoryTableData } from "../data/inventoryTableData";

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  selected: boolean;
}

const InventoryManagementPage: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeProducts, setActiveProducts] = useState(inventoryTableData);

  const handleUpdateList = () => {
    setModalVisible(true);
  };

  const handleAddProducts = (products: Product[]) => {
    const updatedProducts = products.map((product) => ({
      ...product,
      price: "₦60,000",
      availability: true,
    }));
    setActiveProducts([...activeProducts, ...updatedProducts]);
    setIsEmpty(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <InventoryHeader onAllProductsClick={() => setModalVisible(true)} />
      {!isEmpty ? (
        <EmptyState onUpdateListClick={handleUpdateList} />
      ) : (
        <InventoryTable products={activeProducts} />
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
