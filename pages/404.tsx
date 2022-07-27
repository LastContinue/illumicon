import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

const pageNotFound: NextPage = () => {
    return (
        <div className="grid h-screen place-items-center bg-yellow-100">
            <div className="text-8xl font-pocketmonk text-red-500">
                Woopers!
            </div>
            <Image src="/images/Wooper.webp" width={400} height={400} alt="Picture of a Wooper to let you know this a 404" />
            <div className="text-xl">
                We can&apos;t seem to find that page! How about going&nbsp;
                <Link href="/">
                    <a className="text-blue-500 underline decoration-solid">
                        back to the homepage?
                    </a>
                </Link>
            </div>
        </div>
    )

}
export default pageNotFound