import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

interface CodeExample {
  curl?: string;
  javascript?: string;
  python?: string;
  php?: string;
  go?: string;
  java?: string;
  csharp?: string;
  ruby?: string;
}

interface CodeTabsProps {
  examples: CodeExample;
  endpoint?: string;
  method?: string;
  defaultValue?: string;
}

export default function CodeTabs({ examples, endpoint, method, defaultValue }: CodeTabsProps): React.ReactElement {
  // Determine the default value - use provided defaultValue, or fall back to the first available example
  const getDefaultValue = () => {
    if (defaultValue && examples[defaultValue as keyof CodeExample]) {
      return defaultValue;
    }
    
    // Find the first available example
    const availableLanguages = Object.keys(examples).filter(lang => examples[lang as keyof CodeExample]);
    return availableLanguages.length > 0 ? availableLanguages[0] : null;
  };

  return (
    <Tabs groupId="api-languages" defaultValue={getDefaultValue()} className="api-code-tabs">
      {!!examples.curl && (
        <TabItem value="curl" label="cURL">
          <CodeBlock language="bash" title={`${method || 'GET'} ${endpoint || ''}`}>
            {examples.curl}
          </CodeBlock>
        </TabItem>
      )}
      
      {!!examples.javascript && (
        <TabItem value="javascript" label="JavaScript">
          <CodeBlock language="javascript" title="Node.js">
            {examples.javascript}
          </CodeBlock>
        </TabItem>
      )}
      
      {!!examples.python && (
        <TabItem value="python" label="Python">
          <CodeBlock language="python" title="Python">
            {examples.python}
          </CodeBlock>
        </TabItem>
      )}
      
      {!!examples.php && (
        <TabItem value="php" label="PHP">
          <CodeBlock language="php" title="PHP">
            {examples.php}
          </CodeBlock>
        </TabItem>
      )}
      
      {!!examples.go && (
        <TabItem value="go" label="Go">
          <CodeBlock language="go" title="Go">
            {examples.go}
          </CodeBlock>
        </TabItem>
      )}
      
      {!!examples.java && (
        <TabItem value="java" label="Java">
          <CodeBlock language="java" title="Java">
            {examples.java}
          </CodeBlock>
        </TabItem>
      )}
      
      {!!examples.csharp && (
        <TabItem value="csharp" label="C#">
          <CodeBlock language="csharp" title="C#">
            {examples.csharp}
          </CodeBlock>
        </TabItem>
      )}
      
      {!!examples.ruby && (
        <TabItem value="ruby" label="Ruby">
          <CodeBlock language="ruby" title="Ruby">
            {examples.ruby}
          </CodeBlock>
        </TabItem>
      )}
    </Tabs>
  );
} 