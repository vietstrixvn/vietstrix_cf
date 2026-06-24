// ErrorCode represents application-specific error codes
export type ErrorCode = number;

// SUCCESS CODE
export const CodeSuccess: ErrorCode = 0;

// APP CONFIG CODES (1000-1999)
export const CodeQueryInvalid: ErrorCode = 1000;
export const CodeBodyInvalid: ErrorCode = 1001;
export const CodePaginateInvalid: ErrorCode = 1002;
export const CodeSlugRequired: ErrorCode = 1003;
export const CodeIDRequired: ErrorCode = 1004;
export const CodeTitleRequired: ErrorCode = 1005;
export const CodeNameRequired: ErrorCode = 1006;
export const CodeSlugExists: ErrorCode = 1007;

// AUTH CODES (2000-2999)
export const CodeUsernameRequired: ErrorCode = 2000;
export const CodePasswordRequired: ErrorCode = 2001;
export const CodeEmailRequired: ErrorCode = 2002;
export const CodeUsernameExisted: ErrorCode = 2003;
export const CodeEmailExisted: ErrorCode = 2004;
export const CodeInvalidCredentials: ErrorCode = 2005;
export const CodeTokenGenerationFailed: ErrorCode = 2006;
export const CodeTooManyAttempts: ErrorCode = 2007;
export const CodeAccountBlocked: ErrorCode = 2008;
export const CodeAccountInactive: ErrorCode = 2009;
export const CodeTokenInvalid: ErrorCode = 2010;
export const CodeTokenExpired: ErrorCode = 2011;
export const CodeRefreshTokenInvalid: ErrorCode = 2012;
export const CodeSessionNotFound: ErrorCode = 2013;
export const CodeSessionExpired: ErrorCode = 2014;
export const CodeSessionRevoked: ErrorCode = 2015;
export const CodeTokenRequired: ErrorCode = 2020;
export const Code2FACodeRequired: ErrorCode = 2021;

// VALIDATION CODES (3000-3999)
export const CodeInvalidStatus: ErrorCode = 3000;
export const CodeInvalidLanguage: ErrorCode = 3001;
export const CodeInvalidUUID: ErrorCode = 3002;
export const CodeInvalidIDUint: ErrorCode = 3003;
export const CodeInvalidEmail: ErrorCode = 3004;
export const CodeInvalidPhoneNumber: ErrorCode = 3005;
export const CodeInvalidURL: ErrorCode = 3006;
export const CodeInvalidRole: ErrorCode = 3007;
export const CodeInvalidPriority: ErrorCode = 3008;
export const CodeInvalidService: ErrorCode = 3009;
export const CodeInvalidType: ErrorCode = 3010;
export const CodeInvalidOrigin: ErrorCode = 3011;
export const CodeInvalidModule: ErrorCode = 3012;
export const CodeValidationFailed: ErrorCode = 3013;

// AUTHORIZATION CODES (4000-4999)
export const CodeUnauthorized: ErrorCode = 4001;
export const CodeForbidden: ErrorCode = 4003;
export const CodeNotFound: ErrorCode = 4004;
export const CodePermissionDenied: ErrorCode = 4005;
export const CodeInsufficientPermission: ErrorCode = 4006;
export const CodePropertyKeyInvalid: ErrorCode = 4007;
export const CodePropertyKeyExpired: ErrorCode = 4008;
export const CodePropertyKeyInactive: ErrorCode = 4009;
export const CodeRateLimitExceeded: ErrorCode = 4029;

// ADMIN CODES (5000-5099)
export const CodeAdminNotFound: ErrorCode = 5000;
export const CodeAdminBlocked: ErrorCode = 5001;
export const CodeAdminInactive: ErrorCode = 5002;
export const CodeAdminExists: ErrorCode = 5003;
export const CodeAdminCreateFailed: ErrorCode = 5004;
export const CodeAdminUpdateFailed: ErrorCode = 5005;
export const CodeAdminDeleteFailed: ErrorCode = 5006;
export const CodeRoleNotFound: ErrorCode = 5010;
export const CodeRoleExists: ErrorCode = 5011;
export const CodeRoleCreateFailed: ErrorCode = 5012;
export const CodeRoleUpdateFailed: ErrorCode = 5013;
export const CodeRoleDeleteFailed: ErrorCode = 5014;
export const CodeRoleInUse: ErrorCode = 5015;

// PROPERTY CODES (5100-5199)
export const CodePropertyNotFound: ErrorCode = 5100;
export const CodePropertyExists: ErrorCode = 5101;
export const CodePropertyCreateFailed: ErrorCode = 5102;
export const CodePropertyUpdateFailed: ErrorCode = 5103;
export const CodePropertyDeleteFailed: ErrorCode = 5104;
export const CodePropertyInactive: ErrorCode = 5105;
export const CodePropertyDeleted: ErrorCode = 5106;
export const CodePropertySlugExists: ErrorCode = 5107;
export const CodePropertyDomainExists: ErrorCode = 5108;
export const CodePropertySubdomainExists: ErrorCode = 5109;

