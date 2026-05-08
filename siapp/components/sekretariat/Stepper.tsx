"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 0 = not started, 1 = step 1 done, 2 = step 2 done, 3 = all done
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-start gap-0", className)}>
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isDone = currentStep >= stepNum;
        const isActive = currentStep === idx;
        const isLast = idx === steps.length - 1;

        return (
          <div key={idx} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all",
                  isDone
                    ? "bg-emerald-500 border-emerald-400 text-white"
                    : isActive
                    ? "bg-ugm-gold/20 border-ugm-gold text-ugm-gold"
                    : "bg-white/5 border-white/20 text-white/30"
                )}
              >
                {isDone ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-xs font-semibold whitespace-nowrap",
                    isDone ? "text-emerald-400" : isActive ? "text-ugm-gold" : "text-white/30"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-white/30 mt-0.5">{step.description}</p>
                )}
              </div>
            </div>

            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-3 mb-7 transition-all",
                  isDone && currentStep > stepNum
                    ? "bg-emerald-500"
                    : isDone
                    ? "bg-emerald-500/50"
                    : "bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
