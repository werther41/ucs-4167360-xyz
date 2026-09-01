/** A label/value pair in a MetaTable readout. */
export interface MetaRow {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  /** Amber marks work in progress; phos marks a live or linked value. */
  tone?: 'value' | 'phos' | 'amber';
}
