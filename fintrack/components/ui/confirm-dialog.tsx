"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

type ConfirmHandlerResult = void | boolean | Promise<void | boolean>;
type AlignOption = "left" | "center";

function isPromise<T>(value: unknown): value is Promise<T> {
  return !!value && typeof (value as Promise<T>).then === "function";
}

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  confirmVariant?: ButtonVariant;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  confirmLoadingLabel?: React.ReactNode;
  onConfirm?: (inputValue?: string) => ConfirmHandlerResult;
  confirmToForm?: string;
  preventCloseOnConfirm?: boolean;
  cancelLabel?: React.ReactNode;
  cancelVariant?: ButtonVariant;
  hideCancel?: boolean;
  onCancel?: () => void;
  showCloseButton?: boolean;
  align?: AlignOption;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputRequired?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  icon,
  footer,
  confirmLabel = "Konfirmasi",
  confirmVariant = "default",
  confirmDisabled,
  confirmLoading,
  confirmLoadingLabel = "Memproses...",
  onConfirm,
  preventCloseOnConfirm,
  cancelLabel = "Batal",
  cancelVariant = "outline",
  hideCancel,
  onCancel,
  showCloseButton = true,
  align = "center",
  contentClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  showInput,
  inputPlaceholder,
  inputRequired,
  confirmToForm
}: ConfirmDialogProps) {
  const [internalLoading, setInternalLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const cancelTriggeredRef = React.useRef(false);
  const usingExternalLoading = typeof confirmLoading === "boolean";
  const isLoading = usingExternalLoading ? Boolean(confirmLoading) : internalLoading;

  React.useEffect(() => {
    if (!open) {
      if (internalLoading) setInternalLoading(false);
      setInputValue("");
    }
  }, [open, internalLoading]);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen && open && !cancelTriggeredRef.current) {
        onCancel?.();
      }
      if (!nextOpen) {
        cancelTriggeredRef.current = false;
        if (!usingExternalLoading) setInternalLoading(false);
      }
      onOpenChange(nextOpen);
    },
    [onCancel, onOpenChange, open, usingExternalLoading]
  );

  const handleCancel = React.useCallback(() => {
    if (isLoading) return;
    cancelTriggeredRef.current = true;
    onCancel?.();
    onOpenChange(false);
  }, [isLoading, onCancel, onOpenChange]);

  const handleConfirm = React.useCallback(async () => {
    if (isLoading) return;
    if (!onConfirm) {
      if (!preventCloseOnConfirm) onOpenChange(false);
      return;
    }

    let explicitClose: boolean | undefined;
    try {
      const result = showInput ? onConfirm(inputValue) : onConfirm();
      if (isPromise(result)) {
        if (!usingExternalLoading) setInternalLoading(true);
        const resolved = await result;
        if (typeof resolved === "boolean") explicitClose = resolved;
      } else if (typeof result === "boolean") {
        explicitClose = result;
      }
    } catch (error) {
      console.error("ConfirmDialog onConfirm error", error);
      explicitClose = false;
    } finally {
      if (!usingExternalLoading) setInternalLoading(false);
    }

    const shouldClose = explicitClose !== undefined ? explicitClose : !preventCloseOnConfirm;
    if (shouldClose) onOpenChange(false);
  }, [isLoading, onConfirm, preventCloseOnConfirm, onOpenChange, usingExternalLoading, inputValue, showInput]);

  const alignmentClass = align === "left" ? "text-left items-start" : "text-center items-center";

  const newLocal = "w-[92vw] max-h-[92vh] overflow-y-auto sm:max-w-sm mx-auto z-[1000]";
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        onCloseAutoFocus={() => handleOpenChange(false)}
        className={cn(newLocal, contentClassName)}
      >
        <DialogHeader
          className={cn(
            "flex flex-col gap-3",
            alignmentClass,
            align === "center" ? "sm:items-center sm:text-center" : "sm:items-start sm:text-left",
            headerClassName
          )}
        >
          {icon && (
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50",
                align === "left" ? "mx-0" : "mx-auto"
              )}
            >
              {icon}
            </div>
          )}
          <div>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription className="mt-1.5">{description}</DialogDescription>
            )}
          </div>
        </DialogHeader>

        {children && (
          <div className={cn("text-sm text-zinc-500", bodyClassName)}>{children}</div>
        )}

        {showInput && (
          <div className={cn("mt-2", bodyClassName)}>
            <Textarea
              placeholder={inputPlaceholder}
              className="resize-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        )}

        {footer ?? (
          <DialogFooter
            className={cn(
              "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
              footerClassName
            )}
          >
            {!hideCancel && (
              <Button
                type="button"
                variant={cancelVariant}
                onClick={handleCancel}
                disabled={isLoading || confirmDisabled}
                className="w-full sm:w-auto h-10"
              >
                {cancelLabel}
              </Button>
            )}
            <Button
              {...confirmToForm ? { form: confirmToForm, type: 'submit' } : { type: 'button' }}
              variant={confirmVariant}
              onClick={handleConfirm}
              className="w-full sm:w-auto h-10"
              disabled={isLoading || confirmDisabled || (showInput && inputRequired && !inputValue.trim())}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  {confirmLoadingLabel}
                </span>
              ) : (
                confirmLabel
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export type { ConfirmDialogProps };