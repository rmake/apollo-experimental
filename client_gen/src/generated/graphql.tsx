import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `Time` scalar type represents a Time value as
   * specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Time: any;
};

export type Query = {
   __typename?: 'Query';
  /** The ID of the object */
  cinemaDetail?: Maybe<CinemaDetailNode>;
  allCinemaDetails?: Maybe<CinemaDetailNodeConnection>;
  /** The ID of the object */
  filmographyType?: Maybe<FilmographyTypeNode>;
  allFilmographyTypes?: Maybe<FilmographyTypeNodeConnection>;
  /** The ID of the object */
  genreType?: Maybe<GenreTypeNode>;
  allGenreTypes?: Maybe<GenreTypeNodeConnection>;
  /** The ID of the object */
  job?: Maybe<JobBoardNode>;
  allJobs?: Maybe<JobBoardNodeConnection>;
  /** The ID of the object */
  company?: Maybe<CompanyNode>;
  allCompanies?: Maybe<CompanyNodeConnection>;
  /** The ID of the object */
  jobsTag?: Maybe<JobTagNode>;
  allJobTags?: Maybe<JobTagNodeConnection>;
  /** The ID of the object */
  newsTag?: Maybe<NewsTagNode>;
  allNewsTags?: Maybe<NewsTagNodeConnection>;
  /** The ID of the object */
  news?: Maybe<NewsNode>;
  allNews?: Maybe<NewsNodeConnection>;
  /** The ID of the object */
  role?: Maybe<RoleNode>;
  allRoles?: Maybe<RoleNodeConnection>;
  /** The ID of the object */
  contentTag?: Maybe<ContentTagNode>;
  allContentTags?: Maybe<ContentTagNodeConnection>;
  /** The ID of the object */
  cinemaSchedule?: Maybe<CinemaScheduleNode>;
  allCinemaSchedules?: Maybe<CinemaScheduleNodeConnection>;
  /** The ID of the object */
  showtime?: Maybe<ShowtimeNode>;
  allShowtimes?: Maybe<ShowtimeNodeConnection>;
};


export type QueryCinemaDetailArgs = {
  id: Scalars['ID'];
};


export type QueryAllCinemaDetailsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryFilmographyTypeArgs = {
  id: Scalars['ID'];
};


export type QueryAllFilmographyTypesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGenreTypeArgs = {
  id: Scalars['ID'];
};


export type QueryAllGenreTypesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryJobArgs = {
  id: Scalars['ID'];
};


export type QueryAllJobsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  jobTitle?: Maybe<Scalars['String']>;
  jobTitle_Icontains?: Maybe<Scalars['String']>;
  jobTitle_Istartswith?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['ID']>;
  company_Icontains?: Maybe<Scalars['ID']>;
  company_Istartswith?: Maybe<Scalars['ID']>;
  genderMf?: Maybe<Scalars['String']>;
};


export type QueryCompanyArgs = {
  id: Scalars['ID'];
};


export type QueryAllCompaniesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  companyName?: Maybe<Scalars['String']>;
  establishedIn?: Maybe<Scalars['String']>;
};


export type QueryJobsTagArgs = {
  id: Scalars['ID'];
};


export type QueryAllJobTagsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryNewsTagArgs = {
  id: Scalars['ID'];
};


export type QueryAllNewsTagsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryNewsArgs = {
  id: Scalars['ID'];
};


export type QueryAllNewsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryAllRolesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryContentTagArgs = {
  id: Scalars['ID'];
};


export type QueryAllContentTagsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCinemaScheduleArgs = {
  id: Scalars['ID'];
};


export type QueryAllCinemaSchedulesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryShowtimeArgs = {
  id: Scalars['ID'];
};


export type QueryAllShowtimesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** Represents the details for cinemas listed on EtMDB. */
export type CinemaDetailNode = Node & {
   __typename?: 'CinemaDetailNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  hallName: Scalars['String'];
  numberOfSeats: Scalars['Int'];
  technology: Scalars['String'];
  cinemascheduleSet?: Maybe<CinemaScheduleNodeConnection>;
};


/** Represents the details for cinemas listed on EtMDB. */
export type CinemaDetailNodeCinemascheduleSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};


