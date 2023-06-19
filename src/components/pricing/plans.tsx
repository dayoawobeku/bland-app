'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {tickCircle, tickCircleGrey} from '@/assets/images';
import {Button} from '@/components';
import {Nav} from '@/components/preferred-naming-method';

interface PlanFeature {
  id: number;
  image?: string;
  feature: string;
  subFeature?: string;
}

interface PlanFeatures {
  bg?: 'black' | 'primary';
  planType: string;
  planDescription: string;
  pricing?: string;
  discountedPricing?: string;
  action: React.ReactNode;
  features: PlanFeature[];
  hidePricing?: boolean;
  selectedPlan?: string | null;
  onChoosePlan?: (planType: string | null) => void;
  selectedPlanUI?: React.ReactNode;
}

interface SelectedPlanUIProps {
  selectedPlan: string;
  onChoosePlan?: ((planType: string | null) => void) | undefined;
}

interface Addon {
  label: string;
  additionalInfo?: string;
}

interface AddonsProps {
  addons: Addon[];
}

const plans: PlanFeatures[] = [
  {
    planType: 'Starters',
    planDescription: 'For creators and small projects',
    pricing: '$200',
    discountedPricing: '$100',
    action: (
      <Button
        className="outline outline-1 outline-primary w-full"
        size="zero"
        text="Choose plan"
        bg="black"
        color="text-primary"
      />
    ),
    features: [
      {id: 1, image: tickCircle, feature: 'Brand Name'},
      {id: 2, image: tickCircle, feature: 'Social Media Handle'},
    ],
    bg: 'black' as const,
  },
  {
    planType: 'Budding',
    planDescription: 'For SMEs and early stage businesses',
    pricing: '$250',
    discountedPricing: '$150',
    action: (
      <Button className="w-full" size="zero" text="Choose plan" bg="white" />
    ),
    features: [
      {id: 1, image: tickCircleGrey, feature: 'Brand Name'},
      {
        id: 2,
        image: tickCircleGrey,
        feature: 'Name Registration with Corporate Affairs Commission',
      },
      {id: 3, image: tickCircleGrey, feature: 'Social Media Handle'},
      {id: 4, image: tickCircleGrey, feature: 'Tagline'},
    ],
    bg: 'primary' as const,
  },
  {
    planType: 'More',
    planDescription: 'For large projects and scaling businesses',
    pricing: '$350',
    discountedPricing: '$250',
    action: (
      <Button
        className="outline outline-1 outline-primary w-full"
        size="zero"
        text="Choose plan"
        bg="black"
        color="text-primary"
      />
    ),
    features: [
      {id: 1, image: tickCircle, feature: 'Brand Name'},
      {
        id: 2,
        image: tickCircle,
        feature: 'Name Registration with Corporate Affairs Commission',
      },
      {id: 3, image: tickCircle, feature: 'Social Media Handle'},
      {id: 4, image: tickCircle, feature: 'Tagline'},
    ],
    bg: 'black' as const,
  },
  {
    planType: 'Extra',
    planDescription: 'For projects and teams who need more services',
    action: (
      <Link
        href="/"
        className="font-unbounded text-primary underline mx-auto hover:text-primary-600 transition-all duration-300"
      >
        Contact us
      </Link>
    ),
    features: [
      {
        id: 1,
        image: tickCircle,
        feature: 'Brand Name & Naming System',
        subFeature: '(for product lines and sub-brands)',
      },
      {
        id: 2,
        image: tickCircle,
        feature: 'Company Incorporation with Corporate Affairs Commission',
      },
      {id: 3, image: tickCircle, feature: 'Social Media Handle'},
      {id: 4, image: tickCircle, feature: 'Tagline'},
      {id: 5, image: tickCircle, feature: 'Website or landing page content'},
    ],
    bg: 'black' as const,
    hidePricing: true,
  },
];

const addons: Addon[] = [
  {
    label: 'Domain Purchase',
  },
  {
    label: 'TradeMarking',
  },
  {
    label: 'Website Content',
  },
  {
    label: 'Brand Strategy',
    additionalInfo: 'Buyer persona, mission & vision statements, brand values',
  },
];

