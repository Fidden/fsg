import React, {useMemo} from 'react';
import Loading from './ui/Loading';
import AddressStroke from '@/components/ui/AddressStroke';
import {useAuth} from '@/hooks/auth';
import {useIntl} from 'next-intl';
import useTranslation from 'next-translate/useTranslation';
import MainLayout from "@/components/Layouts/MainLayout";

const ProfileInfo = () => {
  const { user, isUserLoading } = useAuth({ middleware: 'client' });
  const intl = useIntl();
  const { t } = useTranslation('auth');

  const createdAt = useMemo(() => {
    if (!user?.created_at) {
      return null;
    }

    return intl.formatDateTime(new Date(user.created_at), { day: 'numeric', month: 'numeric', year: 'numeric' });
  }, [user]);

  if (isUserLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (!user) {
    return <MainLayout/>;
  }

  const recipient = user.recipient;

  return (
    <div className="border-1 border-primary-8 p-6 rounded-xl flex flex-col gap-4">
      <h2 className="text-lg font-medium text-primary-100">Личная информация</h2>
      <table className="min-w-full mb-2 break-all table-auto rounded-xl text-primary-100 text-md divide-y divide-primary-8 bg-primary-2">
        <tbody className="divide-y divide-primary-8">
        <AddressStroke name="Номер кабинета">{'FSG' + recipient.id}</AddressStroke>
        <AddressStroke name="Email">{user.email}</AddressStroke>
        <AddressStroke name="Номер телефона">{user.phone}</AddressStroke>
        <AddressStroke name="Баланс">{intl.formatNumber(user.balance || -1, {
          style: 'currency',
          currency: 'GEL'
        })}</AddressStroke>
        <AddressStroke name="Тип клиента">{t('accountTypes.' + recipient.type)}</AddressStroke>
        {recipient.type !== 'business' && (
          <>
            <AddressStroke name="Имя на английском">{recipient?.first_name_en}</AddressStroke>
            <AddressStroke name="Фамилия на английском">{recipient?.last_name_en}</AddressStroke>
          </>
        )}

        {recipient.type === 'individual_non_resident' && (
          <AddressStroke name="Номер паспорта">{recipient?.document_number}</AddressStroke>
        )}

        {recipient.type === 'individual_resident' && (
          <>
            <AddressStroke name="Имя">{recipient?.first_name_ka}</AddressStroke>
            <AddressStroke name="Фамилия">{recipient?.last_name_ka}</AddressStroke>
            <AddressStroke name="Персональный номер">{recipient?.personal_number}</AddressStroke>
          </>
        )}

        {recipient.type === 'business' && (
          <>
            <AddressStroke name="Название организации">{recipient.company_name_en}</AddressStroke>
            <AddressStroke name="Company ID">{recipient?.uid}</AddressStroke>
          </>
        )}
        <AddressStroke name="Дата регистрации">{createdAt}</AddressStroke>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileInfo;
