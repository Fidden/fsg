import MainLayout from '@/components/Layouts/MainLayout';
import FormHead from '@/components/ui/FormHead';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Link from 'next/link';
import {useAuth} from '@/hooks/auth';
import axios, {defaultFetcher} from "@/lib/axios";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {useRouter} from "next/router";
import useSWR from "swr";
import SelectBranch from "@/components/SelectBranch";
import {useForm} from "react-hook-form";

export default function ChangeBranch() {
    const {user} = useAuth();
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const {data, isLoading, error} = useSWR('/branches', defaultFetcher)

    const changeBranch = async () => {
        try {
            await axios.post('/users/change-branch', {
                branch_id: selectedBranchId,
            })

            toast.success('Филиал успешно изменен.')
            await router.push('/dashboard')
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <MainLayout>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    changeBranch();
                }}
                className="flex flex-col mt-44 gap-8 w-80 pb-40 mx-auto"
            >
                <FormHead>Изменение филиала</FormHead>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <SelectBranch
                            selectedBranchId={selectedBranchId}
                            setSelectedBranchId={setSelectedBranchId}
                            errors={errors.branch_id}
                        />
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
