export default function paginate<T>(limit: number, page: number, result: T[]): T[] {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const paginatedResults = result.slice(startIndex, endIndex);

    return paginatedResults;
}
