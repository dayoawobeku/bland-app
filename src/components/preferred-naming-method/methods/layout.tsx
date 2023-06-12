'use client';

import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {Aside, Main} from '.';
import {FREE_AI_NAME_DATA, AI_HUMAN_NAME_DATA} from '@/helpers/data';
import {useAuth} from '@/hooks';

export default function Layout() {
  const pathname = usePathname();
  const {handleLogout} = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isHumanName = pathname === '/preferred-naming-method/ai-human-service';
  const nameData = isHumanName ? AI_HUMAN_NAME_DATA : FREE_AI_NAME_DATA;
  const DATA = nameData[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-grey-800">
      <div className="flex min-h-screen basis-full items-stretch justify-between">
        <aside className="flex basis-[37.15%] flex-col bg-black pl-[5.56%] pr-[3.06%] pt-[60px] pb-16">
          <Aside
            userCheckText={
              DATA.userCheckText ? DATA.userCheckText : 'User Check'
            }
            width={DATA.width ? DATA.width : ''}
          />
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
            <Main
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