function Addons({addons}: AddonsProps) {
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  console.log(selectedAddons);

  const handleAddonChange = (addon: Addon) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter(selected => selected !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  return (
    <>
      {addons.map((addon, index) => (
        <label className="flex items-start gap-4" key={index}>
          <input
            type="checkbox"
            className="w-7 h-7 appearance-none checked:bg-primary p-0"
            checked={selectedAddons.includes(addon)}
            onChange={() => handleAddonChange(addon)}
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-manrope font-light">{addon.label}</span>
            {addon.additionalInfo ? (
              <span className="font-manrope font-light text-really-sm text-primary">
                {addon.additionalInfo}
              </span>
            ) : null}
          </div>
        </label>
      ))}
    </>
  );
}

const SelectedPlanUI = ({selectedPlan, onChoosePlan}: SelectedPlanUIProps) => {
  const plan = plans.find(plan => plan.planType === selectedPlan);

  if (!plan) {
    return null;
  }

  return (
    <div className="flex items-center gap-5 mt-24">
      <div className="flex flex-col px-14 pt-12 pb-8 rounded-[10px] bg-[#101010]">
        <p className="uppercase text-center font-unbounded font-light text-really-sm tracking-[3px]">
          Your selected plan
        </p>
        <div className="h-[429px] w-[305px] mt-5">
          <div className="pt-8 px-7 bg-white-100 rounded flex flex-col justify-between items-start h-full w-full">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-p2 font-unbounded font-medium text-grey-800">
                  {plan.planType}
                </p>
                <p className="mt-2 text-semi-sm font-manrope h-10 text-grey-800">
                  {plan.planDescription}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {plan.features.map(plan => (
                  <div key={plan.id} className="flex items-start gap-1">
                    <Image src={tickCircleGrey} alt="" width={24} height={24} />
                    <p className="text-semi-sm font-manrope text-grey-800">
                      {plan.feature}
                      {plan.subFeature && (
                        <span className="inline-block text-really-sm text-primary">
                          {plan.subFeature}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => onChoosePlan?.(null)}
          className="font-manrope font-medium text-primary mt-4 hover:text-primary-600 active:text-primary-700 transition-all duration-300 w-fit mx-auto"
        >
          Reselect plan
        </button>
      </div>
      <div className="flex flex-col max-w-[446px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-unbounded font-medium">Select add-ons</h1>
          <p className="font-manrope font-light">
            Select a pricing plan Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-6 mb-10">
          <Addons addons={addons} />
        </div>
        <Button size="custom" padding="px-[144.5px]" text="Confirm" />
      </div>
    </div>
  );
};

function Card({
  planType,
  planDescription,
  pricing,
  discountedPricing,
  action,
  features,
  bg = 'black',
  hidePricing = false,
  selectedPlan,
  onChoosePlan = () => {},
  selectedPlanUI,
}: PlanFeatures) {
  const background = bg === 'black' ? 'bg-black' : 'bg-primary';

  if (selectedPlan === planType) {
    return (
      <div>
        {selectedPlanUI && (
          <SelectedPlanUI
            selectedPlan={selectedPlan}
            onChoosePlan={onChoosePlan}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`py-8 px-6 ${background} rounded flex flex-col justify-between items-start h-full`}
    >
      <div className="flex flex-col gap-5">
        <div>
          <p
            className={`text-p2 font-unbounded font-medium ${
              bg === 'primary' ? 'text-black' : 'text-white'
            }`}
          >
            {planType}
          </p>
          <p
            className={`mt-2 text-semi-sm font-manrope h-10 ${
              bg === 'primary' ? 'text-black' : 'text-white'
            }`}
          >
            {planDescription}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {features.map(plan => (
            <div key={plan.id} className="flex items-start gap-1">
              <Image
                src={plan.image ?? tickCircle}
                alt=""
                width={24}
                height={24}
              />
              <p
                className={`text-semi-sm font-manrope ${
                  bg === 'primary' ? 'text-black' : 'text-white'
                }`}
              >
                {plan.feature}
                {plan.subFeature && (
                  <span className="inline-block text-really-sm text-primary">
                    {plan.subFeature}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        {!hidePricing ? (
          <div className="flex items-center gap-3">
            <p
              className={`font-unbounded text-p2 font-medium ${
                bg === 'primary' ? 'text-primary-600' : 'text-grey-500'
              }`}
            >
              {pricing}
            </p>
            <p
              className={`font-unbounded text-md font-semibold ${
                bg === 'primary' ? 'text-black' : 'text-white'
              }`}
            >
              {discountedPricing}
            </p>
          </div>
        ) : null}
        <div className="flex items-center h-[55px]">
          {React.isValidElement(action) ? (
            React.cloneElement(action, {
              onClick: () => {
                if (action.type === Button) {
                  onChoosePlan?.(planType);
                }
              },
            } as React.HTMLProps<typeof action>)
          ) : (
            <div>{action}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<PlanFeatures | null>(null);

  return (
    <div className="bg-grey-800 min-h-screen pt-14 px-4 pb-24">
      <div className="mx-auto max-w-[1312px]">
        <Nav />
        {selectedPlan !== null ? (
          <Card
            planType={selectedPlan.planType}
            planDescription={selectedPlan.planDescription}
            pricing="$200"
            discountedPricing="$100"
            action={
              <Button
                className="outline outline-1 outline-primary w-full"
                size="zero"
                text="Choose plan"
                bg="black"
                color="text-primary"
              />
            }
            features={selectedPlan.features}
            selectedPlan={selectedPlan.planType}
            onChoosePlan={() => setSelectedPlan(null)}
            selectedPlanUI={
              <SelectedPlanUI
                selectedPlan={selectedPlan.planType}
                onChoosePlan={() => setSelectedPlan(null)}
              />
            }
          />
        ) : (
          <>
            <main className="mt-[84px] mx-auto max-w-[655px] text-center">
              <h1 className="font-unbounded text-lg font-medium">
                Hey Ola, Welcome to bland 🤩. One last step to complete
              </h1>
              <p className="mt-4 font-manrope font-light max-w-[446px] mx-auto">
                Select a pricing plan Lorem ipsum dolor sit amet, consectetur{' '}
                <span className="inline-block">
                  adipiscing elit, sed do eiusmod tempor
                </span>
              </p>
            </main>

            <section className="grid grid-cols-4 gap-5 mt-16 h-[429px]">
              {plans.map(plan => (
                <Card
                  key={plan.planType}
                  planType={plan.planType}
                  planDescription={plan.planDescription}
                  pricing={plan.pricing}
                  discountedPricing={plan.discountedPricing}
                  action={plan.action}
                  features={plan.features}
                  selectedPlan={selectedPlan}
                  onChoosePlan={() => setSelectedPlan(plan)}
                  bg={plan.bg}
                  hidePricing={plan.hidePricing}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
