'use client';

import { Download } from 'lucide-react';

export function PrintButton() {
  return (
    <div className="print:hidden max-w-[880px] mx-auto px-3.5 pt-6 pb-2 flex justify-end">
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-2 px-4 py-2 type-btn bg-[#131226] text-white rounded-pill hover:opacity-85 active:scale-[0.97] transition-all text-sm"
      >
        <Download size={14} aria-hidden="true" />
        Salvar como PDF
      </button>
    </div>
  );
}
