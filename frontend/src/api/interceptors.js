export const request = (request, next) => {
    // eslint-disable-next-line no-debugger
    debugger
    request.url = `${request.root}${request.url}`;
    return next();
};
