import Image from 'next/image';
import {tickCircle, tickCircleGrey} from '@/assets/images';
import {Button} from '@/components';
import {Nav} from '@/components/preferred-naming-method';

const STARTERS_PLAN = [
  {id: 1, image: tickCircle, feature: 'Brand Name'},
  {id: 2, image: tickCircle, feature: 'Social Media Handle'},
];

const BUDDING_PLAN = [
  {id: 1, image: tickCircleGrey, feature: 'Brand Name'},
  {
    id: 2,
    image: tickCircleGrey,
    feature: 'Name Registration with Corporate Affairs Commission',
  },
  {id: 3, image: tickCircleGrey, feature: 'Social Media Handle'},
  {id: 4, image: tickCircleGrey, feature: 'Tagline'},
];

const MORE_PLAN = [
  {id: 1, image: tickCircle, feature: 'Brand Name'},
  {
    id: 2,
    image: tickCircle,
    feature: 'Name Registration with Corporate Affairs Commission',
  },
  {id: 3, image: tickCircle, feature: 'Social Media Handle'},
  {id: 4, image: tickCircle, feature: 'Tagline'},
];

const EXTRA_PLAN = [
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
];

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
  pricing: string;
  discountedPricing: string;
  action: React.ReactNode;
  features: PlanFeature[];
}

function Card({
  planType,
  planDescription,
  pricing,
  discountedPricing,
  action,
  features,
  bg = 'black',
}: PlanFeatures) {
  const background = bg === 'black' ? 'bg-black' : 'bg-primary';
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
            className={`mt-2 text-semi-sm font-manrope font-light h-10 ${
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
                className={`text-semi-sm font-manrope font-light ${
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
        <div className="flex items-center">{action}</div>
      </div>
    </div>
  );
}

export default function PricingPlans() {
  return (
    <div className="bg-grey-800 min-h-screen pt-14 px-4 pb-24">
      <div className="mx-auto max-w-[1312px]">
        <Nav />
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
          <Card
            planType="Starters"
            planDescription="For creators and small projects"
            pricing="$200"
            discountedPricing="$100"
            action={
              <Button
                className="outline outline-1 outline-primary w-full"
                size="zero"
                text="Choose plan"
                bg="black"
                color="primary"
              />
            }
            features={STARTERS_PLAN}
          />
          <Card
            bg="primary"
            planType="Budding"
            planDescription="For SMEs and early stage businesses"
            pricing="$250"
            discountedPricing="$150"
            action={
              <Button
                className="outline outline-1 outline-primary w-full"
                size="zero"
                text="Choose plan"
                bg="white"
                color="grey-800"
              />
            }
            features={BUDDING_PLAN}
          />
        </section>
      </div>
    </div>
  );
}
