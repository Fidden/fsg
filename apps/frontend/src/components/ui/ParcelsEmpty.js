import BarcodeBoxIcon from '../icons/BarcodeBoxIcon';
import React from 'react';
import AddParcel from '../AddParcel';

export default function LoadError({ children, button }) {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="h-96 flex gap-4 justify-center items-center flex-col rounded-xl border-1 border-primary-8">
      <div className="flex flex-col items-center gap-3">
        <div className="svg_32">
          <BarcodeBoxIcon />
        </div>

        <h2 className="text-primary-100 font-medium text-lg">{children}</h2>
      </div>
      <AddParcel>{button}</AddParcel>
    </div>
  );
}
