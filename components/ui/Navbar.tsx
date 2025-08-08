import Link from "next/link";
import Image from "next/image";
import NavItems from "../NavItems";

const Navbar = () => {
    return (
        <nav className="navbar flex justify-between items-center px-6 py-3 shadow-md bg-white sticky top-0 z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
                <Image
                    src="/images/logo.svg"
                    alt="Green Pulse Logo"
                    width={46}
                    height={44}
                    className="transition-transform duration-300 group-hover:scale-110"
                />
                <h1
                    className="text-xl font-bold tracking-wide transition-colors duration-300"
                    style={{ color: "#14C88F" }}
                >
                    Green Pulse
                </h1>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-8">
                <NavItems />
            </div>
        </nav>
    );
};

export default Navbar;
