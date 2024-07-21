import React from 'react';

import Menu from '../Menu';
import styles from './Layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.layout}>
      <Menu />
      {children}
      <audio src="/8_Bit_World.mp3" autoPlay loop />
    </main>
  );
}
