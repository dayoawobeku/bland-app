import {useMutation} from '@tanstack/react-query';
import {PostDataRequestBody} from '@/types';

async function postData(requestBody: PostDataRequestBody) {
  const response = await fetch('/api/product-names', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('An error occurred while making the request.');
  }

  return response.json();
}

export function usePostData() {
  return useMutation(postData);
}
