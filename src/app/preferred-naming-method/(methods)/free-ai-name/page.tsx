import {Layout} from '@/components/preferred-naming-method/methods';
import {FREE_AI_NAME_DATA} from '@/helpers/data/form-data';

export default function FreeAiName() {
  const data = FREE_AI_NAME_DATA[0].userCheckText;

  return <Layout userCheckText={data} />;
}
