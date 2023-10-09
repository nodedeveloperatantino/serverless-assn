const { uploadFile } = require("./upload");

exports.handler = async (event, context) => {
  try {
    await uploadFile();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File processed successfully" }),
    };
  } catch (error) {
    // console.error("Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error processing data", error }),
    };
  }
};
