import { redirect } from 'next/navigation';

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  if (process.env.CREATE_FORM) {
    redirect(process.env.CREATE_FORM);
  }
}