// PROPERTY USER CODES (5200-5299)
export const CodeUserNotFound: ErrorCode = 5200;
export const CodeUserExists: ErrorCode = 5201;
export const CodeUserCreateFailed: ErrorCode = 5202;
export const CodeUserUpdateFailed: ErrorCode = 5203;
export const CodeUserDeleteFailed: ErrorCode = 5204;
export const CodeUserBlocked: ErrorCode = 5205;
export const CodeUserInactive: ErrorCode = 5206;

// CATEGORY CODES (5300-5399)
export const CodeCategoryNotFound: ErrorCode = 5300;
export const CodeCategoryExists: ErrorCode = 5301;
export const CodeCategoryCreateFailed: ErrorCode = 5302;
export const CodeCategoryUpdateFailed: ErrorCode = 5303;
export const CodeCategoryDeleteFailed: ErrorCode = 5304;
export const CodeCategorySlugExists: ErrorCode = 5305;
export const CodeCategoryInUse: ErrorCode = 5306;

// POST CODES (5400-5499)
export const CodePostNotFound: ErrorCode = 5400;
export const CodePostExists: ErrorCode = 5401;
export const CodePostCreateFailed: ErrorCode = 5402;
export const CodePostUpdateFailed: ErrorCode = 5403;
export const CodePostDeleteFailed: ErrorCode = 5404;
export const CodePostSlugExists: ErrorCode = 5405;
export const CodeProductNotFound: ErrorCode = 5450;
export const CodeProductExists: ErrorCode = 5451;
export const CodeProductCreateFailed: ErrorCode = 5452;
export const CodeProductUpdateFailed: ErrorCode = 5453;
export const CodeProductDeleteFailed: ErrorCode = 5454;
export const CodeProductSlugExists: ErrorCode = 5455;
export const CodeProductFeatureNotEnabled: ErrorCode = 5456;

// TAG CODES (5500-5599)
export const CodeTagNotFound: ErrorCode = 5500;
export const CodeTagExists: ErrorCode = 5501;
export const CodeTagCreateFailed: ErrorCode = 5502;
export const CodeTagUpdateFailed: ErrorCode = 5503;
export const CodeTagDeleteFailed: ErrorCode = 5504;
export const CodeTagSlugExists: ErrorCode = 5505;

// BANNER CODES (5600-5699)
export const CodeBannerNotFound: ErrorCode = 5600;
export const CodeBannerExists: ErrorCode = 5601;
export const CodeBannerCreateFailed: ErrorCode = 5602;
export const CodeBannerUpdateFailed: ErrorCode = 5603;
export const CodeBannerDeleteFailed: ErrorCode = 5604;

// NEWS CODES (5700-5799)
export const CodeNewsNotFound: ErrorCode = 5700;
export const CodeNewsExists: ErrorCode = 5701;
export const CodeNewsCreateFailed: ErrorCode = 5702;
export const CodeNewsUpdateFailed: ErrorCode = 5703;
export const CodeNewsDeleteFailed: ErrorCode = 5704;

// SOCIAL CODES (5800-5899)
export const CodeSocialNotFound: ErrorCode = 5800;
export const CodeSocialExists: ErrorCode = 5801;
export const CodeSocialCreateFailed: ErrorCode = 5802;
export const CodeSocialUpdateFailed: ErrorCode = 5803;
export const CodeSocialDeleteFailed: ErrorCode = 5804;

// CONTACT CODES (5900-5999)
export const CodeContactNotFound: ErrorCode = 5900;
export const CodeContactExists: ErrorCode = 5901;
export const CodeContactCreateFailed: ErrorCode = 5902;
export const CodeContactUpdateFailed: ErrorCode = 5903;
export const CodeContactDeleteFailed: ErrorCode = 5904;

// TYPE CODES (6000-6099)
export const CodeTypeNotFound: ErrorCode = 6000;
export const CodeTypeExists: ErrorCode = 6001;
export const CodeTypeCreateFailed: ErrorCode = 6002;
export const CodeTypeUpdateFailed: ErrorCode = 6003;
export const CodeTypeDeleteFailed: ErrorCode = 6004;
export const CodeTypeSlugExists: ErrorCode = 6005;
export const CodeTypeInUse: ErrorCode = 6006;

// MEDIA CODES (6100-6199)
export const CodeMediaNotFound: ErrorCode = 6100;
export const CodeMediaExists: ErrorCode = 6101;
export const CodeMediaCreateFailed: ErrorCode = 6102;
export const CodeMediaUpdateFailed: ErrorCode = 6103;
export const CodeMediaDeleteFailed: ErrorCode = 6104;
export const CodeMediaUploadFailed: ErrorCode = 6105;
export const CodeMediaInvalidFormat: ErrorCode = 6106;
export const CodeMediaTooLarge: ErrorCode = 6107;
export const CodeMediaPresignFailed: ErrorCode = 6108;

