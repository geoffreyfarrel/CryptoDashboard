export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);

    this.status = status;

    this.name = 'ApiError';
  }
}

export const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return response.json() as Promise<T>;
};
