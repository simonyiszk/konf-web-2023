import type { GetServerSidePropsContext } from "next";

import { getPresentations } from "@/utils/contentful";

type SitemapParams = {
	host: string;
	presentationSlugs: string[];
};

const presentationPrefixes = [
	"/eloadasok/",
	"/en/presentations/",
	"/hu/eloadasok/",
];

// https://developers.google.com/search/blog/2012/05/multilingual-and-multinational-site
function generateSiteMap({ host, presentationSlugs }: SitemapParams) {
	return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
    http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"   
>
     <url>
       <loc>https://${host}</loc>
       <xhtml:link
            rel="alternate"
            hreflang="hu"
            href="https://${host}/hu" />
        <xhtml:link
            rel="alternate"
            hreflang="en"
            href="https://${host}/en" />
     </url>
     <url>
     <loc>https://${host}/hu</loc>
     <xhtml:link
          rel="alternate"
          hreflang="hu"
          href="https://${host}/" />
      <xhtml:link
          rel="alternate"
          hreflang="en"
          href="https://${host}/en" />
    </url>
    <url>
     <loc>https://${host}/en</loc>
     <xhtml:link
          rel="alternate"
          hreflang="hu"
          href="https://${host}/" />
      <xhtml:link
          rel="alternate"
          hreflang="hu"
          href="https://${host}/hu" />
    </url>


     <url>
       <loc>https://${host}/eloadasok</loc>
       <xhtml:link
            rel="alternate"
            hreflang="hu"
            href="https://${host}/hu/eloadasok" />
        <xhtml:link
            rel="alternate"
            hreflang="en"
            href="https://${host}/en/presentations" />
     </url>
     <url>
       <loc>https://${host}/en/presentations</loc>
       <xhtml:link
            rel="alternate"
            hreflang="hu"
            href="https://${host}/eloadasok" />
        <xhtml:link
            rel="alternate"
            hreflang="hu"
            href="https://${host}/hu/eloadasok" />
     </url>
     <url>
     <loc>https://${host}/hu/eloadasok</loc>
     <xhtml:link
          rel="alternate"
          hreflang="hu"
          href="https://${host}/eloadasok" />
      <xhtml:link
          rel="alternate"
          hreflang="hu"
          href="https://${host}/en/presentations" />
   </url>

   ${presentationPrefixes
			.map((prefix) => {
				return presentationSlugs.map((slug) => {
					const tempPrefixes = presentationPrefixes.filter((e) => e !== prefix);
					return `<url>
                    <loc>https://${host}${prefix}${slug}</loc>
                    ${tempPrefixes
											.map((tempPrefix) => {
												return `<xhtml:link
                            rel="alternate"
                            hreflang="hu"
                            href="https://${host}${tempPrefix}${slug}" />`;
											})
											.join("")}
                    </url>
            `;
				});
			})
			.join("")}
    


   </urlset>
 `;
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({
	req,
	res,
}: GetServerSidePropsContext) {
	const presentations = await (
		await getPresentations()
	).items.map((e) => e.fields.slug);

	const sitemap = generateSiteMap({
		host: req.headers.host ?? "localhost:3000",
		presentationSlugs: presentations,
	});

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default SiteMap;
