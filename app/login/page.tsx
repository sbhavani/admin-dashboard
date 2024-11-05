'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Github } from "lucide-react"
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onGithubLogin() {
    setIsLoading(true)
    try {
      await signIn('github', {
        callbackUrl: '/'
      })
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onEmailLogin(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    // Add your email/password login logic here
    // Reset loading state after login attempt
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00E5E5] to-[#00FF9F]">
      <Card className="w-[350px] border-none shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="/intelpixel-logo.png"
              alt="Intelpixel Logo"
              width={200}
              height={50}
              priority
            />
          </div>
          {/* <CardTitle className="text-2xl font-bold">Welcome back</CardTitle> */}
          {/* <CardDescription className="text-zinc-500">
            Login to access your account
          </CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com"
              className="border-zinc-200 focus:ring-[#00E5E5] focus:border-[#00E5E5]" 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input 
              id="password" 
              type="password"
              className="border-zinc-200 focus:ring-[#00E5E5] focus:border-[#00E5E5]"
            />
          </div>
          <Button 
            className="w-full"
            onClick={onEmailLogin}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onGithubLogin}
            disabled={isLoading}
            className="border-zinc-200 hover:bg-zinc-50"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
