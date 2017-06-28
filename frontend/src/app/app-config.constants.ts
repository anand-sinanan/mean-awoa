import { InjectionToken } from "@angular/core";
import { AppConfig } from "./app-config.interface";

export const APP_DI_CONFIG: AppConfig = {

  BE_URL: 'http://localhost:3000/'

};

export let APP_CONFIG = new InjectionToken< AppConfig >( 'app.config' );
