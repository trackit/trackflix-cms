import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Content Management',
    Svg: require('@site/static/img/content.svg').default,
    description: (
      <>
        Add, edit and delete live and vod channels
        Support for uploading video content, and setting schedules for live broadcast.
      </>
    ),
  },
  {
    title: 'Genre and Category Configuration',
    Svg: require('@site/static/img/config.svg').default,
    description: (
      <>
      Capability to define and manage genres and categories for content organization
      Allow assigning genres and categories to live and vod channels.
      </>
    ),
  },
  {
    title: 'User rights management',
    Svg: require('@site/static/img/users.svg').default,
    description: (
      <>
      User roles and permissions management for administrators and content managers
      Support for access control and restriction for specific content or features.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
