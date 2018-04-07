import { baseURL } from './baseurl';

// Function for setting up restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
    RestangularProvider.setBaseUrl(baseURL);
  }