import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import type { LegalPostMeta } from '@repo/cms';
import Link from 'next/link';
export const Footer = ({
  legalPostsMeta,
}: { legalPostsMeta: LegalPostMeta[] }) => {
  const navigationItems = [
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Compendium', href: '/compendium' },
    { title: 'Art', href: '/art' },
    {
      title: 'Legal',
      items: legalPostsMeta.map((post) => {
        return {
          title: post._title,
          href: `/legal/${post._slug}`,
        };
      }),
    },
  ];

  const socialLinks = [
    {
      icon: TwitterLogoIcon,
      href: 'https://twitter.com/kirchnerianum',
      label: 'Twitter',
    },
    {
      icon: GitHubLogoIcon,
      href: 'https://github.com/mkirch',
      label: 'GitHub',
    },
    {
      icon: LinkedInLogoIcon,
      href: 'https://linkedin.com/in/michaelrkirchner',
      label: 'LinkedIn',
    },
    {
      icon: InstagramLogoIcon,
      href: 'https://instagram.com/michaelrkirchner',
      label: 'Instagram',
    },
  ];

  return (
    <section className="dark border-foreground/10 border-t">
      <div className="w-full bg-background py-20 text-foreground lg:py-40">
        <div className="container mx-auto">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                  next-forge
                </h2>
                <p className="max-w-lg text-left text-foreground/75 text-lg leading-relaxed tracking-tight">
                  This is the start of something new.
                </p>
              </div>
            </div>
            <div className="grid items-start gap-10 lg:grid-cols-3">
              {navigationItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-start gap-1 text-base"
                >
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between"
                        target={
                          item.href.includes('http') ? '_blank' : undefined
                        }
                        rel={
                          item.href.includes('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        <span className="text-xl">{item.title}</span>
                      </Link>
                    ) : (
                      <p className="text-xl">{item.title}</p>
                    )}
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex items-center justify-between"
                        target={
                          subItem.href.includes('http') ? '_blank' : undefined
                        }
                        rel={
                          subItem.href.includes('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        <span className="text-foreground/75">
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 justify-center">
            <Link
              href="/"
              className="font-fraktur text-3xl text-primary transition-colors hover:text-primary/90"
            >
              Kirchner.io
            </Link>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-end gap-6 font-mono text-xs md:flex">
          <Link href="/" className="hover:text-primary">
            © {new Date().getFullYear()} kirchner.io
          </Link>
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms
          </Link>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
