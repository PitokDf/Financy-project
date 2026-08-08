"use client";

import * as React from "react";
import { ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  value?: string;
  onValueChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  className?: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

export function TimePicker({
  value,
  onValueChange,
  id,
  placeholder = "--:--",
  className,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [hour, minute] = (value ?? "").split(":");

  const handleHourChange = (h: string) => {
    onValueChange(`${h}:${minute ?? "00"}`);
  };

  const handleMinuteChange = (m: string) => {
    onValueChange(`${hour ?? "00"}:${m}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}>
          <ClockIcon className="mr-2 h-4 w-4" />
          {value || <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex items-center gap-1.5">
          <Select value={hour} onValueChange={handleHourChange}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {HOURS.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground">:</span>
          <Select value={minute} onValueChange={handleMinuteChange}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {MINUTES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
