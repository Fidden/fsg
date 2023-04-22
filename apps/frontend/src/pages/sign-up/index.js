import Link from 'next/link';
import FormHead from '@/components/ui/FormHead';
import SecondaryButton from '@/components/ui/SecondaryButton';
import React, {useState} from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import InputGroup from '@/components/ui/InputGroup';
import Input from '@/components/ui/Input';
import PrimaryButton from '@/components/ui/PrimaryButton';
import {useForm} from 'react-hook-form';
import {useAuth} from '@/hooks/auth';
import Eye from '@/components/icons/Eye';
import EyeOff from '@/components/icons/EyeOff';
import {useRouter} from "next/router";
import LoadingLayout from "@/components/Layouts/LoadingLayout";

export default function Index() {
    const {t} = useTranslation('auth');
    const {register, handleSubmit} = useForm();
    const router = useRouter();

    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const {register: createAccount, isUserLoading, isAuth, whereToGo} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/sign-up/type',
    });

    if (isUserLoading) {
        return <LoadingLayout/>;
    }

    if (isAuth) {
        if (whereToGo) {
            router.push(whereToGo);
        }

        return <MainLayout/>;
    }

    const onSubmmit = async (data) => {
        await createAccount({
            ...data,
            setErrors,
        });
    };

    return (
        <MainLayout>
            <div className="flex flex-col mt-44 max-sm:mt-28 w-80 gap-8 pb-40 mx-auto">
                <FormHead>{t('signUpForm.title')}</FormHead>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-6">
                        <form onSubmit={handleSubmit(onSubmmit)}>
                            <div className="flex flex-col gap-4">
                                <InputGroup id="email" label={t('signUpForm.email')} errors={errors.email}>
                                    <Input required autoFocus maxLength="255" {...register('email')} type="email"
                                           placeholder="hello@fsg.post"/>
                                </InputGroup>

                                <InputGroup id="password" label={t('signUpForm.password')} errors={errors.password}>
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
                                                    <Eye/>
                                                </div>
                                            ) : (
                                                <div className="svg_20 svg_c_60">
                                                    <EyeOff/>
                                                </div>
                                            )}
                                        </label>
                                    </Input>
                                </InputGroup>
                            </div>

                            <div className="flex flex-col gap-8 mt-8">
                                <div className="flex flex-col gap-6">
                                    <PrimaryButton>{t('signUpForm.submit')}</PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col gap-8">
                        <p className="text-center text-sm text-primary-60">
                            <Trans i18nKey="auth:signUpForm.acceptRules"
                                   components={[<Link key="rules" href="/rules" target="_blank"
                                                      className="underline"/>]}/>
                        </p>
                        <div className="flex gap-3 justify-between items-center border-t-1 border-primary-8 pt-4">
                            <p className="text-md text-primary-60">{t('signUpForm.haveAccount')}</p>
                            <SecondaryButton link="/sign-in">{t('signInForm.submit')}</SecondaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
