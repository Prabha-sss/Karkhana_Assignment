import React from 'react';
import { useProjectItems } from '../hooks/useProjectItems';
import { useOtherCosts } from '../hooks/useOtherCosts';
import ProjectItemList from '../components/project/ProjectItemList';
import OtherCostList from '../components/costs/OtherCostList';
import CostSummary from '../components/dashboard/CostSummary';

const Dashboard: React.FC = () => {
  const { 
    items, 
    loading: itemsLoading, 
    addItem, 
    updateItem, 
    deleteItem, 
    totalItemCost 
  } = useProjectItems();
  
  const { 
    costs, 
    loading: costsLoading, 
    addCost, 
    updateCost, 
    deleteCost, 
    totalOtherCosts 
  } = useOtherCosts();

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Project Dashboard</h1>
      
      <CostSummary 
        itemsTotal={totalItemCost} 
        otherCostsTotal={totalOtherCosts} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ProjectItemList
            items={items}
            loading={itemsLoading}
            onAddItem={addItem}
            onUpdateItem={updateItem}
            onDeleteItem={deleteItem}
          />
        </div>
        
        <div>
          <OtherCostList
            costs={costs}
            loading={costsLoading}
            onAddCost={addCost}
            onUpdateCost={updateCost}
            onDeleteCost={deleteCost}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;