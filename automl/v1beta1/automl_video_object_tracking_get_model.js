// DO NOT EDIT! This is a generated sample ("Request",  "automl_video_object_tracking_get_model")
'use strict';

// sample-metadata:
//   title: Get Model
//   description: Get model and print model details
//   usage: node samples/v1beta1/automl_video_object_tracking_get_model.js [--model_id "[Model ID]"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_get_model]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * Get model and print model details
 *
 * @param modelId {string} Model ID, e.g. VOT1234567890123456789
 * @param project {string} Required. Your Google Cloud Project ID.
 */
function sampleGetModel(modelId, project) {
  const client = new automl.AutoMlClient();
  // const modelId = '[Model ID]';
  // const project = '[Google Cloud Project ID]';
  const formattedName = client.modelPath(project, 'us-central1', modelId);
  client
    .getModel({name: formattedName})
    .then(responses => {
      const response = responses[0];
      const model = response;
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
    })
    .catch(err => {
      console.error(err);
    });
}

// [END automl_video_object_tracking_get_model]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('model_id', {
    default: '[Model ID]',
    string: true,
  })
  .option('project', {
    default: '[Google Cloud Project ID]',
    string: true,
  }).argv;

sampleGetModel(argv.model_id, argv.project);