export type CinemaScheduleNodeConnection = {
   __typename?: 'CinemaScheduleNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CinemaScheduleNodeEdge>>;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type CinemaScheduleNodeEdge = {
   __typename?: 'CinemaScheduleNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<CinemaScheduleNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Represents a Cinema Schedule. */
export type CinemaScheduleNode = Node & {
   __typename?: 'CinemaScheduleNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  showStartDate?: Maybe<Scalars['DateTime']>;
  showEndDate?: Maybe<Scalars['DateTime']>;
  movie: MovieMetaDataNode;
  cinemaDetail: CinemaDetailNode;
};

/** Represents a movie on EtMDB. */
export type MovieMetaDataNode = Node & {
   __typename?: 'MovieMetaDataNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  movieTitle: Scalars['String'];
  releaseDate: Scalars['DateTime'];
  durationMinutes: Scalars['Int'];
  ageRestriction: MovieMetaDataAgeRestriction;
  budget: Scalars['Int'];
  gross: Scalars['Int'];
  originalLanguage: Scalars['String'];
  flagSeries: Scalars['Boolean'];
  flagIncinema: Scalars['Boolean'];
  plot: Scalars['String'];
  slogan?: Maybe<Scalars['String']>;
  posterImage?: Maybe<Scalars['String']>;
  cinemascheduleSet?: Maybe<CinemaScheduleNodeConnection>;
};


/** Represents a movie on EtMDB. */
export type MovieMetaDataNodeCinemascheduleSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum MovieMetaDataAgeRestriction {
  /** G (General Audiences) */
  A_1 = 'A_1',
  /** PG (Parental Guidance Suggested) */
  A_2 = 'A_2',
  /** PG-13 (Parents Strongly Cautioned) */
  A_3 = 'A_3',
  /** R18 (Restricted) */
  A_4 = 'A_4',
  /** R21 (Adults Only)  */
  A_5 = 'A_5',
  /** U (Unrated) */
  A_6 = 'A_6'
}

export type CinemaDetailNodeConnection = {
   __typename?: 'CinemaDetailNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CinemaDetailNodeEdge>>;
};

export type CinemaDetailNodeEdge = {
   __typename?: 'CinemaDetailNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<CinemaDetailNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Represents the types of filmographies. */
export type FilmographyTypeNode = Node & {
   __typename?: 'FilmographyTypeNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  filmographyDescription: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
};

export type FilmographyTypeNodeConnection = {
   __typename?: 'FilmographyTypeNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<FilmographyTypeNodeEdge>>;
};

export type FilmographyTypeNodeEdge = {
   __typename?: 'FilmographyTypeNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<FilmographyTypeNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Represents the types of movie genres. */
export type GenreTypeNode = Node & {
   __typename?: 'GenreTypeNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  genreDescription: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
};

export type GenreTypeNodeConnection = {
   __typename?: 'GenreTypeNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<GenreTypeNodeEdge>>;
};

export type GenreTypeNodeEdge = {
   __typename?: 'GenreTypeNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<GenreTypeNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Represents the details for jobs listed on EtMDB. */
export type JobBoardNode = Node & {
   __typename?: 'JobBoardNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  jobTitle: Scalars['String'];
  location?: Maybe<JobBoardLocation>;
  productionType?: Maybe<JobBoardProductionType>;
  duration: Scalars['String'];
  productionDate?: Maybe<Scalars['DateTime']>;
  closingDate: Scalars['DateTime'];
  description: Scalars['String'];
  salary?: Maybe<Scalars['String']>;
  genderMf: JobBoardGenderMf;
  ageLevel: JobBoardAgeLevel;
  company: CompanyNode;
  jobtagSet?: Maybe<JobTagNodeConnection>;
};


/** Represents the details for jobs listed on EtMDB. */
export type JobBoardNodeJobtagSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum JobBoardLocation {
  /** Addis Ababa */
  A_1 = 'A_1',
  /** Adama */
  A_2 = 'A_2',
  /** Gondar */
  A_3 = 'A_3',
  /** Mekele */
  A_4 = 'A_4',
  /** Hawassa */
  A_5 = 'A_5',
  /** Bahir Dar */
  A_6 = 'A_6',
  /** Dire Dawa */
  A_7 = 'A_7',
  /** Dessie */
  A_8 = 'A_8',
  /** Jimma */
  A_9 = 'A_9',
  /** Jijiga */
  A_10 = 'A_10',
  /** Shashamane */
  A_11 = 'A_11',
  /** Arba Minch */
  A_12 = 'A_12',
  /** Hosaena */
  A_13 = 'A_13',
  /** Woliso */
  A_14 = 'A_14',
  /** Asmara */
  A_15 = 'A_15',
  /** Debre Birhan */
  A_16 = 'A_16',
  /** Asella */
  A_17 = 'A_17',
  /** Harar */
  A_18 = 'A_18',
  /** Dila */
  A_19 = 'A_19',
  /** Nekemte */
  A_20 = 'A_20',
  /** Unspecified */
  A_21 = 'A_21'
}

export enum JobBoardProductionType {
  /** Feature */
  A_1 = 'A_1',
  /** Documentary */
  A_2 = 'A_2',
  /** TV-Series */
  A_3 = 'A_3',
  /** Short film */
  A_4 = 'A_4',
  /** Silent film */
  A_5 = 'A_5',
  /** Biography */
  A_6 = 'A_6',
  /** Other type */
  A_7 = 'A_7'
}

export enum JobBoardGenderMf {
  /** Male */
  Male = 'MALE',
  /** Female */
  Female = 'FEMALE',
  /** Not specified */
  Notspecified = 'NOTSPECIFIED'
}

export enum JobBoardAgeLevel {
  /** Any Age */
  A_1 = 'A_1',
  /** Under 13 */
  A_2 = 'A_2',
  /** 13-17 */
  A_3 = 'A_3',
  /** 18-24 */
  A_4 = 'A_4',
  /** 25-34 */
  A_5 = 'A_5',
  /** 50-69 */
  A_6 = 'A_6',
  /** 50-69 */
  A_6_6 = 'A_6_6',
  /** Over 18 */
  A_7 = 'A_7',
  /** 16-65 */
  A_8 = 'A_8'
}

/** Represents the details for cinemas listed on EtMDB. */
export type CompanyNode = Node & {
   __typename?: 'CompanyNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  companyName: Scalars['String'];
  establishedIn: Scalars['DateTime'];
  description: Scalars['String'];
  opensAt: Scalars['Time'];
  closesAt: Scalars['Time'];
  companyPosterImage?: Maybe<Scalars['String']>;
  jobboardSet?: Maybe<JobBoardNodeConnection>;
};


/** Represents the details for cinemas listed on EtMDB. */
export type CompanyNodeJobboardSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  jobTitle?: Maybe<Scalars['String']>;
  jobTitle_Icontains?: Maybe<Scalars['String']>;
  jobTitle_Istartswith?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['ID']>;
  company_Icontains?: Maybe<Scalars['ID']>;
  company_Istartswith?: Maybe<Scalars['ID']>;
  genderMf?: Maybe<Scalars['String']>;
};


export type JobBoardNodeConnection = {
   __typename?: 'JobBoardNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<JobBoardNodeEdge>>;
};

export type JobBoardNodeEdge = {
   __typename?: 'JobBoardNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<JobBoardNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type JobTagNodeConnection = {
   __typename?: 'JobTagNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<JobTagNodeEdge>>;
};

export type JobTagNodeEdge = {
   __typename?: 'JobTagNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<JobTagNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Represents a Job tag. */
export type JobTagNode = Node & {
   __typename?: 'JobTagNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  jobBoard: JobBoardNode;
  contentTag: ContentTagNode;
};

/** Represents a Content tag. */
export type ContentTagNode = Node & {
   __typename?: 'ContentTagNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  keyword: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  jobtagSet?: Maybe<JobTagNodeConnection>;
  newstagSet?: Maybe<NewsTagNodeConnection>;
};


/** Represents a Content tag. */
export type ContentTagNodeJobtagSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Represents a Content tag. */
export type ContentTagNodeNewstagSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type NewsTagNodeConnection = {
   __typename?: 'NewsTagNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<NewsTagNodeEdge>>;
};

export type NewsTagNodeEdge = {
   __typename?: 'NewsTagNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<NewsTagNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Represents a News and Articles tags. */
export type NewsTagNode = Node & {
   __typename?: 'NewsTagNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  news: NewsNode;
  contentTag: ContentTagNode;
};

/** Represents a News and Articles. */
export type NewsNode = Node & {
   __typename?: 'NewsNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  content: Scalars['String'];
  newsImage?: Maybe<Scalars['String']>;
  newstagSet?: Maybe<NewsTagNodeConnection>;
};


/** Represents a News and Articles. */
export type NewsNodeNewstagSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type CompanyNodeConnection = {
   __typename?: 'CompanyNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CompanyNodeEdge>>;
};

export type CompanyNodeEdge = {
   __typename?: 'CompanyNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<CompanyNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type NewsNodeConnection = {
   __typename?: 'NewsNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<NewsNodeEdge>>;
};

export type NewsNodeEdge = {
   __typename?: 'NewsNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<NewsNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Represents a Movie Roles for cast. */
export type RoleNode = Node & {
   __typename?: 'RoleNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  roleDescription: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
};

export type RoleNodeConnection = {
   __typename?: 'RoleNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<RoleNodeEdge>>;
};

export type RoleNodeEdge = {
   __typename?: 'RoleNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<RoleNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ContentTagNodeConnection = {
   __typename?: 'ContentTagNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<ContentTagNodeEdge>>;
};

export type ContentTagNodeEdge = {
   __typename?: 'ContentTagNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ContentTagNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Represents a Cinema Show times. */
export type ShowtimeNode = Node & {
   __typename?: 'ShowtimeNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdDate: Scalars['DateTime'];
  updatedDate: Scalars['DateTime'];
  slug?: Maybe<Scalars['String']>;
  showtime: Scalars['Time'];
  dayOfWeek: ShowtimeDayOfWeek;
};

export enum ShowtimeDayOfWeek {
  /** Monday */
  A_1 = 'A_1',
  /** Tuesday */
  A_2 = 'A_2',
  /** Wednesday */
  A_3 = 'A_3',
  /** Thursday */
  A_4 = 'A_4',
  /** Friday */
  A_5 = 'A_5',
  /** Saturday */
  A_6 = 'A_6',
  /** Sunday */
  A_7 = 'A_7',
  /** All week */
  A_8 = 'A_8',
  /** Week days */
  A_9 = 'A_9',
  /** Weekend */
  A_10 = 'A_10'
}

export type ShowtimeNodeConnection = {
   __typename?: 'ShowtimeNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<ShowtimeNodeEdge>>;
};

export type ShowtimeNodeEdge = {
   __typename?: 'ShowtimeNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ShowtimeNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type AllCinemaDetailsQueryVariables = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
};


export type AllCinemaDetailsQuery = (
  { __typename?: 'Query' }
  & { allCinemaDetails?: Maybe<(
    { __typename?: 'CinemaDetailNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'CinemaDetailNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'CinemaDetailNode' }
        & Pick<CinemaDetailNode, 'id' | 'createdDate' | 'updatedDate' | 'slug' | 'hallName' | 'numberOfSeats' | 'technology'>
      )> }
    )>> }
  )> }
);


export const AllCinemaDetailsDocument = gql`
    query allCinemaDetails($before: String, $after: String) {
  allCinemaDetails(before: $before, after: $after) {
    edges {
      node {
        id
        createdDate
        updatedDate
        slug
        hallName
        numberOfSeats
        technology
      }
    }
  }
}
    `;
export type AllCinemaDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables>, 'query'>;

    export const AllCinemaDetailsComponent = (props: AllCinemaDetailsComponentProps) => (
      <ApolloReactComponents.Query<AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables> query={AllCinemaDetailsDocument} {...props} />
    );
    
export type AllCinemaDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables>
    } & TChildProps;
export function withAllCinemaDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AllCinemaDetailsQuery,
  AllCinemaDetailsQueryVariables,
  AllCinemaDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables, AllCinemaDetailsProps<TChildProps, TDataName>>(AllCinemaDetailsDocument, {
      alias: 'allCinemaDetails',
      ...operationOptions
    });
};

/**
 * __useAllCinemaDetailsQuery__
 *
 * To run a query within a React component, call `useAllCinemaDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCinemaDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCinemaDetailsQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useAllCinemaDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables>(AllCinemaDetailsDocument, baseOptions);
      }
export function useAllCinemaDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables>(AllCinemaDetailsDocument, baseOptions);
        }
export type AllCinemaDetailsQueryHookResult = ReturnType<typeof useAllCinemaDetailsQuery>;
export type AllCinemaDetailsLazyQueryHookResult = ReturnType<typeof useAllCinemaDetailsLazyQuery>;
export type AllCinemaDetailsQueryResult = ApolloReactCommon.QueryResult<AllCinemaDetailsQuery, AllCinemaDetailsQueryVariables>;