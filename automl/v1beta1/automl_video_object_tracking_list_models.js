// DO NOT EDIT! This is a generated sample ("RequestAsyncPagedAll",  "automl_video_object_tracking_list_models")
'use strict';

// sample-metadata:
//   title: List Models
//   description: List models and print details of each dataset
//   usage: node samples/v1beta1/automl_video_object_tracking_list_models.js [--filter "video_object_tracking_model_metadata:*"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_list_models]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * List models and print details of each dataset
 *
 * @param filter {string} An expression for filtering the results of the request.
 * This filters for Models which have video_object_tracking_model_metadata.
 * @param project {string} Required. Your Google Cloud Project ID.
 */
function sampleListModels(filter, project) {
  const client = new automl.AutoMlClient();
  // Iterate over all elements.
  // const filter = 'video_object_tracking_model_metadata:*';
  // const project = '[Google Cloud Project ID]';
  const formattedParent = client.locationPath(project, 'us-central1');
  const request = {
    parent: formattedParent,
    filter: filter,
  };

  client
    .listModels(request)
    .then(responses => {
      const resources = responses[0];
      for (const resource of resources) {
        const model = resource;
        // Print out the full name of the created model.
        //
        // This will have the format:
        //   projects/[Google Cloud Project Number]/locations/us-central1/models/VOT1234567890123456789
        //
        // The Model ID is the generated identifer in this path, e.g. VOT1234567890123456789
        // You will need this ID to perform operations on the model including predictions.
        //
        console.log(`Model name: ${model.name}`);
        // Print out the Display Name (the text you provided during creation)
        console.log(`Display name: ${model.displayName}`);
        // Print out the ID of the dataset used to create this model.
        //
        // Note: this is the Dataset ID, e.g. VOT1234567890123456789
        //
        console.log(`Dataset ID: ${model.datasetId}`);
        console.log(`Create time: ${model.createTime}`);
        console.log(`Update time: ${model.updateTime}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

// [END automl_video_object_tracking_list_models]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('filter', {
    default: 'video_object_tracking_model_metadata:*',
    string: true,
  })
  .option('project', {
    default: '[Google Cloud Project ID]',
    string: true,
  }).argv;

sampleListModels(argv.filter, argv.project);
