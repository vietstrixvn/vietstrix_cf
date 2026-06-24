# Error Codes Documentation

> This document describes the error codes used in the system, synchronized between the Go backend and TypeScript frontend.

---

## Overview

Each response from the API returns a `code` field. The client uses this code to determine the result and display the appropriate message.

```typescript
import { getErrorMessage, isSuccess } from '@/utils';

const res = await api.someRequest();
if (!isSuccess(res.code)) {
  toast.error(getErrorMessage(res.code));
}
```

---

## Utility Functions

| Function               | Signature                      | Mô tả                                             |
| ---------------------- | ------------------------------ | ------------------------------------------------- |
| `getErrorMessage`      | `(code: ErrorCode) => string`  | Trả về message tương ứng với code                 |
| `isSuccess`            | `(code: ErrorCode) => boolean` | Kiểm tra code có phải thành công không            |
| `isAuthError`          | `(code: ErrorCode) => boolean` | Kiểm tra lỗi thuộc nhóm Auth (2000–2999)          |
| `isValidationError`    | `(code: ErrorCode) => boolean` | Kiểm tra lỗi thuộc nhóm Validation (3000–3999)    |
| `isAuthorizationError` | `(code: ErrorCode) => boolean` | Kiểm tra lỗi thuộc nhóm Authorization (4000–4999) |
| `isServerError`        | `(code: ErrorCode) => boolean` | Kiểm tra lỗi thuộc nhóm Server (9000–9999)        |
| `isCodeInRange`        | `(code, min, max) => boolean`  | Kiểm tra code có nằm trong range không            |

---

## Error Code Groups

### ✅ Success (0)

| Code | Constant      | Message |
| ---- | ------------- | ------- |
| 0    | `CodeSuccess` | Success |

---

### ⚙️ App Config (1000–1999)

| Code | Constant              | Message                           |
| ---- | --------------------- | --------------------------------- |
| 1000 | `CodeQueryInvalid`    | Query parameters are invalid      |
| 1001 | `CodeBodyInvalid`     | Request body is invalid           |
| 1002 | `CodePaginateInvalid` | Pagination parameters are invalid |
| 1003 | `CodeSlugRequired`    | Slug is required                  |
| 1004 | `CodeIDRequired`      | ID is required                    |
| 1005 | `CodeTitleRequired`   | Title is required                 |
| 1006 | `CodeNameRequired`    | Name is required                  |
| 1007 | `CodeSlugExists`      | Slug already exists               |

---

### 🔐 Auth (2000–2999)

| Code | Constant                    | Message                                                |
| ---- | --------------------------- | ------------------------------------------------------ |
| 2000 | `CodeUsernameRequired`      | Username is required                                   |
| 2001 | `CodePasswordRequired`      | Password is required                                   |
| 2002 | `CodeEmailRequired`         | Email is required                                      |
| 2003 | `CodeUsernameExisted`       | Username already exists                                |
| 2004 | `CodeEmailExisted`          | Email already exists                                   |
| 2005 | `CodeInvalidCredentials`    | Invalid username or password                           |
| 2006 | `CodeTokenGenerationFailed` | Failed to generate authentication token                |
| 2007 | `CodeTooManyAttempts`       | Too many failed login attempts. Please try again later |
| 2008 | `CodeAccountBlocked`        | Account has been blocked                               |
| 2009 | `CodeAccountInactive`       | Account is not activated                               |
| 2010 | `CodeTokenInvalid`          | Invalid token                                          |
| 2011 | `CodeTokenExpired`          | Token has expired                                      |
| 2012 | `CodeRefreshTokenInvalid`   | Invalid refresh token                                  |
| 2013 | `CodeSessionNotFound`       | Session not found                                      |
| 2014 | `CodeSessionExpired`        | Session has expired                                    |
| 2015 | `CodeSessionRevoked`        | Session has been revoked                               |
| 2020 | `CodeTokenRequired`         | Token is required                                      |
| 2021 | `Code2FACodeRequired`       | 2FA code is required                                   |

---

### ✏️ Validation (3000–3999)

