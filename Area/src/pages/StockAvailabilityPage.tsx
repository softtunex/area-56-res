import React from "react";
import StockAvailabilityHeader from "../components/stockAvailability/StockAvailabilityHeader";
import StockAvailabilityTable from "../components/stockAvailability/StockAvailabilityTable";
import { stockAvailabilityData } from "../data/stockAvailabilityData";

const StockAvailabilityPage: React.FC = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <StockAvailabilityHeader />
      <StockAvailabilityTable data={stockAvailabilityData} />
    </div>
  );
};

export default StockAvailabilityPage;
