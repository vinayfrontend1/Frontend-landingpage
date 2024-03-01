// SocialIcons.tsx
import React from 'react';
import { SocialIcon } from 'react-social-icons';

const SocialIcons: React.FC = () => {
  const socialMediaLinks: string[] = [
    'https://www.facebook.com/YourFacebookPage',
    'https://twitter.com/YourTwitterHandle',
    'https://www.instagram.com/YourInstagramUsername',
    'https://www.youtube.com/YourYouTubeChannel',
    'https://www.linkedin.com/in/YourLinkedInProfile',
  ];

  return (
    <div className="flex bottom-4 right-4 space-x-4">
      {socialMediaLinks.map((link) => (
        <SocialIcon key={link} url={link} target="_blank" rel="noopener noreferrer" />
      ))}
    </div>
  );
};

export default SocialIcons;
