import React, { useState } from "react";
import { Modal, Input, Dropdown, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  selected: boolean;
}

interface AddProductsModalProps {
  visible: boolean;
  products: Product[];
  onCancel: () => void;
  onAddProducts: (selectedProducts: Product[]) => void;
}

const AddProductsModal: React.FC<AddProductsModalProps> = ({
  visible,
  products,
  onCancel,
  onAddProducts,
}) => {
  const [productList, setProductList] = useState(products);

  const handleToggleSelect = (id: number) => {
    setProductList((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const handleQuantityChange = (id: number, change: number) => {
    setProductList((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product
      )
    );
  };

  const handleAddProducts = () => {
    const selectedProducts = productList.filter((product) => product.selected);
    onAddProducts(selectedProducts);
  };

  const sortMenu = (
    <Menu>
      <Menu.Item key="1">Recently Added</Menu.Item>
      <Menu.Item key="2">Alphabetical</Menu.Item>
      <Menu.Item key="3">Stock Quantity</Menu.Item>
    </Menu>
  );

  return (
    <Modal
      title={<span className="font-bold text-lg">Add Products</span>}
      visible={visible}
      footer={null}
      onCancel={onCancel}
      className="custom-modal"
      width={900} // Increased width to align with design
    >
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-1/3 rounded-lg border border-gray-300"
        />
        <div className="flex items-center space-x-2">
          <span className="font-medium">Sort By</span>
          <Dropdown overlay={sortMenu}>
            <button className="border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100">
              Recently added
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
        {productList.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3  border-gray-300"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={product.selected}
                onChange={() => handleToggleSelect(product.id)}
                className="w-6 h-6 text-red-500 border-gray-300 focus:ring-red-500 focus:ring-2 rounded"
              />
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-md"
              />
              <span className="text-gray-700">{product.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(product.id, -1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-500 hover:bg-red-200"
              >
                -
              </button>
              <span className="text-gray-700">{product.quantity}</span>
              <button
                onClick={() => handleQuantityChange(product.id, 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button className="text-red-500 hover:underline">
          + Add New Product
        </button>
        <div className="flex space-x-2">
          <button
            onClick={onCancel}
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAddProducts}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Add Products
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductsModal;
