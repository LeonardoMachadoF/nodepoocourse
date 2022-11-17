export default {
    secret_token: process.env.JSON_WEB_TOKEN_SECRET_KEY as string,
    expires_in_token: '15m',
    secret_refresh_token: '62e49eb52184540ab63ee3d1fc953822',
    expires_in_refresh_token: '30d',
    expires_in_refresh_token_days: 30,
}