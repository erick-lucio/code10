// DO NOT EDIT! This is a generated sample ("Request",  "automl_video_object_tracking_create_dataset")
'use strict';

// sample-metadata:
//   title: Create Dataset
//   description: Create Dataset
//   usage: node samples/v1beta1/automl_video_object_tracking_create_dataset.js [--display_name "My_Dataset_Name_123"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_create_dataset]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * Create Dataset
 *
 * @param displayName {string} The name of the dataset to show in the interface.
 * The name can be up to 32 characters long and can consist only of
 * ASCII Latin letters A-Z and a-z, underscores (_), and ASCII digits 0-9.
 * Must be unique within the scope of the provided GCP Project and Location.
 * @param project {string} Required. Your Google Cloud Project ID.
 */
function sampleCreateDataset(displayName, project) {
  const client = new automl.AutoMlClient();
  // const displayName = 'My_Dataset_Name_123';
  // const project = '[Google Cloud Project ID]';
  const formattedParent = client.locationPath(project, 'us-central1');

  // User-provided description of dataset (optional)
  const description = 'Description of this dataset';

  // Initialized video_object_tracking_dataset_metadata field must be provided.
  // This specifies this Dataset is to be used for video object tracking.
  const videoObjectTrackingDatasetMetadata = {};
  const dataset = {
    displayName: displayName,
    description: description,
    videoObjectTrackingDatasetMetadata: videoObjectTrackingDatasetMetadata,
  };
  const request = {
    parent: formattedParent,
    dataset: dataset,
  };
  client
    .createDataset(request)
    .then(responses => {
      const response = responses[0];
      console.log(`Created Dataset.`);
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

// [END automl_video_object_tracking_create_dataset]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('display_name', {
    default: 'My_Dataset_Name_123',
    string: true,
  })
  .option('project', {
    default: '[Google Cloud Project ID]',
    string: true,
  }).argv;

sampleCreateDataset(argv.display_name, argv.project);
