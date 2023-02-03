import React, { FC } from 'react';

interface Props {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const ExternalLink: FC<Props> = ({ to, children, className }) => {
  const target = (to || '').startsWith('mailto:') ? '_self' : '_blank';

  return (
    <a className={className} href={to} target={target} rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
