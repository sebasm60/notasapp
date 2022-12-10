import { Typography } from "@material-tailwind/react"

export const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
            <a href="#" className="flex items-center">
                Pages
            </a>
        </Typography>

        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
            <a href="#" className="flex items-center">
                Account
            </a>
        </Typography>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
            <a href="#" className="flex items-center">
                Blocks
            </a>
        </Typography>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
            <a href="#" className="flex items-center">
                Docs
            </a>
        </Typography>
    </ul >
);