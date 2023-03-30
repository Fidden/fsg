import MainLayout from '@/components/Layouts/MainLayout';
import PrimaryButton from '@/components/ui/PrimaryButton';
import React, {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/auth';
import {useRouter} from 'next/router';
import LoadingLayout from "@/components/Layouts/LoadingLayout";
import FormHead from "@/components/ui/FormHead";
import './verify-email.css';
import toast from "react-hot-toast";

export const VerifyEmailScreen = () => {
    const router = useRouter();

    const {logout, isAuth, resendEmailVerification, hasVerifiedEmail, whereToGo, user, verifyEmail} = useAuth({
        middleware: 'has-recipient',
    })

    const [status, setStatus] = useState(null);
    const [code, setCode] = useState('');

    useEffect(() => {
        if (code.length >= 4)
            verifyEmail(code);
    }, [code])

    if (hasVerifiedEmail || !isAuth) {
        if (whereToGo) {
            router.push(whereToGo);
        }

        return <LoadingLayout/>;
    }

    return (
        <MainLayout>
            <div className="flex flex-col mt-44 max-sm:mt-28 w-80 mx-auto pb-40">
                <div className="flex flex-col gap-1">
                    <FormHead>Подтверждение</FormHead>
                    <div className="verify-email__info">
                        Мы отправили код в письме, на <span>{user.email}</span>
                    </div>

                    <div className={'verify-email__code'}>
                        <div className={'verify-email__code-block'}>
                            {code?.at(0)}
                        </div>
                        <div className={'verify-email__code-block'}>
                            {code?.at(1)}
                        </div>
                        <div className={'verify-email__code-block'}>
                            {code?.at(2)}
                        </div>
                        <div className={'verify-email__code-block'}>
                            {code?.at(3)}
                        </div>
                        <input
                            onInput={e => setCode(e.target.value)}
                            maxLength={4}
                            type="text"
                            className={'verify-email__code-input'}
                        />
                    </div>

                    <p
                        onClick={() => resendEmailVerification({setStatus})}
                        className={'verify-email__resend'}
                    >
                        Отправить код ещё раз
                    </p>

                    <div className={'flex flex-col gap-1'}>
                        <PrimaryButton
                            className="w-full peer-checked:opacity-75"
                        >
                            Завершить регистрацию
                        </PrimaryButton>
                        <button
                            onClick={() => logout()}
                            className={'verify-email__cancel'}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
