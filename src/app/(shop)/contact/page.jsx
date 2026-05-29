import ContactForm from "@/components/shop/ContactForm";
import { getSettings } from "@/services/shopService";

export const metadata = {
  title: "Contact Us | Premium Store",
  description: "Get in touch with our customer service team.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const { contact, socialMedia } = settings || {};

  return (
    <div className="w-full min-h-screen bg-background pt-32 pb-24">
      <div className="my-container max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/50 mb-4">
            Client Care
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.1em] text-foreground">
            Contact Us
          </h1>
          <div className="w-16 h-[1px] bg-foreground/20 mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground mb-6">
                Direct Inquiries
              </h2>
              <p className="text-[13px] font-light leading-relaxed text-foreground/70 mb-8 max-w-sm">
                Our client care team is available to assist you with styling
                advice, delivery, or return queries.
              </p>

              <div className="flex flex-col gap-6">
                {contact?.email && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">
                      Email
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[14px] font-light text-foreground hover:opacity-70 transition-opacity"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {contact?.phone && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">
                      Phone
                    </span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-[14px] font-light text-foreground hover:opacity-70 transition-opacity"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}

                {contact?.address && (
                  <div className="flex flex-col mt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">
                      Headquarters
                    </span>
                    <address className="text-[14px] font-light text-foreground not-italic leading-relaxed max-w-xs">
                      {contact.address}
                    </address>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full h-[1px] bg-border/40"></div>

            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground mb-6">
                Follow Us
              </h2>
              <div className="flex flex-wrap gap-6">
                {socialMedia?.instagram && (
                  <a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-light tracking-wider hover:opacity-60 transition-opacity uppercase"
                  >
                    Instagram
                  </a>
                )}
                {socialMedia?.facebook && (
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-light tracking-wider hover:opacity-60 transition-opacity uppercase"
                  >
                    Facebook
                  </a>
                )}
                {socialMedia?.youtube && (
                  <a
                    href={socialMedia.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-light tracking-wider hover:opacity-60 transition-opacity uppercase"
                  >
                    YouTube
                  </a>
                )}
                {socialMedia?.tiktok && (
                  <a
                    href={socialMedia.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-light tracking-wider hover:opacity-60 transition-opacity uppercase"
                  >
                    TikTok
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-foreground/[0.02] border border-border/40 p-8 md:p-12 lg:p-16">
            <h2 className="text-[16px] md:text-[20px] font-light tracking-wider text-foreground mb-10">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
