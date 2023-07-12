import {manrope, unbounded} from '@/assets/fonts';
import '@/styles/globals.css';
import '@/styles/react-select.css';
import {
  DataProvider,
  QueryProvider,
  SelectedOptionsProvider,
  TrialCountProvider,
  UserProvider,
} from '@/context';

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
