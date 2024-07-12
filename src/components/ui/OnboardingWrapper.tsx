'use client'

import React from 'react'
import { OnboardingDialog } from './OnboardingDialog'

interface OnboardingWrapperProps {
  children: React.ReactNode
}

export function OnboardingWrapper({ children }: OnboardingWrapperProps) {
  return (
    <>
      {children}
      <OnboardingDialog />
    </>
  )
}