"use client";

import { useState } from "react";
import { Letter, LetterStatus, ApprovalStep } from "@/lib/seed";
import { formatDate } from "@/lib/utils";
import { X, Stamp, Send, CheckCircle2, XCircle, ClipboardCheck, PenTool, Archive } from "lucide-react";
import { Badge } from "@/components/sekretariat/Badge";
import { Stepper } from "@/components/sekretariat/Stepper";
import { Button } from "@/components/sekretariat/Button";
import { MockPrivyModal } from "@/components/sekretariat/MockPrivyModal";
import {
  getWorkflow,
  transition,
  WorkflowInstance,
  WorkflowStatus,
  STATUS_TO_STEP,
} from "@/lib/mock-workflow";
import { mockSendWhatsApp, mockSendEmail } from "@/lib/mock-notifications";

interface LetterPreviewProps {
  letter: Letter;
  onClose: () => void;
  onUpdate?: (updated: Letter) => void;
}

const APPROVAL_STEPS = [
  { label: "Dikirim",    description: "Pengajuan" },
  { label: "Review",     description: "Sekdep" },
  { label: "TTD Kadep",  description: "Tanda Tangan" },
  { label: "Diarsipkan", description: "Selesai" },
];

function wfStatusToLetterStatus(s: WorkflowStatus): LetterStatus {
  if (s === "DRAFT")                          return "Draft";
  if (s === "SIGNED")                         return "Ditandatangani";
  if (s === "SENT")                           return "Diarsipkan";
  return "Menunggu";
}