// TICKET CODES (6200-6299)
export const CodeTicketNotFound: ErrorCode = 6200;
export const CodeTicketExists: ErrorCode = 6201;
export const CodeTicketCreateFailed: ErrorCode = 6202;
export const CodeTicketUpdateFailed: ErrorCode = 6203;
export const CodeTicketDeleteFailed: ErrorCode = 6204;

// GA4 CODES (6300-6399)
export const CodeGA4NotFound: ErrorCode = 6300;
export const CodeGA4Exists: ErrorCode = 6301;
export const CodeGA4CreateFailed: ErrorCode = 6302;
export const CodeGA4UpdateFailed: ErrorCode = 6303;
export const CodeGA4DeleteFailed: ErrorCode = 6304;
export const CodeGA4InvalidID: ErrorCode = 6305;
export const CodeGA4ClientError: ErrorCode = 6306;
export const CodeGA4Unavailable: ErrorCode = 6307;

// GTM CODES (6400-6499)
export const CodeGTMNotFound: ErrorCode = 6400;
export const CodeGTMExists: ErrorCode = 6401;
export const CodeGTMCreateFailed: ErrorCode = 6402;
export const CodeGTMUpdateFailed: ErrorCode = 6403;
export const CodeGTMDeleteFailed: ErrorCode = 6404;
export const CodeGTMInvalidID: ErrorCode = 6405;

// AUDIT LOG CODES (6500-6599)
export const CodeAuditLogNotFound: ErrorCode = 6500;
export const CodeAuditLogCreateFailed: ErrorCode = 6501;
export const CodeAuditLogAccessDenied: ErrorCode = 6502;
export const CodeAuditLogExportFailed: ErrorCode = 6503;

// PROPERTY KEY CODES (6600-6699)
export const CodePropertyKeyNotFound: ErrorCode = 6600;
export const CodePropertyKeyExists: ErrorCode = 6601;
export const CodePropertyKeyCreateFailed: ErrorCode = 6602;
export const CodePropertyKeyUpdateFailed: ErrorCode = 6603;
export const CodePropertyKeyDeleteFailed: ErrorCode = 6604;

// CORS CODES (6700-6799)
export const CodeCORSOriginInvalid: ErrorCode = 6700;
export const CodeCORSOriginExists: ErrorCode = 6701;
export const CodeCORSOriginNotFound: ErrorCode = 6702;
export const CodeCORSUpdateFailed: ErrorCode = 6703;

// PORTFOLIO CODES (6800-6899) - thêm mới sau CORS CODES
export const CodePortfolioCategoryNotFound: ErrorCode = 6800;
export const CodePortfolioCategoryExists: ErrorCode = 6801;
export const CodePortfolioCategoryCreateFailed: ErrorCode = 6802;
export const CodePortfolioCategoryUpdateFailed: ErrorCode = 6803;
export const CodePortfolioCategoryDeleteFailed: ErrorCode = 6804;
export const CodePortfolioNotFound: ErrorCode = 6810;
export const CodePortfolioExists: ErrorCode = 6811;
export const CodePortfolioCreateFailed: ErrorCode = 6812;
export const CodePortfolioUpdateFailed: ErrorCode = 6813;
export const CodePortfolioDeleteFailed: ErrorCode = 6814;
export const CodePortfolioTagNotFound: ErrorCode = 6820;
export const CodePortfolioTagExists: ErrorCode = 6821;
export const CodePortfolioTagCreateFailed: ErrorCode = 6822;
export const CodePortfolioTagUpdateFailed: ErrorCode = 6823;
export const CodePortfolioTagDeleteFailed: ErrorCode = 6824;
export const CodePortfolioContactNotFound: ErrorCode = 6830;
export const CodePortfolioContactExists: ErrorCode = 6831;
export const CodePortfolioContactCreateFailed: ErrorCode = 6832;
export const CodePortfolioContactUpdateFailed: ErrorCode = 6833;
export const CodePortfolioContactDeleteFailed: ErrorCode = 6834;

// SERVICE CATEGORY CODES (6850-6874)
export const CodeServiceCategoryNotFound: ErrorCode = 6850;
export const CodeServiceCategoryExists: ErrorCode = 6851;
export const CodeServiceCategoryCreateFailed: ErrorCode = 6852;
export const CodeServiceCategoryUpdateFailed: ErrorCode = 6853;
export const CodeServiceCategoryDeleteFailed: ErrorCode = 6854;
export const CodeServiceCategoryCodeExists: ErrorCode = 6855;
export const CodeServiceCategoryInUse: ErrorCode = 6856;

