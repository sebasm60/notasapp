import { useState, useEffect } from "react"

import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react"
import { navList } from "./hooks/navList"

export const NavbarComponent = () => {
    const [openNav, setOpenNav] = useState(false)

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false))
    }, [])

    return (
        <Navbar className="max-w-screen-4xl">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography as="a" href="home" variant="small" className="mr-4 cursor-pointer py-1.5 font-normal">
                    <span>App</span>
                </Typography>

                <div className="hidden lg:block">{navList}</div>

                <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                    <span>Opciones</span>
                </Button>

                <IconButton variant="text" className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden" ripple={false} onClick={() => setOpenNav(!openNav)}>
                    {openNav ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                {navList}
            </MobileNav>
        </Navbar>
    )
}