// DO NOT EDIT! This is a generated sample ("LongRunningPromiseAwait",  "automl_video_object_tracking_batch_predict")
'use strict';

// sample-metadata:
//   title: AutoML Batch Predict
//   description: AutoML Batch Predict
//   usage: node samples/v1beta1/automl_video_object_tracking_batch_predict.js [--gcs_output_prefix "[gs://your-output-bucket/your-object-id]"] [--model_id "[Model ID]"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_batch_predict]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * AutoML Batch Predict
 *
 * @param gcsOutputPrefix {string} Identifies where to store the output of your prediction request
 * in your Google Cloud Storage bucket.
 * You must have write permissions to the Google Cloud Storage bucket.
 * @param modelId {string} Model ID, e.g. VOT1234567890123456789
 * @param project {string} Required. Your Google Cloud Project ID.
 */
async function sampleBatchPredict(gcsOutputPrefix, modelId, project) {
  const client = new automl.PredictionServiceClient();
  // const gcsOutputPrefix = '[gs://your-output-bucket/your-object-id]';
  // const modelId = '[Model ID]';
  // const project = '[Google Cloud Project ID]';
  const formattedName = client.modelPath(project, 'us-central1', modelId);
  const inputUrisElement =
    'gs://automl-video-datasets/youtube_8m_videos_animal_batchpredict.csv';
  const inputUris = [inputUrisElement];
  const gcsSource = {
    inputUris: inputUris,
  };
  const inputConfig = {
    gcsSource: gcsSource,
  };
  const gcsDestination = {
    outputUriPrefix: gcsOutputPrefix,
  };
  const outputConfig = {
    gcsDestination: gcsDestination,
  };

  // A value from 0.0 to 1.0. When the model detects objects on video frames,
  // it will only produce bounding boxes that have at least this confidence score.
  // The default is 0.5.
  const paramsItem = '0.0';
  const params = {score_threshold: paramsItem};
  const request = {
    name: formattedName,
    inputConfig: inputConfig,
    outputConfig: outputConfig,
    params: params,
  };

  // Create a job whose results you can either wait for now, or get later
  const [operation] = await client.batchPredict(request);

  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();

  console.log(`Batch Prediction results saved to Cloud Storage`);
}

// [END automl_video_object_tracking_batch_predict]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('gcs_output_prefix', {
    default: '[gs://your-output-bucket/your-object-id]',
    string: true,
  })
  .option('model_id', {
    default: '[Model ID]',
    string: true,
  })
  .option('project', {
    default: '[Google Cloud Project ID]',
    string: true,
  }).argv;

sampleBatchPredict(argv.gcs_output_prefix, argv.model_id, argv.project).catch(
  console.error
);
