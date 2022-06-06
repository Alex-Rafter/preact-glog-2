import { h } from "preact";

export function Nav() {
    return (
        <nav class="bg-dark py-2">
            <div class="container">
                <a href="/" class="d-flex justify-content-center text-decoration-none">
                    <h1 class="h1 fw-bolder text-white text-center mb-0 py-1" style="width:fit-content">NOTADVICE</h1>
                </a>
            </div>
        </nav>
    )
}