'use client'

import { useState, forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    className?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, value, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword)
        }

        return (

            <div className="relative">
                <Input
                    autoComplete='new-password'
                    type={showPassword ? 'text' : 'password'}
                    className={cn('pr-13', className)}
                    ref={ref}
                    {...props}
                    value={value ?? ''}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }