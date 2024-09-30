'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import CustomInput from './CustomInput';
import {
  Form,
} from "@/components/ui/form"
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from '@/lib/actions/user.action';
import PlaidLink from './PlaidLink';


const AuthForm = ({ type, }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      // DO request
      const userData = {
        firstName: formData.firstName!,
        lastName: formData.lastName!,
        address1: formData.address1!,
        city: formData.city!,
        state: formData.state!,
        postalCode: formData.postalCode!,
        dateOfBirth: formData.dateOfBirth!,
        ssn: formData.ssn!,
        email: formData.email,
        password: formData.password,
      }

      if (type === 'sign-up') {
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === 'sign-in') {
        const bodyData = { email: formData.email, password: formData.password }
        const response = await signIn(bodyData);
        if (response) { router.push('/') }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            alt="logo-icon"
            width={34}
            height={34}
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Fiance</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-grey-900">{user
            ? 'Link Account'
            : type === 'sign-in'
              ? 'sign In'
              : 'sign Up'}
          </h1>
          <p className="text-16 text-normal text-grey-600">
            {user ? 'Link your account to start' : 'Please enter your detail'}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Example: London"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: London"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Ex: W1B54"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button disabled={isLoading} className="form-btn" type="submit">
                  {isLoading ?
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </> : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>

            </form>
          </Form>

          <footer className="flex items-center justify-center gap-1">
            <p className="font-14 font-normal text-grey-600">{type === "sign-in"
              ? "Don't have an account?"
              : 'Already have an account?'}</p>
            <Link
              className="form-link"
              href={type === "sign-in" ? '/sign-up' : '/sign-in'}
            >
              {type === "sign-in" ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm