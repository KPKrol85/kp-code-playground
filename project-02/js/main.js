import { createExperimentManager } from './core/createExperimentManager.js';
import { createColorMixerExperiment } from './experiments/colorMixer.js';
import { createTypeScaleExperiment } from './experiments/typeScale.js';
import { createMotionBoxExperiment } from './experiments/motionBox.js';

const experiments = [
  createColorMixerExperiment(),
  createTypeScaleExperiment(),
  createMotionBoxExperiment()
];

const manager = createExperimentManager({
  experiments,
  switcherNode: document.querySelector('.experiment-switcher'),
  rootNode: document.querySelector('#experiment-root')
});

manager.start();
