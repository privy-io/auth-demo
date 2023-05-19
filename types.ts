export type WalletsConfiguration = {
  name: string;
  order: number;
  enabled: boolean;
};

export type SocialsConfiguration = {
  name: string;
  order: number;
  enabled: boolean;
  email: boolean;
  sms: boolean;
  options: {
    google: boolean;
    twitter: boolean;
    apple: boolean;
    discord: boolean;
    github: boolean;
  };
};

export type AuthConfiguration = (WalletsConfiguration | SocialsConfiguration)[];

export type Appearance = {
  theme: string;
  accentColor: string;
  logo: string;
  showWalletLoginFirst: boolean;
};