| Code | Constant                 | Message                     |
| ---- | ------------------------ | --------------------------- |
| 3000 | `CodeInvalidStatus`      | Status is invalid           |
| 3001 | `CodeInvalidLanguage`    | Language is invalid         |
| 3002 | `CodeInvalidUUID`        | Invalid UUID format         |
| 3003 | `CodeInvalidIDUint`      | Invalid ID format           |
| 3004 | `CodeInvalidEmail`       | Invalid email format        |
| 3005 | `CodeInvalidPhoneNumber` | Invalid phone number format |
| 3006 | `CodeInvalidURL`         | Invalid URL format          |
| 3007 | `CodeInvalidRole`        | Invalid role                |
| 3008 | `CodeInvalidPriority`    | Invalid priority            |
| 3009 | `CodeInvalidService`     | Invalid service type        |
| 3010 | `CodeInvalidType`        | Invalid type                |
| 3011 | `CodeInvalidOrigin`      | Invalid origin format       |
| 3012 | `CodeInvalidModule`      | Invalid module              |
| 3013 | `CodeValidationFailed`   | Validation failed           |

---

### 🚫 Authorization (4000–4999)

| Code | Constant                     | Message                  |
| ---- | ---------------------------- | ------------------------ |
| 4001 | `CodeUnauthorized`           | Unauthorized access      |
| 4003 | `CodeForbidden`              | Access forbidden         |
| 4004 | `CodeNotFound`               | Resource not found       |
| 4005 | `CodePermissionDenied`       | Permission denied        |
| 4006 | `CodeInsufficientPermission` | Insufficient permissions |
| 4007 | `CodePropertyKeyInvalid`     | Invalid property key     |
| 4008 | `CodePropertyKeyExpired`     | Property key has expired |
| 4009 | `CodePropertyKeyInactive`    | Property key is inactive |
| 4029 | `CodeRateLimitExceeded`      | Rate limit exceeded      |

---

### 👤 Admin (5000–5099)

| Code | Constant                | Message                   |
| ---- | ----------------------- | ------------------------- |
| 5000 | `CodeAdminNotFound`     | Admin not found           |
| 5001 | `CodeAdminBlocked`      | Admin account is blocked  |
| 5002 | `CodeAdminInactive`     | Admin account is inactive |
| 5003 | `CodeAdminExists`       | Admin already exists      |
| 5004 | `CodeAdminCreateFailed` | Failed to create admin    |
| 5005 | `CodeAdminUpdateFailed` | Failed to update admin    |
| 5006 | `CodeAdminDeleteFailed` | Failed to delete admin    |
| 5010 | `CodeRoleNotFound`      | Role not found            |
| 5011 | `CodeRoleExists`        | Role already exists       |
| 5012 | `CodeRoleCreateFailed`  | Failed to create role     |
| 5013 | `CodeRoleUpdateFailed`  | Failed to update role     |
| 5014 | `CodeRoleDeleteFailed`  | Failed to delete role     |
| 5015 | `CodeRoleInUse`         | Role is currently in use  |

---

### 🏠 Property (5100–5199)

| Code | Constant                      | Message                           |
| ---- | ----------------------------- | --------------------------------- |
| 5100 | `CodePropertyNotFound`        | Property not found                |
| 5101 | `CodePropertyExists`          | Property already exists           |
| 5102 | `CodePropertyCreateFailed`    | Failed to create property         |
| 5103 | `CodePropertyUpdateFailed`    | Failed to update property         |
| 5104 | `CodePropertyDeleteFailed`    | Failed to delete property         |
| 5105 | `CodePropertyInactive`        | Property is inactive              |
| 5106 | `CodePropertyDeleted`         | Property has been deleted         |
| 5107 | `CodePropertySlugExists`      | Property slug already exists      |
| 5108 | `CodePropertyDomainExists`    | Property domain already exists    |
| 5109 | `CodePropertySubdomainExists` | Property subdomain already exists |

---

### 👥 Property User (5200–5299)

| Code | Constant               | Message                  |
| ---- | ---------------------- | ------------------------ |
| 5200 | `CodeUserNotFound`     | User not found           |
| 5201 | `CodeUserExists`       | User already exists      |
| 5202 | `CodeUserCreateFailed` | Failed to create user    |
| 5203 | `CodeUserUpdateFailed` | Failed to update user    |
| 5204 | `CodeUserDeleteFailed` | Failed to delete user    |
| 5205 | `CodeUserBlocked`      | User account is blocked  |
| 5206 | `CodeUserInactive`     | User account is inactive |

---

### 🗂️ Category (5300–5399)

