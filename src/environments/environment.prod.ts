import { AppEnvironmentEnum } from '@core/enums/app-environment.enum';
import app from 'package.json';

export const environment = {
  version: app.version.toString(),
  env: AppEnvironmentEnum.PRODUCTION,
  baseUrl: 'http://localhost:3000/api'
};