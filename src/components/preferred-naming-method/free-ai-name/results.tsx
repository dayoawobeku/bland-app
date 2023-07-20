'use client';

import {useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {DataContext, TrialCountContext, UserContext} from '@/context';
import {bookmarkIc, logo} from '@/assets/images';
import {ProductName} from '@/types';
import {Button, Loader} from '@/components';
import {MaxResponsesDialog} from '.';
import {resetTime} from '@/helpers';
import {useTrialCount} from '@/hooks';

function GeneratedCard({data}: {data: ProductName}) {
  return (
    <div className="flex flex-col border border-grey-500 rounded pt-4 px-4 pb-7">
      <div className="flex justify-between items-center py-[10px] mb-5">
        <h3 className="font-unbounded font-medium text-p2">{data.name}</h3>
        <Image src={bookmarkIc} alt="bookmark" width={14} height={18} />
      </div>
      <div className="border border-grey-500 -mx-4" />
      <div className="flex flex-col gap-2 mt-6 px-2">
        <p className="uppercase font-unbounded text-grey-300 tracking-[3px] text-really-sm font-light">
          available domain
        </p>
        <div className="flex items-center gap-4">
          {data.extensions.map((item, index) => (
            <p className="font-manrope underline" key={index}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FreeAiNameResults() {
  const router = useRouter();
  const {user} = useContext(UserContext);
  const {postData} = useContext(DataContext);
  const {trialCount} = useContext(TrialCountContext);
  const {handleConsumeTrial} = useTrialCount(user, resetTime);

  const [isMaxResponsesDialogOpen, setIsMaxResponsesDialogOpen] =
    useState(false);
  const [displayedItems, setDisplayedItems] = useState<ProductName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUpdatePreferenceMessage, setShowUpdatePreferenceMessage] =
    useState(false);

  useEffect(() => {
    if (postData) {
      const initialDisplayedItems = postData.slice(0, 12);
      setDisplayedItems(initialDisplayedItems);
    }
  }, [postData]);

  const regenerateNames = () => {
    setIsLoading(true);

    const newIndex = currentIndex + 12;
    const newDisplayedItems = postData?.slice(newIndex, newIndex + 12);

    if (newDisplayedItems && newDisplayedItems.length >= 3) {
      setDisplayedItems(newDisplayedItems);
      setCurrentIndex(newIndex);
      handleConsumeTrial();
    } else {
      setShowUpdatePreferenceMessage(true);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, Math.floor(Math.random() * 3000) + 10000); // Random time between 4 and 10 seconds
  };

  return (
    <>
      <MaxResponsesDialog
        isOpen={isMaxResponsesDialogOpen}
        setIsOpen={setIsMaxResponsesDialogOpen}
      />
      <div className="bg-grey-800 min-h-screen pt-10 px-4 pb-24">
        <div className="mx-auto max-w-[1312px]">
          <header className="py-3 shadow-[0_18px_48px_0_rgba(0,0,0,0.15)] rounded-[15px]">
            <nav className="flex items-center gap-6 justify-between rounded-[14px] border border-grey-500 px-4 md:px-[29px] py-[22px] ">
              <Link href="/">
                <Image src={logo} alt="logo" width={128.92} height={28.66} />
              </Link>
              <p>
                <span className="text-sm md:text-base font-manrope font-medium">
                  Not satisfied with these names?{' '}
                </span>
                <Link
                  href="/preferred-naming-method/ai-human-service"
                  className="font-unbounded text-base md:text-md-small text-primary hover:opacity-80 transition-all duration-300"
                >
                  Get AI-Human Service
                </Link>
              </p>
            </nav>
          </header>

          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-14 mt-12">
            {displayedItems.map((data, i) => (
              <GeneratedCard key={i} data={data} />
            ))}
          </main>

          <div className="mt-14 flex items-start justify-center mx-auto gap-14">
            <Button
              className="outline outline-1 outline-primary"
              text="Update preferences"
              size="custom"
              padding="sm:px-[100.5px]"
              bg="grey"
              color="text-primary"
              onClick={() => {
                if (trialCount > 0) {
                  router.back();
                } else {
                  setIsMaxResponsesDialogOpen(true);
                }
              }}
            />
            <div className="flex flex-col gap-3 items-center">
              {isLoading ? (
                <Loader text="Generating fresh names" />
              ) : (
                <Button
                  text="Regenerate names"
                  size="custom"
                  padding="sm:px-[100.5px]"
                  onClick={() => {
                    if (trialCount > 0) {
                      regenerateNames();
                    } else {
                      setIsMaxResponsesDialogOpen(true);
                    }
                  }}
                />
              )}
              <p className="font-manrope text-sm text-[#FEE3BA] underline">
                {trialCount} {trialCount === 1 ? 'trial' : 'trials'} left
              </p>
            </div>
          </div>
          {showUpdatePreferenceMessage ? (
            <p className="text-primary font-manrope text-center mt-4">
              Please try updating your preferences. There are no more results
              available.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
