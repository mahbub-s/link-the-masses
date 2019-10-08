import { AppHelper } from '../app.helper';

export class InitPageComponent {
    // language settings
    selectedLanguage = 'en';

    // loggedInUser
    loggedInUser = AppHelper.getLoggedInUser();
}
