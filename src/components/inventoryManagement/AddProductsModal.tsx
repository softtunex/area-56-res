import React, { useState } from "react";
import {
  Modal,
  Input,
  Select,
  Button,
  Upload,
  InputNumber,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCategories } from "../../hooks/useCategories";
import { useVendors } from "../../hooks/useVendors";
import { Product, useCreateProduct } from "../../hooks/useProducts";

const { Option } = Select;

interface AddProductsModalProps {
  visible: boolean;
  onCancel: () => void;
  onAddProduct: (newProduct: Product) => void;
  userLocationId: number; // ✅ Auto-set Location ID
}

const AddProductsModal: React.FC<AddProductsModalProps> = ({
  visible,
  onCancel,
  onAddProduct,
  userLocationId,
}) => {
  const [product, setProduct] = useState({
    name: "",
    category_id: "",
    location_id: userLocationId, // ✅ Automatically set location ID
    vendor_id: "",
    description: "",
    qty: 0,
    amount: 0,
    discount: 0,
    image: null as File | null, // ✅ Fixes `SetStateAction` error
  });

  // State for The Food or Drink Category
  const [selectedCategoryType, setSelectedCategoryType] = useState<
    "food" | "drinks" | ""
  >("");

  // 🔥 Fetch categories & vendors
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: vendors, isLoading: isLoadingVendors } = useVendors();

  const handleInputChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "inventory_management_cloud");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dfkqrijtg/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  //Destructured Mutation into CreateProduct
  const { mutate: createProduct } = useCreateProduct();

  // Handler for when the Add Product button is clicked
  const handleAddProduct = async () => {
    try {
      let imageUrl = "";

      if (product.image) {
        imageUrl = await uploadImageToCloudinary(product.image);
      }
      const newProduct = {
        name: product.name,
        category_id: Number(product.category_id),
        location_id: product.location_id,
        vendor_id: Number(product.vendor_id),
        description: product.description,
        qty: product.qty,
        amount: product.amount.toString(),
        discount: product.discount.toString(),
        slug: product.name.toLowerCase().replace(/\s+/g, "-"),

        images: [{ url: imageUrl }],
      };

      // Call the mutation with the new product
      createProduct(newProduct, {
        onSuccess: (data) => {
          onAddProduct(data);
          setProduct({
            name: "",
            category_id: "",
            location_id: userLocationId,
            vendor_id: "",
            description: "",
            qty: 0,
            amount: 0,
            discount: 0,
            image: null,
          });
          setSelectedCategoryType("");
          onCancel();
        },
        onError: (error: any) => {
          message.error("Failed to create product. Please try again.");
        },
      });
    } catch (error) {
      message.error("Image upload failed. Please try again.");
    }
  };

  return (
    <Modal
      title={<span className="font-bold text-lg">Add New Product</span>}
      visible={visible}
      footer={null}
      onCancel={onCancel}
      className="custom-modal"
      width={450} // ✅ Matches design size
    >
      <div className="flex flex-col space-y-4">
        {/* Product Name & Category */}
        <div className="flex space-x-3">
          <div className="w-1/2">
            <label className="text-gray-700 text-sm">Product Name</label>
            <Input
              placeholder="Enter product name"
              value={product.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border rounded-md p-2 mt-1 placeholder-gray-400"
            />
          </div>
          <div className="w-1/2">
            {/* Category Type Select */}
            <label className="text-gray-700 text-sm">Category Type</label>
            <Select
              placeholder="Select category type"
              value={selectedCategoryType || undefined}
              onChange={(value: "food" | "drinks") => {
                setSelectedCategoryType(value);
                handleInputChange("category_id", "");
              }}
              className="w-full mt-1"
            >
              <Option value="food">Food</Option>
              <Option value="drinks">Drinks</Option>
            </Select>
            {/* Category Select appears after type is selected */}
            {selectedCategoryType && (
              <>
                <label className="text-gray-700 text-sm mt-4">Category</label>
                <Select
                  placeholder="Select category"
                  value={product.category_id || undefined}
                  onChange={(value) => handleInputChange("category_id", value)}
                  className="w-full mt-1"
                  loading={isLoadingCategories}
                >
                  {categories &&
                    categories[selectedCategoryType] &&
                    categories[selectedCategoryType].map((cat) => (
                      <Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Option>
                    ))}
                </Select>
              </>
            )}
          </div>
        </div>

        {/* Vendor Dropdown */}
        <div>
          <label className="text-gray-700 text-sm">Vendor</label>
          <Select
            placeholder="Select vendor"
            value={product.vendor_id}
            onChange={(value) => handleInputChange("vendor_id", value)}
            className="w-full mt-1"
            loading={isLoadingVendors}
          >
            {vendors?.map((vendor) => (
              <Option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Product Description */}
        <div>
          <label className="text-gray-700 text-sm">Product Description</label>
          <Input.TextArea
            placeholder="Enter product description"
            value={product.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4} // ✅ Increased to match design
            className="border rounded-md p-2 mt-1 placeholder-gray-400"
          />
        </div>

        {/* Quantity & Price */}
        <div className="flex space-x-3">
          <div className="w-1/2">
            <label className="text-gray-700 text-sm">Quantity</label>
            <InputNumber
              min={0}
              value={product.qty}
              onChange={(value) => handleInputChange("qty", value)}
              className="w-full border rounded-md mt-1"
            />
          </div>
          <div className="w-1/2">
            <label className="text-gray-700 text-sm">Price per portion</label>
            <div className="flex items-center border rounded-md p-2 mt-1">
              <span className="text-gray-500 pr-2">₦</span>
              <InputNumber
                min={0}
                value={product.amount}
                onChange={(value) => handleInputChange("amount", value)}
                className="border-none flex-1"
              />
            </div>
          </div>
        </div>

        {/* Discount */}
        <div>
          <label className="text-gray-700 text-sm">Discount (₦)</label>
          <InputNumber
            min={0}
            value={product.discount}
            onChange={(value) => handleInputChange("discount", value)}
            className="w-full border rounded-md mt-1"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-gray-700 text-sm">Upload</label>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleInputChange("image", file);
              return false;
            }}
            className="w-full mt-1"
          >
            <Button icon={<UploadOutlined />} className="w-full">
              Upload Image
            </Button>
          </Upload>
          {product.image && (
            <img
              src={URL.createObjectURL(product.image)}
              alt="Product Preview"
              className="w-20 h-20 mt-2 rounded-md border border-gray-300"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            onClick={onCancel}
            className="border border-gray-300 px-6 py-2 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddProduct}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryHover"
          >
            Add Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductsModal;
