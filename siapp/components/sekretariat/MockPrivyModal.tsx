"use client";

import { useState } from "react";
import { X, ShieldCheck, Clock, Send } from "lucide-react";
import { Button } from "@/components/sekretariat/Button";

interface MockPrivyModalProps {
  letterTitle: string;
  onSigned: () => void;
  onClose: () => void;
}

type Step = "idle" | "sending" | "waiting" | "signed";

export function MockPrivyModal({ letterTitle, onSigned, onClose }: MockPrivyModalProps) {
  const [step, setStep] = useState<Step>("idle");

  const handleRequestSign = () => {
    setStep("sending");
    setTimeout(() => setStep("waiting"), 1500);
    setTimeout(() => {
      setStep("signed");
      onSigned();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass rounded-2xl border border-white/14 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Tanda Tangan Elektronik</p>
              <p className="text-xs text-white/40">PrivyID · Tersertifikasi BSrE</p>
            </div>
          </div>
          {step !== "sending" && step !== "waiting" && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-6 space-y-5">
          {/* Document info */}
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[10px] text-white/30 uppercase tracking-wide mb-1">Dokumen</p>
            <p className="text-sm text-white/80 font-medium line-clamp-2">{letterTitle}</p>
          </div>

          {/* State machine */}
          {step === "idle" && (
            <div className="space-y-4">
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-[10px] font-bold text-blue-400">1</div>
                  <span>Dokumen dikirim ke PrivyID</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white/30">2</div>
                  <span className="text-white/30">Kadep menerima notifikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white/30">3</div>
                  <span className="text-white/30">Dokumen ditandatangani secara digital</span>
                </div>
              </div>
              <Button variant="primary" onClick={handleRequestSign} className="w-full justify-center gap-2">
                <Send className="w-4 h-4" />
                Kirim Permintaan Tanda Tangan
              </Button>
            </div>
          )}

          {step === "sending" && (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto">
                <Send className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <p className="text-sm text-white/70 animate-pulse">Mengirim dokumen ke PrivyID...</p>
              <p className="text-xs text-white/30">Mohon tunggu sebentar</p>
            </div>
          )}

          {step === "waiting" && (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <p className="text-sm text-white/70 animate-pulse">Menunggu tanda tangan dari Kadep...</p>
              <p className="text-xs text-white/30">Notifikasi WA & email telah dikirim ke Kadep</p>
            </div>
          )}

          {step === "signed" && (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-400">Dokumen berhasil ditandatangani!</p>
                <p className="text-xs text-white/30 mt-1">
                  Signed via PrivyID · {new Date().toLocaleString("id-ID")}
                </p>
              </div>
              <Button variant="primary" onClick={onClose} className="w-full justify-center">
                Tutup
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
