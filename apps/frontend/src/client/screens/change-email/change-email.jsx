import MainLayout from '@/components/Layouts/MainLayout';
import FormHead from '@/components/ui/FormHead';
import Input from '@/components/ui/input';
import InputGroup from '@/components/ui/InputGroup';
import InputDescription from '@/components/ui/InputDescription';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Link from 'next/link';
import Email from '@/components/icons/Email';
import {useAuth} from '@/hooks/auth';
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import axios from "@/lib/axios";
import {ChangeEmailModal} from "@/client/screens/change-email/__modal/change-email__modal";

export const ChangeEmailScreen = () => {
    const {user, isUserLoading} = useAuth();
    const [email, setEmail] = useState('');
    const [modalOpen, setModalOpen] = useState(true);

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        if (modalOpen)
            body.style.overflow = 'hidden';
        else
            body.style.overflow = 'auto';
    }, [modalOpen])

    const requestEmailChange = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/users/request-email-change', {
                email: email
            })

            toast.success('Код для подтверждения отправлен на почту.');
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <MainLayout>
            <form
                onSubmit={requestEmailChange}
                className="flex flex-col mt-44 gap-8 w-80 pb-40 mx-auto"
            >
                <FormHead>Изменение Email</FormHead>
                <div className="flex flex-col gap-4">
                    <Email/>
                    <InputGroup id="email" label="Введите новый Email">
                        <Input
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoFocus
                            maxLength="255"
                            type="email"
                            placeholder={user?.email}
                        />
                        <InputDescription>На новый Email мы вышлем код подтверждения</InputDescription>
                    </InputGroup>
                </div>

                <div className="flex flex-col gap-2">
                    <PrimaryButton>Продолжить</PrimaryButton>
                    <Link
                        href="/settings"
                        className="text-primary-100 w-full text-center flex items-center justify-center text-md hover:bg-primary-8 font-medium h-10 rounded-xl px-4 bg-primary-4">
                        Отмена
                    </Link>
                </div>
            </form>
            {modalOpen && <ChangeEmailModal/>}
        </MainLayout>
    );
}
