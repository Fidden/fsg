import Page from '@/components/ui/Page';
import ArrowBigRightIcon from '@/components/icons/ArrowBigRightIcon';
import ArrowBigLeftIcon from '@/components/icons/ArrowBigLeftIcon';

export default function Paginator() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-full pt-8 gap-1 flex items-center justify-center">
        <Page>
          <div className="svg_16 svg_c_60">
            <ArrowBigLeftIcon />
          </div>
        </Page>
        <Page>1</Page>
        <Page>2</Page>
        <Page>3</Page>
        <Page href="">...</Page>
        <Page>8</Page>
        <Page>9</Page>
        <Page>10</Page>
        <Page>
          <div className="svg_16 svg_c_60">
            <ArrowBigRightIcon />
          </div>
        </Page>
      </div>
      <p className="text-sm text-primary-60">Страница 1 из 10 из 97 рейсов</p>
    </div>
  );
}
