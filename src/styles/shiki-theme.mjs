/**
 * Palette-matched syntax theme. A stock theme drags in blues and purples that
 * have no place in the MFD direction, so every colour here comes from
 * DESIGN.md tokens: phosphor green foreground, magenta keywords, amber strings.
 */
export const shikiTheme = {
  name: 'uncommon-solid',
  type: 'dark',
  colors: {
    'editor.background': '#000000',
    'editor.foreground': '#A9C4B4',
  },
  settings: [
    {
      settings: {
        background: '#000000',
        foreground: '#A9C4B4',
      },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#3F6650', fontStyle: 'italic' },
    },
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.operator.new',
        'storage',
        'storage.type',
        'storage.modifier',
        'variable.language',
        'constant.language',
        'entity.name.tag',
      ],
      settings: { foreground: '#FF6FD0' },
    },
    {
      scope: ['string', 'string.quoted', 'string.template', 'constant.character'],
      settings: { foreground: '#FFC24D' },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language.boolean',
        'constant.language.null',
        'constant.other',
      ],
      settings: { foreground: '#FFC24D' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: { foreground: '#2FE07A' },
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
      settings: { foreground: '#9BFFC4' },
    },
    {
      scope: ['variable', 'variable.other', 'meta.definition.variable'],
      settings: { foreground: '#D8EFE1' },
    },
    {
      scope: ['variable.parameter', 'entity.other.attribute-name'],
      settings: { foreground: '#7FA891' },
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator'],
      settings: { foreground: '#6B8F7C' },
    },
    {
      scope: ['markup.inserted'],
      settings: { foreground: '#2FE07A' },
    },
    {
      scope: ['markup.deleted'],
      settings: { foreground: '#FF6FD0' },
    },
    {
      scope: ['markup.heading', 'markup.bold'],
      settings: { foreground: '#9BFFC4', fontStyle: 'bold' },
    },
  ],
};
