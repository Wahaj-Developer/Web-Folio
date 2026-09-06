import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Dev Portfolio',
  description = 'Full-stack developer portfolio showcasing projects, blog posts, and technical expertise.',
  keywords = 'developer, portfolio, full-stack, react, nodejs, mongodb',
  image = '/assets/profile.jpg',
  url = window.location.href,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
