// DO NOT EDIT! This is a generated sample ("Request",  "automl_video_object_tracking_get_dataset")
'use strict';

// sample-metadata:
//   title: Get Dataset
//   description: Get dataset and print dataset details
//   usage: node samples/v1beta1/automl_video_object_tracking_get_dataset.js [--dataset_id "[Dataset ID]"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_get_dataset]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * Get dataset and print dataset details
 *
 * @param datasetId {string} Dataset ID, e.g. VOT1234567890123456789
 * @param project {string} Required. Your Google Cloud Project ID.
 */
function sampleGetDataset(datasetId, project) {
  const client = new automl.AutoMlClient();
  // const datasetId = '[Dataset ID]';
  // const project = '[Google Cloud Project ID]';
  const formattedName = client.datasetPath(project, 'us-central1', datasetId);
  client
    .getDataset({name: formattedName})
    .then(responses => {
      const response = responses[0];
      const dataset = response;
      // Print out the full name of the created dataset.
      //
      // This will have the format:
      //   projects/[Google Cloud Project Number]/locations/us-central1/datasets/VOT1234567890123456789
      //
      // The Dataset ID is the generated identifer in this path, e.g. VOT1234567890123456789
      // You will need this ID to perform operations on the dataset as well as to create a model.
      //
      console.log(`Name: ${dataset.name}`);
      // Print out the Display Name (the text you provided during creation)
      console.log(`Display Name: ${dataset.displayName}`);
      // Print out the user-provided description (may be blank)
      console.log(`Description: ${dataset.description}`);
      // The number of examples in the dataset, if any.
      // Added by importing data via importData
      //
      console.log(`Example count: ${dataset.exampleCount}`);
    })
    .catch(err => {
      console.error(err);
    });
}

// [END automl_video_object_tracking_get_dataset]
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

sampleGetDataset(argv.dataset_id, argv.project);
