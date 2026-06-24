// import logoV from './icons/V_Logo.svg';
// import logoNameB from './icons/LogoName.svg';
// import logoNameW from './icons/LogoName_white.svg';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  CircleUserRound,
  RectangleEllipsis,
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  LayoutDashboard,
  ReceiptText,
  SquareGanttChart,
  ShoppingBasket,
  Ticket,
  Contact,
  Shield,
  Users,
  GroupIcon,
  ArrowLeft,
  ShieldBan,
  Logs,
  MessageCircleQuestion,
  SquareChartGantt,
  Package,
  TrainTrack,
  Search,
  ChartBarStacked,
  List,
  Loader2,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  ArrowUp,
  PhoneCall,
  RefreshCcwDot,
  Eye,
  EyeClosed,
  Trash,
  ArrowDown,
  X,
  Menu,
  Phone,
  CircleCheckBig,
  Cog,
  BrickWallShield,
  Building2,
  LayoutList,
  MessageSquareWarning,
  EllipsisVertical,
  Home,
  HeartPulseIcon,
  Bug,
  ChevronUp,
  ChevronDown,
  FolderGit2,
  Monitor,
  UserPlus,
  PencilIcon,
  TableProperties,
  ChartNoAxesGanttIcon,
  Delete,
  Replace,
  ChevronLeft,
  Form,
  BookOpenText,
  Shapes,
  Newspaper,
  MonitorCog,
  Settings,
  BarChart3,
  AlertCircle,
  FileText,
  FolderOpen,
  UserRound,
  Wrench,
  Server,
  Plus,
  Activity,
  FileCode,
  CheckCheck,
  Copy,
  ZoomIn,
  ZoomOut,
  ImageOff,
  Link,
  ClipboardCopy,
  Check,
  Globe,
  Blocks,
  User,
  Calendar,
  Receipt,
  Pencil,
  ShieldCheck,
  Mail,
  LayoutGrid,
  Code,
  EyeOff,
  Zap,
  Tag,
  CheckCircle,
  Gift,
  DollarSign,
} from 'lucide-react';
import { Box, ShoppingBag, ClipboardList } from 'lucide-react';

// ✅ Inline SVG — không dùng next/image, không bị lỗi trên prod
export const TikTok = ({
  className,
  width = 24,
  height = 24,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width={width}
    height={height}
    className={className}
    fill="currentColor"
  >
    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
  </svg>
);

export const Facebook = ({
  className,
  width = 24,
  height = 24,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    viewBox="0 0 95 95"
    width={width}
    height={height}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M95 47.1929C95 21.1292 73.7333 0 47.5 0C21.2667 0 0 21.1292 0 47.1929C0 69.3245 15.3368 87.8959 36.0259 92.9965V61.6151H26.2314V47.1929H36.0259V40.9786C36.0259 24.916 43.3428 17.4708 59.2154 17.4708C62.225 17.4708 67.4177 18.0579 69.5419 18.6431V31.7155C68.4209 31.5985 66.4734 31.54 64.0547 31.54C56.2666 31.54 53.257 34.4716 53.257 42.0923V47.1929H68.7724L66.1067 61.6151H53.257V94.0404C76.7733 91.2183 95 71.3217 95 47.1929Z"
      fill="#0966FF"
    />
  </svg>
);

export const Zalo = ({
  className,
  width = 24,
  height = 24,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={width}
    height={height}
    className={className}
  >
    <path
      fill="#2962ff"
      d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10c4.722,0,8.883-2.348,11.417-5.931V36H15z"
    />
    <path
      fill="#eee"
      d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
    />
    <path
      fill="#2962ff"
      d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
    />
    <path
      fill="#2962ff"
      d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
    />
    <path
      fill="#2962ff"
      d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
    />
    <path
      fill="#2962ff"
      d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
    />
  </svg>
);

// Aliases for deprecated icons
export const FacebookIcon = Facebook;

export const Arrows = {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
};

export const Icons = {
  Loader2,
  Link,
  FileText,
  Receipt,
  ZoomIn,
  ZoomOut,
  Pencil,
  Calendar,
  List,
  Settings,
  User,
  ImageOff,
  ClipboardCopy,
  Check,
  ShieldCheck,
  LayoutGrid,
  Globe,
  Trash2,
  AlertTriangle,
  ChevronRight,
  PhoneCall,
  TikTok,
  Zalo,
  CheckCheck,
  Facebook,
  Copy,
  RefreshCcwDot,
  Eye,
  EyeClosed,
  EyeOff,
  Blocks,
  Trash,
  Plus,
  Search,
  X,
  Menu,
  Phone,
  LogOut,
  BrickWallShield,
  EllipsisVertical,
  HeartPulseIcon,
  ChevronUp,
  ChevronDown,
  Monitor,
  UserPlus,
  PencilIcon,
  Delete,
  Replace,
  Code,
  Zap,
  Tag,
  CheckCircle,
  Gift,
};

export const ComponentsIcons = {
  ChartNoAxesGanttIcon,
  FileText,
  FolderOpen,
  MonitorCog,
  UserRound,
  Search,
  CircleUserRound,
  Mail,
  BadgeCheck,
  Bell,
  DollarSign,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  RectangleEllipsis,
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Shapes,
  Newspaper,
  SquareTerminal,
  MessageCircleQuestion,
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  LayoutDashboard,
  BookOpenText,
  Form,
  ReceiptText,
  ShoppingBasket,
  SquareGanttChart,
  Ticket,
  Contact,
  Box,
  ShoppingBag,
  ClipboardList,
  Shield,
  Users,
  GroupIcon,
  Logs,
  ArrowLeft,
  ShieldBan,
  List,
  SquareChartGantt,
  Package,
  TrainTrack,
  ChartBarStacked,
  CircleCheckBig,
  Cog,
  Building2,
  LayoutList,
  MessageSquareWarning,
  Home,
  Bug,
  FolderGit2,
  TableProperties,
  Settings,
  BarChart3,
  AlertCircle,
  Wrench,
  Server,
  Plus,
  Activity,
  FileCode,
};
