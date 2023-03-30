import PrimaryButton from '@/components/ui/PrimaryButton';
import RadioButton from '@/components/ui/RadioButton';
import FormHead from '@/components/ui/FormHead';
import MainLayout from '@/components/Layouts/MainLayout';
import WorldIcon from '@/components/icons/WorldIcon';
import OfficeIcon from '@/components/icons/OfficeIcon';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import toast from 'react-hot-toast';
import {useAuth} from '@/hooks/auth';
import React from 'react';
import LoadingLayout from "@/components/Layouts/LoadingLayout";

export default function AccountType() {
    const router = useRouter();
    const {t} = useTranslation('auth');

    const {hasRecipient, whereToGo} = useAuth({middleware: 'auth'});

    const submit = (e) => {
        e.preventDefault();

        const selectedType = e.target.elements.type.value;
        if (!selectedType) {
            return toast.error(t('accountType.error'));
        }

        router.push('/recipient/' + selectedType);
    };

    if (hasRecipient) {
        if (whereToGo) {
            router.push(whereToGo);
        }

        return <LoadingLayout/>;
    }

    return (
        <MainLayout>
            <div className="flex flex-col mt-44 max-sm:mt-28 w-80 mx-auto pb-40">
                <form className="flex flex-col gap-8" onSubmit={submit}>
                    <FormHead>Выберите тип</FormHead>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <RadioButton
                                id="individual_resident"
                                title={t('accountTypes.individual_resident')}
                                img={<img className="w-6 p-0.5" src="/flags/ge.svg" alt="Georgian flag"/>}
                            />
                            <RadioButton id="individual_non_resident" title={t('accountTypes.individual_non_resident')}
                                         img={<WorldIcon/>}/>
                            <RadioButton id="business" title={t('accountTypes.business')} img={<OfficeIcon/>}/>
                        </div>
                    </div>
                    <PrimaryButton className="w-full peer-checked:opacity-75">{t('common:continue')}</PrimaryButton>
                </form>
            </div>
        </MainLayout>
    );
}
