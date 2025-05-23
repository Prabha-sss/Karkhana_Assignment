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
  Timestamp, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { ProjectItem } from '../types';
import { useAuth } from '../firebase/authContext';

export const useProjectItems = () => {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setItems([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'projectItems'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const itemsData: ProjectItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          itemsData.push({
            id: doc.id,
            name: data.name,
            cost: data.cost,
            createdAt: data.createdAt.toDate(),
          });
        });
        setItems(itemsData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching project items:', err);
        setError('Failed to load project items');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const addItem = async (name: string, cost: number) => {
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, 'projectItems'), {
        name,
        cost,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error adding project item:', err);
      setError('Failed to add project item');
    }
  };

  const updateItem = async (id: string, name: string, cost: number) => {
    if (!currentUser) return;
    
    try {
      const itemRef = doc(db, 'projectItems', id);
      await updateDoc(itemRef, {
        name,
        cost,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error updating project item:', err);
      setError('Failed to update project item');
    }
  };

  const deleteItem = async (id: string) => {
    if (!currentUser) return;
    
    try {
      await deleteDoc(doc(db, 'projectItems', id));
    } catch (err) {
      console.error('Error deleting project item:', err);
      setError('Failed to delete project item');
    }
  };

  const totalItemCost = items.reduce((total, item) => total + item.cost, 0);

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    totalItemCost,
  };
};