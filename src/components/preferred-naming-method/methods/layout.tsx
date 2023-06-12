'use client';

import {useAuth} from '@/hooks';
import {Aside, Main} from '.';

export default function Layout({userCheckText}: {userCheckText: string}) {
  const {handleLogout} = useAuth();

  return (
    <div className="min-h-screen bg-grey-800">
      <div className="flex min-h-screen basis-full items-stretch justify-between">
        <aside className="flex basis-[37.15%] flex-col bg-black pl-[5.56%] pr-[3.06%] pt-[60px] pb-16">
          <Aside userCheckText={userCheckText} />
        </aside>
        <main className="flex flex-col basis-[62.85%] pl-[2.78%] pr-[5.56%] pt-[60px] pb-[70px]">
          <button
            type="button"
            className="text-white font-medium text-md-small flex justify-end"
            onClick={handleLogout}
          >
            Logout
          </button>
          <section className="pt-[21.39%] flex flex-col justify-between h-full">
            <Main />
          </section>
        </main>
      </div>
    </div>
  );
}
