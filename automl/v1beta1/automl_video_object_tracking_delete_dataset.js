// DO NOT EDIT! This is a generated sample ("LongRunningPromiseAwait",  "automl_video_object_tracking_delete_dataset")
'use strict';

// sample-metadata:
//   title: Delete Dataset
//   description: Delete Dataset
//   usage: node samples/v1beta1/automl_video_object_tracking_delete_dataset.js [--dataset_id "[Dataset ID]"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_delete_dataset]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * Delete Dataset
 *
 * @param datasetId {string} Dataset ID, e.g. VOT1234567890123456789
 * @param project {string} Required. Your Google Cloud Project ID.
 */
async function sampleDeleteDataset(datasetId, project) {
  const client = new automl.AutoMlClient();
  // const datasetId = '[Dataset ID]';
  // const project = '[Google Cloud Project ID]';
  const formattedName = client.datasetPath(project, 'us-central1', datasetId);

  // Create a job whose results you can either wait for now, or get later
  const [operation] = await client.deleteDataset({name: formattedName});

  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();

  console.log(`Deleted Dataset.`);
}

// [END automl_video_object_tracking_delete_dataset]
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

sampleDeleteDataset(argv.dataset_id, argv.project).catch(console.error);
