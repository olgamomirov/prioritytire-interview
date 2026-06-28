/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../gql/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/** Defines a filter that matches the input exactly. */
export type FilterEqualTypeInput = {
  /** Use this attribute to exactly match the specified string. For example, to filter on a specific category ID, specify a value such as `5`. */
  eq?: string | null | undefined;
  /** Use this attribute to filter on an array of values. For example, to filter on category IDs 4, 5, and 6, specify a value of `["4", "5", "6"]`. */
  in?: Array<string | null | undefined> | null | undefined;
};

/** Defines a filter that performs a fuzzy search. */
export type FilterMatchTypeInput = {
  /** Use this attribute to exactly match the specified string. For example, to filter on a specific SKU, specify a value such as `24-MB01`. */
  match?: string | null | undefined;
};

/** Defines a filter that matches a range of values, such as prices or dates. */
export type FilterRangeTypeInput = {
  /** Use this attribute to specify the lowest possible value in the range. */
  from?: string | null | undefined;
  /** Use this attribute to specify the highest possible value in the range. */
  to?: string | null | undefined;
};

/** Defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type ProductAttributeFilterInput = {
  /** Attribute label: Activity */
  activity?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Brand */
  brand?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Category Gear */
  category_gear?: FilterEqualTypeInput | null | undefined;
  /** Deprecated: use `category_uid` to filter product by category ID. */
  category_id?: FilterEqualTypeInput | null | undefined;
  /** Filter product by the unique ID for a `CategoryInterface` object. */
  category_uid?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Climate */
  climate?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Collar */
  collar?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Color */
  color?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Colors */
  colors?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Compatible Phones */
  compatible_phones?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Debug: colors */
  debug_colors?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Debug: labels */
  debug_labels?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Debug: landmarks */
  debug_landmarks?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Description */
  description?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Dominant color */
  dominant_color?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Eco Collection */
  eco_collection?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Erin Recommends */
  erin_recommends?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Features */
  features_bags?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Format */
  format?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Gender */
  gender?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Material */
  material?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Product Name */
  name?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: New */
  new?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Pattern */
  pattern?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Performance Fabric */
  performance_fabric?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Price */
  price?: FilterRangeTypeInput | null | undefined;
  /** Attribute label: Art */
  print_art?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Holiday */
  print_holiday?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Search Labels */
  print_labels?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Search Landmarks */
  print_landmarks?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Landscape */
  print_landscape?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Mood */
  print_mood?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Type */
  print_type?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Sale */
  sale?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Short Description */
  short_description?: FilterMatchTypeInput | null | undefined;
  /** Attribute label: Size */
  size?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: SKU */
  sku?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Sleeve */
  sleeve?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Special Price */
  special_price?: FilterRangeTypeInput | null | undefined;
  /** Attribute label: Strap/Handle */
  strap_bags?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Style Bags */
  style_bags?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Style Bottom */
  style_bottom?: FilterEqualTypeInput | null | undefined;
  /** Attribute label: Style General */
  style_general?: FilterEqualTypeInput | null | undefined;
  /** The part of the URL that identifies the product */
  url_key?: FilterEqualTypeInput | null | undefined;
};

export type ProductsSlugQueryVariables = Exact<{
  pageSize?: number | null | undefined;
  filter?: Types.ProductAttributeFilterInput | null | undefined;
}>;


export type ProductsSlugQuery = { products: { items: Array<
      | { url_key: string | null }
      | { url_key: string | null }
      | { url_key: string | null }
      | { url_key: string | null }
      | { url_key: string | null }
      | { url_key: string | null }
     | null> | null } | null };


export const ProductsSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductsSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductAttributeFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url_key"}}]}}]}}]}}]} as unknown as DocumentNode<ProductsSlugQuery, ProductsSlugQueryVariables>;