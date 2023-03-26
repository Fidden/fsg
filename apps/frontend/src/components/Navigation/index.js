import React from 'react';
import NavItem from '@/components/Navigation/NavItem';
import useTranslation from 'next-translate/useTranslation';
import Calculator from '../Calculator';

const routes = [
  {
    title: 'delivery',
    url: '/delivery',
  },
  {
    title: 'rules',
    url: '/rules',
  },
];

const Navigation = ({ className }) => {
  const { t } = useTranslation('links');

  return (
    <nav className={`flex items-center justify-center ${className}`}>
      <ul className="flex items-center">
        <li>
          <NavItem href="/">Главная</NavItem>
        </li>
        <li>
          <Calculator>Калькулятор</Calculator>
        </li>

        {routes.map((el, index) => (
          <li key={index}>
            <NavItem href={el.url}>{t(`header.${el.title}`)}</NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
