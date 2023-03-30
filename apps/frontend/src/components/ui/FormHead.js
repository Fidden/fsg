import Image from 'next/image';

export default function FormHead({children}) {
    return (
        <div className="flex items-center text-center justify-center flex-col gap-4">
            <Image height="40" width="40" src="/logo.png" alt="Logo"/>
            {/*<Player className="w-10 h-10" autoplay loop mode="normal" src="/logo.json" />*/}
            <h2 className="font-medium text-xl text-primary-100 ">{children}</h2>
        </div>
    );
}
