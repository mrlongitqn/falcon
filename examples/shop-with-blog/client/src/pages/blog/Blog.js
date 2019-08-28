import React from 'react';
import { T } from '@deity/falcon-i18n';
import { BlogPostListQuery } from '@deity/falcon-blog-data';
import { Breadcrumbs, ListItem, Icon } from '@deity/falcon-ui';
import {
  Link,
  PageLayout,
  BlogPostListLayout,
  BlogPostExcerpt,
  BreadcrumbLink,
  BlogPostListPaginationLayout
} from '@deity/falcon-ui-kit';

const Blog = ({ match }) => {
  const { params } = match;

  return (
    <PageLayout as="section">
      <Breadcrumbs alignSelf="flex-start">
        <BreadcrumbLink to="/">
          <T id="name" />
        </BreadcrumbLink>
        <BreadcrumbLink to="/blog">
          <T id="blog.title" />
        </BreadcrumbLink>
      </Breadcrumbs>

      <BlogPostListQuery variables={{ pagination: { perPage: 2, page: +params.page || 1 } }}>
        {({ blogPostList: { items, pagination } }) => (
          <React.Fragment>
            <BlogPostListLayout>
              {items.map((x, index) => (
                <ListItem key={x.slug} gridColumn={index < 2 ? 'span 3' : 'span 2'}>
                  <BlogPostExcerpt title={x.title} slug={x.slug} date={x.date} image={x.image} excerpt={x.excerpt} />
                </ListItem>
              ))}
            </BlogPostListLayout>
            <BlogPostListPaginationLayout isPrevPage={pagination.prevPage}>
              {pagination.prevPage && (
                <Link display="flex" lineHeight="small" fontSize="md" to={`/blog/${pagination.prevPage}`}>
                  <Icon size="md" mr="xs" src="prevPage" />
                  <T id="blog.newerEntries" />
                </Link>
              )}
              {pagination.nextPage && (
                <Link display="flex" lineHeight="small" fontSize="md" to={`/blog/${pagination.nextPage}`}>
                  <T id="blog.olderEntries" /> <Icon ml="xs" size="md" src="nextPage" />
                </Link>
              )}
            </BlogPostListPaginationLayout>
          </React.Fragment>
        )}
      </BlogPostListQuery>
    </PageLayout>
  );
};

export default Blog;
