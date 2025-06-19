# Configuration

Learn how to configure the application for your needs.

## Environment Variables

The application uses environment variables for configuration. Create a `.env.local` file in the root directory:

```env
# Site Configuration
SITE_URL=http://localhost:3000
SITE_NAME=My Documentation Site

# Analytics (optional)
NEXT_UMAMI_ID=your-umami-id

# Comments (optional)
NEXT_PUBLIC_GISCUS_REPO=your-github-repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repo-id
```

## Site Metadata

Edit `data/siteMetadata.js` to customize your site:

```javascript
const siteMetadata = {
  title: 'Your Site Title',
  author: 'Your Name',
  headerTitle: 'Your Header',
  description: 'Your site description',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://yourdomain.com',
  // ... other settings
}
```

## Theme Customization

You can customize the appearance by editing `tailwind.config.js`:

```javascript
theme: {
  colors: {
    primary: colors.blue, // Change primary color
    gray: colors.gray,
  }
}
``` 