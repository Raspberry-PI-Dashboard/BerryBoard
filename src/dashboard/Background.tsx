import './Background.css';

export function Background({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-honeycomb-tech min-w-0 flex-1 min-h-screen">
            {children}
        </main>
    );
}