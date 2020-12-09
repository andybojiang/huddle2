import { useContext } from 'react';
import { APIContext } from '../../components/APIProvider';

export default function useAPIContext() {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('API Error, context is null');
  }
  return context;
}
