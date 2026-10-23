import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SITE_NAME, SITE_URL, absoluteUrl } from './site';

import type { JsonLd } from '@data/seo/json-ld';

export interface PageSeo {
  readonly title: string;
  readonly description: string;
  /** Chemin de la page (ex. `/themes/histoire`) : sert à la canonique et à `og:url`. Absent : pas de canonique. */
  readonly path?: string;
  readonly noindex?: boolean;
  readonly jsonLd?: readonly JsonLd[];
}

const JSON_LD_ATTRIBUTE = 'data-seo-jsonld';
const OG_IMAGE_PATH = '/og-image.png';

/** Écrit dans le `<head>` tout ce que lisent les moteurs et les réseaux sociaux : titre, description, canonique, Open Graph, JSON-LD. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  set(page: PageSeo): void {
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.setRobots(page.noindex === true);
    this.setCanonical(page.path);
    this.setSocial(page);
    this.setJsonLd(page.jsonLd ?? []);
  }

  private setRobots(noindex: boolean): void {
    if (noindex) this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    else this.meta.removeTag('name="robots"');
  }

  private setCanonical(path: string | undefined): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (path === undefined) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', absoluteUrl(path));
  }

  private setSocial(page: PageSeo): void {
    const image = `${SITE_URL}${OG_IMAGE_PATH}`;
    const tags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: `${SITE_NAME} : un quiz gratuit chaque jour` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image },
    ];
    tags.forEach((tag) => this.meta.updateTag(tag));
    if (page.path === undefined) this.meta.removeTag('property="og:url"');
    else this.meta.updateTag({ property: 'og:url', content: absoluteUrl(page.path) });
  }

  private setJsonLd(nodes: readonly JsonLd[]): void {
    const head = this.document.head;
    head.querySelectorAll(`script[${JSON_LD_ATTRIBUTE}]`).forEach((script) => {
      script.remove();
    });
    for (const node of nodes) {
      const script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute(JSON_LD_ATTRIBUTE, '');
      // `<` échappé : une donnée ne peut jamais refermer la balise <script>.
      script.textContent = JSON.stringify(node).replaceAll('<', '\\u003c');
      head.appendChild(script);
    }
  }
}

/** À appeler dans un constructeur de page : met à jour le `<head>` à chaque changement des paramètres de la route. */
export function usePageSeo(factory: () => PageSeo | null): void {
  const seo = inject(SeoService);
  effect(() => {
    const page = factory();
    if (page) seo.set(page);
  });
}