| Code | Constant                   | Message                      |
| ---- | -------------------------- | ---------------------------- |
| 5300 | `CodeCategoryNotFound`     | Category not found           |
| 5301 | `CodeCategoryExists`       | Category already exists      |
| 5302 | `CodeCategoryCreateFailed` | Failed to create category    |
| 5303 | `CodeCategoryUpdateFailed` | Failed to update category    |
| 5304 | `CodeCategoryDeleteFailed` | Failed to delete category    |
| 5305 | `CodeCategorySlugExists`   | Category slug already exists |
| 5306 | `CodeCategoryInUse`        | Category is currently in use |

---

### 📝 Post (5400–5449)

| Code | Constant               | Message                  |
| ---- | ---------------------- | ------------------------ |
| 5400 | `CodePostNotFound`     | Post not found           |
| 5401 | `CodePostExists`       | Post already exists      |
| 5402 | `CodePostCreateFailed` | Failed to create post    |
| 5403 | `CodePostUpdateFailed` | Failed to update post    |
| 5404 | `CodePostDeleteFailed` | Failed to delete post    |
| 5405 | `CodePostSlugExists`   | Post slug already exists |

---

### 📦 Product (5450–5499)

| Code | Constant                       | Message                                        |
| ---- | ------------------------------ | ---------------------------------------------- |
| 5450 | `CodeProductNotFound`          | Product not found                              |
| 5451 | `CodeProductExists`            | Product already exists                         |
| 5452 | `CodeProductCreateFailed`      | Failed to create product                       |
| 5453 | `CodeProductUpdateFailed`      | Failed to update product                       |
| 5454 | `CodeProductDeleteFailed`      | Failed to delete product                       |
| 5455 | `CodeProductSlugExists`        | Product slug already exists                    |
| 5456 | `CodeProductFeatureNotEnabled` | You haven't registered for the product feature |

---

### 🏷️ Tag (5500–5599)

| Code | Constant              | Message                 |
| ---- | --------------------- | ----------------------- |
| 5500 | `CodeTagNotFound`     | Tag not found           |
| 5501 | `CodeTagExists`       | Tag already exists      |
| 5502 | `CodeTagCreateFailed` | Failed to create tag    |
| 5503 | `CodeTagUpdateFailed` | Failed to update tag    |
| 5504 | `CodeTagDeleteFailed` | Failed to delete tag    |
| 5505 | `CodeTagSlugExists`   | Tag slug already exists |

---

### 🖼️ Banner (5600–5699)

| Code | Constant                 | Message                 |
| ---- | ------------------------ | ----------------------- |
| 5600 | `CodeBannerNotFound`     | Banner not found        |
| 5601 | `CodeBannerExists`       | Banner already exists   |
| 5602 | `CodeBannerCreateFailed` | Failed to create banner |
| 5603 | `CodeBannerUpdateFailed` | Failed to update banner |
| 5604 | `CodeBannerDeleteFailed` | Failed to delete banner |

---

### 📰 News (5700–5799)

| Code | Constant               | Message               |
| ---- | ---------------------- | --------------------- |
| 5700 | `CodeNewsNotFound`     | News not found        |
| 5701 | `CodeNewsExists`       | News already exists   |
| 5702 | `CodeNewsCreateFailed` | Failed to create news |
| 5703 | `CodeNewsUpdateFailed` | Failed to update news |
| 5704 | `CodeNewsDeleteFailed` | Failed to delete news |

---

### 🔗 Social (5800–5899)

| Code | Constant                 | Message                      |
| ---- | ------------------------ | ---------------------------- |
| 5800 | `CodeSocialNotFound`     | Social link not found        |
| 5801 | `CodeSocialExists`       | Social link already exists   |
| 5802 | `CodeSocialCreateFailed` | Failed to create social link |
| 5803 | `CodeSocialUpdateFailed` | Failed to update social link |
| 5804 | `CodeSocialDeleteFailed` | Failed to delete social link |

---

### 📬 Contact (5900–5999)

| Code | Constant                  | Message                  |
| ---- | ------------------------- | ------------------------ |
| 5900 | `CodeContactNotFound`     | Contact not found        |
| 5901 | `CodeContactExists`       | Contact already exists   |
| 5902 | `CodeContactCreateFailed` | Failed to create contact |
| 5903 | `CodeContactUpdateFailed` | Failed to update contact |
| 5904 | `CodeContactDeleteFailed` | Failed to delete contact |

---

### 🔖 Type (6000–6099)

