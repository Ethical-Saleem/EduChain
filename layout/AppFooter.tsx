/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <Image src="/educhain_1.png" alt="Logo" width={80} height={80} />
            by
            <span className="font-bold text-2xl ml-2">EduChain</span>
        </div>
    );
};

export default AppFooter;
