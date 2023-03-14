import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { About, Blog, Post } from 'cms/src/payload-types';

export const CMS_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type JsonResponse<T> = T & { errors?: Error[] };

type Options = {
  locale?: 'en' | 'fr' | string;
};

export async function getPosts(options?: Options) {
  try {
    const locale = '?locale=' + options?.locale;
    const url = CMS_BASE_URL + '/api/posts' + locale;
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

export async function getSinglePost(blogId: string, options?: Options) {
  try {
    const locale = '?locale=' + options?.locale;
    const url = CMS_BASE_URL + '/api/posts/' + blogId + locale;
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

export async function getBlogPage(options?: Options) {
  try {
    const locale = '?locale=' + options?.locale;
    const url = CMS_BASE_URL + '/api/globals/blog' + locale;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json: JsonResponse<Blog> = await response.json();

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

export async function getAboutPage(options?: Options) {
  try {
    const locale = '?locale=' + options?.locale;
    const url = CMS_BASE_URL + '/api/globals/about' + locale;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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
