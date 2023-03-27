import MainLayout from '@/components/Layouts/MainLayout';
import FormHead from '@/components/ui/FormHead';
import Input from '@/components/ui/input';
import InputGroup from '@/components/ui/InputGroup';
import InputDescription from '@/components/ui/InputDescription';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Link from 'next/link';
import Lock from '@/components/icons/Lock';
import Eye from '@/components/icons/Eye';
import EyeOff from '@/components/icons/EyeOff';
import React, {useState} from 'react';
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

export default function ChangePassword() {
    const router = useRouter();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const [currentPassword, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

    const changePassword = async () => {
        try {
            await axios.post('/users/change-password', {
                password: currentPassword,
                new_password: newPassword,
                new_password_confirm: newPasswordRepeat
            })

            toast.success('Пароль успешно изменен.')
            await router.push('/dashboard')
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <MainLayout>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    changePassword()
                }}
                className="flex flex-col mt-44 gap-8 w-80 pb-40 mx-auto"
            >
                <FormHead>Изменение пароля</FormHead>
                <div className="flex flex-col gap-4">
                    <Lock/>
                    <div className="flex flex-col gap-3">
                        <InputGroup id="password" label="Текущий пароль">
                            <Input
                                required
                                autoFocus
                                maxLength="255"
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="********"
                                onInput={e => setPassword(e.target.value)}
                            >
                                <label
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="z-50 bg-white h-9 flex items-center cursor-pointer pl-2"
                                    htmlFor="toggle">
                                    {showCurrentPassword ? (
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
                        <InputGroup id="password" label="Новый пароль">
                            <Input
                                required
                                maxLength="255"
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Придумайте новый пароль"
                                onInput={e => setNewPassword(e.target.value)}
                            >
                                <label
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="z-50 bg-white h-9 flex items-center cursor-pointer pl-2"
                                    htmlFor="toggle">
                                    {showNewPassword ? (
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
                            <InputDescription>
                                Минимальная длина пароля - 8 символов.
                                <br/>
                                Пароль должен иметь хотя бы 1 цифру и 1 букву
                            </InputDescription>
                        </InputGroup>
                        <InputGroup id="password" label="Повторите новый пароль">
                            <Input
                                required
                                maxLength="255"
                                type={showRepeatPassword ? 'text' : 'password'}
                                placeholder="Повторите придуманный пароль"
                                onInput={e => setNewPasswordRepeat(e.target.value)}
                            >
                                <label
                                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                    className="z-50 bg-white h-9 flex items-center cursor-pointer pl-2"
                                    htmlFor="toggle">
                                    {showRepeatPassword ? (
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
        </MainLayout>
    );
}
