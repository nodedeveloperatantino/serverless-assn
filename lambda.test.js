const { handler } = require('./lambda');
const { uploadFile } = require('./upload');

jest.mock('./upload');

describe('Lambda Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a success response when uploadFile succeeds', async () => {
    uploadFile.mockResolvedValue();

    const result = await handler();

    expect(uploadFile).toHaveBeenCalled();
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: 'File processed successfully' }),
    });
  });

  it('should return an error response when uploadFile throws an error', async () => {
    const error = new Error('Test error');
    uploadFile.mockRejectedValue(error);

    const result = await handler();

    expect(uploadFile).toHaveBeenCalled();
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing data', error }),
    });
  });
});
