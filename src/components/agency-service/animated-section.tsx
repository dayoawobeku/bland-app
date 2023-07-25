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
        <div
          className="relative flex lg:h-[121.25px] w-full py-4 px-5 lg:w-[477px] lg:p-0 items-center justify-center rounded-full bg-black after:absolute after:h-[2px] after:w-[calc(100%-64px)] after:bg-white"
          aria-label={`Not ${text}`}
        >
          <span className="font-unbounded text-md lg:text-2xl font-bold text-grey-200">
            {text}
          </span>
        </div>
      ) : (
        <div
          className="flex lg:h-[121.25px] w-full py-4 px-5 lg:w-[477px] lg:p-0 items-center justify-center rounded-full bg-black outline outline-[3px] outline-white-100"
          aria-label={text}
        >
          <span className="font-unbounded text-md lg:text-2xl font-bold">
            {text}
          </span>
        </div>
      )}
    </>
  );
}

export default function AnimatedSection() {
  return (
    <section className="relative -mt-6 md:-mt-54 bg-[url('../assets/images/pattern.svg')] bg-cover pb-17 px-4 xl:pl-[13.3%] xl:pr-[7.43%] pt-7 md:pt-[207px]">
      <div className="mx-auto flex max-w-[1179px] basis-full items-center sm:items-start md:items-center justify-between gap-4 sm:gap-8 lg:gap-14 flex-col md:flex-row w-full md:w-auto">
        <div className="flex md:max-w-[611px] flex-col basis-1/2 lg:basis-full">
          <h2 className="font-unbounded text-md md:text-2xl font-bold">
            77% of B2C consumers make purchases based on a brand name
          </h2>
          <p className="mt-5 font-manrope text-p2 font-light">
            Building a brand takes a ton of time, planning and funds. Capture
            consumers’ interest as soon as they see or hear your brand name.
          </p>
        </div>
        <div className="h-[297px] md:h-[530px] overflow-y-clip pt-10 md:pt-16 md:w-auto w-full md:basis-1/2 lg:basis-full">
          <div className="flex flex-col gap-11 md:gap-16 lg:gap-20 motion-safe:animate-slidesm lg:motion-safe:animate-slide">
            {ELEMENTS.map(element => (
              <Element key={element.id} {...element} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
