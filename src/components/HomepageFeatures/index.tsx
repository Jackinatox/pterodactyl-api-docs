import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Complete API Coverage',
    icon: '🚀',
    description: (
      <>
        Comprehensive documentation for both Client and Application APIs. 
        Everything you need to integrate with Pterodactyl Panel, from server 
        management to user administration.
      </>
    ),
  },
  {
    title: 'Developer Friendly',
    icon: '⚡',
    description: (
      <>
        Clear examples, detailed request/response schemas, and best practices. 
        Get started quickly with authentication guides, rate limiting info, 
        and error handling strategies.
      </>
    ),
  },
  {
    title: 'Automatically Tested',
    icon: '🧪',
    description: (
      <>
        Every API endpoint is automatically tested against a live Pterodactyl 
        installation before release. Ensuring accuracy, reliability, and 
        real-world compatibility with actual panel deployments.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
