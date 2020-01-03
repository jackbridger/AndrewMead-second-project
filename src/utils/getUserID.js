import jwt from 'jsonwebtoken';
const getUserId = (request) => {
    const headers = request.request.headers.authorization
    const providedJWT = headers.split(" ")[1];
    const { id } = jwt.verify(providedJWT, "supersecret");
    return id;
}

export { getUserId as default }