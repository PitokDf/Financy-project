"use client";

import {
  useForm,
  Control,
  FieldValues,
  Path,
  DefaultValues,
  ControllerRenderProps,
  useWatch,
  UseFormReturn,
  FieldError,
} from "react-hook-form";
import { useEffect, ReactNode, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { boolean, ZodType } from "zod";
import { AxiosError } from "axios";
import { DropzoneOptions } from "react-dropzone";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectOption } from "./select-option";
import { PasswordInput } from "./password-input";
import InputCurrency from "./input-currency";
import { DatePicker } from "./date-picker";
import { DateTimePicker } from "./datetime-picker";
import { cn } from "@/lib/utils";
import { ZodTypeDef } from "zod/v3";
import { SegmentedControl, SegmentedControlOption } from "./segment-controll";
import { FilterChipOption, FilterChips } from "./filter-chip";

const COL_SPAN_CLASS = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  12: "md:col-span-12",
  full: "md:col-span-full",
} as const;

const GRID_COLS_CLASS = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
} as const;

type ColSpan = keyof typeof COL_SPAN_CLASS;
type GridCols = keyof typeof GRID_COLS_CLASS;

interface ApiErrorItem {
  path: string;
  message: string;
}

interface ApiErrorResponse {
  errors?: ApiErrorItem[];
  message?: string;
}

function objectToFormData(
  obj: Record<string, unknown>,
  form: FormData = new FormData(),
  namespace?: string,
): FormData {
  for (const [property, value] of Object.entries(obj)) {
    const key = namespace ? `${namespace}[${property}]` : property;

    if (value == null) continue;

    if (value instanceof Date) {
      form.append(key, value.toISOString());
    } else if (value instanceof File) {
      form.append(key, value);
    } else if (Array.isArray(value)) {
      for (const item of value) form.append(`${key}[]`, String(item));
    } else if (typeof value === "object") {
      objectToFormData(value as Record<string, unknown>, form, key);
    } else {
      form.append(key, String(value));
    }
  }

  return form;
}

function applyApiErrors<T extends FieldValues>(error: unknown, form: UseFormReturn<T>): boolean {
  // if (!(error instanceof AxiosError)) return false;

  const apiErrors: unknown = (error as ApiErrorResponse).errors;

  if (!Array.isArray(apiErrors)) return false;

  for (const e of apiErrors as Partial<ApiErrorItem>[]) {
    if (e.path && e.message) {
      form.setError(e.path as Path<T>, { type: "server", message: e.message });
    }
  }

  return true;
}

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "file"
  | "date"
  | "number"
  | "select"
  | "textarea"
  | "currency"
  | "custom"
  | "tel"
  | "toggle"
  | "segmented-control"
  | "chips"
  | "datetime-local";

type PlaceholderFn<T extends FieldValues> = (values: Partial<T>) => string;
type PlaceholderResolver<T extends FieldValues> = string | PlaceholderFn<T>;

type CustomRenderInput<T extends FieldValues> = (props: {
  field: ControllerRenderProps<T, Path<T>>;
}) => ReactNode;

interface BaseFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: PlaceholderResolver<T>;
  description?: string;
  disabled?: boolean;
  className?: string;
  autoComplete?: 'off' | 'on' | 'new-password' | 'current-password' | 'email' | 'tel' | 'url' | 'search' | 'username' | 'name' | 'address' | 'country' | 'city' | 'state' | 'zip' | 'postal-code' | 'street-address' | 'home' | 'work' | 'mobile' | 'fax' | 'pager' | 'other';
  autoFocus?: boolean;
  valueToUpperCase?: boolean;
  colSpan?: ColSpan;
  icon?: React.ComponentType<{ className?: string }>;
  condition?: (values: Partial<T>) => boolean;
  typeResolver?: (values: Partial<T>) => FieldType;
}

interface TextFieldConfig<T extends FieldValues> extends BaseFieldConfig<T> {
  type?: Exclude<FieldType, "select" | "toggle" | "file" | "custom">;
}

interface SelectFieldConfig<T extends FieldValues> extends BaseFieldConfig<T> {
  type: "select";
  options: { label: string; value: string }[];
}

