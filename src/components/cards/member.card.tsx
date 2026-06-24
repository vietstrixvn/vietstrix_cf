'use client';

import {
  Card,
  CardContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui';
import { useSelectedUserContext } from '@/contexts/use-selected-user.context';

interface TeamMemberCardProps {
  name: string;
  userId: string;
  role: string;
  avatarUrl?: string;
  initials?: string;
  username: string;
  isActive?: boolean;
  isVerified?: boolean;
}

const getRoleBadgeClass = (role: string): string => {
  const map: Record<string, string> = {
    super_admin: 'bg-purple-50 text-purple-700 border-purple-200',
    admin: 'bg-blue-50 text-blue-700 border-blue-200',
    user: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return map[role] ?? 'bg-gray-100 text-gray-600 border-gray-200';
};

const getRoleLabel = (role: string): string => {
  const map: Record<string, string> = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    user: 'User',
  };
  return map[role] ?? role;
};

const getInitials = (name: string, fallback?: string): string => {
  if (fallback) return fallback;
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export function MemberCard({
  name,
  role,
  avatarUrl,
  initials,
  username,
  userId,
  isActive = true,
  isVerified = false,
}: TeamMemberCardProps) {
  const { userId: selectedUserIdFromContext, setUserId } =
    useSelectedUserContext();

  const isSelected = userId === selectedUserIdFromContext;

  const handleClick = () => {
    setUserId(isSelected ? null : userId);
  };

  return (
    <Card
      onClick={handleClick}
      className={`
        group relative cursor-pointer rounded-md border bg-white
        transition-all duration-150 hover:shadow-md
        ${
          isSelected
            ? 'border-blue-300 shadow-md ring-1 ring-blue-200'
            : 'border-gray-200 hover:border-gray-300'
        }
      `}
    >
      {/* Selected indicator */}
      {isSelected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-[10px] text-white">
          ✓
        </span>
      )}

      <CardContent className="flex flex-col items-center px-5 pb-5 pt-6">
        {/* Avatar with active dot */}
        <div className="relative mb-4">
          <Avatar className="h-20 w-20 border-2 border-gray-100">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className="bg-blue-50 text-[18px] font-medium text-blue-700">
              {getInitials(name, initials)}
            </AvatarFallback>
          </Avatar>
          {isActive && (
            <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-md border-2 border-white bg-green-500" />
          )}
        </div>

        {/* Name */}
        <h3 className="mb-0.5 text-center text-[15px] font-semibold text-gray-900 leading-snug">
          {name}
        </h3>

        {/* Username */}
        <p className="mb-3 text-center text-[12px] text-gray-400 font-mono">
          @{username}
        </p>

        {/* Divider */}
        <div className="mb-3 w-full border-t border-gray-100" />

        {/* Role badge + verified */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-medium ${getRoleBadgeClass(role)}`}
          >
            {getRoleLabel(role)}
          </span>
          {isVerified && (
            <span className="inline-flex items-center rounded-md border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[11px] font-medium text-teal-700">
              Verified
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
