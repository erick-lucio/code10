// DO NOT EDIT! This is a generated sample ("RequestAsyncPagedAll",  "automl_video_object_tracking_list_model_evaluations")
'use strict';

// sample-metadata:
//   title: List Model Evaluations
//   description: List Model Evaluations
//   usage: node samples/v1beta1/automl_video_object_tracking_list_model_evaluations.js [--project "[Google Cloud Project ID]"] [--model_id "[Model ID]"]

// [START automl_video_object_tracking_list_model_evaluations]

const automl = require('@google-cloud/automl').v1beta1;

/**
 * List Model Evaluations
 *
 * @param modelId {string} Model ID, e.g. VOT1234567890123456789
 */
function sampleListModelEvaluations(project, modelId) {
  const client = new automl.AutoMlClient();
  // Iterate over all elements.
  // const project = '[Google Cloud Project ID]';
  // const modelId = '[Model ID]';
  const formattedParent = client.modelPath(project, 'us-central1', modelId);

  client
    .listModelEvaluations({parent: formattedParent})
    .then(responses => {
      const resources = responses[0];
      for (const resource of resources) {
        const evaluation = resource;
        console.log(`Model evaluation: ${evaluation.name}`);
        console.log(`Display name: ${evaluation.displayName}`);
        console.log(
          `Evaluated example count: ${evaluation.evaluatedExampleCount}`
        );
        const videoMetrics = evaluation.videoObjectTrackingEvaluationMetrics;
        // The number of video frames used to create this evaluation.
        console.log(
          `Evaluated Frame Count: ${videoMetrics.evaluatedFrameCount}`
        );
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
      }
    })
    .catch(err => {
      console.error(err);
    });
}

// [END automl_video_object_tracking_list_model_evaluations]
// tslint:disable-next-line:no-any

const argv = require(`yargs`)
  .option('project', {
    default: '[Google Cloud Project ID]',
    string: true,
  })
  .option('model_id', {
    default: '[Model ID]',
    string: true,
  }).argv;

sampleListModelEvaluations(argv.project, argv.model_id);
