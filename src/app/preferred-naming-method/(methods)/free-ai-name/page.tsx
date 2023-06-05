'use client';

import {Layout} from '@/components/preferred-naming-method/methods';
import {FREE_AI_NAME_DATA} from '@/helpers/data/free-ai-name';

export default function FreeAiName() {
  const data = FREE_AI_NAME_DATA[0].userCheckText;

  return <Layout userCheckText={data}></Layout>;
}
