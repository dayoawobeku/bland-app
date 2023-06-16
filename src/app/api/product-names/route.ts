import {NextResponse} from 'next/server';
import {Configuration, OpenAIApi} from 'openai';

interface DomainAvailability {
  extension: string;
  isAvailable: boolean;
}

interface AvailableDomain {
  name: string;
  domain: string;
  extensions: string[];
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// check domain availability with whois api
async function checkDomainAvailability(
  domains: string[],
  extensions: string[],
): Promise<DomainAvailability[]> {
  const availability: DomainAvailability[] = [];

  const combinedDomains = domains.join(',');
  const extensionsQuery = extensions
    .map(ext => `domainName=${combinedDomains}${ext}`)
    .join('&');
  const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${process.env.WHOIS_API_KEY}&${extensionsQuery}&outputFormat=JSON`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    domains.forEach(domain => {
      extensions.forEach(extension => {
        const isAvailable: boolean = data.WhoisRecord?.[`${domain}${extension}`]
          ?.registryData?.expiresDate
          ? false
          : true;

        availability.push({extension, isAvailable});
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return availability;
}

export async function POST(req: Request): Promise<NextResponse> {
  if (!req.body) {
    return NextResponse.json({error: 'No body provided'}, {status: 400});
  }

  const body = await req.json();

  const {companyType, industry, whatYouProvide, whatYouProvideFor, seedWords} =
    body;

  const prompt = `Use a Product description, the type of company, seed words, and the industry the company belongs to generate product names.
        ###
        Type of company: Digital Product (App, Software etc).
        Industry: Tech
        Product description: We provide healthcare for tech engineers
        Seed words: fast, healthy, compact
        Product names: Technova, FitTech, Wellnex, RapidCare, CompactHealth, VitalTech, SwiftFit, WellnessTech, HealthLink, FastWell, TechVita, RapidHealth, HealthyTech, SwiftCare, WellTech
        ###
        Type of company: ${companyType}.
        Industry: ${industry}
        Product description: We provide ${whatYouProvide} for ${whatYouProvideFor}
        Seed words: ${seedWords}
        Product names: `;

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 60,
      temperature: 0.78,
    });

    const productNamesString: string | undefined =
      completion.data.choices[0]?.text?.trim();

    if (!productNamesString) {
      return NextResponse.json(
        {error: 'Product names not found'},
        {status: 400},
      );
    }

    const productNames: string[] = productNamesString
      .split(',')
      .map(name => name.trim());
    const extensions: string[] = ['.net', '.io'];

    const domains = productNames.map(name => name.toLowerCase());

    const availability: DomainAvailability[] = await checkDomainAvailability(
      domains,
      extensions,
    );

    const availableDomains: AvailableDomain[] = availability
      .filter((item: DomainAvailability, index: number) => item.isAvailable)
      .map((item: DomainAvailability, index: number) => ({
        name: productNames[Math.floor(index / extensions.length)],
        domain: `${productNames[Math.floor(index / extensions.length)]} - ${
          item.extension
        } is available`,
        extensions: [item.extension],
      }));

    const groupedData: {[key: string]: string[]} = {};

    availableDomains.forEach((item: AvailableDomain) => {
      if (groupedData[item.name]) {
        groupedData[item.name].push(...item.extensions);
      } else {
        groupedData[item.name] = [...item.extensions];
      }
    });

    const formattedData: AvailableDomain[] = Object.keys(groupedData).map(
      (name: string) => ({
        name: name,
        domain: `${name} - ${groupedData[name].join(' and ')} are available`,
        extensions: groupedData[name],
      }),
    );

    return NextResponse.json({data: formattedData}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error}, {status: 500});
  }
}
