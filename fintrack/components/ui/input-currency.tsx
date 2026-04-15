import { useState } from "react"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"

interface InputCurrencyProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value?: number | null
    onValueChange?: (value: number) => void
}

export default function InputCurrency({
    value,
    onValueChange,
    className,
    ...props
}: InputCurrencyProps) {

    const [internalValue, setInternalValue] = useState<number>(value ?? 0)

    const displayValue = formatCurrency(internalValue)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value

        const rawValue = inputValue.replace(/\D/g, "")
        const numericValue = Number(rawValue)

        setInternalValue(numericValue)
        onValueChange?.(numericValue)
    }

    return (
        <Input
            {...props}
            className={className}
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
        />
    )
}