const axios = require("axios");
const { Parser } = require("json2csv");
const AWS = require("aws-sdk");
const fs = require("fs");

exports.uploadFile = async () => {
  const response = await axios.get(
    "https://gbfs.divvybikes.com/gbfs/en/station_information.json"
  );
  const data = response?.data?.data?.stations;

  const modifiedData = data
    .filter((station) => station.capacity < 12)
    .map((station) => ({
      externalId: station.external_id,
      stationId: station.station_id,
      legacyId: station.legacy_id,
      name: station.name,
      capacity: station.capacity,
    }));

  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(modifiedData);

  const fileName = `/tmp/stations.csv`;
  fs.writeFileSync(fileName, csv);

  const s3 = new AWS.S3();
  const s3Bucket = "serverless-assn";
  const s3Key = "stations.csv";

  await s3
    .upload({
      Bucket: s3Bucket,
      Key: s3Key,
      Body: fs.createReadStream(fileName),
    })
    .promise();
};
