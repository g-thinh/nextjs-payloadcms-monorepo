import { GlobalConfig } from 'payload/types';

const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default About;
