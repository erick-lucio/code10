// DO NOT EDIT! This is a generated sample ("LongRunningStartThenCancel",  "automl_video_object_tracking_create_model")
'use strict';

// sample-metadata:
//   title: Create Model
//   description: Create a model
//   usage: node samples/v1beta1/automl_video_object_tracking_create_model.js [--display_name "My_Model_Name_123"] [--dataset_id "[Dataset ID]"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_create_model]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * Create a model
 *
 * @param displayName {string} The name of the model to show in the interface.
 * The name can be up to 32 characters long and can consist only of
 * ASCII Latin letters A-Z and a-z, underscores (_), and ASCII digits 0-9.
 * Must be unique within the scope of the provided GCP Project and Location.
 * @param datasetId {string} Required. The resource ID of the dataset used to create the model.
 * The dataset must come from the same ancestor project and location.
 * @param project {string} Required. Your Google Cloud Project ID.
 */
async function sampleCreateModel(displayName, datasetId, project) {
  const client = new automl.AutoMlClient();
  // const displayName = 'My_Model_Name_123';
  // const datasetId = '[Dataset ID]';
  // const project = '[Google Cloud Project ID]';
  const formattedParent = client.locationPath(project, 'us-central1');

  // Initialized video_object_tracking_model_metadata field must be provided.
  // This specifies this Dataset is to be used for video object tracking.
  const videoObjectTrackingModelMetadata = {};
  const model = {
    displayName: displayName,
    datasetId: datasetId,
    videoObjectTrackingModelMetadata: videoObjectTrackingModelMetadata,
  };
  const request = {
    parent: formattedParent,
    model: model,
  };
  const [operation] = await client.createModel(request);

  // The long-running operation has started.

  // Store the operation name to poll for operation status:
  const name = operation.latestResponse.name;
  console.log(`Started long-running operation: ${name}`);
}

// [END automl_video_object_tracking_create_model]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('display_name', {
    default: 'My_Model_Name_123',
    string: true,
  })
  .option('dataset_id', {
    default: '[Dataset ID]',
    string: true,
  })
  .option('project', {
    default: '[Google Cloud Project ID]',
    string: true,
  }).argv;

sampleCreateModel(argv.display_name, argv.dataset_id, argv.project);
