/* eslint-disable @next/next/no-img-element */
import { GlobeAltIcon } from '@heroicons/react/24/outline';

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <GlobeAltIcon className="h-1 w-1 rotate-[15deg]" mr-2 />
            by
            <span className="font-medium ml-2">EduChain</span>
        </div>
    );
};

export default AppFooter;