interface SegementedControllFieldConfig<T extends FieldValues> extends Omit<BaseFieldConfig<T>, 'label'> {
  type: "segmented-control";
  options: SegmentedControlOption[];
  activeBgClass?: string;
  inactiveBgClass?: string;
  activeTextClass?: string;
  inactiveTextClass?: string;
}

interface ChipControllFieldConfig<T extends FieldValues> extends BaseFieldConfig<T> {
  type: "chips";
  options: FilterChipOption[];
}

interface ToggleFieldConfig<T extends FieldValues> extends BaseFieldConfig<T> {
  type: "toggle";
  options: { label: string; value: string; disabled?: boolean }[];
}

interface FileFieldConfig<T extends FieldValues> extends BaseFieldConfig<T> {
  type: "file";
  accept?: DropzoneOptions["accept"];
  maxSize?: number;
}

interface CustomFieldConfig<T extends FieldValues>
  extends Omit<BaseFieldConfig<T>, "name" | "label"> {
  type: "custom";
  name?: Path<T>;
  label?: string;
  renderCustom: CustomRenderInput<T>;
}

export type FormFieldConfig<T extends FieldValues> =
  | SelectFieldConfig<T>
  | SegementedControllFieldConfig<T>
  | ChipControllFieldConfig<T>
  | CustomFieldConfig<T>
  | ToggleFieldConfig<T>
  | FileFieldConfig<T>
  | CustomFieldConfig<T>
  | TextFieldConfig<T>;

interface DialogProps {
  withDialog: true;
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  dialogTitle?: ReactNode;
  dialogDescription?: ReactNode;
  showDialogCloseButton?: boolean;
  cancelText?: string;
  resetFormOnClose?: boolean;
  preventClose?: boolean;
  confirmClose?: boolean;
  confirmCloseMessage?: string;
}

interface NoDialogProps {
  withDialog?: false;
}

type AnyForm<T extends FieldValues> = UseFormReturn<T>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySchema<T extends FieldValues> = ZodType<T, ZodTypeDef, any>;

interface SharedFormProps<T extends FieldValues> {
  form?: AnyForm<T>;
  schema: AnySchema<T>;
  defaultValues?: DefaultValues<T>;
  fields: FormFieldConfig<T>[];

  submitIcon?: React.ComponentType<{ className?: string }>;
  loadingIcon?: React.ComponentType<{ className?: string }>;
  submitText?: string;
  loadingText?: string;
  isLoading?: boolean;
  submitDisabled?: boolean;
  gridCols?: GridCols;
  children?: ReactNode;
  renderFooter?: ReactNode;
  onValuesChange?: (values: Partial<T>) => void;
  hideSubmitButton?: boolean;
  id?: string;
  className?: string;
}

interface WithFormDataProps<T extends FieldValues> extends SharedFormProps<T> {
  useFormData: true;
  onSubmit: (values: FormData) => void | Promise<void>;
}

interface WithoutFormDataProps<T extends FieldValues> extends SharedFormProps<T> {
  useFormData?: false;
  onSubmit: (values: NoInfer<T>) => void | Promise<void>;
}

type BaseFormProps<T extends FieldValues> = WithFormDataProps<T> | WithoutFormDataProps<T>;

export type ReusableFormProps<T extends FieldValues> = BaseFormProps<T> & (DialogProps | NoDialogProps);

