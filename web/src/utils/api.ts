import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { About, Post } from 'cms/src/payload-types';

export const CMS_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type JsonResponse<T> = T & { errors?: Error[] };

export async function getPosts() {
  try {
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
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
}

export async function getSinglePost(blogId: string) {
  try {
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
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
}

export async function getAboutPage() {
  try {
    const url = CMS_BASE_URL + '/api/globals/about';
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    const json: JsonResponse<About> = await response.json();

    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    if (response.ok) {
      return json;
    }
  } catch (e: unknown) {
    console.error(e);
    throw new Error(e as string);
  }
}