// SERVICE ITEM CODES (6875-6899)
export const CodeServiceItemNotFound: ErrorCode = 6875;
export const CodeServiceItemExists: ErrorCode = 6876;
export const CodeServiceItemCreateFailed: ErrorCode = 6877;
export const CodeServiceItemUpdateFailed: ErrorCode = 6878;
export const CodeServiceItemDeleteFailed: ErrorCode = 6879;
export const CodeServiceItemCodeExists: ErrorCode = 6880;

export const CodePlanNotFound: ErrorCode = 6900;
export const CodePlanExists: ErrorCode = 6901;
export const CodePlanCreateFailed: ErrorCode = 6902;
export const CodePlanUpdateFailed: ErrorCode = 6903;
export const CodePlanDeleteFailed: ErrorCode = 6904;
export const CodePlanInactive: ErrorCode = 6905;
export const CodePlanInUse: ErrorCode = 6906;
export const CodeSubscriptionNotFound: ErrorCode = 6920;
export const CodeSubscriptionExists: ErrorCode = 6921;
export const CodeSubscriptionCreateFailed: ErrorCode = 6922;
export const CodeSubscriptionUpdateFailed: ErrorCode = 6923;
export const CodeSubscriptionDeleteFailed: ErrorCode = 6924;
export const CodeSubscriptionExpired: ErrorCode = 6925;
export const CodeSubscriptionSuspended: ErrorCode = 6926;
export const CodeSubscriptionCancelled: ErrorCode = 6927;
export const CodeSubscriptionAlreadyCancelled: ErrorCode = 6928; // ← thêm dòng này
export const CodeSubscriptionInvalidStatus: ErrorCode = 6929; // 6928 → 6929
export const CodeSubscriptionPropertyMismatch: ErrorCode = 6930; // 6929 → 6930
export const CodeSubscriptionAlreadyActive: ErrorCode = 6931; // 6930 → 6931
export const CodeSubscriptionCannotExtend: ErrorCode = 6932; // 6931 → 6932
export const CodeSubscriptionCannotChangePlan: ErrorCode = 6933; // 6932 → 6933
export const CodeSubscriptionLogNotFound: ErrorCode = 6935;
export const CodeSubscriptionLogCreateFailed: ErrorCode = 6936;
export const CodeBillingRecordNotFound: ErrorCode = 6950;
export const CodeBillingRecordExists: ErrorCode = 6951;
export const CodeBillingRecordCreateFailed: ErrorCode = 6952;
export const CodeBillingRecordUpdateFailed: ErrorCode = 6953;
export const CodeBillingRecordDeleteFailed: ErrorCode = 6954;
export const CodeBillingRecordInvalidStatus: ErrorCode = 6955;
export const CodeBillingRecordAlreadyPaid: ErrorCode = 6956;
export const CodeBillingRecordPropertyMismatch: ErrorCode = 6957;
export const CodeBillingRecordInvalidAmount: ErrorCode = 6958;
export const CodeInvoiceNotFound: ErrorCode = 6970;
export const CodeInvoiceExists: ErrorCode = 6971;
export const CodeInvoiceCreateFailed: ErrorCode = 6972;
export const CodeInvoiceUpdateFailed: ErrorCode = 6973;
export const CodeInvoiceDeleteFailed: ErrorCode = 6974;
export const CodeInvoiceNumberExists: ErrorCode = 6975;
export const CodeInvoiceGenerationFailed: ErrorCode = 6976;
export const CodeInvoiceAlreadyExists: ErrorCode = 6977;
export const CodeInvoicePropertyMismatch: ErrorCode = 6978;
export const CodeInvoicePDFGenerationFailed: ErrorCode = 6979;

// ACCOUNTING CODES (7000-7049)
export const CodeJournalEntryNotFound: ErrorCode = 7000;
export const CodeJournalEntryUnbalanced: ErrorCode = 7001;
export const CodeJournalEntryAlreadyRev: ErrorCode = 7002;
export const CodeJournalEntryInvalidType: ErrorCode = 7003;
export const CodeJournalSaveFailed: ErrorCode = 7004;
export const CodeExchangeRateNotFound: ErrorCode = 7010;
export const CodeExchangeRateInvalid: ErrorCode = 7011;
export const CodeExchangeRateSaveFailed: ErrorCode = 7012;
export const CodeExchangeRateCurrencyInvalid: ErrorCode = 7013;
export const CodeChartOfAccountNotFound: ErrorCode = 7020;

// SERVER ERROR CODES (9000-9999)
export const CodeServerError: ErrorCode = 9000;
export const CodeDatabaseError: ErrorCode = 9001;
export const CodeCacheError: ErrorCode = 9002;
export const CodeQueueError: ErrorCode = 9003;
export const CodeStorageError: ErrorCode = 9004;

