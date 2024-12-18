'use client';

import React, {useContext, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {tickCircle, tickCircleGrey} from '@/assets/images';
import {Button} from '@/components';
import {Nav} from '@/components/preferred-naming-method';
import {SelectedOptionsContext} from '@/context';
import {useAuth} from '@/hooks';

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
  action: React.ReactNode;
  features: PlanFeature[];
  hidePricing?: boolean;
  selectedPlan?: string | null;
  onChoosePlan?: (planType: string | null) => void;
  children?: React.ReactNode;
  reselectPlan?: React.ReactNode;
  confirmAction?: React.ReactNode;
}

interface SelectedPlanUIProps {
  selectedPlan: string;
  onChoosePlan?: ((planType: string | null) => void) | undefined;
  children: React.ReactNode;
  action: React.ReactNode;
  confirmAction: React.ReactNode;
}

interface Addon {
  label: string;
  additionalInfo?: string;
}

const plans: PlanFeatures[] = [
  {
    planType: 'Starters',
    planDescription: 'For creators and small projects',
    pricing: '#120,000',
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
    pricing: '#200,000',
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
    pricing: '#250,000',
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

const SelectedPlanUI = ({
  selectedPlan,
  action,
  children,
  confirmAction,
}: SelectedPlanUIProps) => {
  const plan = plans.find(plan => plan.planType === selectedPlan);

  if (!plan) {
    return null;
  }

  return (
    <div className="flex items-center gap-5 justify-center sm:justify-start flex-wrap mt-14 sm:mt-24">
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

        {action}
      </div>
      <div className="flex flex-col sm:max-w-[446px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-unbounded font-medium">Select add-ons</h1>
          <p className="font-manrope font-light">
            Select a pricing plan Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-6 mb-10">{children}</div>
        {confirmAction}
      </div>
    </div>
  );
};

function Card({
  planType,
  planDescription,
  pricing,
  action,
  features,
  bg = 'black',
  hidePricing = false,
  selectedPlan,
  onChoosePlan = () => {},
  reselectPlan,
  confirmAction,
  children,
}: PlanFeatures) {
  const background = bg === 'black' ? 'bg-black' : 'bg-primary';

  if (selectedPlan === planType) {
    return (
      <SelectedPlanUI
        selectedPlan={selectedPlan}
        onChoosePlan={onChoosePlan}
        action={reselectPlan}
        confirmAction={confirmAction}
      >
        {children}
      </SelectedPlanUI>
    );
  }

  return (
    <div
      className={`py-8 px-4 md:px-6 ${background} rounded flex flex-col justify-between items-start h-full`}
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
              className={`font-unbounded text-md font-semibold ${
                bg === 'primary' ? 'text-black' : 'text-white'
              }`}
            >
              {pricing}
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
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const {selectedOptions} = useContext(SelectedOptionsContext);

  const {user, handlePaidUserDetails} = useAuth();

  const handleAddonChange = (addon: Addon) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter(selected => selected !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const companyDetails = {
    companyType: selectedOptions[0]?.label ?? null,
    industryType: selectedOptions[1]?.label ?? null,
    companyGoal:
      selectedOptions[2]?.whatYouProvide &&
      selectedOptions[2]?.whatYouProvideFor
        ? `We provide ${selectedOptions[2]?.whatYouProvide} for ${selectedOptions[2]?.whatYouProvideFor}`
        : null,
    businessVision: selectedOptions[3]?.businessVision ?? null,
    fullName:
      selectedOptions[4]?.firstName && selectedOptions[4]?.lastName
        ? `${selectedOptions[4]?.firstName} ${selectedOptions[4]?.lastName}`
        : null,
  };
  const handleAddUserPlan = async () => {
    try {
      if (user) {
        const userId = user.uid;
        const updatedPlanDetails = {
          planDetails: {
            plan: selectedPlan?.planType ?? null,
            companyDetails,
            addons: selectedAddons.map(addon => addon.label),
          },
        };
        await handlePaidUserDetails(userId, updatedPlanDetails);
      } else {
        console.error('User not logged in');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-grey-800 min-h-screen pt-10 md:pt-14 px-4 pb-24">
      <div className="mx-auto max-w-[1312px]">
        <Nav />
        {selectedPlan !== null ? (
          <Card
            planType={selectedPlan.planType}
            planDescription={selectedPlan.planDescription}
            pricing={selectedPlan.pricing}
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
            reselectPlan={
              <button
                onClick={() => {
                  setSelectedPlan(null);
                  setSelectedAddons([]);
                }}
                className="font-manrope font-medium text-primary mt-4 hover:text-primary-600 active:text-primary-700 transition-all duration-300 w-fit mx-auto"
              >
                Reselect plan
              </button>
            }
            confirmAction={
              <Button
                size="custom"
                padding="px-[144.5px]"
                text="Confirm"
                onClick={handleAddUserPlan}
              />
            }
          >
            {addons.map((addon, index) => (
              <label className="flex items-start gap-4" key={index}>
                <input
                  type="checkbox"
                  className="w-7 h-7 appearance-none checked:bg-primary p-0"
                  checked={selectedAddons.includes(addon)}
                  onChange={() => handleAddonChange(addon)}
                  aria-checked={selectedAddons.includes(addon)}
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
          </Card>
        ) : (
          <>
            <main className="mt-[84px] mx-auto max-w-[655px] text-center">
              <h1 className="font-unbounded text-md2 sm:text-lg font-medium">
                {user !== null
                  ? `Hey ${
                      user?.displayName?.split(' ')[0]
                    }, one last step to complete`
                  : 'Welcome to bland. One last step to complete'}
              </h1>
              <p className="mt-4 font-manrope font-light">
                Select a preferred service
              </p>
            </main>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 h-full xl:h-[429px]">
              {plans.map(plan => (
                <Card
                  key={plan.planType}
                  planType={plan.planType}
                  planDescription={plan.planDescription}
                  pricing={plan.pricing}
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
