import React from 'react';
import { DollarSign, Package, PieChart } from 'lucide-react';

interface CostSummaryProps {
  itemsTotal: number;
  otherCostsTotal: number;
}

const CostSummary: React.FC<CostSummaryProps> = ({ itemsTotal, otherCostsTotal }) => {
  const totalCost = itemsTotal + otherCostsTotal;
  const itemsPercentage = totalCost === 0 ? 0 : Math.round((itemsTotal / totalCost) * 100);
  const otherCostsPercentage = totalCost === 0 ? 0 : Math.round((otherCostsTotal / totalCost) * 100);

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Cost Summary</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Items Total</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">${itemsTotal.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">{itemsPercentage}% of total</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Other Costs</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">${otherCostsTotal.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">{otherCostsPercentage}% of total</p>
            </div>
            <div className="bg-teal-100 p-2 rounded-lg">
              <PieChart className="h-6 w-6 text-teal-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Total Project Cost</p>
              <p className="text-2xl font-bold mt-1">${totalCost.toFixed(2)}</p>
              <p className="text-sm text-white/80 mt-1">All costs combined</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostSummary;