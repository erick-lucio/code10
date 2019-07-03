// DO NOT EDIT! This is a generated sample ("LongRunningPromiseAwait",  "automl_video_object_tracking_delete_model")
'use strict';

// sample-metadata:
//   title: Delete Model
//   description: Delete Model
//   usage: node samples/v1beta1/automl_video_object_tracking_delete_model.js [--model_id "[Model ID]"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_delete_model]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * Delete Model
 *
 * @param modelId {string} Model ID, e.g. VOT1234567890123456789
 * @param project {string} Required. Your Google Cloud Project ID.
 */
async function sampleDeleteModel(modelId, project) {
  const client = new automl.AutoMlClient();
  // const modelId = '[Model ID]';
  // const project = '[Google Cloud Project ID]';
  const formattedName = client.modelPath(project, 'us-central1', modelId);

  // Create a job whose results you can either wait for now, or get later
  const [operation] = await client.deleteModel({name: formattedName});

  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();

  console.log(`Deleted Model.`);
}

// [END automl_video_object_tracking_delete_model]
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

sampleDeleteModel(argv.model_id, argv.project).catch(console.error);
