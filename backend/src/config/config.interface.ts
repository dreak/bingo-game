export interface Config {
  readonly NODE_ENV: string;
  readonly PORT: number;
  readonly MYSQL_HOST: string;
  readonly MYSQL_PORT: number;
  readonly MYSQL_USER_ID: string;
  readonly MYSQL_PASSWORD: string;
  readonly MYSQL_DATABASE: string;
}
