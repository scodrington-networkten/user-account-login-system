import {Keyword} from "@contracts/keyword";

/**
 * Represents a result from collecting keywords for a given movie, returns an array
 * of keywords
 */
export type KeywordsApiResults = {
    id: number,
    keywords: Keyword[]
}
