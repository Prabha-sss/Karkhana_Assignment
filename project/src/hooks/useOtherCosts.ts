import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { OtherCost } from '../types';
import { useAuth } from '../firebase/authContext';

export const useOtherCosts = () => {
  const [costs, setCosts] = useState<OtherCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setCosts([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'otherCosts'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const costsData: OtherCost[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          costsData.push({
            id: doc.id,
            description: data.description,
            amount: data.amount,
            createdAt: data.createdAt.toDate(),
          });
        });
        setCosts(costsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching other costs:', err);
        setError('Failed to load other costs');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const addCost = async (description: string, amount: number) => {
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, 'otherCosts'), {
        description,
        amount,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error adding other cost:', err);
      setError('Failed to add other cost');
    }
  };

  const updateCost = async (id: string, description: string, amount: number) => {
    if (!currentUser) return;
    
    try {
      const costRef = doc(db, 'otherCosts', id);
      await updateDoc(costRef, {
        description,
        amount,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error updating other cost:', err);
      setError('Failed to update other cost');
    }
  };

  const deleteCost = async (id: string) => {
    if (!currentUser) return;
    
    try {
      await deleteDoc(doc(db, 'otherCosts', id));
    } catch (err) {
      console.error('Error deleting other cost:', err);
      setError('Failed to delete other cost');
    }
  };

  const totalOtherCosts = costs.reduce((total, cost) => total + cost.amount, 0);

  return {
    costs,
    loading,
    error,
    addCost,
    updateCost,
    deleteCost,
    totalOtherCosts,
  };
};