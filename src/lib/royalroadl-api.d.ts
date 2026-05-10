// src/types/royalroadl-api.d.ts
declare module '@l1lly/royalroadl-api' {
  interface RoyalRoadAuthor {
    id: number;
    name: string;
    username: string;
    image?: string;
  }

  interface RoyalRoadChapter {
    id: number;
    title?: string;
    content?: string;
    date?: string;
    wordCount?: number;
    index: number;
  }

  interface RoyalRoadFiction {
    id: number;
    title: string;
    description: string;
    author: RoyalRoadAuthor;
    tags: string[];
    status: 'ONGOING' | 'COMPLETED' | 'HIATUS' | 'STUBBED';
    chapters: RoyalRoadChapter[];
    image?: string;
    slug?: string;
    wordCount?: number;
    rating?: number;
    followers?: number;
  }

  export class RoyalRoadAPI {
    constructor(options?: { userAgent?: string; baseUrl?: string });
    
    fiction: {
      getFiction(id: number): Promise<{ data: RoyalRoadFiction }>;
      searchFictions(query: string): Promise<{ data: RoyalRoadFiction[] }>;
      getChapters(id: number): Promise<{ data: RoyalRoadChapter[] }>;
    };
    
    author: {
      getAuthor(id: number): Promise<{ data: RoyalRoadAuthor }>;
      getAuthorFictions(id: number): Promise<{ data: RoyalRoadFiction[] }>;
    };
  }
}