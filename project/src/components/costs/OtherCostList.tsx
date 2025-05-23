import React, { useState } from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { OtherCost } from '../../types';
import OtherCostForm from './OtherCostForm';

interface OtherCostListProps {
  costs: OtherCost[];
  loading: boolean;
  onAddCost: (description: string, amount: number) => void;
  onUpdateCost: (id: string, description: string, amount: number) => void;
  onDeleteCost: (id: string) => void;
}

const OtherCostList: React.FC<OtherCostListProps> = ({
  costs,
  loading,
  onAddCost,
  onUpdateCost,
  onDeleteCost
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCost, setEditingCost] = useState<OtherCost | null>(null);

  const handleAddCost = (description: string, amount: number) => {
    onAddCost(description, amount);
    setShowAddForm(false);
  };

  const handleUpdateCost = (description: string, amount: number) => {
    if (editingCost) {
      onUpdateCost(editingCost.id, description, amount);
      setEditingCost(null);
    }
  };

  const handleDeleteCost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this cost?')) {
      onDeleteCost(id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Other Costs</h2>
        
        {!showAddForm && !editingCost && (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary flex items-center text-sm"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Cost
          </button>
        )}
      </div>
      
      {showAddForm && (
        <OtherCostForm
          onSubmit={handleAddCost}
          onCancel={() => setShowAddForm(false)}
          mode="add"
        />
      )}
      
      {editingCost && (
        <OtherCostForm
          onSubmit={handleUpdateCost}
          onCancel={() => setEditingCost(null)}
          mode="edit"
          cost={editingCost}
        />
      )}
      
      {costs.length === 0 && !showAddForm ? (
        <div className="card p-6 text-center animate-fade-in">
          <p className="text-gray-500">No additional costs yet. Add shipping, taxes, or other expenses.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-3 btn btn-primary flex items-center mx-auto"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Cost
          </button>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow-sm rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {costs.map((cost) => (
              <li 
                key={cost.id} 
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 animate-scale"
              >
                <div>
                  <h3 className="text-md font-medium text-gray-900">{cost.description}</h3>
                </div>
                
                <div className="flex items-center">
                  <span className="text-md font-semibold text-gray-900 mr-4">
                    ${cost.amount.toFixed(2)}
                  </span>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setEditingCost(cost)}
                      className="p-1 text-gray-500 hover:text-blue-600"
                      aria-label="Edit cost"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteCost(cost.id)}
                      className="p-1 text-gray-500 hover:text-red-600"
                      aria-label="Delete cost"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OtherCostList;