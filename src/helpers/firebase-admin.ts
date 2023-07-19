import {cert, getApps, initializeApp} from 'firebase-admin/app';

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

function formatFirebasePrivateKey(key: string) {
  return key.replace(/\\n/gm, '\n');
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatFirebasePrivateKey(params.privateKey);

  // create certificate
  const credential = cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  if (!getApps().length) {
    return initializeApp({
      credential,
      projectId: params.projectId,
      databaseURL: 'https://bland-v1-default-rtdb.firebaseio.com',
    });
  }
}
