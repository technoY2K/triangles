import { isMobile } from "react-device-detect";

export default function About() {
    return isMobile ? (
        <div>
            <p className="text-center text-[#f1fa8c] text-3xl mt-16">
                For the best experience, please view on a desktop browser. (Rèsumè is in
                an iframe 🙇🏽‍♂️)
            </p>
        </div>
    ) : (
        <div className="h-[91vh]">
            <iframe
                src="/resume.pdf"
                typeof="application/pdf"
                className="w-full h-full"
            />
        </div>
    );
}
