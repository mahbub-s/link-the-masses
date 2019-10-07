import { AppHelper } from '../app.helper';

export class InitPageComponent {
    // loggedInUser
    loggedInUser = AppHelper.getLoggedInUser();

    // language settings
    selectedLanguage = 'en';
}
