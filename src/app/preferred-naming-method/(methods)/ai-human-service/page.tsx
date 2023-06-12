'use client';

import {Layout} from '@/components/preferred-naming-method/methods';
import {AI_HUMAN_NAME_DATA} from '@/helpers/data/form-data';

export default function FreeAiName() {
  const data = AI_HUMAN_NAME_DATA[0].userCheckText;

  return <Layout userCheckText={data} />;
}
