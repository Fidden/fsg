import MainLayout from '@/components/Layouts/MainLayout';
import FormHead from '@/components/ui/FormHead';
import Input from '@/components/ui/Input';
import InputGroup from '@/components/ui/InputGroup';
import InputDescription from '@/components/ui/InputDescription';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Link from 'next/link';
import Smartphone from '@/components/icons/Smartphone';
import {useAuth} from '@/hooks/auth';
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import {useState} from "react";
import {useRouter} from "next/router";

export default function ChangeTelephone() {
    const {user} = useAuth();
    const router = useRouter();
    const [phone, setPhone] = useState('');

    const changePhone = async () => {
        try {
            await axios.post('/users/change-phone', {
                phone: phone,
            })

            toast.success('Телефон успешно изменен.')
            await router.push('/dashboard')
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <MainLayout>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    changePhone();
                }}
                className="flex flex-col mt-44 gap-8 w-80 pb-40 mx-auto">
                <FormHead>Изменение телефона</FormHead>
                <div className="flex flex-col gap-4">
                    <Smartphone/>
                    <div className="flex flex-col gap-3">
                        <InputGroup id="tel" label="Новый номер телефона">
                            <Input
                                onInput={e => setPhone(e.target.value)}
                                required
                                autoFocus
                                maxLength={'255'}
                                type={'tel'}
                                placeholder={user?.phone}
                            />
                            <InputDescription>На этот номер вы будете получать смс о статусе ваших посылок, а так же для
                                связи с нами</InputDescription>
                        </InputGroup>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <PrimaryButton>
                        Продолжить
                    </PrimaryButton>
                    <Link
                        href="/settings"
                        className="text-primary-100 w-full text-center flex items-center justify-center text-md hover:bg-primary-8 font-medium h-10 rounded-xl px-4 bg-primary-4">
                        Отмена
                    </Link>
                </div>
            </form>
        </MainLayout>
    );
}
