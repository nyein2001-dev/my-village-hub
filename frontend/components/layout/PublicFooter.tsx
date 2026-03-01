export function PublicFooter() {
    return (
        <footer className="bg-brand-dark text-white/80 py-8 border-t border-brand-dark/20 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Taung Ywar Ma Village</h3>
                        <p className="text-sm leading-relaxed max-w-sm text-balance">
                            Connecting our village to wider markets while preserving and sharing our rich cultural heritage.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/crops" className="hover:text-brand-tint transition-colors">Marketplace</a></li>
                            <li><a href="/archive" className="hover:text-brand-tint transition-colors">Village Life</a></li>
                            <li><a href="/info" className="hover:text-brand-tint transition-colors">Information Hub</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-4">Contact Information</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Magway Region, Myanmar</li>
                            <li>Email: contact@taungywarma.com</li>
                            <li>Phone: +95 9 123 456 789</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/20 mt-8 pt-6 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} Taung Ywar Ma Community Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
