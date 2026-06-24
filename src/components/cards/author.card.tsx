import { UserProb } from "@/types";
import {
  Globe,
  Facebook,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Zalo, TikTok } from "@/assets/icons";

function Avatar({ author }: { author: UserProb }) {
  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
        {author?.avatar_url ? (
          <img
            src={author.avatar_url}
            alt={author.username || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg font-medium text-gray-500">
            {author?.first_name?.[0] || ''}
            {author?.last_name?.[0] || ''}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AuthorCard({ author }: { author: UserProb }) {
  if (!author) return null;

  return (
   <div className="bg-primary-50 rounded-xl p-4 md:p-6 w-full">
    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
      Authors
    </h2>

    <hr className="border-gray-200 mb-4" />

    <div className="flex items-center gap-3 md:gap-4">
      <div className="shrink-0">
        <Avatar author={author} />
      </div>

      <div className="flex flex-col justify-center min-w-0">
        <p className="text-sm md:text-base font-bold text-gray-900 leading-tight truncate">
          {(author.first_name || '') + ' ' + (author.last_name || '')}
        </p>

        <p className="text-xs md:text-sm text-gray-500 leading-normal break-words">
          {author.role_title || 'Member'} at Vietstrix Team
        </p>
      </div>
    </div>

    <hr className="border-gray-200 my-4" />

    <p className="text-sm text-gray-600 leading-7 break-words">
      {author.bio}
    </p>


     {author?.social_links && Object.values(author.social_links).some(val => val) && (
                <div className="pt-5 border-t border-gray-150 space-y-2.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">
                    Social Profiles
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(author.social_links).map(([platform, url]) => {
                      if (!url) return null;

                      let Icon: any = Globe;
                      if (platform === 'facebook') Icon = Facebook;
                      else if (platform === 'github') Icon = Github;
                      else if (platform === 'linkedin') Icon = Linkedin;
                      else if (platform === 'twitter') Icon = Twitter;
                      else if (platform === 'instagram') Icon = Instagram;
                      else if (platform === 'youtube') Icon = Youtube;
                      else if (platform === 'zalo') Icon = Zalo;
                      else if (platform === 'tiktok') Icon = TikTok;

                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-md transition-all duration-200 text-gray-700 hover:text-blue-600 shadow-sm"
                          title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                        >
                          <Icon className="w-5 h-5 shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
</div>
  );
}
