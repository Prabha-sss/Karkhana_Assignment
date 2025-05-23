import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { OtherCost, FormMode } from '../../types';

interface OtherCostFormProps {
  onSubmit: (description: string, amount: number) => void;
  onCancel: () => void;
  mode: FormMode;
  cost?: OtherCost;
}

const OtherCostForm: React.FC<OtherCostFormProps> = ({
  onSubmit,
  onCancel,
  mode,
  cost
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (cost && mode === 'edit') {
      setDescription(cost.description);
      setAmount(cost.amount.toString());
    }
  }, [cost, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber < 0) {
      setError('Amount must be a valid positive number');
      return;
    }
    
    onSubmit(description, amountNumber);
    setDescription('');
    setAmount('');
    setError('');
  };

  return (
    <div className="card p-4 mb-4 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">
        {mode === 'add' ? 'Add Other Cost' : 'Edit Cost'}
      </h3>
      
      {error && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Cost description"
              className="form-input"
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
                Add Cost
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

export default OtherCostForm;