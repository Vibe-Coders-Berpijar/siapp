"use client";

import { Letter } from "@/lib/seed";
import { formatDate } from "@/lib/utils";
import { X, Stamp } from "lucide-react";
import { Badge } from "@/components/sekretariat/Badge";
import { Stepper } from "@/components/sekretariat/Stepper";

interface LetterPreviewProps {
  letter: Letter;
  onClose: () => void;
}

const APPROVAL_STEPS = [
  { label: "Dikirim",    description: "Pengajuan" },
  { label: "Review",     description: "Sekdep" },
  { label: "TTD Kadep",  description: "Tanda Tangan" },
  { label: "Diarsipkan", description: "Selesai" },
];

export function LetterPreview({ letter, onClose }: LetterPreviewProps) {
  const stepperStep = Math.min(letter.approvalStep, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass rounded-2xl border border-white/14 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <p className="font-semibold text-white">{letter.nomor}</p>
            <Badge>{letter.status}</Badge>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* Approval Stepper — only for outgoing letters */}
          {letter.direction === "keluar" && (
            <div className="px-6 py-4 border-b border-white/10">
              <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wide">Alur Persetujuan</p>
              <Stepper steps={APPROVAL_STEPS} currentStep={stepperStep} />
            </div>
          )}

          {/* PDF-style document */}
          <div className="p-6">
            <div className="bg-white rounded-xl p-8 shadow-2xl text-gray-800 font-serif text-sm leading-relaxed max-w-2xl mx-auto">
              {/* Letterhead */}
              <div className="text-center border-b-2 border-ugm-blue pb-4 mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-ugm-blue flex items-center justify-center text-white font-bold text-lg">UGM</div>
                  <div className="text-left">
                    <p className="font-bold text-ugm-blue text-base leading-tight">UNIVERSITAS GADJAH MADA</p>
                    <p className="text-xs text-gray-500">Departemen Pendidikan Profesi (DPP)</p>
                    <p className="text-xs text-gray-400">Jl. Sosio Humaniora No. 1, Bulaksumur, Yogyakarta 55281</p>
                  </div>
                </div>
              </div>

              {/* Letter meta */}
              <div className="mb-4 text-xs text-gray-500 space-y-1">
                <div className="flex gap-8">
                  <div>
                    <span className="text-gray-400">Nomor </span>
                    <span className="font-medium text-gray-700">: {letter.nomor}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Tanggal</span>
                    <span className="font-medium text-gray-700">: {formatDate(letter.tanggal)}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Perihal</span>
                  <span className="font-medium text-gray-700 ml-3">: {letter.perihal}</span>
                </div>
                {letter.direction === "keluar" ? (
                  <div>
                    <span className="text-gray-400">Kepada Yth.</span>
                    <span className="font-medium text-gray-700 ml-4">{letter.tujuan}</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-gray-400">Dari</span>
                    <span className="font-medium text-gray-700 ml-10">{letter.pengirim}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 my-4" />

              {/* Letter body */}
              <div className="whitespace-pre-line text-gray-700 mb-8 min-h-[80px]">
                {letter.isi || (
                  <span className="text-gray-300 italic">
                    [Isi surat belum tersedia]
                  </span>
                )}
              </div>

              {/* Signature section */}
              <div className="flex justify-end mt-6">
                <div className="text-center min-w-[200px] relative">
                  <p className="text-xs text-gray-500">Yogyakarta, {formatDate(letter.tanggal)}</p>
                  <p className="text-xs text-gray-500 mb-12">{letter.pengirim}</p>

                  {(letter.status === "Ditandatangani" || letter.status === "Diarsipkan") && (
                    <div className="absolute inset-x-0 top-6 flex items-center justify-center pointer-events-none">
                      <div className="relative w-28 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-ugm-blue/40 rotate-[-8deg] opacity-70" />
                        <div className="absolute inset-2 rounded-full border-2 border-ugm-blue/25 rotate-[-8deg] opacity-60" />
                        <div className="flex flex-col items-center z-10 rotate-[-8deg]">
                          <Stamp className="w-5 h-5 text-ugm-blue/60" />
                          <p className="text-[7px] font-bold text-ugm-blue/70 uppercase tracking-widest mt-0.5">Ditandatangani</p>
                          <p className="text-[7px] text-ugm-blue/50">DPP UGM</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-xs font-bold text-gray-700 border-t border-gray-200 pt-1">
                    Prof. Dr. Sari Indah, M.P.
                  </p>
                  <p className="text-[10px] text-gray-500">Kepala Departemen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Audit trail */}
          <div className="px-6 pb-6">
            <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Jejak Audit</p>
            <div className="space-y-1.5">
              {letter.auditLog.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-ugm-gold/60 mt-1.5 flex-shrink-0" />
                  <span className="text-white/30 w-32 flex-shrink-0">{entry.waktu}</span>
                  <span className="text-white/70 font-medium">{entry.aksi}</span>
                  <span className="text-white/40">— {entry.oleh}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
