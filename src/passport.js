import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt'

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"secret_secret_secret";
}