// ErrorCodeMessages maps error codes to user-friendly messages
export const ErrorCodeMessages: Record<ErrorCode, string> = {
  // Success
  [CodeSuccess]: 'Success',

  // App Config
  [CodeQueryInvalid]: 'Query parameters are invalid',
  [CodeBodyInvalid]: 'Request body is invalid',
  [CodePaginateInvalid]: 'Pagination parameters are invalid',
  [CodeSlugRequired]: 'Slug is required',
  [CodeIDRequired]: 'ID is required',
  [CodeTitleRequired]: 'Title is required',
  [CodeNameRequired]: 'Name is required',
  [CodeSlugExists]: 'Slug already exists',

  // Auth
  [CodeUsernameRequired]: 'Username is required',
  [CodePasswordRequired]: 'Password is required',
  [CodeEmailRequired]: 'Email is required',
  [CodeUsernameExisted]: 'Username already exists',
  [CodeEmailExisted]: 'Email already exists',
  [CodeInvalidCredentials]: 'Invalid username or password',
  [CodeTokenGenerationFailed]: 'Failed to generate authentication token',
  [CodeTooManyAttempts]:
    'Too many failed login attempts. Please try again later',
  [CodeAccountBlocked]: 'Account has been blocked',
  [CodeAccountInactive]: 'Account is not activated',
  [CodeTokenInvalid]: 'Invalid token',
  [CodeTokenExpired]: 'Token has expired',
  [CodeRefreshTokenInvalid]: 'Invalid refresh token',
  [CodeSessionNotFound]: 'Session not found',
  [CodeSessionExpired]: 'Session has expired',
  [CodeSessionRevoked]: 'Session has been revoked',
  [CodeTokenRequired]: 'Token is required',
  [Code2FACodeRequired]: '2FA code is required',

  // Validation
  [CodeInvalidStatus]: 'Status is invalid',
  [CodeInvalidLanguage]: 'Language is invalid',
  [CodeInvalidUUID]: 'Invalid UUID format',
  [CodeInvalidIDUint]: 'Invalid ID format',
  [CodeInvalidEmail]: 'Invalid email format',
  [CodeInvalidPhoneNumber]: 'Invalid phone number format',
  [CodeInvalidURL]: 'Invalid URL format',
  [CodeInvalidRole]: 'Invalid role',
  [CodeInvalidPriority]: 'Invalid priority',
  [CodeInvalidService]: 'Invalid service type',
  [CodeInvalidType]: 'Invalid type',
  [CodeInvalidOrigin]: 'Invalid origin format',
  [CodeInvalidModule]: 'Invalid module',
  [CodeValidationFailed]: 'Validation failed',

  // Authorization
  [CodeUnauthorized]: 'Unauthorized access',
  [CodeForbidden]: 'Access forbidden',
  [CodeNotFound]: 'Resource not found',
  [CodePermissionDenied]: 'Permission denied',
  [CodeInsufficientPermission]: 'Insufficient permissions',
  [CodePropertyKeyInvalid]: 'Invalid property key',
  [CodePropertyKeyExpired]: 'Property key has expired',
  [CodePropertyKeyInactive]: 'Property key is inactive',
  [CodeRateLimitExceeded]: 'Rate limit exceeded',

  // Admin
  [CodeAdminNotFound]: 'Admin not found',
  [CodeAdminBlocked]: 'Admin account is blocked',
  [CodeAdminInactive]: 'Admin account is inactive',
  [CodeAdminExists]: 'Admin already exists',
  [CodeAdminCreateFailed]: 'Failed to create admin',
  [CodeAdminUpdateFailed]: 'Failed to update admin',
  [CodeAdminDeleteFailed]: 'Failed to delete admin',
  [CodeRoleNotFound]: 'Role not found',
  [CodeRoleExists]: 'Role already exists',
  [CodeRoleCreateFailed]: 'Failed to create role',
  [CodeRoleUpdateFailed]: 'Failed to update role',
  [CodeRoleDeleteFailed]: 'Failed to delete role',
  [CodeRoleInUse]: 'Role is currently in use',

  // Property
  [CodePropertyNotFound]: 'Property not found',
  [CodePropertyExists]: 'Property already exists',
  [CodePropertyCreateFailed]: 'Failed to create property',
  [CodePropertyUpdateFailed]: 'Failed to update property',
  [CodePropertyDeleteFailed]: 'Failed to delete property',
  [CodePropertyInactive]: 'Property is inactive',
  [CodePropertyDeleted]: 'Property has been deleted',
  [CodePropertySlugExists]: 'Property slug already exists',
  [CodePropertyDomainExists]: 'Property domain already exists',
  [CodePropertySubdomainExists]: 'Property subdomain already exists',

  // Property User
  [CodeUserNotFound]: 'User not found',
  [CodeUserExists]: 'User already exists',
  [CodeUserCreateFailed]: 'Failed to create user',
  [CodeUserUpdateFailed]: 'Failed to update user',
  [CodeUserDeleteFailed]: 'Failed to delete user',
  [CodeUserBlocked]: 'User account is blocked',
  [CodeUserInactive]: 'User account is inactive',

  // Category
  [CodeCategoryNotFound]: 'Category not found',
  [CodeCategoryExists]: 'Category already exists',
  [CodeCategoryCreateFailed]: 'Failed to create category',
  [CodeCategoryUpdateFailed]: 'Failed to update category',
  [CodeCategoryDeleteFailed]: 'Failed to delete category',
  [CodeCategorySlugExists]: 'Category slug already exists',
  [CodeCategoryInUse]: 'Category is currently in use',

  // Post
  [CodePostNotFound]: 'Post not found',
  [CodePostExists]: 'Post already exists',
  [CodePostCreateFailed]: 'Failed to create post',
  [CodePostUpdateFailed]: 'Failed to update post',
  [CodePostDeleteFailed]: 'Failed to delete post',
  [CodePostSlugExists]: 'Post slug already exists',
  [CodeProductNotFound]: 'Product not found',
  [CodeProductExists]: 'Product already exists',
  [CodeProductCreateFailed]: 'Failed to create product',
  [CodeProductUpdateFailed]: 'Failed to update product',
  [CodeProductDeleteFailed]: 'Failed to delete product',
  [CodeProductSlugExists]: 'Product slug already exists',
  [CodeProductFeatureNotEnabled]:
    "You haven't registered for the product feature",

  // Tag
  [CodeTagNotFound]: 'Tag not found',
  [CodeTagExists]: 'Tag already exists',
  [CodeTagCreateFailed]: 'Failed to create tag',
  [CodeTagUpdateFailed]: 'Failed to update tag',
  [CodeTagDeleteFailed]: 'Failed to delete tag',
  [CodeTagSlugExists]: 'Tag slug already exists',

  // Banner
  [CodeBannerNotFound]: 'Banner not found',
  [CodeBannerExists]: 'Banner already exists',
  [CodeBannerCreateFailed]: 'Failed to create banner',
  [CodeBannerUpdateFailed]: 'Failed to update banner',
  [CodeBannerDeleteFailed]: 'Failed to delete banner',

  // News
  [CodeNewsNotFound]: 'News not found',
  [CodeNewsExists]: 'News already exists',
  [CodeNewsCreateFailed]: 'Failed to create news',
  [CodeNewsUpdateFailed]: 'Failed to update news',
  [CodeNewsDeleteFailed]: 'Failed to delete news',

  // Social
  [CodeSocialNotFound]: 'Social link not found',
  [CodeSocialExists]: 'Social link already exists',
  [CodeSocialCreateFailed]: 'Failed to create social link',
  [CodeSocialUpdateFailed]: 'Failed to update social link',
  [CodeSocialDeleteFailed]: 'Failed to delete social link',

  // Contact
  [CodeContactNotFound]: 'Contact not found',
  [CodeContactExists]: 'Contact already exists',
  [CodeContactCreateFailed]: 'Failed to create contact',
  [CodeContactUpdateFailed]: 'Failed to update contact',
  [CodeContactDeleteFailed]: 'Failed to delete contact',

  // Type
  [CodeTypeNotFound]: 'Type not found',
  [CodeTypeExists]: 'Type already exists',
  [CodeTypeCreateFailed]: 'Failed to create type',
  [CodeTypeUpdateFailed]: 'Failed to update type',
  [CodeTypeDeleteFailed]: 'Failed to delete type',
  [CodeTypeSlugExists]: 'Type slug already exists',
  [CodeTypeInUse]: 'Type is currently in use',

  // Media
  [CodeMediaNotFound]: 'Media not found',
  [CodeMediaExists]: 'Media already exists',
  [CodeMediaCreateFailed]: 'Failed to create media',
  [CodeMediaUpdateFailed]: 'Failed to update media',
  [CodeMediaDeleteFailed]: 'Failed to delete media',
  [CodeMediaUploadFailed]: 'Failed to upload media',
  [CodeMediaInvalidFormat]: 'Invalid media format',
  [CodeMediaTooLarge]: 'Media file is too large',
  [CodeMediaPresignFailed]: 'Failed to generate presigned URL',

  // Ticket
  [CodeTicketNotFound]: 'Ticket not found',
  [CodeTicketExists]: 'Ticket already exists',
  [CodeTicketCreateFailed]: 'Failed to create ticket',
  [CodeTicketUpdateFailed]: 'Failed to update ticket',
  [CodeTicketDeleteFailed]: 'Failed to delete ticket',

  // GA4
  [CodeGA4NotFound]: 'GA4 configuration not found',
  [CodeGA4Exists]: 'GA4 configuration already exists',
  [CodeGA4CreateFailed]: 'Failed to create GA4 configuration',
  [CodeGA4UpdateFailed]: 'Failed to update GA4 configuration',
  [CodeGA4DeleteFailed]: 'Failed to delete GA4 configuration',
  [CodeGA4InvalidID]: 'Invalid GA4 property ID',
  [CodeGA4ClientError]: 'GA4 client error',
  [CodeGA4Unavailable]: 'GA4 service is unavailable',

  // GTM
  [CodeGTMNotFound]: 'GTM configuration not found',
  [CodeGTMExists]: 'GTM configuration already exists',
  [CodeGTMCreateFailed]: 'Failed to create GTM configuration',
  [CodeGTMUpdateFailed]: 'Failed to update GTM configuration',
  [CodeGTMDeleteFailed]: 'Failed to delete GTM configuration',
  [CodeGTMInvalidID]: 'Invalid GTM container ID',

  // Audit Log
  [CodeAuditLogNotFound]: 'Audit log not found',
  [CodeAuditLogCreateFailed]: 'Failed to create audit log',
  [CodeAuditLogAccessDenied]: 'Access to audit logs denied',
  [CodeAuditLogExportFailed]: 'Failed to export audit logs',

  // Property Key
  [CodePropertyKeyNotFound]: 'Property key not found',
  [CodePropertyKeyExists]: 'Property key already exists',
  [CodePropertyKeyCreateFailed]: 'Failed to create property key',
  [CodePropertyKeyUpdateFailed]: 'Failed to update property key',
  [CodePropertyKeyDeleteFailed]: 'Failed to delete property key',

  // Service Category
  [CodeServiceCategoryNotFound]: 'Service category not found',
  [CodeServiceCategoryExists]: 'Service category already exists',
  [CodeServiceCategoryCreateFailed]: 'Failed to create service category',
  [CodeServiceCategoryUpdateFailed]: 'Failed to update service category',
  [CodeServiceCategoryDeleteFailed]: 'Failed to delete service category',
  [CodeServiceCategoryCodeExists]: 'Service category code already exists',
  [CodeServiceCategoryInUse]: 'Service category is currently in use',

  // Service Item
  [CodeServiceItemNotFound]: 'Service item not found',
  [CodeServiceItemExists]: 'Service item already exists',
  [CodeServiceItemCreateFailed]: 'Failed to create service item',
  [CodeServiceItemUpdateFailed]: 'Failed to update service item',
  [CodeServiceItemDeleteFailed]: 'Failed to delete service item',
  [CodeServiceItemCodeExists]: 'Service item code already exists',

  // Thêm vào phần subscription
  [CodeSubscriptionAlreadyCancelled]: 'Subscription is already cancelled',

  // CORS
  [CodeCORSOriginInvalid]: 'Invalid CORS origin',
  [CodeCORSOriginExists]: 'CORS origin already exists',
  [CodeCORSOriginNotFound]: 'CORS origin not found',
  [CodeCORSUpdateFailed]: 'Failed to update CORS configuration',
  [CodePortfolioCategoryNotFound]: 'Portfolio category not found',
  [CodePortfolioCategoryExists]: 'Portfolio category already exists',
  [CodePortfolioCategoryCreateFailed]: 'Failed to create portfolio category',
  [CodePortfolioCategoryUpdateFailed]: 'Failed to update portfolio category',
  [CodePortfolioCategoryDeleteFailed]: 'Failed to delete portfolio category',
  [CodePortfolioNotFound]: 'Portfolio not found',
  [CodePortfolioExists]: 'Portfolio already exists',
  [CodePortfolioCreateFailed]: 'Failed to create portfolio',
  [CodePortfolioUpdateFailed]: 'Failed to update portfolio',
  [CodePortfolioDeleteFailed]: 'Failed to delete portfolio',
  [CodePortfolioTagNotFound]: 'Portfolio tag not found',
  [CodePortfolioTagExists]: 'Portfolio tag already exists',
  [CodePortfolioTagCreateFailed]: 'Failed to create portfolio tag',
  [CodePortfolioTagUpdateFailed]: 'Failed to update portfolio tag',
  [CodePortfolioTagDeleteFailed]: 'Failed to delete portfolio tag',
  [CodePortfolioContactNotFound]: 'Portfolio contact not found',
  [CodePortfolioContactExists]: 'Portfolio contact already exists',
  [CodePortfolioContactCreateFailed]: 'Failed to create portfolio contact',
  [CodePortfolioContactUpdateFailed]: 'Failed to update portfolio contact',
  [CodePortfolioContactDeleteFailed]: 'Failed to delete portfolio contact',

  [CodePlanNotFound]: 'Plan not found',
  [CodePlanExists]: 'Plan already exists',
  [CodePlanCreateFailed]: 'Failed to create plan',
  [CodePlanUpdateFailed]: 'Failed to update plan',
  [CodePlanDeleteFailed]: 'Failed to delete plan',
  [CodePlanInactive]: 'Plan is inactive',
  [CodePlanInUse]: 'Plan is currently in use by subscriptions',

  [CodeSubscriptionNotFound]: 'Subscription not found',
  [CodeSubscriptionExists]: 'Subscription already exists for this property',
  [CodeSubscriptionCreateFailed]: 'Failed to create subscription',
  [CodeSubscriptionUpdateFailed]: 'Failed to update subscription',
  [CodeSubscriptionDeleteFailed]: 'Failed to delete subscription',
  [CodeSubscriptionExpired]: 'Subscription has expired',
  [CodeSubscriptionSuspended]: 'Subscription is suspended',
  [CodeSubscriptionCancelled]: 'Subscription has been cancelled',
  [CodeSubscriptionInvalidStatus]: 'Invalid subscription status',
  [CodeSubscriptionPropertyMismatch]: 'Property ID does not match subscription',
  [CodeSubscriptionAlreadyActive]: 'Subscription is already active',
  [CodeSubscriptionCannotExtend]:
    'Cannot extend subscription in current status',
  [CodeSubscriptionCannotChangePlan]: 'Cannot change plan in current status',

  [CodeSubscriptionLogNotFound]: 'Subscription log not found',
  [CodeSubscriptionLogCreateFailed]: 'Failed to create subscription log',

  [CodeBillingRecordNotFound]: 'Billing record not found',
  [CodeBillingRecordExists]: 'Billing record already exists',
  [CodeBillingRecordCreateFailed]: 'Failed to create billing record',
  [CodeBillingRecordUpdateFailed]: 'Failed to update billing record',
  [CodeBillingRecordDeleteFailed]: 'Failed to delete billing record',
  [CodeBillingRecordInvalidStatus]: 'Invalid billing record status',
  [CodeBillingRecordAlreadyPaid]: 'Billing record is already paid',
  [CodeBillingRecordPropertyMismatch]:
    'Property ID does not match billing record',
  [CodeBillingRecordInvalidAmount]: 'Invalid billing amount',

  [CodeInvoiceNotFound]: 'Invoice not found',
  [CodeInvoiceExists]: 'Invoice already exists',
  [CodeInvoiceCreateFailed]: 'Failed to create invoice',
  [CodeInvoiceUpdateFailed]: 'Failed to update invoice',
  [CodeInvoiceDeleteFailed]: 'Failed to delete invoice',
  [CodeInvoiceNumberExists]: 'Invoice number already exists',
  [CodeInvoiceGenerationFailed]: 'Failed to generate invoice number',
  [CodeInvoiceAlreadyExists]: 'Invoice already exists for this billing record',
  [CodeInvoicePropertyMismatch]: 'Property ID does not match invoice',
  [CodeInvoicePDFGenerationFailed]: 'Failed to generate invoice PDF',

  // Accounting
  [CodeJournalEntryNotFound]: 'Journal entry not found',
  [CodeJournalEntryUnbalanced]: 'Journal entry is unbalanced',
  [CodeJournalEntryAlreadyRev]: 'Journal entry has already been reversed',
  [CodeJournalEntryInvalidType]: 'Invalid journal entry type',
  [CodeJournalSaveFailed]: 'Failed to save journal entry',
  [CodeExchangeRateNotFound]: 'Exchange rate not found',
  [CodeExchangeRateInvalid]: 'Exchange rate is invalid',
  [CodeExchangeRateSaveFailed]: 'Failed to save exchange rate',
  [CodeExchangeRateCurrencyInvalid]: 'Cannot set exchange rate for VND/VND',
  [CodeChartOfAccountNotFound]: 'Chart of account not found',

  // Server
  [CodeServerError]: 'Internal server error',
  [CodeDatabaseError]: 'Database error',
  [CodeCacheError]: 'Cache error',
  [CodeQueueError]: 'Queue error',
  [CodeStorageError]: 'Storage error',
};

