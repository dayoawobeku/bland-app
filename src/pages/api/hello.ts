import {NextApiRequest, NextApiResponse} from 'next';
import {getFirestore} from 'firebase-admin/firestore';
import {createFirebaseAdminApp} from '@/helpers/firebase-admin';

async function initializeAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY as string,
  };

  return createFirebaseAdminApp(params);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {success} = await updateTrialCount();

  if (success) {
    res.status(200).json({
      success: true,
      message: 'Trial count updated to 3 for all users',
    });
  }
}

async function updateTrialCount() {
  try {
    await initializeAdmin();
    const firestore = getFirestore();
    const usersSnapshot = await firestore.collection('users').get();

    const updates = usersSnapshot.docs.map(doc => {
      const userRef = doc.ref;
      return userRef.update({trialCount: 3});
    });

    await Promise.all(updates);
    console.log('Trial count updated to 3 for all users');

    return {success: true};
  } catch (error) {
    console.error('Error updating trial count:', error);
    return {success: false};
  }
}
