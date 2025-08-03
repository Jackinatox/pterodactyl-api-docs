import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import GiscusComments from '@site/src/components/GiscusComments';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props) {
  const {metadata} = useDoc();
  const {frontMatter} = metadata;
  
  return (
    <>
      <Footer {...props} />
      {/* Only show comments on docs pages, not on homepage */}
      {!frontMatter.hide_comments && (
        <div style={{marginTop: '2rem'}}>
          <GiscusComments />
        </div>
      )}
    </>
  );
}