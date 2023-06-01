import {Main, Nav} from '@/components/preferred-naming-method';

export default function SelectNamingMethod() {
  return (
    <div className="min-h-screen bg-grey-800 px-4 pt-[60px]">
      <div className="mx-auto max-w-[1312px]">
        <Nav />
        <Main />
      </div>
    </div>
  );
}
