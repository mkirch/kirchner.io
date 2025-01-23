'use client';
import { Button } from '@repo/design-system/components/ui/button';
import { SearchBox, useSearch } from 'basehub/react-search';

export const Search = ({ _searchKey }: { _searchKey: string }) => {
  const search = useSearch({
    _searchKey,
    queryBy: ['_title', 'body', 'excerpt'],
    saveRecentSearches: {
      getStorage() {
        return localStorage;
      },
      key: 'recent-posts-searches',
    },
  });

  return (
    <SearchBox.Root search={search}>
      <div className="w-full max-w-lg rounded-lg border border-gray-200 p-2 shadow-lg">
        <SearchBox.Input
          placeholder="Search..."
          className="h-8 w-full rounded-full border border-gray-400 px-2"
          type="search"
          autoFocus
          autoComplete="off"
        />

        <div className="boder-gray-200 mt-2 h-[200px] overflow-auto rounded-lg border p-2">
          <SearchBox.Placeholder className="text-sm">
            {search.recentSearches?.hits?.length ? (
              <SearchBox.HitList className="space-y-1">
                <h3>Recent Searches</h3>
                {search.recentSearches.hits.map((hit) => {
                  return (
                    <div className="relative" key={hit._key}>
                      <SearchBox.HitItem
                        hit={hit}
                        href={`/blog/${hit.document._slug}`}
                        className={`flex flex-col gap-1 rounded-md p-1 pr-20 data-[selected="true"]:bg-gray-100`}
                      >
                        <SearchBox.HitSnippet
                          fieldPath="_title"
                          components={{
                            mark: (props) => (
                              <span
                                {...props}
                                className="rounded-sm bg-red-200"
                              />
                            ),
                            container: (props) => (
                              <div
                                {...props}
                                className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-sm"
                              />
                            ),
                          }}
                        />
                        <SearchBox.HitSnippet
                          fieldPath="body"
                          fallbackFieldPaths={['excerpt']}
                          components={{
                            mark: (props) => (
                              <mark
                                {...props}
                                className="rounded-sm bg-red-200"
                              />
                            ),
                            container: (props) => (
                              <div
                                {...props}
                                className="line-clamp-2 text-xs"
                              />
                            ),
                          }}
                        />
                      </SearchBox.HitItem>
                      <Button
                        className="-translate-y-1/2 absolute top-1/2 right-2 z-10 rounded-sm bg-red-200 px-1 text-red-800 text-xs"
                        onClick={() => {
                          search.recentSearches?.remove(hit._key);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </SearchBox.HitList>
            ) : (
              <>Start typing to search.</>
            )}
          </SearchBox.Placeholder>

          <SearchBox.Empty className="text-sm">
            Nothing found for <b>{search.query}</b>
          </SearchBox.Empty>

          <SearchBox.HitList className="space-y-1">
            {search.result?.hits.map((hit) => {
              return (
                <SearchBox.HitItem
                  key={hit._key}
                  hit={hit}
                  href={`/blog/${hit.document._slug}`}
                  className={`flex flex-col gap-1 rounded-md p-1 data-[selected="true"]:bg-gray-100`}
                >
                  <SearchBox.HitSnippet
                    fieldPath="_title"
                    components={{
                      mark: (props) => (
                        <mark {...props} className="rounded-sm bg-red-200" />
                      ),
                      container: (props) => (
                        <div
                          {...props}
                          className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-sm"
                        />
                      ),
                    }}
                  />
                  <SearchBox.HitSnippet
                    fieldPath="body"
                    fallbackFieldPaths={['excerpt']}
                    components={{
                      mark: (props) => (
                        <mark {...props} className="rounded-sm bg-red-200" />
                      ),
                      container: (props) => (
                        <div {...props} className="line-clamp-2 text-xs" />
                      ),
                    }}
                  />
                </SearchBox.HitItem>
              );
            })}
          </SearchBox.HitList>
        </div>
      </div>
    </SearchBox.Root>
  );
};
