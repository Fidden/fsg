import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';

export default function MainLayout({ children, ...props }) {
  return (
    <div className="min-h-screen mt-20 bg-white">
      <div>
        <Toaster position="bottom-right" />
      </div>
      <Header />
      <main {...props}>{children}</main>
    </div>
  );
}
