import { environment } from '../environments/environment';

export class AppHelper {
    // api routes

    public static getLoggedInUser() {
        if (sessionStorage.getItem('loggedInUser') != null) {
            // set up JWT token decode here
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            return loggedInUser;
        }
    }
}