/**
 * Get error message for an error code
 * @param code - Error code from backend
 * @returns Error message
 */
export const getErrorMessage = (code: ErrorCode): string => {
  return ErrorCodeMessages[code] ?? 'Unknown error';
};

/**
 * Check if error code indicates success
 * @param code - Error code from backend
 * @returns true if code is success
 */
export const isSuccess = (code: ErrorCode): boolean => {
  return code === CodeSuccess;
};

/**
 * Check if error code is in a specific range
 * @param code - Error code to check
 * @param min - Minimum code in range
 * @param max - Maximum code in range
 * @returns true if code is in range
 */
export const isCodeInRange = (
  code: ErrorCode,
  min: number,
  max: number
): boolean => {
  return code >= min && code <= max;
};

/**
 * Check if error code is auth related (2000-2999)
 */
export const isAuthError = (code: ErrorCode): boolean => {
  return isCodeInRange(code, 2000, 2999);
};

/**
 * Check if error code is validation related (3000-3999)
 */
export const isValidationError = (code: ErrorCode): boolean => {
  return isCodeInRange(code, 3000, 3999);
};

/**
 * Check if error code is authorization related (4000-4999)
 */
export const isAuthorizationError = (code: ErrorCode): boolean => {
  return isCodeInRange(code, 4000, 4999);
};

/**
 * Check if error code is server error (9000-9999)
 */
export const isServerError = (code: ErrorCode): boolean => {
  return isCodeInRange(code, 9000, 9999);
};
