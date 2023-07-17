import {Manrope, Unbounded} from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/react-select.css';
import {
  DataProvider,
  QueryProvider,
  SelectedOptionsProvider,
  TrialCountProvider,
  UserProvider,
} from '@/context';

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Bland',
  description: 'The fastest wayto name brands',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} ${manrope.variable}`}>
        <QueryProvider>
          <UserProvider>
            <TrialCountProvider>
              <DataProvider>
                <SelectedOptionsProvider>{children}</SelectedOptionsProvider>
              </DataProvider>
            </TrialCountProvider>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
