import Link from 'next/link';

interface Element {
  id: number;
  text: string;
  greyedOut?: boolean;
}

const ELEMENTS: Element[] = [
  {
    id: 1,
    text: 'Boring names',
    greyedOut: true,
  },
  {
    id: 2,
    text: 'Due diligence',
  },
  {
    id: 3,
    text: 'Digital presence',
  },
  {
    id: 4,
    text: 'Tongue twister',
    greyedOut: true,
  },
  {
    id: 5,
    text: 'Inclusivity',
  },
  {
    id: 6,
    text: 'Long names',
    greyedOut: true,
  },
  {
    id: 7,
    text: 'Domain check',
  },
  {
    id: 8,
    text: 'Cliche names',
    greyedOut: true,
  },
];

function Element({text, greyedOut}: Element) {
  return (
    <>
      {greyedOut ? (
        <div className="relative flex h-[121.25px] w-[477px] items-center justify-center rounded-full bg-black after:absolute after:h-[2px] after:w-[calc(100%-64px)] after:bg-white">
          <span className="font-unbounded text-2xl font-bold text-grey-200">
            {text}
          </span>
        </div>
      ) : (
        <div className="flex h-[121.25px] w-[477px] items-center justify-center rounded-full bg-black outline outline-[3px] outline-white-100">
          <span className="font-unbounded text-2xl font-bold">{text}</span>
        </div>
      )}
    </>
  );
}

export default function AnimatedSection() {
  return (
    <section className="relative -mt-54 bg-[linear-gradient(180deg,rgba(0,0,0,1)-4.39%,rgba(0,0,0,0)50.93%,rgba(0,0,0,1)99.03%),url('../assets/images/pattern.svg')] bg-cover pb-17 pl-[13.3%] pr-[7.43%] pt-[207px]">
      <div className="mx-auto flex max-w-[1179px] items-center justify-between gap-14">
        <div className="flex max-w-[611px] flex-col">
          <h2 className="font-unbounded text-2xl font-bold">
            77% of B2C consumers make purchases based on a brand name
          </h2>
          <p className="mt-5 font-manrope text-p2 font-light">
            Building a brand takes a ton of time, planning and funds. Capture
            consumers’ interest as soon as they see or hear your brand name.
          </p>
          <Link
            href="/"
            className="mt-8 w-fit font-manrope font-medium text-primary transition-all duration-300 hover:text-primary-600 active:text-primary-700"
          >
            Learn About Brand Naming
          </Link>
        </div>
        <div className="h-[530px] overflow-y-clip pt-16">
          <div className="flex flex-col gap-20">
            {ELEMENTS.map(element => (
              <Element key={element.id} {...element} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
