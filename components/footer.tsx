import { siteContact } from "@/data/site-contact";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black px-6 py-6 text-white lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
        <div className="flex items-start">
          <p className="text-m font-medium">
            © {year} Rahmad Ramdhani
          </p>
        </div>

        <div className="md:text-right">
          <h2 className="text-m font-semibold uppercase tracking-wide">
            Contact Us
          </h2>

          <p className="mt-6 text-m font-medium">
           {siteContact.phoneDisplay}
          </p>

          <div className="mt-6 flex items-center gap-4 md:justify-end">
            <a
              href={siteContact.facebookHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/20 transition hover:bg-black hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.57v1.9h2.8l-.45 2.9h-2.35V22c4.78-.8 8.44-4.92 8.44-9.93Z" />
              </svg>
            </a>

            <a
              href={siteContact.instagramHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/20 transition hover:bg-black hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}