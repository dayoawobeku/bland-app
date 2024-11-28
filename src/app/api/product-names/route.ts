import {NextResponse} from 'next/server';
import OpenAI, {APIError, APIConnectionError, APIUserAbortError} from 'openai';

interface DomainAvailability {
  extension: string;
  isAvailable: boolean;
}

interface AvailableDomain {
  name: string;
  domain: string;
  extensions: string[];
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that generates product names. Provide a numbered list of 10 product names.',
        },
        {
          role: 'user',
          content: `Use a Product description, the type of company, seed words, and the industry the company belongs to generate product names.
          Type of company: ${companyType}.
          Industry: ${industry}
          Product description: We provide ${whatYouProvide} for ${whatYouProvideFor}
          Seed words: ${seedWords}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.78,
    });

    const productNamesString: string | undefined =
      completion.choices[0]?.message.content?.trim();

    if (!productNamesString) {
      return NextResponse.json(
        {error: 'Product names not found'},
        {status: 400},
      );
    }

    const productNames: string[] = productNamesString
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(name => name.length > 0);

    const extensions: string[] = ['.com', '.net', '.io'];

    const domains = productNames.map(name =>
      name.toLowerCase().replace(/\s+/g, ''),
    );

    const availability: DomainAvailability[] = await checkDomainAvailability(
      domains,
      extensions,
    );

    const availableDomains: AvailableDomain[] = [];

    productNames.forEach((name, index) => {
      const availableExtensions = extensions.filter(
        (ext, extIndex) =>
          availability[index * extensions.length + extIndex].isAvailable,
      );

      if (availableExtensions.length > 0) {
        availableDomains.push({
          name: name,
          domain: `${name} - ${availableExtensions.join(' and ')} ${
            availableExtensions.length > 1 ? 'are' : 'is'
          } available`,
          extensions: availableExtensions,
        });
      }
    });

    return NextResponse.json({data: availableDomains}, {status: 200});
  } catch (error) {
    if (error instanceof APIError) {
      console.error('OpenAI API Error:', error);
      return NextResponse.json(
        {error: 'OpenAI API Error'},
        {status: error.status || 500},
      );
    } else if (error instanceof APIConnectionError) {
      console.error('OpenAI API Connection Error:', error);
      return NextResponse.json(
        {error: 'Failed to connect to OpenAI API'},
        {status: 503},
      );
    } else if (error instanceof APIUserAbortError) {
      console.error('User Aborted Request:', error);
      return NextResponse.json({error: 'Request aborted'}, {status: 400});
    } else {
      console.error('Unexpected Error:', error);
      return NextResponse.json(
        {error: 'An unexpected error occurred'},
        {status: 500},
      );
    }
  }
}
