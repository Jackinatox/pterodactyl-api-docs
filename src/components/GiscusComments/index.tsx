import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

export default function GiscusComments() {
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();
  const giscus = (siteConfig.themeConfig as any).giscus as GiscusConfig;

  return (
    <Giscus
      id="comments"
      repo={giscus.repo as `${string}/${string}`}
      repoId={giscus.repoId}
      category={giscus.category}
      categoryId={giscus.categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode === 'dark' ? 'dark' : 'light'}
      lang="en"
      loading="lazy"
    />
  );
}