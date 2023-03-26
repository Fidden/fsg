import React from 'react';
import AccountMenu from "@/components/Header/AccountMenu";
import AuthButtons from "@/components/Header/AuthButtons";
import {useAuth} from "@/hooks/auth";

const Account = () => {
  const { user, isUserLoading } = useAuth();

  if (isUserLoading) {
    return null;
  }

  if (!user) {
    return <AuthButtons/>;
  }

  return (
    <AccountMenu user={user}/>
  );
}

export default Account;
