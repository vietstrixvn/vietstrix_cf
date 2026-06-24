'use client';

export const InstrucCard = () => {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
      <div className="relative border-b mb-6 border-b-gray-300 after:absolute after:left-0 after:bottom-0 after:w-[80px] after:h-[2px] after:bg-primary-700 ">
        <h3 className="text-md lg:text-xl md:text:lg text-main font-semibold  mb-4">
          Instructions for use
        </h3>
      </div>

      <ul className="text-sm text-gray-600 space-y-3 list-disc list-inside">
        <li>
          <span className="font-bold text-main ">Title:</span> Write a concise,
          brief and engaging title that attracts readers
        </li>
        <li>
          <span className="font-bold text-main">Category:</span> Select an
          appropriate category to classify the post
        </li>
        <li>
          <span className="font-bold text-main">Content:</span> Write detailed,
          clear and easy-to-understand content
        </li>
        <li>
          <span className="font-bold text-main">Banner Image:</span> Choose an
          image with appropriate size and high quality for the thumbnail
        </li>
      </ul>
    </div>
  );
};
