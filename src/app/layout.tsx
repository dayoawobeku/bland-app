import {Metadata} from 'next';
import {unbounded, manrope} from '@/assets/fonts';
import '@/styles/globals.css';
import '@/styles/react-select.css';
import {
  DataProvider,
  QueryProvider,
  SelectedOptionsProvider,
  TrialCountProvider,
  UserProvider,
} from '@/context';

const metadata: Metadata = {
  title: 'Bland',
  description: 'The fastest way to name brands',
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

export {metadata};
