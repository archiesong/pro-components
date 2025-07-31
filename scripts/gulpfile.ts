import { series, task } from 'gulp';
import { genVersionStart } from './genVersion';

task('version', series(genVersionStart));
