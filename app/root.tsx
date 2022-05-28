import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import Navbar from "./Navbar";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "technoY2K",
    viewport: "width=device-width,initial-scale=1",
});

import mainCSS from "~/tailwind.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: mainCSS }];
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="bg-[#282a36]">
                <main className="px-8">
                    <Navbar />
                    <div className="mt-8">
                        <Outlet />
                    </div>
                </main>
                <ScrollRestoration />
                <LiveReload />
                <Scripts />
            </body>
        </html>
    );
}
