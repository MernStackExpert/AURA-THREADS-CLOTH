import Link from "next/link";
import Image from "next/image";

export default function Footer({ settings }) {
  const { branding, contact, socialMedia } = settings || {};

  return (
    <footer className="w-full bg-foreground text-background pt-20 pb-8 border-t border-background/10">
      <div className="my-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="flex flex-col gap-6">
            {branding?.logo ? (
              <div className="relative w-32 h-10">
                <Image
                  src={branding.logo}
                  alt={branding?.siteName || "Aura Threads"}
                  fill
                  className="object-contain object-left invert"
                />
              </div>
            ) : (
              <h2 className="text-2xl font-light uppercase tracking-[0.2em]">
                {branding?.siteName || "AURA THREADS"}
              </h2>
            )}
            <p className="text-[12px] font-light tracking-wide text-background/60 max-w-xs leading-relaxed">
              Redefining luxury fashion with uncompromising quality and timeless
              elegance. Crafted for the modern individual.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:ml-auto">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/50">
              Explore
            </h3>
            <div className="flex flex-col gap-4 text-[12px] font-light tracking-wider text-background/80">
              <Link
                href="/shop"
                className="hover:text-background transition-colors w-fit"
              >
                New Arrivals
              </Link>
              <Link
                href="/categories"
                className="hover:text-background transition-colors w-fit"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="hover:text-background transition-colors w-fit"
              >
                Our Story
              </Link>
              <Link
                href="/journal"
                className="hover:text-background transition-colors w-fit"
              >
                Journal
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:ml-auto">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/50">
              Client Care
            </h3>
            <div className="flex flex-col gap-4 text-[12px] font-light tracking-wider text-background/80">
              <Link
                href="/contact"
                className="hover:text-background transition-colors w-fit"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="hover:text-background transition-colors w-fit"
              >
                FAQ
              </Link>
              <Link
                href="/shipping-returns"
                className="hover:text-background transition-colors w-fit"
              >
                Shipping & Returns
              </Link>
              <Link
                href="/terms"
                className="hover:text-background transition-colors w-fit"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:ml-auto">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/50">
              Connect
            </h3>
            <div className="flex flex-col gap-4 text-[12px] font-light tracking-wider text-background/80">
              {socialMedia?.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-background transition-colors w-fit"
                >
                  Instagram
                </a>
              )}
              {socialMedia?.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-background transition-colors w-fit"
                >
                  Facebook
                </a>
              )}
              {socialMedia?.tiktok && (
                <a
                  href={socialMedia.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-background transition-colors w-fit"
                >
                  TikTok
                </a>
              )}
              {socialMedia?.youtube && (
                <a
                  href={socialMedia.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-background transition-colors w-fit"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-background/10 gap-4">
          <p className="text-[10px] font-light tracking-widest text-background/40 uppercase">
            &copy; {new Date().getFullYear()}{" "}
            {branding?.siteName || "AURA THREADS"}. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-[10px] font-light tracking-widest text-background/40 uppercase">
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-background transition-colors"
              >
                {contact.email}
              </a>
            )}
            {contact?.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="hover:text-background transition-colors"
              >
                {contact.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
