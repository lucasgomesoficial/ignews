import * as Prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import { NextApiRequest, PreviewData } from "next";
import sm from "../../sm.json";

interface PrismicContext {
  req?: NextApiRequest;
  previewData: PreviewData;
}

interface PrismicResolver {
  [key: string]: any;
}

export const endpoint = sm.apiEndpoint;
export const repositoryName = Prismic.getRepositoryName(endpoint);

export function linkResolver(doc: PrismicResolver) {
  switch (doc.type) {
    case "posts":
      return `/${doc.uid}`;
    default:
      return null;
  }
}

export function createClient(config: PrismicContext) {
  const prismic = Prismic.createClient(endpoint, {
    ...config,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  enableAutoPreviews({
    client: prismic,
    previewData: config.previewData,
    req: config.req,
  });

  return prismic;
}
