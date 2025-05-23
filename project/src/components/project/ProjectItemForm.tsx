import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { ProjectItem, FormMode } from '../../types';

interface ProjectItemFormProps {
  onSubmit: (name: string, cost: number) => void;
  onCancel: () => void;
  mode: FormMode;
  item?: ProjectItem;
}

const ProjectItemForm: React.FC<ProjectItemFormProps> = ({
  onSubmit,
  onCancel,
  mode,
  item
}) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (item && mode === 'edit') {
      setName(item.name);
      setCost(item.cost.toString());
    }
  }, [item, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    const costNumber = parseFloat(cost);
    if (isNaN(costNumber) || costNumber < 0) {
      setError('Cost must be a valid positive number');
      return;
    }
    
    onSubmit(name, costNumber);
    setName('');
    setCost('');
    setError('');
  };

  return (
    <div className="card p-4 mb-4 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">
        {mode === 'add' ? 'Add New Item' : 'Edit Item'}
      </h3>
      
      {error && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item name"
              className="form-input"
            />
          </div>
          
          <div>
            <label htmlFor="cost" className="form-label">Cost</label>
            <input
              id="cost"
              type="number"
              step="0.01"
              min="0"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="0.00"
              className="form-input"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </button>
          
          <button
            type="submit"
            className="btn btn-primary flex items-center"
          >
            {mode === 'add' ? (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectItemForm;