import React, { useState } from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { ProjectItem } from '../../types';
import ProjectItemForm from './ProjectItemForm';

interface ProjectItemListProps {
  items: ProjectItem[];
  loading: boolean;
  onAddItem: (name: string, cost: number) => void;
  onUpdateItem: (id: string, name: string, cost: number) => void;
  onDeleteItem: (id: string) => void;
}

const ProjectItemList: React.FC<ProjectItemListProps> = ({
  items,
  loading,
  onAddItem,
  onUpdateItem,
  onDeleteItem
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);

  const handleAddItem = (name: string, cost: number) => {
    onAddItem(name, cost);
    setShowAddForm(false);
  };

  const handleUpdateItem = (name: string, cost: number) => {
    if (editingItem) {
      onUpdateItem(editingItem.id, name, cost);
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDeleteItem(id);
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
        <h2 className="text-xl font-semibold text-gray-900">Project Items</h2>
        
        {!showAddForm && !editingItem && (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary flex items-center text-sm"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Item
          </button>
        )}
      </div>
      
      {showAddForm && (
        <ProjectItemForm
          onSubmit={handleAddItem}
          onCancel={() => setShowAddForm(false)}
          mode="add"
        />
      )}
      
      {editingItem && (
        <ProjectItemForm
          onSubmit={handleUpdateItem}
          onCancel={() => setEditingItem(null)}
          mode="edit"
          item={editingItem}
        />
      )}
      
      {items.length === 0 && !showAddForm ? (
        <div className="card p-6 text-center animate-fade-in">
          <p className="text-gray-500">No project items yet. Add your first item!</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-3 btn btn-primary flex items-center mx-auto"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Item
          </button>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow-sm rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li 
                key={item.id} 
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 animate-scale"
              >
                <div>
                  <h3 className="text-md font-medium text-gray-900">{item.name}</h3>
                </div>
                
                <div className="flex items-center">
                  <span className="text-md font-semibold text-gray-900 mr-4">
                    ${item.cost.toFixed(2)}
                  </span>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1 text-gray-500 hover:text-blue-600"
                      aria-label="Edit item"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 text-gray-500 hover:text-red-600"
                      aria-label="Delete item"
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

export default ProjectItemList;