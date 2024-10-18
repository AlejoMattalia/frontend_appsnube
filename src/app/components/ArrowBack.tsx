'use client'

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export const ArrowBack = ({ page }: { page: string }) => {

    const router = useRouter();

    return (
        <p className="flex items-center p-3 cursor-pointer" onClick={() => router.push(`/${page}`)}>
            <ArrowBackIcon /> ATRÁS
        </p>
    )
}

