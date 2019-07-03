// DO NOT EDIT! This is a generated sample ("RequestAsyncPagedAll",  "automl_video_object_tracking_list_datasets")
'use strict';

// sample-metadata:
//   title: List Datasets
//   description: List datasets and print each details of each dataset
//   usage: node samples/v1beta1/automl_video_object_tracking_list_datasets.js [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_list_datasets]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * List datasets and print each details of each dataset
 *
 * @param project {string} Required. Your Google Cloud Project ID.
 */
function sampleListDatasets(project) {
  const client = new automl.AutoMlClient();
  // Iterate over all elements.
  // const project = '[Google Cloud Project ID]';
  const formattedParent = client.locationPath(project, 'us-central1');

  // An expression for filtering the results of the request.
  // This filters for Datasets which have video_object_tracking_dataset_metadata.
  const filter = 'video_object_tracking_dataset_metadata:*';
  const request = {
    parent: formattedParent,
    filter: filter,
  };

  client
    .listDatasets(request)
    .then(responses => {
      const resources = responses[0];
      for (const resource of resources) {
        const dataset = resource;
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
      }
    })
    .catch(err => {
      console.error(err);
    });
}

// [END automl_video_object_tracking_list_datasets]
// tslint:disable-next-line:no-any

const argv = require(`yargs`).option('project', {
  default: '[Google Cloud Project ID]',
  string: true,
}).argv;

sampleListDatasets(argv.project);
