const s3UploadMock = jest.fn().mockReturnValue({ promise: jest.fn() });
const s3InstanceMock = {
  upload: s3UploadMock,
};

module.exports = {
  S3: jest.fn(() => s3InstanceMock),
};
