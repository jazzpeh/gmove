import {GMove} from '../src';

GMove.to('#s1', {
  duration: 2000,
  x: 200,
});

GMove.to('#s2', {
  duration: 2000,
  x: '+200px',
});

GMove.to('#s3', {
  duration: 4000,
  x: '+50%',
});

GMove.to('#s4', {
  duration: 4000,
  y: '+150px',
});

GMove.to('#s5', {
  duration: 2000,
  x: '+250px',
  y: '+150px',
  opacity: 0,
});

GMove.to('#s6', {
  duration: 1000,
  opacity: 0,
});

GMove.to('#s7', {
  duration: 1000,
  delay: 1000,
  opacity: 1,
});

GMove.to('#s8', {
  duration: 4000,
  x: '+50%',
});

GMove.to('#s9', {
  duration: 4000,
  x: 100,
});
