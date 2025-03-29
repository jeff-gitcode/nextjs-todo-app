import ApiService from "./ApiService";

describe("ApiService - getById", () => {
    const baseUrl = "https://api.example.com/resources";
    let apiService: ApiService<{ id: number; name: string }>;

    beforeEach(() => {
        apiService = new ApiService(baseUrl);
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("calls fetch with the correct URL", async () => {
        const mockResponse = { id: 1, name: "Test Resource" };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        await apiService.getById(1);

        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/1`);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("returns the correct data when the response is successful", async () => {
        const mockResponse = { id: 1, name: "Test Resource" };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await apiService.getById(1);

        expect(result).toEqual(mockResponse);
    });

    it("throws an error when the response is not successful", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: "Not Found",
        });

        await expect(apiService.getById(1)).rejects.toThrow(
            "Failed to fetch resource with ID 1: Not Found"
        );
    });
});