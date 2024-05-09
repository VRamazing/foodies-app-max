import Link from "next/link"
import logoImg from "@/assets/logo.png"
import classes from "@/components/main-header.module.css"
import Image from "next/image"

export default function MainHeader(){
    return <header className={classes.header}>
        <Link href="/" className={classes.logo}>
            <Image src={logoImg} alt="Logo app" priority />
            Next Level food
        </Link>

        <nav className={classes.nav}>
            <ul>
                <li><Link href="/meals">
                        Meals
                    </Link>
                </li>
                <li><Link href="/community">
                        Foodies community
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
}