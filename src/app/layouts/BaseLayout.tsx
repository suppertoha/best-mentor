import { Outlet } from 'react-router-dom';
import { bem } from '@/shared/lib/bem';
import { Header } from '@/widgets/header';
import styles from './BaseLayout.module.scss';

const b = bem(styles, 'base-layout');

export const BaseLayout = () => (
  <div className={b.block()}>
    <Header />
    <main className={b.el('content')}>
      <div className={b.el('container')}>
        <Outlet />
      </div>
    </main>
  </div>
);
