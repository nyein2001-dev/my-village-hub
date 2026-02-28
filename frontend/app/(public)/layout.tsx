import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PublicHeader />
            <main className="flex-grow flex flex-col">
                {children}
            </main>
            <PublicFooter />
        </>
    );
}
