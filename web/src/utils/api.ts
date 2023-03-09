import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Post } from 'cms/src/payload-types';

export const CMS_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type JsonResponse<T> = T & { errors: Error[] };

export async function getPosts() {
  const url = CMS_BASE_URL + '/api/posts';
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  const json: JsonResponse<PaginatedDocs<Post>> = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  if (response.ok) {
    return json;
  }
}

export async function getSinglePost(blogId: string) {
  const url = CMS_BASE_URL + '/api/posts/' + blogId;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  const json: JsonResponse<Post> = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  if (response.ok) {
    return json;
  }
}
