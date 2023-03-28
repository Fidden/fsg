import './change-email__modal.css';
import {cnChangeEmail} from "@/client/screens/change-email/change-email.const";
import FormHead from "@/components/ui/FormHead";
import PrimaryButton from "@/components/ui/PrimaryButton";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/hooks/auth";
import {useRouter} from "next/router";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export const ChangeEmailModal = () => {
    const router = useRouter();
    const [code, setCode] = useState('');
    const {user} = useAuth();

    useEffect(() => {
        if (code.length >= 4) {
            changeEmail()
                .then(() => {
                    toast.success('Почта успешно изменена')
                    router.push('/dashboard');
                })
                .catch(e => toast.error(e));
        }
    }, [code])

    const requestEmailChange = async (event) => {
        event?.preventDefault();
        try {
            await axios.post('/users/request-email-change', {
                email: user.email
            })

            toast.success('Код для подтверждения отправлен на почту.');
        } catch (e) {
            toast.error(e.message)
        }
    }

    const changeEmail = async () => {
        try {
            await axios.post('/users/change-email', {
                code,
            })
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <div className={cnChangeEmail('modal-blackbox')}>
            <div className={cnChangeEmail('modal')}>
                <div className="flex flex-col w-80 mx-auto">
                    <div className="flex flex-col gap-1">
                        <FormHead>Подтверждение</FormHead>
                        <div className="change-email__info">
                            Мы отправили код в письме, на <span>{user?.email}</span>
                        </div>

                        <div className={'change-email__code'}>
                            <div className={'change-email__code-block'}>
                                {code?.at(0)}
                            </div>
                            <div className={'change-email__code-block'}>
                                {code?.at(1)}
                            </div>
                            <div className={'change-email__code-block'}>
                                {code?.at(2)}
                            </div>
                            <div className={'change-email__code-block'}>
                                {code?.at(3)}
                            </div>
                            <input
                                onInput={e => setCode(e.target.value)}
                                maxLength={4}
                                type="text"
                                className={'change-email__code-input'}
                            />
                        </div>

                        <p
                            onClick={() => requestEmailChange()}
                            className={'change-email__resend'}
                        >
                            Отправить код ещё раз
                        </p>

                        <div className={'flex flex-col gap-1'}>
                            <PrimaryButton
                                className="w-full peer-checked:opacity-75"
                            >
                                Завершить изменение пароля
                            </PrimaryButton>
                            <button
                                onClick={() => router.back()}
                                className={'change-email__cancel'}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
