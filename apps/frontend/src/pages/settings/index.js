import AppLayout from '@/components/Layouts/AppLayout';
import SettingsItem from '../../components/SettingsItem';
import Email from '../../components/icons/Email';
import Lock from '../../components/icons/Lock';
import Smartphone from '../../components/icons/Smartphone';
import { useAuth } from '@/hooks/auth';
import Garage from '@/components/icons/Garage';

export default function Settings() {
  const { user, isUserLoading } = useAuth();
  console.log(user);

  return (
    <AppLayout>
      <div className="border-1 border-primary-8 p-6 rounded-xl flex flex-col gap-2">
        <h2 className="text-lg font-medium text-primary-100">Настройки</h2>
        <div>
          <SettingsItem href="/settings/changebranch" description="Тут вывести филиал" img={<Garage />}>
            Филиал для доставки
          </SettingsItem>
          <SettingsItem href="/settings/changeemail" description={user?.email} img={<Email />}>
            Основная почта
          </SettingsItem>
          <SettingsItem href="/settings/changepassword" description="Вы можете изменить свой пароль" img={<Lock />}>
            Пароль
          </SettingsItem>
          <SettingsItem href="/settings/changetelephone" description={user?.phone || 'Не указан'} img={<Smartphone />}>
            Номер телефона
          </SettingsItem>
        </div>
      </div>
    </AppLayout>
  );
}
