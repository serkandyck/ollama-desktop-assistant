'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function OnboardingDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted')
    if (!hasCompletedOnboarding) {
      setIsOpen(true)
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true')
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uygulamamıza Hoş Geldiniz!</DialogTitle>
          <DialogDescription>
            Bu, yeni kullanıcılar için onboarding ekranıdır.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Onboarding içeriğinizi buraya ekleyin */}
          <p>Burada uygulamanızın özelliklerini tanıtabilirsiniz.</p>
        </div>
        <DialogFooter>
          <Button onClick={completeOnboarding}>Onboarding Tamamla</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}