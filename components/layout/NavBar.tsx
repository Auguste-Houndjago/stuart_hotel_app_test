
'use client'

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import Container from "../Container";
import Image from 'next/image';
import SearchInput from "../Searchinput";
import { ModeToggle } from '../theme-toggle';
import { NavMenu } from "./NavMenu";





export default function NavBar() {
  const router = useRouter()
  const { userId } = useAuth();

  return (
    <div className='sticky top-0 border border-b-primary/10 rounded-b-md bg-sky-200 dark:bg-secondary z-50'>


      <Container>
            <div className="flex justify-between ">
            <div className='flex items-center gap-1  cursor-pointer' onClick={()=> router.push('/')}>
          <Image src='/logo.svg' alt="logo" width='30' height='30' />
          <div className="font-bold hidden md:block text-xl " >Stuart_hotel</div>
        </div>
        <SearchInput />
            <div className="flex gap-3 items-center" >
              <div> <ModeToggle /> 
                    <NavMenu />
              </div>
                  <UserButton afterSignOutUrl="/" />
              {!userId && <>

                
                <Button variant='outline' size='sm' onClick={()=> router.push("/sign-in")}>
                  Sign in
                </Button>
                <Button size='sm' onClick={()=> router.push("/sign-up")}>
                  Sign up
                </Button>


              </>}
            </div>

            </div>
      </Container>
      <script src="https://cdn.lordicon.com/lordicon.js" async />
    </div>
  )
}

