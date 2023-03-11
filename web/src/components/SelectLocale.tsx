import { useRouter } from 'next/router';
import { styled } from '@/styles/stitches.config';

const Select = styled('select', {
  px: '$2',
  py: '$1',
  borderRadius: '$md',
});

export function SelectLocale() {
  const router = useRouter();
  const { pathname, query, asPath, locale, locales } = router;

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({ pathname, query }, asPath, { locale: e.currentTarget.value });
  };

  return (
    <Select onChange={handleLocaleChange} defaultValue={locale}>
      {locales?.map((locale) => {
        return <option key={locale}>{locale}</option>;
      })}
    </Select>
  );
}
