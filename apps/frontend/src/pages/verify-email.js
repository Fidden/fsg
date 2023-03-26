import MainLayout from '@/components/Layouts/MainLayout';
import useTranslation from 'next-translate/useTranslation';
import PrimaryButton from '@/components/ui/PrimaryButton';
import React, {useState} from 'react';
import {useAuth} from '@/hooks/auth';
import {useRouter} from 'next/router';
import LoadingLayout from "@/components/Layouts/LoadingLayout";
import FormHead from "@/components/ui/FormHead";
import OutlinedButton from "@/components/ui/OutlinedButton";

export default function VerifyEmail() {
    const {t} = useTranslation('auth');

    const router = useRouter();

    const {logout, isAuth, resendEmailVerification, hasVerifiedEmail, whereToGo} = useAuth({
        middleware: 'has-recipient',
    })

    const [status, setStatus] = useState(null)

    if (hasVerifiedEmail || !isAuth) {
        if (whereToGo) {
            router.push(whereToGo);
        }

        return <LoadingLayout/>;
    }

    return (
        <MainLayout>
            <div className={''}>

            </div>
            <div className="flex flex-col mt-44 max-sm:mt-28 w-80 mx-auto pb-40">
                <form className="flex flex-col gap-8" onSubmit={() => resendEmailVerification({setStatus})}>
                    <FormHead>Подтверждение</FormHead>
                    <div className="mb-4 text-sm text-center text-gray-600">
                        Мы отправили код в смс на номер
                        +995 (595) 042-241-432
                    </div>

                    <div className={''}>

                    </div>

                    <p>Отправить код ещё раз</p>

                    <div className={'flex flex-col gap-1'}>
                        <PrimaryButton className="w-full peer-checked:opacity-75">
                            Завершить регистрацию
                        </PrimaryButton>
                        <OutlinedButton className="w-full peer-checked:opacity-75">
                            Отмена
                        </OutlinedButton>
                    </div>
                </form>
            </div>
        </MainLayout>
    )
}