export function ReusableForm<T extends FieldValues>({
  form: externalForm,
  schema,
  defaultValues,
  onSubmit,
  fields,
  loadingIcon,
  submitText = "Submit",
  submitIcon,
  loadingText = "Submitting...",
  isLoading = false,
  submitDisabled = false,
  gridCols = 1,
  children,
  renderFooter,
  onValuesChange,
  hideSubmitButton = false,
  id,
  className,
  ...rest
}: ReusableFormProps<T>) {
  const isDialog = rest.withDialog === true;
  const dialogProps = isDialog ? (rest as unknown as DialogProps) : null;
  const useFormData = "useFormData" in rest && rest.useFormData === true;

  const [submitting, setSubmitting] = useState(false);
  const wasOpenRef = useRef(false);

  const internalForm = useForm<T, undefined, T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const form: AnyForm<T> = externalForm ?? internalForm;

  // Reset form when dialog re-opens
  useEffect(() => {
    if (!dialogProps) return;
    if (dialogProps.isDialogOpen && !wasOpenRef.current) {
      form.reset(defaultValues);
    }
    wasOpenRef.current = dialogProps.isDialogOpen;
  }, [dialogProps?.isDialogOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Notify parent of value changes
  const watchedValues = useWatch({ control: form.control });
  useEffect(() => {
    onValuesChange?.(watchedValues);
  }, [watchedValues, onValuesChange]);

  const canClose = (): boolean => {
    if (!dialogProps) return true;
    if (dialogProps.preventClose) return false;
    if ((dialogProps.confirmClose ?? true) && form.formState.isDirty) {
      const message = dialogProps.confirmCloseMessage ?? "Perubahan belum disimpan. Tutup form?";
      return typeof window !== "undefined" && window.confirm(message);
    }
    return true;
  };

  const handleClose = () => {
    if (!canClose() || !dialogProps) return;
    dialogProps.onDialogOpenChange(false);
    if (dialogProps.resetFormOnClose ?? true) {
      form.reset(defaultValues);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (open) dialogProps?.onDialogOpenChange(true);
    else handleClose();
  };

  const handleFormSubmit = async (values: T) => {
    form.clearErrors("root");
    setSubmitting(true);

    try {
      const hasFileField = fields.some((f) => f.type === "file");

      if (useFormData || hasFileField) {
        const formData = objectToFormData(values as Record<string, unknown>);
        await (onSubmit as (v: FormData) => void | Promise<void>)(formData);
      } else {
        await (onSubmit as (v: T) => void | Promise<void>)(values);
      }
    } catch (error) {
      const handled = applyApiErrors(error, form);
      console.log(handled)
      if (!handled) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        form.setError("root", {
          type: "server",
          message: axiosError?.message ?? "Terjadi kesalahan pada server",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const busy = isLoading || submitting;

  const gridClass = GRID_COLS_CLASS[gridCols] ?? "md:grid-cols-1";

  const fieldGrid = children ?? (
    <div className={`grid grid-cols-1 gap-4 ${gridClass}`}>
      {fields.map((field, index) => ({ ...field, _id: field.name ?? `field_${index}` })).map((fieldConfig) => {
        if (fieldConfig.condition && !fieldConfig.condition(watchedValues)) return null;

        return (
          <RenderField
            key={fieldConfig.name || fieldConfig._id}
            field={fieldConfig}
            control={form.control}
            values={watchedValues}
          />
        );
      })}
    </div>
  );

  const footer = (() => {
    if (hideSubmitButton) return null;
    if (renderFooter !== undefined) return renderFooter;

    const SubmitIcon = submitIcon;
    const LoadingIcon = loadingIcon;

    if (dialogProps) {
      return (
        <DialogFooter className="flex-row sm:flex-row gap-3 sm:gap-2">
          <Button className="h-12 flex-1 sm:w-auto" type="button" variant="outline" onClick={handleClose} disabled={busy}>
            {dialogProps.cancelText ?? "Batal"}
          </Button>
          <Button className="h-12 flex-1 sm:w-auto" type="submit" disabled={busy || submitDisabled}>
            {busy ? (
              <span className="flex items-center gap-2">
                {LoadingIcon && <LoadingIcon className="w-4 h-4" />}
                {loadingText}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {submitText}
                {SubmitIcon && <SubmitIcon className="w-4 h-4" />}
              </span>
            )}
          </Button>
        </DialogFooter>
      );
    }

    return (
      <Button type="submit" disabled={busy || submitDisabled} className="h-12 w-full">
        {busy ? (
          <span className="flex items-center gap-2">
            {LoadingIcon && <LoadingIcon className="w-4 h-4" />}
            {loadingText}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {submitText}
            {SubmitIcon && <SubmitIcon className="w-4 h-4" />}
          </span>
        )}
      </Button>
    );
  })();

  const formContent = (
    <form id={id} onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
      {form.formState.errors.root && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      )}
      {fieldGrid}
      {footer}
    </form>
  );

  if (dialogProps) {
    return (
      <Dialog open={dialogProps.isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent
          showCloseButton={dialogProps.showDialogCloseButton}
          className={cn(
            "h-dvh w-full max-w-full md:min-w-150 md:h-auto rounded-none md:rounded-2xl md:max-h-[90dvh] overflow-hidden flex flex-col p-0 gap-0",
            className,
          )}
        >
          <DialogHeader className="px-4 py-5 md:px-6 md:py-6 border-b shrink-0 bg-background z-10 text-left">
            <DialogTitle>{dialogProps.dialogTitle}</DialogTitle>
            {dialogProps.dialogDescription && (
              <DialogDescription className="leading-relaxed mt-1.5">
                {dialogProps.dialogDescription}
              </DialogDescription>
            )}
          </DialogHeader>

          <Form {...form}>
            <form id={id} onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col flex-1 overflow-hidden">
              {/* Area Form yang bisa di-scroll */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {form.formState.errors.root && (
                  <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}
                {fieldGrid}
              </div>

              {/* Sticky Footer */}
              <div className="px-4 pb-4 pt-0 md:px-6 md:py-5 border-t shrink-0 bg-background mt-auto">
                {footer}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return <Form {...form}>{formContent}</Form>;
}

function RenderField<T extends FieldValues>({
  field,
  control,
  values,
}: {
  field: FormFieldConfig<T>;
  control: Control<T>;
  values: Partial<T>;
}) {
  const resolvedType = field.typeResolver?.(values) ?? field.type;
  const colSpanClass = field.colSpan ? COL_SPAN_CLASS[field.colSpan] : undefined;

  if (field.type === "custom") {
    return (
      <div className={cn("col-span-1", colSpanClass)}>
        {field.label && <FormLabel>{field.label}</FormLabel>}

        <FieldInputSwitch
          field={field}
          values={values}
        />

        {field.description && <FormDescription>{field.description}</FormDescription>}
      </div>
    );
  }

  return (
    <FormField<T, Path<T>>
      control={control}
      name={field.name}
      render={({ field: formField, fieldState }) => (
        <FormItem className={cn("col-span-1", colSpanClass)}>
          {field.type !== 'segmented-control' && <FormLabel htmlFor={field.name}>{field.label}</FormLabel>}

          <FormControl>
            <FieldInputSwitch
              field={{ ...field, type: resolvedType } as FormFieldConfig<T>}
              formField={formField}
              values={values}
              error={fieldState.error}
            />
          </FormControl>
          {field.description && <FormDescription>{field.description}</FormDescription>}
          <FormMessage className="text-sm" />
        </FormItem>
      )}
    />
  );
}

function resolvePlaceholder<T extends FieldValues>(
  placeholder: PlaceholderResolver<T> | undefined,
  values: Partial<T>,
): string | undefined {
  return typeof placeholder === "function" ? placeholder(values) : placeholder;
}

interface BaseFieldInputSwitch<T extends FieldValues> {
  field: FormFieldConfig<T>;
  formField: ControllerRenderProps<T, Path<T>>;
  values: Partial<T>;
  error?: FieldError
}

interface CustomFieldInputSwitch<T extends FieldValues>
  extends Omit<BaseFieldInputSwitch<T>, 'formField'> {
  formField?: ControllerRenderProps<T, Path<T>>
  field: FormFieldConfig<T>;
  values: Partial<T>;
  error?: FieldError
}

type FieldInputSwitchProps<T extends FieldValues> =
  | BaseFieldInputSwitch<T>
  | CustomFieldInputSwitch<T>;

function FieldInputSwitch<T extends FieldValues>({
  field,
  formField,
  values,
  error
}: FieldInputSwitchProps<T>) {
  if (field.type === 'custom') {
    const { renderCustom } = field as CustomFieldConfig<T>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <>{renderCustom?.({ field: formField as any })}</>;
  }

  if (!formField) {
    return null;
  }

  const placeholder = resolvePlaceholder(field.placeholder, values);
  const Icon = field.icon;
  const iconClass = Icon ? "pl-9" : "";
  const errorClass = error ? "border-destructive focus-visible:ring-destructive" : "";
  const baseClass = `h-12 rounded-xl text-sm ${field.className ?? ""}`;

  const withIcon = (input: ReactNode) =>
    Icon ? (
      <div className="relative">
        <Icon className="absolute left-3 top-3.5 h-4.5 w-4 text-muted-foreground" />
        {input}
      </div>
    ) : (
      <>{input}</>
    );

  switch (field.type) {
    case "select":
      return withIcon(
        <SelectOption
          {...formField}
          id={formField.name}
          onValueChange={formField.onChange}
          disabled={field.disabled}
          options={(field as SelectFieldConfig<T>).options}
          value={formField.value as string}
          placeholder={placeholder}
          className={cn(iconClass, baseClass, errorClass)}
        />,
      );

    case "chips":
      return withIcon(
        <FilterChips
          {...formField}
          id={formField.name}
          onValueChange={formField.onChange}
          options={(field as ChipControllFieldConfig<T>).options}
          value={formField.value as string}
        />,
      );

    case "segmented-control":
      return withIcon(
        <SegmentedControl
          {...formField}
          id={formField.name}
          onValueChange={formField.onChange}
          options={(field as SegementedControllFieldConfig<T>).options}
          value={formField.value as string}
          className={cn(iconClass, baseClass, errorClass)}
          activeBgClass={(field as SegementedControllFieldConfig<T>).activeBgClass}
          activeTextClass={(field as SegementedControllFieldConfig<T>).activeTextClass}
          inactiveBgClass={(field as SegementedControllFieldConfig<T>).inactiveBgClass}
          inactiveTextClass={(field as SegementedControllFieldConfig<T>).inactiveTextClass}
        />,
      );

    case "datetime-local":
      return (
        <DateTimePicker
          {...formField}
          id={formField.name}
          onChange={formField.onChange}
          disabled={field.disabled}
          value={formField.value}
          className={field.className}
        />
      );

    case "textarea":
      return withIcon(
        <Textarea
          autoComplete={field.autoComplete}
          autoFocus={field.autoFocus}
          id={formField.name}
          placeholder={placeholder}
          disabled={field.disabled}
          className={cn(iconClass, baseClass, errorClass)}
          {...formField}
        />,
      );

    case "password":
      return withIcon(
        <PasswordInput
          autoComplete={field.autoComplete}
          autoFocus={field.autoFocus}
          id={formField.name}
          placeholder={placeholder}
          disabled={field.disabled}
          className={cn(iconClass, baseClass, errorClass)}
          {...formField}
        />,
      );

    case "date": {
      const rawValue = formField.value;
      const value =
        typeof rawValue === "string" && !isNaN(Date.parse(rawValue)) ? rawValue : "";

      return (
        <DatePicker
          id={formField.name}
          onValueChange={formField.onChange}
          value={value}
          placeholder={placeholder}
          className={cn("w-full", field.className)}
        />
      );
    }

    case "currency":
      return withIcon(
        <InputCurrency
          {...formField}
          id={formField.name}
          autoComplete={field.autoComplete}
          autoFocus={field.autoFocus}
          placeholder={placeholder}
          disabled={field.disabled}
          value={formField.value as number}
          onValueChange={(val) => formField.onChange(val ?? 0)}
          className={cn(iconClass, baseClass, errorClass)}
          name={formField.name}
          onBlur={formField.onBlur}
        />,
      );

    case "number":
      return withIcon(
        <Input
          autoComplete={field.autoComplete}
          autoFocus={field.autoFocus}
          id={formField.name}
          type="number"
          placeholder={placeholder}
          disabled={field.disabled}
          className={cn(iconClass, baseClass, errorClass)}
          {...formField}
          onChange={(e) =>
            formField.onChange(e.target.value === "" ? undefined : Number(e.target.value))
          }
        />,
      );

    default:
      return withIcon(
        <Input
          autoComplete={field.autoComplete}
          autoFocus={field.autoFocus}
          id={formField.name}
          type={field.type ?? "text"}
          placeholder={placeholder}
          disabled={field.disabled}
          className={cn(iconClass, baseClass, errorClass)}
          {...formField}
          onChange={(e) => {
            const value = field.valueToUpperCase
              ? e.target.value.toUpperCase()
              : e.target.value;
            formField.onChange(value);
          }}
        />,
      );
  }
}