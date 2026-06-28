/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query CategoriesSlug {\n  categories {\n    items {\n      name\n      url_key\n      level\n      children {\n        name\n        url_key\n        level\n        children {\n          name\n          url_key\n          level\n          children {\n            name\n            url_key\n            level\n          }\n        }\n      }\n    }\n  }\n}": typeof types.CategoriesSlugDocument,
    "query CategoryDetail($filters: CategoryFilterInput) {\n  categories(filters: $filters) {\n    items {\n      name\n      meta_title\n      meta_description\n      description\n      products {\n        items {\n          url_key\n          name\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n              final_price {\n                value\n                currency\n              }\n            }\n          }\n          thumbnail {\n            label\n            url\n          }\n        }\n      }\n    }\n  }\n}": typeof types.CategoryDetailDocument,
    "query ProductDetail($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      name\n      meta_title\n      meta_description\n      media_gallery {\n        url\n        label\n      }\n      thumbnail {\n        label\n        url\n      }\n      uid\n      url_key\n      categories {\n        name\n      }\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            currency\n            value\n          }\n        }\n      }\n      ... on ConfigurableProduct {\n        configurable_options {\n          label\n          values {\n            label\n            swatch_data {\n              value\n              ... on ImageSwatchData {\n                thumbnail\n              }\n            }\n          }\n        }\n      }\n      description {\n        html\n      }\n      short_description {\n        html\n      }\n    }\n  }\n}": typeof types.ProductDetailDocument,
    "query ProductPrice($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            currency\n            value\n          }\n        }\n      }\n    }\n  }\n}": typeof types.ProductPriceDocument,
    "query ProductsSlug($pageSize: Int, $filter: ProductAttributeFilterInput) {\n  products(pageSize: $pageSize, filter: $filter) {\n    items {\n      url_key\n    }\n  }\n}": typeof types.ProductsSlugDocument,
    "query RecommendedProducts($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      name\n      url_key\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            value\n            currency\n          }\n        }\n      }\n      thumbnail {\n        url\n        label\n      }\n    }\n  }\n}": typeof types.RecommendedProductsDocument,
};
const documents: Documents = {
    "query CategoriesSlug {\n  categories {\n    items {\n      name\n      url_key\n      level\n      children {\n        name\n        url_key\n        level\n        children {\n          name\n          url_key\n          level\n          children {\n            name\n            url_key\n            level\n          }\n        }\n      }\n    }\n  }\n}": types.CategoriesSlugDocument,
    "query CategoryDetail($filters: CategoryFilterInput) {\n  categories(filters: $filters) {\n    items {\n      name\n      meta_title\n      meta_description\n      description\n      products {\n        items {\n          url_key\n          name\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n              final_price {\n                value\n                currency\n              }\n            }\n          }\n          thumbnail {\n            label\n            url\n          }\n        }\n      }\n    }\n  }\n}": types.CategoryDetailDocument,
    "query ProductDetail($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      name\n      meta_title\n      meta_description\n      media_gallery {\n        url\n        label\n      }\n      thumbnail {\n        label\n        url\n      }\n      uid\n      url_key\n      categories {\n        name\n      }\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            currency\n            value\n          }\n        }\n      }\n      ... on ConfigurableProduct {\n        configurable_options {\n          label\n          values {\n            label\n            swatch_data {\n              value\n              ... on ImageSwatchData {\n                thumbnail\n              }\n            }\n          }\n        }\n      }\n      description {\n        html\n      }\n      short_description {\n        html\n      }\n    }\n  }\n}": types.ProductDetailDocument,
    "query ProductPrice($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            currency\n            value\n          }\n        }\n      }\n    }\n  }\n}": types.ProductPriceDocument,
    "query ProductsSlug($pageSize: Int, $filter: ProductAttributeFilterInput) {\n  products(pageSize: $pageSize, filter: $filter) {\n    items {\n      url_key\n    }\n  }\n}": types.ProductsSlugDocument,
    "query RecommendedProducts($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      name\n      url_key\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            value\n            currency\n          }\n        }\n      }\n      thumbnail {\n        url\n        label\n      }\n    }\n  }\n}": types.RecommendedProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesSlug {\n  categories {\n    items {\n      name\n      url_key\n      level\n      children {\n        name\n        url_key\n        level\n        children {\n          name\n          url_key\n          level\n          children {\n            name\n            url_key\n            level\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query CategoriesSlug {\n  categories {\n    items {\n      name\n      url_key\n      level\n      children {\n        name\n        url_key\n        level\n        children {\n          name\n          url_key\n          level\n          children {\n            name\n            url_key\n            level\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryDetail($filters: CategoryFilterInput) {\n  categories(filters: $filters) {\n    items {\n      name\n      meta_title\n      meta_description\n      description\n      products {\n        items {\n          url_key\n          name\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n              final_price {\n                value\n                currency\n              }\n            }\n          }\n          thumbnail {\n            label\n            url\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query CategoryDetail($filters: CategoryFilterInput) {\n  categories(filters: $filters) {\n    items {\n      name\n      meta_title\n      meta_description\n      description\n      products {\n        items {\n          url_key\n          name\n          price_range {\n            minimum_price {\n              regular_price {\n                value\n                currency\n              }\n              final_price {\n                value\n                currency\n              }\n            }\n          }\n          thumbnail {\n            label\n            url\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductDetail($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      name\n      meta_title\n      meta_description\n      media_gallery {\n        url\n        label\n      }\n      thumbnail {\n        label\n        url\n      }\n      uid\n      url_key\n      categories {\n        name\n      }\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            currency\n            value\n          }\n        }\n      }\n      ... on ConfigurableProduct {\n        configurable_options {\n          label\n          values {\n            label\n            swatch_data {\n              value\n              ... on ImageSwatchData {\n                thumbnail\n              }\n            }\n          }\n        }\n      }\n      description {\n        html\n      }\n      short_description {\n        html\n      }\n    }\n  }\n}"): (typeof documents)["query ProductDetail($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      name\n      meta_title\n      meta_description\n      media_gallery {\n        url\n        label\n      }\n      thumbnail {\n        label\n        url\n      }\n      uid\n      url_key\n      categories {\n        name\n      }\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            currency\n            value\n          }\n        }\n      }\n      ... on ConfigurableProduct {\n        configurable_options {\n          label\n          values {\n            label\n            swatch_data {\n              value\n              ... on ImageSwatchData {\n                thumbnail\n              }\n            }\n          }\n        }\n      }\n      description {\n        html\n      }\n      short_description {\n        html\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductPrice($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            currency\n            value\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query ProductPrice($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            currency\n            value\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsSlug($pageSize: Int, $filter: ProductAttributeFilterInput) {\n  products(pageSize: $pageSize, filter: $filter) {\n    items {\n      url_key\n    }\n  }\n}"): (typeof documents)["query ProductsSlug($pageSize: Int, $filter: ProductAttributeFilterInput) {\n  products(pageSize: $pageSize, filter: $filter) {\n    items {\n      url_key\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RecommendedProducts($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      name\n      url_key\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            value\n            currency\n          }\n        }\n      }\n      thumbnail {\n        url\n        label\n      }\n    }\n  }\n}"): (typeof documents)["query RecommendedProducts($filter: ProductAttributeFilterInput) {\n  products(filter: $filter) {\n    items {\n      name\n      url_key\n      price_range {\n        minimum_price {\n          regular_price {\n            value\n            currency\n          }\n          final_price {\n            value\n            currency\n          }\n        }\n      }\n      thumbnail {\n        url\n        label\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;