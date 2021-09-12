export enum HTTP {
    Ok = 200, // Response to a successful GET, PUT, PATCH or DELETE. Can also be used for a POST that doesn't result in a creation.
    Created = 201, // Response to a POST that results in a creation. Should be combined with a Location header pointing to the location of the new resource
    NoContent = 204, // Response to a successful request that won't be returning a body (like a DELETE request)
    NotModified = 304, // Used when HTTP caching headers are in play
    BadRequest = 400, // The request is malformed, such as if the body does not parse
    Unauthorized = 401, // When no or invalid authentication details are provided. Also useful to trigger an auth popup if the API is used from a browser
    Forbidden = 403, // When authentication succeeded but authenticated user doesn't have access to the resource
    NotFound = 404, // When a non-existent resource is requested
    MethodNotAllowed = 405, // When an HTTP method is being requested that isn't allowed for the authenticated user
    Gone = 410, // Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions
    UnsupportedMediaType = 415, // If incorrect content type was provided as part of the request
    UnprocessableEntity = 422, // Used for validation errors
    TooManyRequests = 429, // When a request is rejected due to rate limiting
    InternalServerError = 500
}
