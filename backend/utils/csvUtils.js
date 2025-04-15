import fs from 'fs';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

// Read a CSV file and return its contents as an array of objects
export const readCsv = (filePath, delimiter = ',') => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: delimiter }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Get the CSV headers (column names)
export const getCsvHeaders = (filePath, delimiter = ',') => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: delimiter }))
      .on('headers', (headers) => resolve(headers))
      .on('error', (error) => reject(error))
      .on('data', () => {})
      .on('end', () => {});
  });
};

// Write data to a CSV file
export const writeToCsv = async (data, headers, outputPath = null) => {
  if (!outputPath) {
    outputPath = path.join('uploads', `export_${Date.now()}.csv`);
  }

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: headers.map(header => ({ id: header, title: header }))
  });

  await csvWriter.writeRecords(data);
  return outputPath;
};
