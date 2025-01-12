export interface LinkInterface {
  id: string;
  user: string;
  originalUrl: string;
  shortenedUrl: string;
  active: boolean;
  clicks: number;
  tags: string[];
  Comment: string[];
  expirationDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  clickEvents: ClickEventInterface[];
}

export interface ClickEventInterface {
  id: string;
  linkId: string;
  link: LinkInterface;
  clickedAt: Date;
}
