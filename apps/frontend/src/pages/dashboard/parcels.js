import AppLayout from '@/components/Layouts/AppLayout';
import ParcelsList from '../../components/ParcelsList';
import AddParcel from '../../components/AddParcel';

export default function Parcels() {
  return (
    <AppLayout>
      <ParcelsList />
    </AppLayout>
  );
}
