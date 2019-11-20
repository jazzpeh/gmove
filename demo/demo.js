import {GMove} from '../src';

GMove.to('#s1', {
  duration: 2000,
  x: '+200px',
});

// GMove.to('#s2', {
//   duration: 4000,
//   y: '+200px',
// });

GMove.to('#s3', {
  duration: 1000,
  opacity: 0,
});

GMove.to('#s4', {
  duration: 1000,
  delay: 1000,
  opacity: 1,
});
