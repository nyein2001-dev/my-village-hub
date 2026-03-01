import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-white text-brand p-4 z-[100] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2">
                Skip to main content
            </a>
            <PublicHeader />
            <main id="main-content" className="flex-grow flex flex-col">
                {children}
            </main>
            <PublicFooter />
        </>
    );
}
