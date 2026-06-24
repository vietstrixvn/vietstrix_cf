'use client';

import { Icons } from '@/assets';
import {
  DesktopEmpty,
  DesktopLoader,
} from '@/components/animations/tech.animation';
import { motion } from 'framer-motion';
import CTASection from '@/components/sections/cta.section';
import { BlogtHeroSetion } from '@/components/sections/hero-blog.section';
import { Input } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { BlogListProps } from '@/types/portfolio';
import { Container } from '@/components/wrappers/container';
import { PostCard } from '@/components/cards/post.card';
import { CustomPagination } from '@/components';
import { RecentPostSection as _RecentPostSection } from '@/components/sections/recent-post.section';

const BlogList: React.FC<BlogListProps> = ({
  post,
  recentPosts: _recentPosts = [],
  categories,
  pagination,
  currentPage,
  isLoading = false,
  initialSearch = '',
}) => {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentSort, setCurrentSort] = useState('default');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query: Record<string, string> = { page: '1' };
      if (searchQuery.trim()) query.search = searchQuery.trim();
      router.push({
        pathname: '/blogs',
        query,
      });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    router.push({
      pathname: '/blogs',
      query: { page: '1' },
    });
  };

  const handlePageChange = (page: number) => {
    const query: Record<string, string> = { page: page.toString() };
    if (searchQuery.trim()) query.search = searchQuery.trim();
    router.push({
      pathname: '/blogs',
      query,
    });
  };

  const handleCategoryChange = (value: string) => {
    setCurrentCategory(value);
    if (value === 'all') {
      router.push('/blogs');
    } else {
      const category = categories.find((cat) => cat.id.toString() === value);
      if (category) {
        router.push({
          pathname: '/blogs/[cate-slug]',
          params: { 'cate-slug': category.slug },
        });
      }
    }
  };

  return (
    <main className="relative bg-white">
      <BlogtHeroSetion />
      <Container width="max-w-8xl mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-6 border-b border-b-main pb-6">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            {/* Category Select */}
            <Select
              value={currentCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="bg-main text-white rounded-md px-6 py-2.5 text-sm font-bold border-none hover:bg-main/90 w-full md:w-auto min-w-[200px]">
                <SelectValue placeholder="Tất cả sản phẩm" />
              </SelectTrigger>
              <SelectContent side="bottom" align="start" position="popper">
                <SelectItem value="all">Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select value={currentSort} onValueChange={setCurrentSort}>
              <SelectTrigger className="bg-main text-white rounded-md px-6 py-2.5 text-sm font-bold border-none hover:bg-main/90 w-full md:w-auto min-w-[180px]">
                <SelectValue placeholder="Filters" />
              </SelectTrigger>
              <SelectContent side="bottom" align="start" position="popper">
                <SelectItem value="default">Filters</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input - Separated to align right */}
          <div className="relative w-full md:w-80">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by title (Press Enter)"
              className="pl-10 pr-8 text-sm rounded-md h-10 bg-white border-gray-300 focus:border-main"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
              <DesktopLoader />
            </div>
          ) : post.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
              {/* TODO: Render blog post cards here */}
              {post.map((item) => (
                <PostCard item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-md min-h-[400px]">
              <DesktopEmpty />
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {!isLoading &&
          post.length > 0 &&
          pagination &&
          pagination.total_pages > 1 && (
            <div className="mt-12 mb-8">
              <CustomPagination
                currentPage={currentPage}
                totalPage={pagination.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
      </Container>
      <CTASection />
    </main>
  );
};

export default BlogList;
