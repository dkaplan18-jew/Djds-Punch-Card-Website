    DJDS Punch Card - Prototype

    QUICK START

1) Install dependencies:
   npm install

2) Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication -> Email/Password
   - Create Firestore database (start in test mode for development)
   - Copy your Firebase config into src/firebase.js

3) Start dev server:
   npm run dev

4) Deployment:
   - Use Firebase Hosting or Vercel. For Firebase Hosting, follow the Firebase docs to `firebase init hosting` and `firebase deploy`.

NOTES & NEXT STEPS
- Firestore security rules are NOT included; add rules before production.
- Admin actions in the UI assume your admin accounts are tracked in the 'users' collection with role: 'admin'. Consider using Firebase Custom Claims for stronger protection.
- This version shows display names on the leaderboard, and has a polished, minimal UI.
