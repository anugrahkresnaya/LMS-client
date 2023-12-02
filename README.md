# Oceanz
This repository is a project for my thesis in Gunadarma University. This is a client side or frontend side of my project.

Oceanz is a Learning Management System web app that provides online courses. In the course there is material in the form of learning video and PDF. Which will help the student to learning about the course they enrolled. And paid course can be bought by various payment methods provided by Midtrans. And the instructor can upload their material to the web app.

### Features
Features implementations:
- User can search course without sign in
- User has to sign in to buy course and access the course that the user bought
- User can see details of course such as instructor's name, price, course's description, image preview
- User can buy the course through payment gateway Midtrans
- Payment method only provided for Indonesian bank
- User can update their profile
- Any user can become instructor to upload their material in the form of video and PDF
- Video and PDF will be stored in Google Cloud Platforms to generate the link that will be stored in database
- Course can be updated by instructor who own the course
- Using react context to store login information for user
- Using JSON Web Token (JWT) to generate token for user sign in



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

If you want to see the [backend repo](https//github.com/anugrahkresnaya/LMS-server):

## Getting Started

Clone the repo first
```bash
git clone https://github.com/anugrahkresnaya/LMS-client
```

Install the dependecies in the project directory
```
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
