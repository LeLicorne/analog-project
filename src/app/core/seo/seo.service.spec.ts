import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { SeoService } from './seo.service';
import { SITE_URL } from './site';

describe('SeoService', () => {
  let seo: SeoService;
  let head: HTMLHeadElement;

  const attr = (selector: string, name: string): string | null | undefined =>
    head.querySelector(selector)?.getAttribute(name);

  beforeEach(() => {
    TestBed.resetTestingModule();
    seo = TestBed.inject(SeoService);
    head = TestBed.inject(DOCUMENT).head;
    head
      .querySelectorAll('meta, link[rel="canonical"], script[data-seo-jsonld]')
      .forEach((node) => {
        node.remove();
      });
  });

  it('écrit titre, description, canonique et Open Graph', () => {
    seo.set({ title: 'Titre', description: 'Description de test', path: '/themes/histoire' });

    expect(TestBed.inject(DOCUMENT).title).toBe('Titre');
    expect(attr('meta[name="description"]', 'content')).toBe('Description de test');
    expect(attr('link[rel="canonical"]', 'href')).toBe(`${SITE_URL}/themes/histoire`);
    expect(attr('meta[property="og:url"]', 'content')).toBe(`${SITE_URL}/themes/histoire`);
    expect(attr('meta[property="og:title"]', 'content')).toBe('Titre');
    expect(attr('meta[property="og:image"]', 'content')).toBe(`${SITE_URL}/og-image.png`);
    expect(attr('meta[name="twitter:card"]', 'content')).toBe('summary_large_image');
  });

  it('met à jour la canonique sans la dupliquer', () => {
    seo.set({ title: 'A', description: 'a', path: '/a' });
    seo.set({ title: 'B', description: 'b', path: '/b' });
    expect(head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(attr('link[rel="canonical"]', 'href')).toBe(`${SITE_URL}/b`);
  });

  it('retire la canonique quand la page n’en a pas', () => {
    seo.set({ title: 'A', description: 'a', path: '/a' });
    seo.set({ title: 'Erreur', description: 'e', noindex: true });
    expect(head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(head.querySelector('meta[property="og:url"]')).toBeNull();
  });

  it('pose et retire noindex', () => {
    seo.set({ title: 'A', description: 'a', noindex: true });
    expect(attr('meta[name="robots"]', 'content')).toContain('noindex');
    seo.set({ title: 'B', description: 'b' });
    expect(head.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('remplace le JSON-LD d’une page à l’autre', () => {
    seo.set({ title: 'A', description: 'a', jsonLd: [{ '@type': 'Thing', name: 'un' }] });
    seo.set({ title: 'B', description: 'b', jsonLd: [{ '@type': 'Thing', name: 'deux' }] });
    const scripts = head.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0]?.textContent ?? '{}')).toMatchObject({ name: 'deux' });
  });

  it('ne laisse jamais une donnée refermer la balise script', () => {
    seo.set({
      title: 'A',
      description: 'a',
      jsonLd: [{ '@type': 'Thing', name: '</script><img src=x onerror=alert(1)>' }],
    });
    const content = head.querySelector('script[type="application/ld+json"]')?.textContent ?? '';
    expect(content).not.toContain('</script>');
    expect(JSON.parse(content)).toMatchObject({ name: '</script><img src=x onerror=alert(1)>' });
  });
});
