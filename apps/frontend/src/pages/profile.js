import AppLayout from '@/components/Layouts/AppLayout';
import AddressStroke from '@/components/ui/AddressStroke';
import { useAuth } from '@/hooks/auth';
import Loading from '../components/ui/Loading';
import ProfileInfo from '../components/ProfileInfo';

export default function Profile() {
  return (
    <AppLayout>
      <ProfileInfo />
    </AppLayout>
  );
}
