export interface Brand {
  tid: number;
  title: string;
  description: string | null;
  brandUrl: string | null;
  brandTarget: string | null;
  logo: string;
  logoAlt: string;
  updatedAt: Date;
}
