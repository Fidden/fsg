import Sad from '../icons/Sad';
import React from 'react';

export default function LoadError({children}) {
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="h-96 flex gap-4 justify-center items-center flex-col rounded-xl border-1 border-primary-8">
            <div className="flex flex-col items-center gap-3">
                <div className="svg_32">
                    <Sad/>
                </div>
                <h2 className="text-primary-100 font-medium text-lg">{children}</h2>
            </div>
            <button
                className="text-md text-primary-100 h-10 bg-primary-4 px-4 rounded-xl font-medium mt-1 hover:bg-primary-8"
                onClick={refreshPage}>
                Повторить
            </button>
        </div>
    );
}
