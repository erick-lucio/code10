// DO NOT EDIT! This is a generated sample ("LongRunningPromiseAwait",  "automl_video_object_tracking_import_data")
'use strict';

// sample-metadata:
//   title: Import Data
//   description: Import training data into dataset
//   usage: node samples/v1beta1/automl_video_object_tracking_import_data.js [--dataset_id "[Dataset ID]"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_import_data]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * Import training data into dataset
 *
 * @param datasetId {string} Dataset ID, e.g. VOT1234567890123456789
 * @param project {string} Required. Your Google Cloud Project ID.
 */
async function sampleImportData(datasetId, project) {
  const client = new automl.AutoMlClient();
  // const datasetId = '[Dataset ID]';
  // const project = '[Google Cloud Project ID]';
  const formattedName = client.datasetPath(project, 'us-central1', datasetId);

  // Paths to CSV files stored in Cloud Storage with training data.
  // See "Preparing your training data" for more information.
  // https://cloud.google.com/video-intelligence/automl/object-tracking/docs/prepare
  const inputUrisElement =
    'gs://automl-video-datasets/youtube_8m_videos_animal_tiny.csv';
  const inputUris = [inputUrisElement];
  const gcsSource = {
    inputUris: inputUris,
  };
  const inputConfig = {
    gcsSource: gcsSource,
  };
  const request = {
    name: formattedName,
    inputConfig: inputConfig,
  };

  // Create a job whose results you can either wait for now, or get later
  const [operation] = await client.importData(request);

  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();

  console.log(`Imported training data.`);
}

// [END automl_video_object_tracking_import_data]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('dataset_id', {
    default: '[Dataset ID]',
    string: true,
  })
  .option('project', {
    default: '[Google Cloud Project ID]',
    string: true,
  }).argv;

sampleImportData(argv.dataset_id, argv.project).catch(console.error);
