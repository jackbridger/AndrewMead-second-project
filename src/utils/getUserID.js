import jwt from 'jsonwebtoken';
const getUserId = (request) => {
    const headers = request.request.headers.authorization
    if (!headers) throw new Error("invalid auth")
    const providedJWT = headers.split(" ")[1];
    const { id } = jwt.verify(providedJWT, "supersecret");
    return id;
}

export { getUserId as default }