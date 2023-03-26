import Link from 'next/link';
import FormHead from '@/components/ui/FormHead';
import SecondaryButton from '@/components/ui/SecondaryButton';
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import useTranslation from 'next-translate/useTranslation';
import { useAuth } from '@/hooks/auth';
import Input from '@/components/ui/Input';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import InputGroup from '@/components/ui/InputGroup';
import Eye from '@/components/icons/Eye';
import EyeOff from '@/components/icons/EyeOff';

export default function SignIn() {
  const { t } = useTranslation('auth');
  const router = useRouter();

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.query.reset));
    } else {
      setStatus(null);
    }
  }, [errors.length, router.query.reset]);

  const onSubmit = async (data) => {
    await login({
      ...data,
      setErrors,
      setStatus,
    });
  };

  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <MainLayout>
      <div className="flex flex-col mt-44 max-sm:mt-28 gap-8 w-80 pb-40 mx-auto">
        <FormHead>{t('signInForm.title')}</FormHead>

        <div className="flex gap-8 flex-col">
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <InputGroup id="email" label={t('signInForm.login')} errors={errors.email}>
                  <Input required autoFocus maxLength="255" {...register('email')} type="email" placeholder="hello@fsg.post" />
                </InputGroup>

                <InputGroup id="password" label={t('signInForm.password')} errors={errors.password}>
                  <Input
                    required
                    minLength="8"
                    maxLength="32"
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********">
                    <label
                      onClick={() => setShowPassword(!showPassword)}
                      className="z-50 bg-white h-9 flex items-center cursor-pointer pl-2"
                      htmlFor="toggle">
                      {showPassword ? (
                        <div className="svg_20">
                          <Eye />
                        </div>
                      ) : (
                        <div className="svg_20 svg_c_60">
                          <EyeOff />
                        </div>
                      )}
                    </label>
                  </Input>
                </InputGroup>
              </div>

              <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-6">
                  <PrimaryButton>{t('signInForm.submit')}</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-8">
            <Link href="/forgot-password" className="text-center text-md font-medium">
              {t('signInForm.forgotPassword')}
            </Link>
            <div className="flex gap-3 justify-between items-center border-t-1 border-primary-8 pt-4">
              <p className="text-md text-primary-60">{t('signInForm.haventAccount')}</p>
              <SecondaryButton link="/sign-up">{t('signInForm.createAccount')}</SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
