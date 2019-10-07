import { environment } from '../environments/environment';

export class AppHelper {
    // api routes

    public static getLoggedInUser() {
        if (localStorage.getItem('loggedInUser') != null) {
            // set up JWT token decode here
            const loggedInUser = localStorage.getItem('loggedInUser');
            return loggedInUser;
        }
    }
}