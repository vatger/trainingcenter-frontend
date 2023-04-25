export function Footer() {
    return (
        <footer className="footer items-end bg-[#f8f8f8] dark:bg-gray-900 h-8 pb-4 px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between flex-auto w-full sm:mb-0 pb-2">
                <span>© {new Date().getFullYear()} VATSIM Germany</span>
                <div className="">
                    <a className="text-gray" target={"_blank"} href={"https://board.vatsim-germany.org/help/terms/"}>
                        Terms & Conditions
                    </a>
                    <span className="mx-2 text-muted"> | </span>
                    <a className="text-gray" target={"_blank"} href={"/#"}>
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}
