'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

type SetupWizardProps = {
  onComplete: () => void
}

interface FormData {
  name: string
  theme: 'light' | 'dark'
  language: string
  notifications: boolean
}

const SetupWizard: React.FC<SetupWizardProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    theme: 'light',
    language: 'en',
    notifications: true
  })

  useEffect(() => {
    const savedData = localStorage.getItem('setupData')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, notifications: checked })
  }

  const handleSubmit = () => {
    localStorage.setItem('setupData', JSON.stringify(formData))
    onComplete()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Setup Wizard</CardTitle>
          <CardDescription>Configure your preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="Your name" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('theme', value as 'light' | 'dark')} 
              value={formData.theme}
            >
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('language', value)} 
              value={formData.language}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="notifications"
              checked={formData.notifications}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">Complete Setup</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SetupWizard