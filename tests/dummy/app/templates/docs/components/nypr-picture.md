## `nypr-picture`

Render a `<picture />` element with `srcset` values set for provided breakpoints.

All arguments are provided below.

{{#docs-demo as |demo|}}
  {{#demo.example name='picture-example.hbs'}}
    {{nypr-picture
      break-xl=1200
      src-xl='https://picsum.photos/1200/800'
      break-l=1000
      src-l='https://picsum.photos/1000/600'
      break-m=800
      src-m='https://picsum.photos/800/500'
      break-s=600
      src-s='https://picsum.photos/600/400'
      alt='Pass in an alt tag'
    }}
  {{/demo.example}}

  {{demo.snippet name='picture-example.hbs' label='Usage'}}
{{/docs-demo}}
