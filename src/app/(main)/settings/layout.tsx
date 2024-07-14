"use client"

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TabMenu } from "primereact/tabmenu";

const Settings = ({ children }: { children: React.ReactNode}) => {
    const router = useRouter();
    const pathname = usePathname();

    const [activeIndex, setActiveIndex] = useState(0);

    const checkActiveIndex = useCallback(() => {
        const paths = pathname.split('/');
        const currentPath = paths[paths.length - 1];

        switch (currentPath) {
            case 'user':
                setActiveIndex(1);
                break;
            case 'payment':
                setActiveIndex(2);
                break;
            case 'confirmation':
                setActiveIndex(3);
                break;
            default:
                break;
        }
    }, [pathname]);

    useEffect(() => {
        checkActiveIndex()
    }, [checkActiveIndex])

    const wizardItems = [
        { label: 'Result', command: () => router.push('/settings/result') },
        { label: 'User', command: () => router.push('/settings/user') },
        { label: 'Misc', command: () => router.push('/settings/payment') }
    ];

    return (
        <div className="grid h-screen">
            <div className="col-12 md:col-3">
                <div className="card vertical-tabmenu">
                    <h5>App Settings</h5>
                    <TabMenu model={wizardItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                </div>
            </div>
            <div className="col-12 md:col-9 h-full">
                <div className="card h-full">
                    <Suspense>{children}</Suspense>
                </div>
            </div>
        </div>
    )
}

export default Settings;