| Code | Constant               | Message                  |
| ---- | ---------------------- | ------------------------ |
| 6000 | `CodeTypeNotFound`     | Type not found           |
| 6001 | `CodeTypeExists`       | Type already exists      |
| 6002 | `CodeTypeCreateFailed` | Failed to create type    |
| 6003 | `CodeTypeUpdateFailed` | Failed to update type    |
| 6004 | `CodeTypeDeleteFailed` | Failed to delete type    |
| 6005 | `CodeTypeSlugExists`   | Type slug already exists |
| 6006 | `CodeTypeInUse`        | Type is currently in use |

---

### 🖼 Media (6100–6199)

| Code | Constant                 | Message                          |
| ---- | ------------------------ | -------------------------------- |
| 6100 | `CodeMediaNotFound`      | Media not found                  |
| 6101 | `CodeMediaExists`        | Media already exists             |
| 6102 | `CodeMediaCreateFailed`  | Failed to create media           |
| 6103 | `CodeMediaUpdateFailed`  | Failed to update media           |
| 6104 | `CodeMediaDeleteFailed`  | Failed to delete media           |
| 6105 | `CodeMediaUploadFailed`  | Failed to upload media           |
| 6106 | `CodeMediaInvalidFormat` | Invalid media format             |
| 6107 | `CodeMediaTooLarge`      | Media file is too large          |
| 6108 | `CodeMediaPresignFailed` | Failed to generate presigned URL |

---

### 🎫 Ticket (6200–6299)

| Code | Constant                 | Message                 |
| ---- | ------------------------ | ----------------------- |
| 6200 | `CodeTicketNotFound`     | Ticket not found        |
| 6201 | `CodeTicketExists`       | Ticket already exists   |
| 6202 | `CodeTicketCreateFailed` | Failed to create ticket |
| 6203 | `CodeTicketUpdateFailed` | Failed to update ticket |
| 6204 | `CodeTicketDeleteFailed` | Failed to delete ticket |

---

### 📊 GA4 (6300–6399)

| Code | Constant              | Message                            |
| ---- | --------------------- | ---------------------------------- |
| 6300 | `CodeGA4NotFound`     | GA4 configuration not found        |
| 6301 | `CodeGA4Exists`       | GA4 configuration already exists   |
| 6302 | `CodeGA4CreateFailed` | Failed to create GA4 configuration |
| 6303 | `CodeGA4UpdateFailed` | Failed to update GA4 configuration |
| 6304 | `CodeGA4DeleteFailed` | Failed to delete GA4 configuration |
| 6305 | `CodeGA4InvalidID`    | Invalid GA4 property ID            |
| 6306 | `CodeGA4ClientError`  | GA4 client error                   |
| 6307 | `CodeGA4Unavailable`  | GA4 service is unavailable         |

---

### 🏷 GTM (6400–6499)

| Code | Constant              | Message                            |
| ---- | --------------------- | ---------------------------------- |
| 6400 | `CodeGTMNotFound`     | GTM configuration not found        |
| 6401 | `CodeGTMExists`       | GTM configuration already exists   |
| 6402 | `CodeGTMCreateFailed` | Failed to create GTM configuration |
| 6403 | `CodeGTMUpdateFailed` | Failed to update GTM configuration |
| 6404 | `CodeGTMDeleteFailed` | Failed to delete GTM configuration |
| 6405 | `CodeGTMInvalidID`    | Invalid GTM container ID           |

---

### 📋 Audit Log (6500–6599)

| Code | Constant                   | Message                     |
| ---- | -------------------------- | --------------------------- |
| 6500 | `CodeAuditLogNotFound`     | Audit log not found         |
| 6501 | `CodeAuditLogCreateFailed` | Failed to create audit log  |
| 6502 | `CodeAuditLogAccessDenied` | Access to audit logs denied |
| 6503 | `CodeAuditLogExportFailed` | Failed to export audit logs |

---

### 🔑 Property Key (6600–6699)

| Code | Constant                      | Message                       |
| ---- | ----------------------------- | ----------------------------- |
| 6600 | `CodePropertyKeyNotFound`     | Property key not found        |
| 6601 | `CodePropertyKeyExists`       | Property key already exists   |
| 6602 | `CodePropertyKeyCreateFailed` | Failed to create property key |
| 6603 | `CodePropertyKeyUpdateFailed` | Failed to update property key |
| 6604 | `CodePropertyKeyDeleteFailed` | Failed to delete property key |

