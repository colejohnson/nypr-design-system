import Controller from '@ember/controller';

// BEGIN-SNIPPET sample-gallery.js
export const GALLERY = [{
  caption: 'This is a slide caption',
  credit: 'Getty',
  src: 'https://picsum.photos/600/300?random',
  full: 'https://picsum.photos/600/300?random',
  title: 'This is what a slide title looks like',
}, {
  caption: 'This is a slide only a caption; no title or credit',
  src: 'https://picsum.photos/600/300?random=1',
  full: 'https://picsum.photos/600/300?random=1',
}, {
  title: 'This is a slide with only a title',
  src: 'https://picsum.photos/600/300?random=2',
  full: 'https://picsum.photos/600/300?random=2',
}, {
  caption: 'This is a slide with no title; just caption & credit',
  credit: 'Foo Bar/AP News',
  src: 'https://picsum.photos/600/300?random=3',
  full: 'https://picsum.photos/600/300?random=3',
}];
// END-SNIPPET


export default Controller.extend({
  GALLERY,
});
