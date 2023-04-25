export function handleResize(prevWidth: number, toggleMenuExtended: () => void) {
    if (window.innerWidth < 640 && prevWidth >= 640) {
        toggleMenuExtended();
    } else if (window.innerWidth >= 640 && prevWidth < 640) {
        toggleMenuExtended();
    }
}
