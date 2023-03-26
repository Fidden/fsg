import Link from 'next/link';
import useTranslation from "next-translate/useTranslation";
import NavItem from "@/components/Navigation/NavItem";

export default function SigninSignup() {
  const { t } = useTranslation('auth');

  return (
    <div className="flex gap-3 items-center">
      <NavItem href="/sign-in">{t('signIn')}</NavItem>
      <Link
        href="/sign-up"
        className="rounded-xl flex text-center outline-none cursor-pointer text-white font-medium bg-brand-100 h-10 px-4 items-center text-md">
        {t('signUp')}
      </Link>
    </div>
  );
}