export function LetterPreview({ letter, onClose, onUpdate }: LetterPreviewProps) {
  const [wf, setWf] = useState<WorkflowInstance | null>(
    letter.workflowInstanceId ? getWorkflow(letter.workflowInstanceId) : null
  );
  const [showPrivyModal, setShowPrivyModal] = useState(false);

  const stepperStep = wf
    ? Math.min(STATUS_TO_STEP[wf.currentStatus], 4)
    : Math.min(letter.approvalStep, 4);

  const currentStatus = wf?.currentStatus ?? null;

  function applyTransition(action: string, actor: string) {
    if (!wf) return;
    const updated = transition(wf.id, action, actor);
    setWf(updated);

    const newLetterStatus = wfStatusToLetterStatus(updated.currentStatus);
    const newStep = Math.min(STATUS_TO_STEP[updated.currentStatus], 4) as ApprovalStep;
    const now = new Date();
    const timeStr = `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;

    const actionLabels: Record<string, string> = {
      submit:  "Dikirim ke Sekdep untuk Review",
      review:  "Diteruskan ke Kepala Departemen",
      approve: "Disetujui oleh Kadep",
      reject:  "Ditolak — perlu revisi",
      sign:    "Ditandatangani secara elektronik (PrivyID)",
      send:    "Diarsipkan & Dikirimkan",
    };

    const updatedLetter: Letter = {
      ...letter,
      status: newLetterStatus,
      approvalStep: newStep,
      workflowInstanceId: wf.id,
      auditLog: [
        ...letter.auditLog,
        { aksi: actionLabels[action] ?? action, oleh: actor, waktu: timeStr },
      ],
    };
    onUpdate?.(updatedLetter);
  }

  function handleSubmit() {
    applyTransition("submit", "Sekretariat");
    mockSendWhatsApp("Kadep", "Surat baru menunggu persetujuan Anda di SIAPP.");
    mockSendEmail("kadep@ugm.ac.id", "[SIAPP] Surat Baru Menunggu Persetujuan");
  }

  function handleReview() {
    applyTransition("review", "Sekdep");
  }

  function handleApprove() {
    applyTransition("approve", "Kadep");
    mockSendWhatsApp("Sekretariat", "Surat Anda telah disetujui dan siap ditandatangani.");
    mockSendEmail("sekretariat@ugm.ac.id", "[SIAPP] Surat Disetujui");
  }

  function handleReject() {
    applyTransition("reject", "Kadep");
    mockSendWhatsApp("Sekretariat", "Surat Anda ditolak. Silakan cek catatan di SIAPP.");
    mockSendEmail("sekretariat@ugm.ac.id", "[SIAPP] Surat Ditolak — Perlu Revisi");
  }

  function handleSend() {
    applyTransition("send", "Sekretariat");
  }

  function handlePrivySigned() {
    if (!wf) return;
    applyTransition("sign", "Kadep (PrivyID)");
    mockSendWhatsApp("Sekretariat", "Surat telah ditandatangani secara elektronik via PrivyID.");
    mockSendEmail("sekretariat@ugm.ac.id", "[SIAPP] Surat Telah Ditandatangani");
    setShowPrivyModal(false);
  }

  const displayStatus = wf ? wfStatusToLetterStatus(wf.currentStatus) : letter.status;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="glass rounded-2xl border border-white/14 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <p className="font-semibold text-white">{letter.nomor || "Draft"}</p>
              <Badge>{displayStatus}</Badge>
              {currentStatus && (
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/40 font-mono">
                  {currentStatus}
                </span>
              )}
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
              <div className="px-6 py-4 border-b border-white/10 space-y-4">
                <div>
                  <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wide">Alur Persetujuan</p>
                  <Stepper steps={APPROVAL_STEPS} currentStep={stepperStep} />
                </div>

                {/* Workflow action buttons */}
                {wf && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentStatus === "DRAFT" && (
                      <Button size="sm" variant="primary" onClick={handleSubmit} className="gap-1.5">
                        <Send className="w-3.5 h-3.5" />
                        Kirim ke Persetujuan
                      </Button>
                    )}
                    {currentStatus === "SUBMITTED" && (
                      <>
                        <Button size="sm" variant="outline" onClick={handleReview} className="gap-1.5">
                          <ClipboardCheck className="w-3.5 h-3.5" />
                          Teruskan ke Kadep
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleApprove} className="gap-1.5 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Setujui
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleReject} className="gap-1.5 text-red-400 hover:bg-red-500/10">
                          <XCircle className="w-3.5 h-3.5" />
                          Tolak
                        </Button>
                      </>
                    )}
                    {currentStatus === "REVIEW" && (
                      <>
                        <Button size="sm" variant="outline" onClick={handleApprove} className="gap-1.5 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Setujui
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleReject} className="gap-1.5 text-red-400 hover:bg-red-500/10">
                          <XCircle className="w-3.5 h-3.5" />
                          Tolak
                        </Button>
                      </>
                    )}
                    {currentStatus === "APPROVED" && (
                      <Button size="sm" variant="primary" onClick={() => setShowPrivyModal(true)} className="gap-1.5">
                        <PenTool className="w-3.5 h-3.5" />
                        Minta Tanda Tangan
                      </Button>
                    )}
                    {currentStatus === "SIGNED" && (
                      <Button size="sm" variant="outline" onClick={handleSend} className="gap-1.5">
                        <Archive className="w-3.5 h-3.5" />
                        Arsipkan & Kirimkan
                      </Button>
                    )}
                    {currentStatus === "REJECTED" && (
                      <Button size="sm" variant="outline" onClick={handleSubmit} className="gap-1.5">
                        <Send className="w-3.5 h-3.5" />
                        Ajukan Ulang
                      </Button>
                    )}
                    {currentStatus === "SENT" && (
                      <span className="text-xs text-emerald-400/70 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Surat selesai diproses
                      </span>
                    )}
                  </div>
                )}
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
                      <span className="font-medium text-gray-700">: {letter.nomor || "—"}</span>
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
                    <span className="text-gray-300 italic">[Isi surat belum tersedia]</span>
                  )}
                </div>

                {/* Signature section */}
                <div className="flex justify-end mt-6">
                  <div className="text-center min-w-[200px] relative">
                    <p className="text-xs text-gray-500">Yogyakarta, {formatDate(letter.tanggal)}</p>
                    <p className="text-xs text-gray-500 mb-12">{letter.pengirim}</p>

                    {(displayStatus === "Ditandatangani" || displayStatus === "Diarsipkan") && (
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
                      Dr. Anak Agung Gde Ngurah Ari Dwipayana, S.IP., M.Si.
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

      {showPrivyModal && (
        <MockPrivyModal
          letterTitle={letter.perihal}
          onSigned={handlePrivySigned}
          onClose={() => setShowPrivyModal(false)}
        />
      )}
    </>
  );
}
