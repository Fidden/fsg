import Empty from '../icons/Empty';

export default function DataEmpty({children}) {
    return (
        <div className="h-96 flex gap-3 justify-center items-center flex-col rounded-xl border-1 border-primary-8">
            <div className="svg_32">
                <Empty/>
            </div>
            <h2 className="text-primary-100 font-medium text-lg">{children}</h2>
        </div>
    );
}
