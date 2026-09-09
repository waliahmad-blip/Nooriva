'use client';

import dynamic from 'next/dynamic';

const BagDrawer = dynamic(() => import('@/components/commerce/BagDrawer'), { ssr: false });
const CheckoutOverlay = dynamic(() => import('@/components/commerce/CheckoutOverlay'), { ssr: false });

export default function GlobalCommerce() {
  return (
    <>
      <BagDrawer />
      <CheckoutOverlay />
    </>
  );
}
