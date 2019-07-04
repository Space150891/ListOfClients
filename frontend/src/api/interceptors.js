export const request = (request, next) => {
    request.url = `${request.root}${request.url}`;
    return next();
};
