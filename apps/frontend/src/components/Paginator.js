import Page from '@/components/ui/Page';
import ArrowBigRightIcon from '@/components/icons/ArrowBigRightIcon';
import ArrowBigLeftIcon from "@/components/icons/ArrowBigLeftIcon";

export default function Paginator({meta, onPageChange}) {
    if (meta.links?.length <= 3)
        return null;

    const links = meta.links;

    const calcLabel = (label) => {
        if (label === '_prev')
            return <div className="svg_16 svg_c_60"><ArrowBigLeftIcon/></div>;
        else if (label === '_next')
            return <div className="svg_16 svg_c_60"><ArrowBigRightIcon/></div>
        else
            return label;
    }

    const urlToPage = (url) => {
        return url.split('?page=')?.at(1)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-full pt-8 gap-1 flex items-center justify-center">
                {links.map(item =>
                    <Page
                        active={item.active}
                        onClick={() => onPageChange(urlToPage(item.url))}
                        key={item.label}
                    >
                        {calcLabel(item.label)}
                    </Page>
                )}
            </div>
            <p className="text-sm text-primary-60">Страница {meta.current_page} из {meta.last_page}</p>
        </div>
    );
}