---

### 🌐 CORS (6700–6799)

| Code | Constant                 | Message                             |
| ---- | ------------------------ | ----------------------------------- |
| 6700 | `CodeCORSOriginInvalid`  | Invalid CORS origin                 |
| 6701 | `CodeCORSOriginExists`   | CORS origin already exists          |
| 6702 | `CodeCORSOriginNotFound` | CORS origin not found               |
| 6703 | `CodeCORSUpdateFailed`   | Failed to update CORS configuration |

---

### 🖼️ Portfolio (6800–6899)

| Code | Constant                            | Message                             |
| ---- | ----------------------------------- | ----------------------------------- |
| 6800 | `CodePortfolioCategoryNotFound`     | Portfolio category not found        |
| 6801 | `CodePortfolioCategoryExists`       | Portfolio category already exists   |
| 6802 | `CodePortfolioCategoryCreateFailed` | Failed to create portfolio category |
| 6803 | `CodePortfolioCategoryUpdateFailed` | Failed to update portfolio category |
| 6804 | `CodePortfolioCategoryDeleteFailed` | Failed to delete portfolio category |
| 6810 | `CodePortfolioNotFound`             | Portfolio not found                 |
| 6811 | `CodePortfolioExists`               | Portfolio already exists            |
| 6812 | `CodePortfolioCreateFailed`         | Failed to create portfolio          |
| 6813 | `CodePortfolioUpdateFailed`         | Failed to update portfolio          |
| 6814 | `CodePortfolioDeleteFailed`         | Failed to delete portfolio          |
| 6820 | `CodePortfolioTagNotFound`          | Portfolio tag not found             |
| 6821 | `CodePortfolioTagExists`            | Portfolio tag already exists        |
| 6822 | `CodePortfolioTagCreateFailed`      | Failed to create portfolio tag      |
| 6823 | `CodePortfolioTagUpdateFailed`      | Failed to update portfolio tag      |
| 6824 | `CodePortfolioTagDeleteFailed`      | Failed to delete portfolio tag      |
| 6830 | `CodePortfolioContactNotFound`      | Portfolio contact not found         |
| 6831 | `CodePortfolioContactExists`        | Portfolio contact already exists    |
| 6832 | `CodePortfolioContactCreateFailed`  | Failed to create portfolio contact  |
| 6833 | `CodePortfolioContactUpdateFailed`  | Failed to update portfolio contact  |
| 6834 | `CodePortfolioContactDeleteFailed`  | Failed to delete portfolio contact  |

---

### 🔥 Server Error (9000–9999)

| Code | Constant            | Message               |
| ---- | ------------------- | --------------------- |
| 9000 | `CodeServerError`   | Internal server error |
| 9001 | `CodeDatabaseError` | Database error        |
| 9002 | `CodeCacheError`    | Cache error           |
| 9003 | `CodeQueueError`    | Queue error           |
| 9004 | `CodeStorageError`  | Storage error         |

---

## Quy ước đặt tên

- Các constant đặt theo pattern: `Code` + `{Entity}` + `{Action/Status}`
- Ví dụ: `CodeUserNotFound`, `CodePostCreateFailed`, `CodeTokenExpired`
- Các code trong cùng một nhóm entity có số thứ tự liên tiếp theo block 100

## Quy ước range

| Range     | Nhóm          |
| --------- | ------------- |
| 0         | Success       |
| 1000–1999 | App Config    |
| 2000–2999 | Auth          |
| 3000–3999 | Validation    |
| 4000–4999 | Authorization |
| 5000–5099 | Admin         |
| 5100–5199 | Property      |
| 5200–5299 | Property User |
| 5300–5399 | Category      |
| 5400–5449 | Post          |
| 5450–5499 | Product       |
| 5500–5599 | Tag           |
| 5600–5699 | Banner        |
| 5700–5799 | News          |
| 5800–5899 | Social        |
| 5900–5999 | Contact       |
| 6000–6099 | Type          |
| 6100–6199 | Media         |
| 6200–6299 | Ticket        |
| 6300–6399 | GA4           |
| 6400–6499 | GTM           |
| 6500–6599 | Audit Log     |
| 6600–6699 | Property Key  |
| 6700–6799 | CORS          |
| 6800–6899 | Portfolio     |
| 9000–9999 | Server Error  |
