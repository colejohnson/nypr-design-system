## `nypr-m-block-meta`

Render a story tease with the passed in arguments.

### Examples
<DocsDemo as |demo|>
  <demo.example @name='block-meta-example.hbs'>
    <NyprMBlockMeta
      @authors={{array (hash name='Jen Chung') (hash name='Jake Dobkin')}}
      @commentCount=100
    />
  </demo.example>

  <demo.snippet @name='block-meta-example.hbs' @label='Usage'/>
  <demo.snippet @name='nypr-m-block-meta.js' @label='nypr-m-block-meta.js'/>
  <demo.snippet @name='nypr-m-block-meta.hbs' @label='nypr-m-block-meta.hbs'/>
</DocsDemo>
