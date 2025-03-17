# Architectural Scale Converter

A Next.js application designed for architecture students to work with scales and unit conversions. This tool helps students better understand and utilize scale in their architectural projects.

## Features

- **Scale Converter**: Convert between real-world measurements and scaled measurements for architectural drawings and models
- **Unit Converter**: Convert between different metric and imperial units commonly used in architecture
- **Educational Content**: Information about scales in architecture and tips for students
- **Responsive Design**: Works on both desktop and mobile devices

## Purpose

This application serves as an educational tool for architecture students who need to:

- Convert measurements for scale drawings (1:20, 1:50, 1:100, etc.)
- Convert between metric and imperial measurements
- Better understand the concept of scale in architectural design
- Perform accurate area calculations for architectural plans

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How It Works

The application provides two main tools:

1. **Scale Converter**:
   - Set the scale ratio (e.g., 1:100)
   - Enter a real-world measurement
   - Get the equivalent scaled measurement for your drawing or model
   - Works in both directions (real-to-scale and scale-to-real)

2. **Unit Converter**:
   - Convert between different metric units (mm, cm, m, km)
   - Convert between metric and imperial units
   - Supports both length and area conversions
   - Includes common architectural conversion factors

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Educational Value

This tool helps architecture students:
- Understand the mathematical relationship between real and scaled measurements
- Practice conversions between different units of measurement
- Learn standard architectural scales and their applications
- Improve accuracy in creating architectural drawings and models

## License

This project is open source and available for educational purposes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
