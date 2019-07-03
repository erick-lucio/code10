// DO NOT EDIT! This is a generated sample ("Request",  "automl_video_object_tracking_get_model_evaluation")
'use strict';

// sample-metadata:
//   title: Get Model Evaluation
//   description: Get Model Evaluation
//   usage: node samples/v1beta1/automl_video_object_tracking_get_model_evaluation.js [--evaluation_id "[Model Evaluation ID]"] [--model_id "[Model ID]"] [--project "[Google Cloud Project ID]"]

// [START automl_video_object_tracking_get_model_evaluation]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * Get Model Evaluation
 *
 * @param modelId {string} Model ID, e.g. VOT1234567890123456789
 * @param project {string} Required. Your Google Cloud Project ID.
 */
function sampleGetModelEvaluation(evaluationId, modelId, project) {
  const client = new automl.AutoMlClient();
  // const evaluationId = '[Model Evaluation ID]';
  // const modelId = '[Model ID]';
  // const project = '[Google Cloud Project ID]';
  const formattedName = client.modelEvaluationPath(
    project,
    'us-central1',
    modelId,
    evaluationId
  );
  client
    .getModelEvaluation({name: formattedName})
    .then(responses => {
      const response = responses[0];
      const evaluation = response;
      console.log(`Model evaluation: ${evaluation.name}`);
      console.log(`Display name: ${evaluation.displayName}`);
      console.log(
        `Evaluated example count: ${evaluation.evaluatedExampleCount}`
      );
      const videoMetrics = evaluation.videoObjectTrackingEvaluationMetrics;
      // The number of video frames used to create this evaluation.
      console.log(`Evaluated Frame Count: ${videoMetrics.evaluatedFrameCount}`);
      // The total number of bounding boxes (i.e. summed over all frames)
      // the ground truth used to create this evaluation had.
      //
      console.log(
        `Evaluated Bounding Box Count: ${
          videoMetrics.evaluatedBoundingBoxCount
        }`
      );
      // The single metric for bounding boxes evaluation: the mean_average_precision
      // averaged over all bounding_box_metrics_entries.
      //
      console.log(
        `Bounding Box Mean Average Precision: ${
          videoMetrics.boundingBoxMeanAveragePrecision
        }`
      );
      // The bounding boxes match metrics for each Intersection-over-union threshold
      // 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99 and each label confidence threshold
      // 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99 pair.
      //
      for (const boundingBoxMetricsEntry of videoMetrics.boundingBoxMetricsEntries) {
        // The intersection-over-union threshold value used to compute this metrics entry.
        //
        console.log(`IoU Threshold: ${boundingBoxMetricsEntry.iouThreshold}`);
        // The mean average precision, most often close to au_prc.
        //
        console.log(
          `Mean Average Precision: ${
            boundingBoxMetricsEntry.meanAveragePrecision
          }`
        );
        // Metrics for each label-match confidence_threshold from
        // 0.05,0.10,...,0.95,0.96,0.97,0.98,0.99. =
        // Precision-recall curve is derived from them.
        //
        for (const confidenceMetricsEntry of boundingBoxMetricsEntry.confidenceMetricsEntries) {
          // The confidence threshold value used to compute the metrics.
          console.log(
            `Confidence Threshold: ${
              confidenceMetricsEntry.confidenceThreshold
            }`
          );
          // Recall under the given confidence threshold.
          console.log(`Recall ${confidenceMetricsEntry.recall}`);
          // Precision under the given confidence threshold.
          console.log(`Precision: ${confidenceMetricsEntry.precision}`);
          // The harmonic mean of recall and precision.
          console.log(`F1 Score: ${confidenceMetricsEntry.f1Score}`);
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
}

// [END automl_video_object_tracking_get_model_evaluation]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('evaluation_id', {
    default: '[Model Evaluation ID]',
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

sampleGetModelEvaluation(argv.evaluation_id, argv.model_id, argv.project);
